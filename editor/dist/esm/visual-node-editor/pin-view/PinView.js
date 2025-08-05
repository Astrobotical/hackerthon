import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import classNames from "classnames";
import { useCallback, useRef, useState } from "react";
import { useHotkeys } from "../../lib/react-utils/use-hotkeys";
import { ERROR_PIN_ID, fullInsIdPath, TRIGGER_PIN_ID, } from "@flyde/core";
import { getPinDomId, getPinDomHandleId } from "../dom-ids";
import { getInputName, getOutputName, useHistoryHelpers } from "./helpers";
import { useDarkMode } from "../../flow-editor/DarkModeContext";
import { PinTooltipContent } from "./PinTooltipContent";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, } from "../../ui";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../ui";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const LEAVE_DELAY = 500; // Increased from 200ms to 500ms for better UX
const SHOW_DELAY = 250; // Delay before showing tooltip
export const PinView = React.memo(function PinView(props) {
    const { selected, type, connected, optional, currentInsId, isClosestToMouse, id, onMouseDown, onMouseUp, isMain, onInspect, } = props;
    const { history, resetHistory, refreshHistory } = useHistoryHelpers(currentInsId, id, type);
    const leaveTimer = useRef();
    const showTimer = useRef();
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isTooltipHovered, setIsTooltipHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const handleMouseEnter = useCallback(() => {
        window.clearTimeout(leaveTimer.current);
        setIsDataLoading(true);
        // Clear previous history data to prevent showing stale data
        resetHistory();
        // Start loading the data
        refreshHistory();
        // Set a delay before showing the tooltip
        showTimer.current = window.setTimeout(() => {
            setIsTooltipOpen(true);
            setTimeout(() => {
                setIsDataLoading(false);
            }, 100);
        }, SHOW_DELAY);
    }, [refreshHistory, resetHistory]);
    const handleMouseLeave = useCallback(() => {
        window.clearTimeout(showTimer.current);
        leaveTimer.current = window.setTimeout(() => {
            if (!isTooltipHovered) {
                resetHistory();
                setIsTooltipOpen(false);
                setIsExpanded(false);
            }
        }, LEAVE_DELAY);
    }, [resetHistory, isTooltipHovered]);
    const handleTooltipMouseEnter = useCallback(() => {
        window.clearTimeout(leaveTimer.current);
        setIsTooltipHovered(true);
    }, []);
    const handleTooltipMouseLeave = useCallback(() => {
        setIsTooltipHovered(false);
        leaveTimer.current = window.setTimeout(() => {
            resetHistory();
            setIsTooltipOpen(false);
            setIsExpanded(false);
        }, LEAVE_DELAY);
    }, [resetHistory]);
    const handleInspect = useCallback(() => {
        onInspect(currentInsId, { id, type });
    }, [currentInsId, id, type, onInspect]);
    const toggleExpanded = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);
    useHotkeys("cmd+i,ctrl+i", (e) => {
        if (isTooltipOpen) {
            e.preventDefault();
            handleInspect();
        }
    }, {
        text: "Inspect pin value",
        group: "Pin Actions",
    }, [handleInspect, isTooltipOpen]);
    const dark = useDarkMode();
    const getContextMenuContent = () => {
        const inspectItem = (_jsx(ContextMenuItem, { onClick: () => props.onInspect(props.currentInsId, {
                id: props.id,
                type: props.type,
            }), children: "Inspect" }));
        if (props.type === "input") {
            return (_jsxs(_Fragment, { children: [_jsx(ContextMenuItem, { onClick: () => props.onToggleSticky(props.id), children: "Toggle sticky" }), inspectItem] }));
        }
        else {
            return inspectItem;
        }
    };
    const onPinHandleClick = (e) => {
        e.stopPropagation();
        const { onShiftClick, onClick, id } = props;
        if (e.shiftKey && onShiftClick) {
            onShiftClick(id, e);
        }
        else {
            onClick(id, type, e);
        }
    };
    const displayName = type === "input" ? getInputName(id) : getOutputName(id);
    const calcClassNames = () => {
        if (props.type === "input") {
            return classNames("pin", {
                selected,
                "increased-drop-area": props.increasedDropArea,
                closest: isClosestToMouse,
                optional,
                connected,
                dark,
            }, type);
        }
        else {
            return classNames("pin", {
                selected,
                connected,
                "increased-drop-area": props.increasedDropArea,
                closest: isClosestToMouse,
                optional,
                "error-pin": id === ERROR_PIN_ID,
                dark,
            }, type);
        }
    };
    const maybeQueueLabel = () => {
        if (props.type === "input" && props.queueSize) {
            return _jsxs("span", { className: "suffix", children: [props.queueSize, " in Q"] });
        }
        else {
            return null;
        }
    };
    const _onMouseDown = React.useCallback((e) => {
        if (e.button === 0) {
            onMouseDown(id, type, e);
        }
    }, [id, type, onMouseDown]);
    const _onMouseUp = React.useCallback((e) => {
        if (e.button === 0) {
            onMouseUp(id, type, e);
        }
    }, [id, type, onMouseUp]);
    const idParams = {
        fullInsIdPath: fullInsIdPath(props.currentInsId, props.ancestorsInsIds),
        pinId: id,
        pinType: isMain ? (type === "input" ? "output" : "input") : type,
        isMain,
    };
    return (_jsxs("div", { className: calcClassNames(), "data-pin-id": id, children: [_jsx(TooltipProvider, { children: _jsxs(Tooltip, { open: isTooltipOpen, onOpenChange: setIsTooltipOpen, children: [_jsxs(ContextMenu, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(ContextMenuTrigger, { onMouseEnter: handleMouseEnter, onMouseOut: handleMouseLeave, id: getPinDomId(idParams), onDoubleClick: (e) => {
                                            if (props.onDoubleClick) {
                                                props.onDoubleClick(id, e);
                                            }
                                        }, className: classNames(`pin-inner`, { dark }), children: [id === TRIGGER_PIN_ID ? _jsx(FontAwesomeIcon, { icon: faBolt }) : displayName, maybeQueueLabel()] }) }), _jsx(ContextMenuContent, { children: getContextMenuContent() })] }), _jsx(TooltipContent, { side: "top", align: "start", className: "p-0 rounded-md", onMouseEnter: handleTooltipMouseEnter, onMouseLeave: handleTooltipMouseLeave, children: _jsx(PinTooltipContent, { displayName: displayName, typeLabel: isMain
                                    ? type === "input"
                                        ? "main output"
                                        : "main input"
                                    : type, description: props.description, history: history, queuedValues: type === "input" ? props.queuedValues : undefined, isLoading: isDataLoading, onInspect: handleInspect, isExpanded: isExpanded, onToggleExpand: toggleExpanded }) })] }, `tooltip-${currentInsId}-${id}-${type}`) }), _jsx("div", { className: classNames("pin-handle no-drag", type, {
                    closest: isClosestToMouse,
                    selected,
                    dark,
                }), id: getPinDomHandleId(idParams), onMouseDown: (e) => {
                    if (e.button === 0) {
                        e.stopPropagation(); // Prevent node selection when clicking on pin handle
                        onMouseDown(id, type, e);
                    }
                }, onMouseUp: _onMouseUp, onClick: onPinHandleClick, children: _jsx("div", { className: classNames("pin-handle-inner", type, { dark }) }) })] }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGluVmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvcGluLXZpZXcvUGluVmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRS9ELE9BQU8sRUFDTCxZQUFZLEVBQ1osYUFBYSxFQUViLGNBQWMsR0FDZixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4RCxPQUFPLEVBQ0wsV0FBVyxFQUNYLGtCQUFrQixFQUNsQixlQUFlLEVBQ2Ysa0JBQWtCLEdBQ25CLE1BQU0sVUFBVSxDQUFDO0FBRWxCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsY0FBYyxFQUNkLGVBQWUsRUFDZixjQUFjLEdBQ2YsTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQXdDakUsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUMsOENBQThDO0FBQ3ZFLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDLCtCQUErQjtB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