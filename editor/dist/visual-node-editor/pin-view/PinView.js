"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const react_1 = require("react");
const use_hotkeys_1 = require("../../lib/react-utils/use-hotkeys");
const core_1 = require("@flyde/core");
const dom_ids_1 = require("../dom-ids");
const helpers_1 = require("./helpers");
const DarkModeContext_1 = require("../../flow-editor/DarkModeContext");
const PinTooltipContent_1 = require("./PinTooltipContent");
const ui_1 = require("../../ui");
const ui_2 = require("../../ui");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const LEAVE_DELAY = 500; // Increased from 200ms to 500ms for better UX
const SHOW_DELAY = 250; // Delay before showing tooltip
exports.PinView = React.memo(function PinView(props) {
    const { selected, type, connected, optional, currentInsId, isClosestToMouse, id, onMouseDown, onMouseUp, isMain, onInspect, } = props;
    const { history, resetHistory, refreshHistory } = (0, helpers_1.useHistoryHelpers)(currentInsId, id, type);
    const leaveTimer = (0, react_1.useRef)();
    const showTimer = (0, react_1.useRef)();
    const [isTooltipOpen, setIsTooltipOpen] = (0, react_1.useState)(false);
    const [isDataLoading, setIsDataLoading] = (0, react_1.useState)(false);
    const [isTooltipHovered, setIsTooltipHovered] = (0, react_1.useState)(false);
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    const handleMouseEnter = (0, react_1.useCallback)(() => {
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
    const handleMouseLeave = (0, react_1.useCallback)(() => {
        window.clearTimeout(showTimer.current);
        leaveTimer.current = window.setTimeout(() => {
            if (!isTooltipHovered) {
                resetHistory();
                setIsTooltipOpen(false);
                setIsExpanded(false);
            }
        }, LEAVE_DELAY);
    }, [resetHistory, isTooltipHovered]);
    const handleTooltipMouseEnter = (0, react_1.useCallback)(() => {
        window.clearTimeout(leaveTimer.current);
        setIsTooltipHovered(true);
    }, []);
    const handleTooltipMouseLeave = (0, react_1.useCallback)(() => {
        setIsTooltipHovered(false);
        leaveTimer.current = window.setTimeout(() => {
            resetHistory();
            setIsTooltipOpen(false);
            setIsExpanded(false);
        }, LEAVE_DELAY);
    }, [resetHistory]);
    const handleInspect = (0, react_1.useCallback)(() => {
        onInspect(currentInsId, { id, type });
    }, [currentInsId, id, type, onInspect]);
    const toggleExpanded = (0, react_1.useCallback)(() => {
        setIsExpanded(prev => !prev);
    }, []);
    (0, use_hotkeys_1.useHotkeys)("cmd+i,ctrl+i", (e) => {
        if (isTooltipOpen) {
            e.preventDefault();
            handleInspect();
        }
    }, {
        text: "Inspect pin value",
        group: "Pin Actions",
    }, [handleInspect, isTooltipOpen]);
    const dark = (0, DarkModeContext_1.useDarkMode)();
    const getContextMenuContent = () => {
        const inspectItem = ((0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: () => props.onInspect(props.currentInsId, {
                id: props.id,
                type: props.type,
            }), children: "Inspect" }));
        if (props.type === "input") {
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: () => props.onToggleSticky(props.id), children: "Toggle sticky" }), inspectItem] }));
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
    const displayName = type === "input" ? (0, helpers_1.getInputName)(id) : (0, helpers_1.getOutputName)(id);
    const calcClassNames = () => {
        if (props.type === "input") {
            return (0, classnames_1.default)("pin", {
                selected,
                "increased-drop-area": props.increasedDropArea,
                closest: isClosestToMouse,
                optional,
                connected,
                dark,
            }, type);
        }
        else {
            return (0, classnames_1.default)("pin", {
                selected,
                connected,
                "increased-drop-area": props.increasedDropArea,
                closest: isClosestToMouse,
                optional,
                "error-pin": id === core_1.ERROR_PIN_ID,
                dark,
            }, type);
        }
    };
    const maybeQueueLabel = () => {
        if (props.type === "input" && props.queueSize) {
            return (0, jsx_runtime_1.jsxs)("span", { className: "suffix", children: [props.queueSize, " in Q"] });
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
        fullInsIdPath: (0, core_1.fullInsIdPath)(props.currentInsId, props.ancestorsInsIds),
        pinId: id,
        pinType: isMain ? (type === "input" ? "output" : "input") : type,
        isMain,
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: calcClassNames(), "data-pin-id": id, children: [(0, jsx_runtime_1.jsx)(ui_2.TooltipProvider, { children: (0, jsx_runtime_1.jsxs)(ui_2.Tooltip, { open: isTooltipOpen, onOpenChange: setIsTooltipOpen, children: [(0, jsx_runtime_1.jsxs)(ui_1.ContextMenu, { children: [(0, jsx_runtime_1.jsx)(ui_2.TooltipTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(ui_1.ContextMenuTrigger, { onMouseEnter: handleMouseEnter, onMouseOut: handleMouseLeave, id: (0, dom_ids_1.getPinDomId)(idParams), onDoubleClick: (e) => {
                                            if (props.onDoubleClick) {
                                                props.onDoubleClick(id, e);
                                            }
                                        }, className: (0, classnames_1.default)(`pin-inner`, { dark }), children: [id === core_1.TRIGGER_PIN_ID ? (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faBolt }) : displayName, maybeQueueLabel()] }) }), (0, jsx_runtime_1.jsx)(ui_1.ContextMenuContent, { children: getContextMenuContent() })] }), (0, jsx_runtime_1.jsx)(ui_2.TooltipContent, { side: "top", align: "start", className: "p-0 rounded-md", onMouseEnter: handleTooltipMouseEnter, onMouseLeave: handleTooltipMouseLeave, children: (0, jsx_runtime_1.jsx)(PinTooltipContent_1.PinTooltipContent, { displayName: displayName, typeLabel: isMain
                                    ? type === "input"
                                        ? "main output"
                                        : "main input"
                                    : type, description: props.description, history: history, queuedValues: type === "input" ? props.queuedValues : undefined, isLoading: isDataLoading, onInspect: handleInspect, isExpanded: isExpanded, onToggleExpand: toggleExpanded }) })] }, `tooltip-${currentInsId}-${id}-${type}`) }), (0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)("pin-handle no-drag", type, {
                    closest: isClosestToMouse,
                    selected,
                    dark,
                }), id: (0, dom_ids_1.getPinDomHandleId)(idParams), onMouseDown: (e) => {
                    if (e.button === 0) {
                        e.stopPropagation(); // Prevent node selection when clicking on pin handle
                        onMouseDown(id, type, e);
                    }
                }, onMouseUp: _onMouseUp, onClick: onPinHandleClick, children: (0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)("pin-handle-inner", type, { dark }) }) })] }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGluVmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvcGluLXZpZXcvUGluVmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQjtBQUMvQiw0REFBb0M7QUFDcEMsaUNBQXNEO0FBQ3RELG1FQUErRDtBQUUvRCxzQ0FLcUI7QUFDckIsd0NBQTREO0FBQzVELHVDQUEyRTtBQUMzRSx1RUFBZ0U7QUFDaEUsMkRBQXdEO0FBRXhELGlDQUtrQjtBQUVsQixpQ0FLa0I7QUFDbEIsNEVBQTJEO0FBQzNELHNFQUFpRTtBQXdDakUsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUMsOENBQThDO0FBQ3ZFLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDLCtCQUErQjtBQUUxQyxRQUFBLE9BQU8sR0FBMkIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLE9BQU8sQ0FDeEUsS0FBSztJQUVMLE1BQU0sRUFDSixRQUFRLEVBQ1IsSUFBSSxFQUNKLFNBQVMsRUFDVCxRQUFRLEVBQ1IsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixFQUFFLEVBQ0YsV0FBVyxFQUNYLFNBQVMsRUFDVCxNQUFNLEVBQ04sU0FBUyxHQUNWLEdBQUcsS0FBSyxDQUFDO0lBRVYsTUFBTSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLEdBQUcsSUFBQSwyQkFBaUIsRUFDakUsWUFBWSxFQUNaLEVBQUUsRUFDRixJQUFJLENBQ0wsQ0FBQztJQUVGLE1BQU0sVUFBVSxHQUFHLElBQUEsY0FBTSxHQUFVLENBQUM7SUFDcEMsTUFBTSxTQUFTLEdBQUcsSUFBQSxjQUFNLEdBQVUsQ0FBQztJQUNuQyxNQUFNLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELE1BQU0sQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUQsTUFBTSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXBELE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSxtQkFBVyxFQUFDLEdBQUcsRUFBRTtRQUN4QyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2Qiw0REFBNEQ7UUFDNUQsWUFBWSxFQUFFLENBQUM7UUFFZix5QkFBeUI7UUFDekIsY0FBYyxFQUFFLENBQUM7UUFFakIseUNBQXlDO1FBQ3pDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDekMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDVixDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDakIsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFFbkMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFBLG1CQUFXLEVBQUMsR0FBRyxFQUFFO1FBQ3hDLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXZDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3RCLFlBQVksRUFBRSxDQUFDO2dCQUNmLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4QixhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkIsQ0FBQztRQUNILENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNsQixDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBRXJDLE1BQU0sdUJBQXVCLEdBQUcsSUFBQSxtQkFBVyxFQUFDLEdBQUcsRUFBRTtRQUMvQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUCxNQUFNLHVCQUF1QixHQUFHLElBQUEsbUJBQVcsRUFBQyxHQUFHLEVBQUU7UUFDL0MsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsVUFBVSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUMxQyxZQUFZLEVBQUUsQ0FBQztZQUNmLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDbEIsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUVuQixNQUFNLGFBQWEsR0FBRyxJQUFBLG1CQUFXLEVBQUMsR0FBRyxFQUFFO1FBQ3JDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXhDLE1BQU0sY0FBYyxHQUFHLElBQUEsbUJBQVcsRUFBQyxHQUFHLEVBQUU7UUFDdEMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUCxJQUFBLHdCQUFVLEVBQ1IsY0FBYyxFQUNkLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDSixJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixhQUFhLEVBQUUsQ0FBQztRQUNsQixDQUFDO0lBQ0gsQ0FBQyxFQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixLQUFLLEVBQUUsYUFBYTtLQUNyQixFQUNELENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUMvQixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBQSw2QkFBVyxHQUFFLENBQUM7SUFFM0IsTUFBTSxxQkFBcUIsR0FBRyxHQUFHLEVBQUU7UUFDakMsTUFBTSxXQUFXLEdBQUcsQ0FDbEIsdUJBQUMsb0JBQWUsSUFDZCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQ1osS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO2dCQUNsQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO2FBQ2pCLENBQUMsd0JBSVksQ0FDbkIsQ0FBQztRQUVGLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUMzQixPQUFPLENBQ0wsNkRBQ0UsdUJBQUMsb0JBQWUsSUFBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLDhCQUU1QyxFQUNqQixXQUFXLElBQ1gsQ0FDSixDQUFDO1FBQ0osQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLFdBQVcsQ0FBQztRQUNyQixDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQW1CLEVBQUUsRUFBRTtRQUMvQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFcEIsTUFBTSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUMvQixZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUFHLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUEsc0JBQVksRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBQSx1QkFBYSxFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTVFLE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRTtRQUMxQixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFLENBQUM7WUFDM0IsT0FBTyxJQUFBLG9CQUFVLEVBQ2YsS0FBSyxFQUNMO2dCQUNFLFFBQVE7Z0JBQ1IscUJBQXFCLEVBQUUsS0FBSyxDQUFDLGlCQUFpQjtnQkFDOUMsT0FBTyxFQUFFLGdCQUFnQjtnQkFDekIsUUFBUTtnQkFDUixTQUFTO2dCQUNULElBQUk7YUFDTCxFQUNELElBQUksQ0FDTCxDQUFDO1FBQ0osQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLElBQUEsb0JBQVUsRUFDZixLQUFLLEVBQ0w7Z0JBQ0UsUUFBUTtnQkFDUixTQUFTO2dCQUNULHFCQUFxQixFQUFFLEtBQUssQ0FBQyxpQkFBaUI7Z0JBQzlDLE9BQU8sRUFBRSxnQkFBZ0I7Z0JBQ3pCLFFBQVE7Z0JBQ1IsV0FBVyxFQUFFLEVBQUUsS0FBSyxtQkFBWTtnQkFDaEMsSUFBSTthQUNMLEVBQ0QsSUFBSSxDQUNMLENBQUM7UUFDSixDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsTUFBTSxlQUFlLEdBQUcsR0FBRyxFQUFFO1FBQzNCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzlDLE9BQU8sa0NBQU0sU0FBUyxFQUFDLFFBQVEsYUFBRSxLQUFLLENBQUMsU0FBUyxhQUFhLENBQUM7UUFDaEUsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUNwQyxDQUFDLENBQW1CLEVBQUUsRUFBRTtRQUN0QixJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDbkIsV0FBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUMsRUFDRCxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQ3hCLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUNsQyxDQUFDLENBQW1CLEVBQUUsRUFBRTtRQUN0QixJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDbkIsU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQztJQUNILENBQUMsRUFDRCxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQ3RCLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRztRQUNmLGFBQWEsRUFBRSxJQUFBLG9CQUFhLEVBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsZUFBZSxDQUFDO1FBQ3ZFLEtBQUssRUFBRSxFQUFFO1FBQ1QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBQ2hFLE1BQU07S0FDUCxDQUFDO0lBRUYsT0FBTyxDQUNMLGlDQUFLLFNBQVMsRUFBRSxjQUFjLEVBQUUsaUJBQWUsRUFBRSxhQUMvQyx1QkFBQyxvQkFBZSxjQUNkLHdCQUFDLFlBQU8sSUFDTixJQUFJLEVBQUUsYUFBYSxFQUNuQixZQUFZLEVBQUUsZ0JBQWdCLGFBRzlCLHdCQUFDLGdCQUFXLGVBQ1YsdUJBQUMsbUJBQWMsSUFBQyxPQUFPLGtCQUNyQix3QkFBQyx1QkFBa0IsSUFDakIsWUFBWSxFQUFFLGdCQUFnQixFQUM5QixVQUFVLEVBQUUsZ0JBQWdCLEVBQzVCLEVBQUUsRUFBRSxJQUFBLHFCQUFXLEVBQUMsUUFBUSxDQUFDLEVBQ3pCLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFOzRDQUNuQixJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztnREFDeEIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7NENBQzdCLENBQUM7d0NBQ0gsQ0FBQyxFQUNELFNBQVMsRUFBRSxJQUFBLG9CQUFVLEVBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsYUFFM0MsRUFBRSxLQUFLLHFCQUFjLENBQUMsQ0FBQyxDQUFDLHVCQUFDLG1DQUFlLElBQUMsSUFBSSxFQUFFLDZCQUFNLEdBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUN2RSxlQUFlLEVBQUUsSUFDQyxHQUNOLEVBQ2pCLHVCQUFDLHVCQUFrQixjQUFFLHFCQUFxQixFQUFFLEdBQXNCLElBQ3RELEVBQ2QsdUJBQUMsbUJBQWMsSUFDYixJQUFJLEVBQUMsS0FBSyxFQUNWLEtBQUssRUFBQyxPQUFPLEVBQ2IsU0FBUyxFQUFDLGdCQUFnQixFQUMxQixZQUFZLEVBQUUsdUJBQXVCLEVBQ3JDLFlBQVksRUFBRSx1QkFBdUIsWUFFckMsdUJBQUMscUNBQWlCLElBQ2hCLFdBQVcsRUFBRSxXQUFXLEVBQ3hCLFNBQVMsRUFDUCxNQUFNO29DQUNKLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTzt3Q0FDaEIsQ0FBQyxDQUFDLGFBQWE7d0NBQ2YsQ0FBQyxDQUFDLFlBQVk7b0NBQ2hCLENBQUMsQ0FBQyxJQUFJLEVBRVYsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQzlCLE9BQU8sRUFBRSxPQUFPLEVBQ2hCLFlBQVksRUFBRSxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQy9ELFNBQVMsRUFBRSxhQUFhLEVBQ3hCLFNBQVMsRUFBRSxhQUFhLEVBQ3hCLFVBQVUsRUFBRSxVQUFVLEVBQ3RCLGNBQWMsRUFBRSxjQUFjLEdBQzlCLEdBQ2EsS0E3Q1osV0FBVyxZQUFZLElBQUksRUFBRSxJQUFJLElBQUksRUFBRSxDQThDcEMsR0FDTSxFQUNsQixnQ0FDRSxTQUFTLEVBQUUsSUFBQSxvQkFBVSxFQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRTtvQkFDaEQsT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsUUFBUTtvQkFDUixJQUFJO2lCQUNMLENBQUMsRUFDRixFQUFFLEVBQUUsSUFBQSwyQkFBaUIsRUFBQyxRQUFRLENBQUMsRUFDL0IsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMscURBQXFEO3dCQUMxRSxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDM0IsQ0FBQztnQkFDSCxDQUFDLEVBQ0QsU0FBUyxFQUFFLFVBQVUsRUFDckIsT0FBTyxFQUFFLGdCQUFnQixZQUV6QixnQ0FBSyxTQUFTLEVBQUUsSUFBQSxvQkFBVSxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUksR0FDOUQsSUFDRixDQUNQLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyJ9