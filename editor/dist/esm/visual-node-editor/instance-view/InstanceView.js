import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isInlineVisualNodeInstance, entries, pickFirst, keys, nodeInput, getNodeOutputs, isCodeNodeInstance, isCodeNode, } from "@flyde/core";
import classNames from "classnames";
import { PinView } from "../pin-view/PinView";
import { isStickyInputPinConfig, ERROR_PIN_ID, TRIGGER_PIN_ID, nodeOutput, isInputPinOptional, } from "@flyde/core";
import { getNodeInputs } from "@flyde/core";
import { calcNodeContent } from "./utils";
import { BaseNodeView } from "../base-node-view";
import { getInstanceDomId } from "../dom-ids";
import { VisualNodeEditor, } from "../VisualNodeEditor";
import { usePrompt } from "../..";
import { ContextMenuContent, ContextMenuItem, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, } from "../../ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui";
import { useDarkMode } from "../../flow-editor/DarkModeContext";
import { VisualNodeEditorProvider, } from "../VisualNodeEditorContext";
import { getInputName, getOutputName } from "../pin-view/helpers";
export const PIECE_HORIZONTAL_PADDING = 25;
export const PIECE_CHAR_WIDTH = 11;
export const MIN_WIDTH_PER_PIN = 40;
export const MAX_INSTANCE_WIDTH = 400; // to change in CSS as well
export const getVisibleInputs = (instance, node, connections) => {
    const { visibleInputs } = instance;
    if (visibleInputs) {
        return visibleInputs;
    }
    const visiblePins = keys(getNodeInputs(node)).filter((k, v) => {
        var _a;
        const isConnected = connections.some((c) => c.to.insId === instance.id && c.to.pinId === k);
        const isOptional = node.inputs[k] && ((_a = node.inputs[k]) === null || _a === void 0 ? void 0 : _a.mode) === "optional";
        return isConnected || (!isOptional && k !== TRIGGER_PIN_ID);
    });
    if (visiblePins.length === 0 && !node.isTrigger) {
        return [TRIGGER_PIN_ID];
    }
    return visiblePins;
};
export const getVisibleOutputs = (instance, node, connections) => {
    const { visibleOutputs } = instance;
    if (visibleOutputs) {
        return visibleOutputs;
    }
    const keys = Object.keys(node.outputs);
    if (connections.some((c) => c.from.insId === instance.id && c.from.pinId === ERROR_PIN_ID)) {
        return [...keys, ERROR_PIN_ID];
    }
    else {
        return keys;
    }
};
export const InstanceView = function InstanceViewInner(props) {
    const { selected, selectedInput, selectedOutput, closestPin, dragged, onTogglePinLog, onTogglePinBreakpoint, displayMode, connections, instance, viewPort, onPinClick, onPinDblClick, onDragStart, onDragEnd, onDragMove, onToggleSticky, onSelect, onDblClick: onDoubleClick, onChangeVisibleInputs, onChangeVisibleOutputs, inlineGroupProps, onUngroup, onGroupSelected, isConnectedInstanceSelected, onDeleteInstance, onSetDisplayName, onPinMouseUp, onPinMouseDown, onViewForkCode, } = props;
    const dark = useDarkMode();
    const { id } = instance;
    const inlineEditorRef = React.useRef();
    const node = instance.node;
    const style = React.useMemo(() => {
        var _a, _b, _c, _d;
        return {
            color: (_a = node === null || node === void 0 ? void 0 : node.defaultStyle) === null || _a === void 0 ? void 0 : _a.color,
            size: (_c = (_b = node === null || node === void 0 ? void 0 : node.defaultStyle) === null || _b === void 0 ? void 0 : _b.color) !== null && _c !== void 0 ? _c : "regular",
            cssOverride: (_d = node === null || node === void 0 ? void 0 : node.defaultStyle) === null || _d === void 0 ? void 0 : _d.cssOverride,
        };
    }, [node]);
    const connectedInputs = React.useMemo(() => {
        return new Map(connections
            .filter(({ to }) => to.insId === id)
            .map(({ to, hidden }) => [to.pinId, hidden]));
    }, [connections, id]);
    const connectedOutputs = React.useMemo(() => {
        return new Map(connections
            .filter(({ from }) => from.insId === id)
            .map(({ from, hidden }) => [from.pinId, hidden]));
    }, [connections, id]);
    const _prompt = usePrompt();
    const onInputClick = React.useCallback((pin) => onPinClick(instance, pin, "input"), [instance, onPinClick]);
    const onInputDblClick = React.useCallback((pin, e) => onPinDblClick(instance, pin, "input", e), [instance, onPinDblClick]);
    const onOutputDblClick = React.useCallback((pin, e) => onPinDblClick(instance, pin, "output", e), [instance, onPinDblClick]);
    const onOutputClick = React.useCallback((pin) => onPinClick(instance, pin, "output"), [instance, onPinClick]);
    const _onDragStart = React.useCallback((event, data) => {
        onDragStart(instance, event, data);
    }, [instance, onDragStart]);
    const _onSelect = React.useCallback((e) => onSelect(instance, e), [instance, onSelect]);
    const _onDragEnd = React.useCallback((event, data) => {
        const currPos = instance.pos;
        const dx = (data.x - currPos.x) / viewPort.zoom;
        const dy = (data.y - currPos.y) / viewPort.zoom;
        const newX = currPos.x + dx;
        const newY = currPos.y + dy;
        onDragEnd(instance, event, { ...data, x: newX, y: newY });
    }, [instance, onDragEnd, viewPort.zoom]);
    const _onDragMove = React.useCallback((event, data) => {
        onDragMove(instance, event, { x: data.x, y: data.y });
    }, [instance, onDragMove]);
    const _onToggleSticky = React.useCallback((pinId) => onToggleSticky(instance, pinId), [instance, onToggleSticky]);
    const onDblClick = React.useCallback((e) => onDoubleClick(instance, e.shiftKey), [instance, onDoubleClick]);
    const is = entries(node.inputs);
    const { visibleInputs, visibleOutputs } = instance;
    if (visibleInputs) {
        is.sort((a, b) => visibleInputs.indexOf(a[0]) - visibleInputs.indexOf(b[0]));
    }
    const os = entries(node.outputs);
    if (visibleOutputs) {
        os.sort((a, b) => visibleOutputs.indexOf(a[0]) - visibleOutputs.indexOf(b[0]));
    }
    const _visibleInputs = getVisibleInputs(instance, node, connections);
    const _visibleOutputs = getVisibleOutputs(instance, node, connections);
    is.push([
        TRIGGER_PIN_ID,
        {
            ...nodeInput(),
            description: "Controls when this node executes. When connected, node runs only when triggered. Otherwise, automatically runs when required inputs receive data or when flow starts if no inputs exist. Can be exposed via right-click menu",
        },
    ]);
    os.push([
        ERROR_PIN_ID,
        {
            ...nodeOutput(),
            description: "Use this pin to catch errors that happen inside this node. If not connected, errors will bubble up to the parent node.",
        },
    ]);
    const inputsToRender = is.filter(([k]) => {
        return (_visibleInputs.includes(k) ||
            ((selected || isConnectedInstanceSelected) && connectedInputs.has(k)));
    });
    const outputsToRender = os.filter(([k]) => {
        return (_visibleOutputs.includes(k) ||
            ((selected || isConnectedInstanceSelected) &&
                connectedOutputs.has(k)) ||
            (k === ERROR_PIN_ID && props.hadError));
    });
    const isErrorCaught = connections.some((conn) => conn.from.insId === id && conn.from.pinId === ERROR_PIN_ID);
    const cm = classNames("ins-view", {
        "no-inputs": inputsToRender.length === 0,
        "no-outputs": outputsToRender.length === 0,
        "display-mode": displayMode,
        "force-minimized-input": props.forceShowMinimized === "input" ||
            props.forceShowMinimized === "both",
        "force-minimized-output": props.forceShowMinimized === "output" ||
            props.forceShowMinimized === "both",
        "inline-node-edited": !!inlineGroupProps,
        "error-caught": isErrorCaught,
        selected,
        dragged,
        closest: closestPin && closestPin.ins.id === instance.id,
        "ring-2 ring-green-500/20 bg-green-50/10 dark:bg-green-950/10": props.diffStatus === "added",
        "ring-2 ring-red-500/20 bg-red-50/10 dark:bg-red-950/10": props.diffStatus === "removed",
        "ring-2 ring-blue-500/20 bg-blue-50/10 dark:bg-blue-950/10": props.diffStatus === "changed",
    });
    const optionalInputs = new Set(entries(node.inputs)
        .filter(([_, v]) => isInputPinOptional(v))
        .map(pickFirst));
    const stickyInputs = entries(instance.inputConfig).reduce((p, [k, v]) => {
        if (isStickyInputPinConfig(v) || v.sticky) {
            return { ...p, [k]: true };
        }
        return p;
    }, {});
    try {
        // customView =
        //   node.customView &&
        //   node.customView(instance, connectionsPerInput, connectionsPerOutput);
    }
    catch (e) {
        console.error(`Error rendering custom view for node ${node.id}`);
    }
    const content = React.useMemo(() => {
        const baseContent = calcNodeContent(instance, node);
        return props.diffStatus
            ? `${baseContent} (${props.diffStatus})`
            : baseContent;
    }, [instance, node, props.diffStatus]);
    const _onChangeVisibleInputs = React.useCallback(async () => {
        const inputs = keys(node.inputs);
        const res = await _prompt("New order?", (instance.visibleInputs || inputs).join(","));
        if (res) {
            onChangeVisibleInputs(instance, res.split(","));
        }
    }, [node.inputs, _prompt, instance, onChangeVisibleInputs]);
    const _onChangeVisibleOutputs = React.useCallback(async () => {
        const outputs = keys(node.outputs);
        const res = await _prompt("New order?", (instance.visibleOutputs || outputs).join(","));
        if (res) {
            onChangeVisibleOutputs(instance, res.split(","));
        }
    }, [node.outputs, _prompt, instance, onChangeVisibleOutputs]);
    const _onDeleteInstance = React.useCallback(() => {
        onDeleteInstance(instance);
    }, [onDeleteInstance, instance]);
    const _onSetDisplayName = React.useCallback(async () => {
        var _a;
        const name = await _prompt(`Set custom display name`, node.displayName || node.id);
        onSetDisplayName(instance, (_a = name !== null && name !== void 0 ? name : node.displayName) !== null && _a !== void 0 ? _a : node.id);
    }, [_prompt, node.displayName, node.id, onSetDisplayName, instance]);
    const inputKeys = Object.keys(getNodeInputs(node));
    const outputKeys = Object.keys(getNodeOutputs(node));
    const _onPinMouseUp = React.useCallback((pinId, pinType) => {
        if (onPinMouseUp) {
            onPinMouseUp(instance, pinId, pinType);
        }
    }, [instance, onPinMouseUp]);
    const _onPinMouseDown = React.useCallback((pinId, pinType) => {
        if (onPinMouseDown) {
            onPinMouseDown(instance, pinId, pinType);
        }
    }, [instance, onPinMouseDown]);
    const onOptionsClick = React.useCallback(() => {
        if (isCodeNodeInstance(instance)) {
            onDoubleClick(instance, false);
        }
    }, [instance, onDoubleClick]);
    const getContextMenu = React.useCallback(() => {
        const inputMenuItems = inputKeys
            .filter(k => k !== TRIGGER_PIN_ID)
            .map((k) => {
            const isVisible = _visibleInputs.includes(k);
            const isConnectedAndNotHidden = connectedInputs.has(k) && connectedInputs.get(k) !== true;
            const pinName = getInputName(k);
            return (_jsx(ContextMenuItem, { disabled: isConnectedAndNotHidden && isVisible, onClick: () => onChangeVisibleInputs(instance, isVisible
                    ? _visibleInputs.filter((i) => i !== k)
                    : [..._visibleInputs, k]), children: isVisible
                    ? isConnectedAndNotHidden
                        ? `Hide "${pinName}" (disconnect first)`
                        : `Hide "${pinName}"`
                    : `Show "${pinName}"` }, k));
        });
        const outputMenuItems = outputKeys.map((k) => {
            const isVisible = _visibleOutputs.includes(k);
            const isConnected = connectedOutputs.has(k);
            const pinName = getOutputName(k);
            return (_jsx(ContextMenuItem, { disabled: isConnected && isVisible, onClick: () => onChangeVisibleOutputs(instance, isVisible
                    ? _visibleOutputs.filter((i) => i !== k)
                    : [..._visibleOutputs, k]), children: isVisible
                    ? isConnected
                        ? `Hide output "${pinName}" (disconnect first)`
                        : `Hide "${pinName}"`
                    : `Show "${pinName}"` }, k));
        });
        // Check if trigger pin is visible
        const isTriggerVisible = _visibleInputs.includes(TRIGGER_PIN_ID);
        const triggerMenuItem = (_jsx(ContextMenuItem, { onClick: () => onChangeVisibleInputs(instance, isTriggerVisible
                ? _visibleInputs.filter((i) => i !== TRIGGER_PIN_ID)
                : [..._visibleInputs, TRIGGER_PIN_ID]), children: isTriggerVisible ? "Hide trigger input" : "Show trigger input" }, "trigger"));
        const isTrigger = isCodeNode(node) && node.isTrigger;
        return (_jsxs(ContextMenuContent, { children: [_jsx(ContextMenuItem, { onClick: _onSetDisplayName, children: "Rename" }), _jsx(ContextMenuItem, { onClick: onOptionsClick, children: "Options" }), isTrigger ? null : _jsx(ContextMenuItem, { onClick: () => onViewForkCode(instance), children: "View/fork code" }), isTrigger ? null : (_jsxs(ContextMenuSub, { children: [_jsx(ContextMenuSubTrigger, { children: "Edit inputs" }), _jsxs(ContextMenuSubContent, { children: [_jsx(ContextMenuItem, { onClick: _onChangeVisibleInputs, children: "Reorder inputs" }), inputMenuItems, triggerMenuItem] })] })), _jsxs(ContextMenuSub, { children: [_jsx(ContextMenuSubTrigger, { children: "Edit outputs" }), _jsxs(ContextMenuSubContent, { children: [_jsx(ContextMenuItem, { onClick: _onChangeVisibleOutputs, children: "Reorder outputs" }), outputMenuItems] })] }), isInlineVisualNodeInstance(instance) && (_jsx(ContextMenuItem, { onClick: () => onUngroup(instance), children: "Ungroup inline node" })), _jsx(ContextMenuItem, { onClick: onGroupSelected, children: "Group selected instances" }), _jsx(ContextMenuItem, { className: "text-red-500", onClick: _onDeleteInstance, children: "Delete instance" })] }));
    }, [inputKeys, outputKeys, _visibleInputs, node, _onSetDisplayName, onOptionsClick, _onChangeVisibleInputs, _onChangeVisibleOutputs, instance, onGroupSelected, _onDeleteInstance, connectedInputs, onChangeVisibleInputs, _visibleOutputs, connectedOutputs, onChangeVisibleOutputs, onUngroup, onViewForkCode]);
    const instanceDomId = getInstanceDomId(instance.id, props.ancestorsInsIds);
    const maybeRenderInlineGroupEditor = () => {
        if (inlineGroupProps) {
            return (_jsx(Dialog, { open: true, onOpenChange: () => props.onCloseInlineEditor(), children: _jsxs(DialogContent, { className: "inline-group-editor-container no-drag w-[85vw] max-w-[95vw] h-[85vh] max-h-[95vh] flex flex-col overflow-hidden p-0", children: [_jsx(DialogHeader, { className: "border-b py-3 px-6", children: _jsx(DialogTitle, { className: "font-medium", children: `Editing inline node ${content}` }) }), _jsx("div", { className: "flex-1 flex overflow-auto", tabIndex: 0, children: _jsx(VisualNodeEditorProvider, { boardData: inlineGroupProps.boardData, onChangeBoardData: inlineGroupProps.onChangeBoardData, node: inlineGroupProps.node, onChangeNode: inlineGroupProps.onChangeNode, children: _jsx(VisualNodeEditor, { ...props.inlineGroupProps, className: "no-drag flex-1 w-full h-full", ref: inlineEditorRef }) }) })] }) }));
        }
        else {
            return null;
        }
    };
    const nodeIdForDomDataAttr = instance.nodeId;
    const nodeSize = React.useMemo(() => {
        const hasLongDisplayName = (content === null || content === void 0 ? void 0 : content.length) > 20;
        const longestInput = Math.max(...inputsToRender.map(([k]) => k.length));
        const longestOutput = Math.max(...outputsToRender.map(([k]) => k.length));
        const hasLongPin = longestInput > 7 || longestOutput > 7;
        return hasLongDisplayName || hasLongPin ? "wide" : "normal";
    }, [content, inputsToRender, outputsToRender]);
    const renderInputs = () => {
        if (!inputsToRender.length) {
            return null;
        }
        return (_jsx("div", { className: "inputs", children: inputsToRender.map(([k, v]) => {
                var _a, _b;
                return (_jsx("div", { className: "pin-container inputs", children: _jsx(PinView, { type: "input", currentInsId: instance.id, ancestorsInsIds: props.ancestorsInsIds, id: k, optional: optionalInputs.has(k), connected: connectedInputs.has(k), isSticky: (_a = stickyInputs[k]) !== null && _a !== void 0 ? _a : false, increasedDropArea: props.increasedPinDropArea, 
                        // minimized={!selected}
                        onToggleSticky: _onToggleSticky, selected: k === selectedInput, onClick: onInputClick, onDoubleClick: onInputDblClick, isClosestToMouse: !!closestPin &&
                            closestPin.type === "input" &&
                            closestPin.pin === k, onToggleLogged: onTogglePinLog, onToggleBreakpoint: onTogglePinBreakpoint, onInspect: props.onInspectPin, description: v.description, queuedValues: (_b = props.queuedInputsData[k]) !== null && _b !== void 0 ? _b : 0, onMouseUp: _onPinMouseUp, onMouseDown: _onPinMouseDown, isMain: false }) }, k));
            }) }));
    };
    const renderOutputs = () => {
        if (!outputsToRender.length) {
            return null;
        }
        return (_jsx("div", { className: "outputs", children: outputsToRender.map(([k, v]) => (_jsx("div", { className: "pin-container outputs", children: _jsx(PinView, { currentInsId: instance.id, ancestorsInsIds: props.ancestorsInsIds, connected: connectedOutputs.has(k), increasedDropArea: props.increasedPinDropArea, type: "output", id: k, 
                    // minimized={selected ? false : outputsToRender.length === 1}
                    isClosestToMouse: !!closestPin &&
                        closestPin.type === "output" &&
                        closestPin.pin === k, selected: k === selectedOutput, onClick: onOutputClick, onDoubleClick: onOutputDblClick, onToggleLogged: onTogglePinLog, onToggleBreakpoint: onTogglePinBreakpoint, onInspect: props.onInspectPin, description: v.description, onMouseUp: _onPinMouseUp, onMouseDown: _onPinMouseDown, isMain: false }) }, k))) }));
    };
    if (!node) {
        return "LOADING";
    }
    return (_jsxs("div", { className: cm, "data-node-id": nodeIdForDomDataAttr, "data-instance-id": instance.id, children: [_jsx(BaseNodeView, { pos: instance.pos, viewPort: viewPort, onDragStart: _onDragStart, onDragMove: _onDragMove, onDragEnd: _onDragEnd, displayMode: displayMode, domId: instanceDomId, heading: content, description: node.description, icon: node.icon, leftSide: renderInputs(), rightSide: renderOutputs(), selected: selected, dark: dark, contextMenuContent: getContextMenu(), onClick: _onSelect, overrideNodeBodyHtml: node.overrideNodeBodyHtml, overrideStyle: style.cssOverride, onDoubleClick: onDblClick, size: nodeSize, diffStatus: props.diffStatus }), maybeRenderInlineGroupEditor()] }));
};
export const InstanceIcon = function InstanceIcon({ icon, className }) {
    if (!icon) {
        return _jsx(FontAwesomeIcon, { icon: "code", size: "lg" });
    }
    if (typeof icon === "string" && icon.trim().startsWith("<")) {
        return (_jsx("span", { className: classNames("svg-icon-container", className), dangerouslySetInnerHTML: { __html: icon } }));
    }
    else {
        return (_jsx(FontAwesomeIcon, { icon: icon, size: "lg", className: className }));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5zdGFuY2VWaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9pbnN0YW5jZS12aWV3L0luc3RhbmNlVmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQ0wsMEJBQTBCLEVBQzFCLE9BQU8sRUFDUCxTQUFTLEVBRVQsSUFBSSxFQUNKLFNBQVMsRUFFVCxjQUFjLEVBS2Qsa0JBQWtCLEVBQ2xCLFVBQVUsR0FDWCxNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFHcEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFHTCxzQkFBc0IsRUFDdEIsWUFBWSxFQUNaLGNBQWMsRUFDZCxVQUFVLEVBQ1Ysa0JBQWtCLEdBQ25CLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBeUIsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWpELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM5QyxPQUFPLEVBRUwsZ0JBQWdCLEdBRWpCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUVsQyxPQUFPLEVBQ0wsa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixjQUFjLEVBQ2QscUJBQXFCLEVBQ3JCLHFCQUFxQixHQUN0QixNQUFNLFVBQVUsQ0FBQztBQUVsQixPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZ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