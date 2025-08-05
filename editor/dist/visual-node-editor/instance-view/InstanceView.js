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
exports.InstanceIcon = exports.InstanceView = exports.getVisibleOutputs = exports.getVisibleInputs = exports.MAX_INSTANCE_WIDTH = exports.MIN_WIDTH_PER_PIN = exports.PIECE_CHAR_WIDTH = exports.PIECE_HORIZONTAL_PADDING = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const core_1 = require("@flyde/core");
const classnames_1 = __importDefault(require("classnames"));
const PinView_1 = require("../pin-view/PinView");
const core_2 = require("@flyde/core");
const core_3 = require("@flyde/core");
const utils_1 = require("./utils");
const base_node_view_1 = require("../base-node-view");
const dom_ids_1 = require("../dom-ids");
const VisualNodeEditor_1 = require("../VisualNodeEditor");
const __1 = require("../..");
const ui_1 = require("../../ui");
const ui_2 = require("../../ui");
const DarkModeContext_1 = require("../../flow-editor/DarkModeContext");
const VisualNodeEditorContext_1 = require("../VisualNodeEditorContext");
const helpers_1 = require("../pin-view/helpers");
exports.PIECE_HORIZONTAL_PADDING = 25;
exports.PIECE_CHAR_WIDTH = 11;
exports.MIN_WIDTH_PER_PIN = 40;
exports.MAX_INSTANCE_WIDTH = 400; // to change in CSS as well
const getVisibleInputs = (instance, node, connections) => {
    const { visibleInputs } = instance;
    if (visibleInputs) {
        return visibleInputs;
    }
    const visiblePins = (0, core_1.keys)((0, core_3.getNodeInputs)(node)).filter((k, v) => {
        var _a;
        const isConnected = connections.some((c) => c.to.insId === instance.id && c.to.pinId === k);
        const isOptional = node.inputs[k] && ((_a = node.inputs[k]) === null || _a === void 0 ? void 0 : _a.mode) === "optional";
        return isConnected || (!isOptional && k !== core_2.TRIGGER_PIN_ID);
    });
    if (visiblePins.length === 0 && !node.isTrigger) {
        return [core_2.TRIGGER_PIN_ID];
    }
    return visiblePins;
};
exports.getVisibleInputs = getVisibleInputs;
const getVisibleOutputs = (instance, node, connections) => {
    const { visibleOutputs } = instance;
    if (visibleOutputs) {
        return visibleOutputs;
    }
    const keys = Object.keys(node.outputs);
    if (connections.some((c) => c.from.insId === instance.id && c.from.pinId === core_2.ERROR_PIN_ID)) {
        return [...keys, core_2.ERROR_PIN_ID];
    }
    else {
        return keys;
    }
};
exports.getVisibleOutputs = getVisibleOutputs;
const InstanceView = function InstanceViewInner(props) {
    const { selected, selectedInput, selectedOutput, closestPin, dragged, onTogglePinLog, onTogglePinBreakpoint, displayMode, connections, instance, viewPort, onPinClick, onPinDblClick, onDragStart, onDragEnd, onDragMove, onToggleSticky, onSelect, onDblClick: onDoubleClick, onChangeVisibleInputs, onChangeVisibleOutputs, inlineGroupProps, onUngroup, onGroupSelected, isConnectedInstanceSelected, onDeleteInstance, onSetDisplayName, onPinMouseUp, onPinMouseDown, onViewForkCode, } = props;
    const dark = (0, DarkModeContext_1.useDarkMode)();
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
    const _prompt = (0, __1.usePrompt)();
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
    const is = (0, core_1.entries)(node.inputs);
    const { visibleInputs, visibleOutputs } = instance;
    if (visibleInputs) {
        is.sort((a, b) => visibleInputs.indexOf(a[0]) - visibleInputs.indexOf(b[0]));
    }
    const os = (0, core_1.entries)(node.outputs);
    if (visibleOutputs) {
        os.sort((a, b) => visibleOutputs.indexOf(a[0]) - visibleOutputs.indexOf(b[0]));
    }
    const _visibleInputs = (0, exports.getVisibleInputs)(instance, node, connections);
    const _visibleOutputs = (0, exports.getVisibleOutputs)(instance, node, connections);
    is.push([
        core_2.TRIGGER_PIN_ID,
        {
            ...(0, core_1.nodeInput)(),
            description: "Controls when this node executes. When connected, node runs only when triggered. Otherwise, automatically runs when required inputs receive data or when flow starts if no inputs exist. Can be exposed via right-click menu",
        },
    ]);
    os.push([
        core_2.ERROR_PIN_ID,
        {
            ...(0, core_2.nodeOutput)(),
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
            (k === core_2.ERROR_PIN_ID && props.hadError));
    });
    const isErrorCaught = connections.some((conn) => conn.from.insId === id && conn.from.pinId === core_2.ERROR_PIN_ID);
    const cm = (0, classnames_1.default)("ins-view", {
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
    const optionalInputs = new Set((0, core_1.entries)(node.inputs)
        .filter(([_, v]) => (0, core_2.isInputPinOptional)(v))
        .map(core_1.pickFirst));
    const stickyInputs = (0, core_1.entries)(instance.inputConfig).reduce((p, [k, v]) => {
        if ((0, core_2.isStickyInputPinConfig)(v) || v.sticky) {
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
        const baseContent = (0, utils_1.calcNodeContent)(instance, node);
        return props.diffStatus
            ? `${baseContent} (${props.diffStatus})`
            : baseContent;
    }, [instance, node, props.diffStatus]);
    const _onChangeVisibleInputs = React.useCallback(async () => {
        const inputs = (0, core_1.keys)(node.inputs);
        const res = await _prompt("New order?", (instance.visibleInputs || inputs).join(","));
        if (res) {
            onChangeVisibleInputs(instance, res.split(","));
        }
    }, [node.inputs, _prompt, instance, onChangeVisibleInputs]);
    const _onChangeVisibleOutputs = React.useCallback(async () => {
        const outputs = (0, core_1.keys)(node.outputs);
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
    const inputKeys = Object.keys((0, core_3.getNodeInputs)(node));
    const outputKeys = Object.keys((0, core_1.getNodeOutputs)(node));
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
        if ((0, core_1.isCodeNodeInstance)(instance)) {
            onDoubleClick(instance, false);
        }
    }, [instance, onDoubleClick]);
    const getContextMenu = React.useCallback(() => {
        const inputMenuItems = inputKeys
            .filter(k => k !== core_2.TRIGGER_PIN_ID)
            .map((k) => {
            const isVisible = _visibleInputs.includes(k);
            const isConnectedAndNotHidden = connectedInputs.has(k) && connectedInputs.get(k) !== true;
            const pinName = (0, helpers_1.getInputName)(k);
            return ((0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { disabled: isConnectedAndNotHidden && isVisible, onClick: () => onChangeVisibleInputs(instance, isVisible
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
            const pinName = (0, helpers_1.getOutputName)(k);
            return ((0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { disabled: isConnected && isVisible, onClick: () => onChangeVisibleOutputs(instance, isVisible
                    ? _visibleOutputs.filter((i) => i !== k)
                    : [..._visibleOutputs, k]), children: isVisible
                    ? isConnected
                        ? `Hide output "${pinName}" (disconnect first)`
                        : `Hide "${pinName}"`
                    : `Show "${pinName}"` }, k));
        });
        // Check if trigger pin is visible
        const isTriggerVisible = _visibleInputs.includes(core_2.TRIGGER_PIN_ID);
        const triggerMenuItem = ((0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: () => onChangeVisibleInputs(instance, isTriggerVisible
                ? _visibleInputs.filter((i) => i !== core_2.TRIGGER_PIN_ID)
                : [..._visibleInputs, core_2.TRIGGER_PIN_ID]), children: isTriggerVisible ? "Hide trigger input" : "Show trigger input" }, "trigger"));
        const isTrigger = (0, core_1.isCodeNode)(node) && node.isTrigger;
        return ((0, jsx_runtime_1.jsxs)(ui_1.ContextMenuContent, { children: [(0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: _onSetDisplayName, children: "Rename" }), (0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: onOptionsClick, children: "Options" }), isTrigger ? null : (0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: () => onViewForkCode(instance), children: "View/fork code" }), isTrigger ? null : ((0, jsx_runtime_1.jsxs)(ui_1.ContextMenuSub, { children: [(0, jsx_runtime_1.jsx)(ui_1.ContextMenuSubTrigger, { children: "Edit inputs" }), (0, jsx_runtime_1.jsxs)(ui_1.ContextMenuSubContent, { children: [(0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: _onChangeVisibleInputs, children: "Reorder inputs" }), inputMenuItems, triggerMenuItem] })] })), (0, jsx_runtime_1.jsxs)(ui_1.ContextMenuSub, { children: [(0, jsx_runtime_1.jsx)(ui_1.ContextMenuSubTrigger, { children: "Edit outputs" }), (0, jsx_runtime_1.jsxs)(ui_1.ContextMenuSubContent, { children: [(0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: _onChangeVisibleOutputs, children: "Reorder outputs" }), outputMenuItems] })] }), (0, core_1.isInlineVisualNodeInstance)(instance) && ((0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: () => onUngroup(instance), children: "Ungroup inline node" })), (0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: onGroupSelected, children: "Group selected instances" }), (0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { className: "text-red-500", onClick: _onDeleteInstance, children: "Delete instance" })] }));
    }, [inputKeys, outputKeys, _visibleInputs, node, _onSetDisplayName, onOptionsClick, _onChangeVisibleInputs, _onChangeVisibleOutputs, instance, onGroupSelected, _onDeleteInstance, connectedInputs, onChangeVisibleInputs, _visibleOutputs, connectedOutputs, onChangeVisibleOutputs, onUngroup, onViewForkCode]);
    const instanceDomId = (0, dom_ids_1.getInstanceDomId)(instance.id, props.ancestorsInsIds);
    const maybeRenderInlineGroupEditor = () => {
        if (inlineGroupProps) {
            return ((0, jsx_runtime_1.jsx)(ui_2.Dialog, { open: true, onOpenChange: () => props.onCloseInlineEditor(), children: (0, jsx_runtime_1.jsxs)(ui_2.DialogContent, { className: "inline-group-editor-container no-drag w-[85vw] max-w-[95vw] h-[85vh] max-h-[95vh] flex flex-col overflow-hidden p-0", children: [(0, jsx_runtime_1.jsx)(ui_2.DialogHeader, { className: "border-b py-3 px-6", children: (0, jsx_runtime_1.jsx)(ui_2.DialogTitle, { className: "font-medium", children: `Editing inline node ${content}` }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 flex overflow-auto", tabIndex: 0, children: (0, jsx_runtime_1.jsx)(VisualNodeEditorContext_1.VisualNodeEditorProvider, { boardData: inlineGroupProps.boardData, onChangeBoardData: inlineGroupProps.onChangeBoardData, node: inlineGroupProps.node, onChangeNode: inlineGroupProps.onChangeNode, children: (0, jsx_runtime_1.jsx)(VisualNodeEditor_1.VisualNodeEditor, { ...props.inlineGroupProps, className: "no-drag flex-1 w-full h-full", ref: inlineEditorRef }) }) })] }) }));
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
        return ((0, jsx_runtime_1.jsx)("div", { className: "inputs", children: inputsToRender.map(([k, v]) => {
                var _a, _b;
                return ((0, jsx_runtime_1.jsx)("div", { className: "pin-container inputs", children: (0, jsx_runtime_1.jsx)(PinView_1.PinView, { type: "input", currentInsId: instance.id, ancestorsInsIds: props.ancestorsInsIds, id: k, optional: optionalInputs.has(k), connected: connectedInputs.has(k), isSticky: (_a = stickyInputs[k]) !== null && _a !== void 0 ? _a : false, increasedDropArea: props.increasedPinDropArea, 
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
        return ((0, jsx_runtime_1.jsx)("div", { className: "outputs", children: outputsToRender.map(([k, v]) => ((0, jsx_runtime_1.jsx)("div", { className: "pin-container outputs", children: (0, jsx_runtime_1.jsx)(PinView_1.PinView, { currentInsId: instance.id, ancestorsInsIds: props.ancestorsInsIds, connected: connectedOutputs.has(k), increasedDropArea: props.increasedPinDropArea, type: "output", id: k, 
                    // minimized={selected ? false : outputsToRender.length === 1}
                    isClosestToMouse: !!closestPin &&
                        closestPin.type === "output" &&
                        closestPin.pin === k, selected: k === selectedOutput, onClick: onOutputClick, onDoubleClick: onOutputDblClick, onToggleLogged: onTogglePinLog, onToggleBreakpoint: onTogglePinBreakpoint, onInspect: props.onInspectPin, description: v.description, onMouseUp: _onPinMouseUp, onMouseDown: _onPinMouseDown, isMain: false }) }, k))) }));
    };
    if (!node) {
        return "LOADING";
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: cm, "data-node-id": nodeIdForDomDataAttr, "data-instance-id": instance.id, children: [(0, jsx_runtime_1.jsx)(base_node_view_1.BaseNodeView, { pos: instance.pos, viewPort: viewPort, onDragStart: _onDragStart, onDragMove: _onDragMove, onDragEnd: _onDragEnd, displayMode: displayMode, domId: instanceDomId, heading: content, description: node.description, icon: node.icon, leftSide: renderInputs(), rightSide: renderOutputs(), selected: selected, dark: dark, contextMenuContent: getContextMenu(), onClick: _onSelect, overrideNodeBodyHtml: node.overrideNodeBodyHtml, overrideStyle: style.cssOverride, onDoubleClick: onDblClick, size: nodeSize, diffStatus: props.diffStatus }), maybeRenderInlineGroupEditor()] }));
};
exports.InstanceView = InstanceView;
const InstanceIcon = function InstanceIcon({ icon, className }) {
    if (!icon) {
        return (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: "code", size: "lg" });
    }
    if (typeof icon === "string" && icon.trim().startsWith("<")) {
        return ((0, jsx_runtime_1.jsx)("span", { className: (0, classnames_1.default)("svg-icon-container", className), dangerouslySetInnerHTML: { __html: icon } }));
    }
    else {
        return ((0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: icon, size: "lg", className: className }));
    }
};
exports.InstanceIcon = InstanceIcon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5zdGFuY2VWaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9pbnN0YW5jZS12aWV3L0luc3RhbmNlVmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQjtBQUMvQixzRUFBaUU7QUFDakUsc0NBZXFCO0FBQ3JCLDREQUFvQztBQUdwQyxpREFBOEM7QUFDOUMsc0NBUXFCO0FBQ3JCLHNDQUFtRTtBQUNuRSxtQ0FBMEM7QUFDMUMsc0RBQWlEO0FBRWpELHdDQUE4QztBQUM5QywwREFJNkI7QUFDN0IsNkJBQWtDO0FBRWxDLGlDQU1rQjtBQUVsQixpQ0FBNEU7QUFFNUUsdUVBQWdFO0FBQ2hFLHdFQUdvQztBQUNwQyxpREFBa0U7QUFFckQsUUFBQSx3QkFBd0IsR0FBRyxFQUFFLENBQUM7QUFDOUIsUUFBQSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFDdEIsUUFBQSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7QUFDdkIsUUFBQSxrQkFBa0IsR0FBRyxHQUFHLENBQUMsQ0FBQywyQkFBMkI7QUFFM0QsTUFBTSxnQkFBZ0IsR0FBRyxDQUM5QixRQUFzQixFQUN0QixJQUF3QixFQUN4QixXQUE2QixFQUNuQixFQUFFO0lBQ1osTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLFFBQVEsQ0FBQztJQUVuQyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ2xCLE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFBLFdBQUksRUFBQyxJQUFBLG9CQUFhLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O1FBQzVELE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQ2xDLENBQUMsQ0FBQyxFQUFFLEVBQUUs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