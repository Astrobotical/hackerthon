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
exports.VisualNodeEditor = exports.defaultBoardData = exports.defaultViewPort = exports.NODE_HEIGHT = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const core_1 = require("@flyde/core");
const InstanceView_1 = require("./instance-view/InstanceView");
const ConnectionView_1 = require("./connection-view/ConnectionView");
const utils_1 = require("../utils");
const ui_1 = require("../ui");
const rooks_1 = require("rooks");
const utils_2 = require("./utils");
const OnboardingTips_1 = require("./OnboardingTips");
const immer_1 = require("immer");
const react_1 = require("react");
const use_hotkeys_1 = require("../lib/react-utils/use-hotkeys");
const component_size_1 = __importDefault(require("@rehooks/component-size"));
const node_io_view_1 = require("./node-io-view");
const physics_1 = require("../physics");
const layout_debugger_1 = require("./layout-debugger");
const preload_monaco_1 = require("../lib/preload-monaco");
// import { InstancePanel } from "./instance-panel";
const flyde_flow_change_type_1 = require("../flow-editor/flyde-flow-change-type");
const ports_1 = require("../flow-editor/ports");
const classnames_1 = __importDefault(require("classnames"));
const paste_instances_1 = require("./commands/paste-instances");
const HelpBubble_1 = require("./HelpBubble");
const DarkModeContext_1 = require("../flow-editor/DarkModeContext");
const InstanceConfigEditor_1 = require("./InstanceConfigEditor");
const SelectionIndicator_1 = require("./SelectionIndicator");
const RunFlowModal_1 = require("./RunFlowModal");
const EditorContextMenu_1 = require("./EditorContextMenu/EditorContextMenu");
const usePruneOrphanConnections_1 = require("./usePruneOrphanConnections");
const SelectionBox_1 = require("./SelectionBox/SelectionBox");
const useSelectionBox_1 = require("./useSelectionBox");
const useClosestPinAndMousePos_1 = require("./useClosestPinAndMousePos");
const VisualNodeEditorContext_1 = require("./VisualNodeEditorContext");
const useEditorCommands_1 = require("./useEditorCommands");
const CustomNodeModal_1 = require("./CustomNodeModal/CustomNodeModal");
const ui_2 = require("../ui");
const CommandMenu_1 = require("./CommandMenu/CommandMenu");
exports.NODE_HEIGHT = 28;
exports.defaultViewPort = {
    pos: { x: 0, y: 0 },
    zoom: 1,
};
exports.defaultBoardData = {
    selectedInstances: [],
    selectedConnections: [],
    viewPort: exports.defaultViewPort,
    lastMousePos: { x: 0, y: 0 },
};
exports.VisualNodeEditor = React.memo(React.forwardRef((props, thisRef) => {
    const { nodeIoEditable, onCopy, onInspectPin, currentInsId, ancestorsInsIds, queuedInputsData: queueInputsData, initialPadding, requireModifierForZoom, } = props;
    const { toast } = (0, ui_2.useToast)();
    const { node, onChangeNode: onChange, boardData, onChangeBoardData, } = (0, VisualNodeEditorContext_1.useVisualNodeEditorContext)();
    const darkMode = (0, DarkModeContext_1.useDarkMode)();
    const { onCreateCustomNode, resolveInstance } = (0, ports_1.usePorts)();
    const parentViewport = props.parentViewport || exports.defaultViewPort;
    const { selectedConnections, selectedInstances, from, to } = boardData;
    const { instances, connections, inputsPosition, outputsPosition, inputs, outputs, } = node;
    const [draggingId, setDraggingId] = (0, react_1.useState)();
    const isRootInstance = ancestorsInsIds === undefined;
    const [lastSelectedId, setLastSelectedId] = (0, react_1.useState)(); // to avoid it disappearing when doubling clicking to edit
    const [didCenterInitially, setDidCenterInitially] = (0, react_1.useState)(false);
    const [runModalVisible, setRunModalVisible] = (0, react_1.useState)(false);
    const [openInlineInstance, setOpenInlineInstance] = (0, react_1.useState)();
    const [editedNodeInstance, setEditedNodeInstance] = (0, react_1.useState)();
    const [isAddingCustomNode, setIsAddingCustomNode] = (0, react_1.useState)(false);
    const [customNodeForkData, setCustomNodeForkData] = (0, react_1.useState)();
    const inlineEditorPortalRootRef = (0, react_1.useRef)(null);
    (0, rooks_1.useDidMount)(() => {
        var _a, _b;
        inlineEditorPortalRootRef.current = (_b = (_a = boardRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(".inline-editor-portal-root")) !== null && _b !== void 0 ? _b : null;
    });
    const viewPort = boardData.viewPort;
    const isBoardInFocus = (0, react_1.useRef)(true);
    const [draggedConnection, setDraggedConnection] = (0, react_1.useState)(null);
    const setViewPort = React.useCallback((viewPort) => {
        onChangeBoardData({ viewPort });
    }, [onChangeBoardData]);
    const isLikelyTrackpad = React.useRef(false);
    const _onInspectPin = React.useCallback((insId, pin) => {
        return onInspectPin(insId, pin);
    }, [onInspectPin]);
    (0, react_1.useEffect)(() => {
        if (lastSelectedId) {
            const t = setTimeout(() => {
                setLastSelectedId(undefined);
            }, 350);
            return () => clearTimeout(t);
        }
    }, [lastSelectedId]);
    const boardRef = (0, react_1.useRef)(null);
    const vpSize = (0, component_size_1.default)(boardRef);
    const boardPos = (0, rooks_1.useBoundingclientrect)(boardRef) || physics_1.vZero;
    const { closestPin, lastMousePos, updateClosestPinAndMousePos } = (0, useClosestPinAndMousePos_1.useClosestPinAndMousePos)(node, currentInsId, ancestorsInsIds, viewPort, boardPos, parentViewport);
    (0, react_1.useEffect)(() => {
        (0, preload_monaco_1.preloadMonaco)();
    }, []);
    const { selectionBox, startSelectionBox, updateSelectionBox, endSelectionBox, } = (0, useSelectionBox_1.useSelectionBox)(node, boardData.viewPort, boardPos, parentViewport);
    const { onRenameIoPin, onChangeInputMode, onToggleSticky, onRemoveIoPin, onUnGroup, onNodeIoSetDescription, onChangeInstanceDisplayName, onChangeVisibleInputs, onChangeVisibleOutputs, onChangeInstanceStyle, onDeleteInstances, onAddNode, onSelectInstance, onDeleteInstance, onSelectConnection, onZoom, clearSelections, onConnectionClose, onGroupSelectedInternal, onNodeIoPinClick, onPinClick, } = (0, useEditorCommands_1.useEditorCommands)(lastMousePos, vpSize, isBoardInFocus);
    const fitToScreen = () => {
        const vp = (0, utils_2.fitViewPortToNode)(node, vpSize);
        (0, utils_2.animateViewPort)(viewPort, vp, 500, (vp) => {
            setViewPort(vp);
        });
    };
    (0, react_1.useEffect)(() => {
        if (!didCenterInitially && vpSize.width) {
            const vp = (0, utils_2.fitViewPortToNode)(node, vpSize, initialPadding);
            setViewPort(vp);
            // hackidy hack
            const timer = setTimeout(() => {
                const vp = (0, utils_2.fitViewPortToNode)(node, vpSize, initialPadding);
                if (!props.thumbnailMode) {
                    // hack to make project view work nicely
                    setViewPort(vp);
                }
                setDidCenterInitially(true);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [
        node,
        initialPadding,
        vpSize,
        props.thumbnailMode,
        didCenterInitially,
        setViewPort,
    ]);
    const onCopyInner = React.useCallback(() => {
        const { selectedInstances } = boardData;
        const instances = node.instances
            .filter((ins) => selectedInstances.includes(ins.id))
            .map((ins) => ({ ...ins, id: ins.id + "-copy" }));
        const connections = node.connections.filter(({ from, to }) => {
            return (selectedInstances.includes(from.insId) &&
                selectedInstances.includes(to.insId));
        });
        onCopy({ instances, connections });
    }, [boardData, onCopy, node]);
    const onPaste = React.useCallback(() => {
        const { newNode, newInstances } = (0, paste_instances_1.pasteInstancesCommand)(node, lastMousePos.current, props.clipboardData);
        onChange(newNode, (0, flyde_flow_change_type_1.functionalChange)("paste instances"));
        onChangeBoardData({
            selectedInstances: newInstances.map((ins) => ins.id),
            selectedConnections: [],
        });
    }, [
        node,
        lastMousePos,
        props.clipboardData,
        onChange,
        onChangeBoardData,
    ]);
    const selectClosest = React.useCallback(() => {
        const rootId = node.id;
        if (!closestPin) {
            console.warn("tried selecting closest with no pin nearby");
            return;
        }
        if (closestPin.type === "input") {
            if (closestPin.ins.id === rootId) {
                onNodeIoPinClick(closestPin.pin, "input");
            }
            else {
                onPinClick(closestPin.ins, closestPin.pin, "input");
            }
        }
        else {
            if (closestPin.ins.id === rootId) {
                onNodeIoPinClick(closestPin.pin, "output");
            }
            else {
                onPinClick(closestPin.ins, closestPin.pin, "output");
            }
        }
    }, [node.id, closestPin, onNodeIoPinClick, onPinClick]);
    const onStartDraggingInstance = React.useCallback((ins, event) => {
        // event.preventDefault();
        // event.stopPropagation();
        setDraggingId(ins.id);
        onChange({ ...node }, (0, flyde_flow_change_type_1.metaChange)("drag-start"));
    }, [onChange, node]);
    const onInstanceDragMove = React.useCallback((ins, event, pos) => {
        const newValue = (0, utils_2.handleInstanceDrag)(node, ins, pos, event, selectedInstances, draggingId);
        onChange(newValue, (0, flyde_flow_change_type_1.metaChange)("drag-move"));
    }, [draggingId, onChange, selectedInstances, node]);
    const onInstanceDragEnd = React.useCallback((_, event) => {
        event.preventDefault();
        event.stopPropagation();
        setDraggingId(undefined);
    }, []);
    const onStartDraggingNodeIo = React.useCallback((_, event) => {
        event.preventDefault();
        event.stopPropagation();
        setDraggingId(core_1.THIS_INS_ID);
    }, []);
    const onDragMoveNodeIo = React.useCallback(async (type, pin, event, data) => {
        event.preventDefault();
        event.stopPropagation();
        const { x, y } = data;
        // Calculate the delta from the original position
        const currentPos = type === "input"
            ? node.inputsPosition[pin]
            : node.outputsPosition[pin];
        if (!currentPos)
            return;
        const delta = {
            x: x - currentPos.x,
            y: y - currentPos.y
        };
        const ioId = `io_${type}_${pin}`;
        const newValue = (0, immer_1.produce)(node, (draft) => {
            // Update the dragged pin
            if (type === "input") {
                draft.inputsPosition[pin] = { x, y };
            }
            else {
                draft.outputsPosition[pin] = { x, y };
            }
            // Update other selected elements if this pin is part of a selection
            if (selectedInstances.includes(ioId)) {
                // Move other selected IO pins
                selectedInstances.forEach(id => {
                    // Skip the pin being dragged
                    if (id === ioId)
                        return;
                    // Handle other input pins
                    if (id.startsWith('io_input_')) {
                        const pinId = id.substring('io_input_'.length);
                        if (draft.inputsPosition[pinId]) {
                            draft.inputsPosition[pinId] = (0, physics_1.vAdd)(draft.inputsPosition[pinId], delta);
                        }
                    }
                    // Handle other output pins
                    else if (id.startsWith('io_output_')) {
                        const pinId = id.substring('io_output_'.length);
                        if (draft.outputsPosition[pinId]) {
                            draft.outputsPosition[pinId] = (0, physics_1.vAdd)(draft.outputsPosition[pinId], delta);
                        }
                    }
                    // Handle selected regular instances
                    else {
                        const ins = draft.instances.find(ins => ins.id === id);
                        if (ins) {
                            ins.pos = (0, physics_1.vAdd)(ins.pos, delta);
                        }
                    }
                });
            }
        });
        onChange(newValue, (0, flyde_flow_change_type_1.metaChange)("node-io-drag-move"));
    }, [onChange, node, selectedInstances]);
    const onDragEndNodeIo = React.useCallback(async (type, pin, event, data) => {
        event.preventDefault();
        event.stopPropagation();
        // const { x, y } = data;
        setDraggingId(undefined);
    }, []);
    const [isPanning, setIsPanning] = (0, react_1.useState)(false);
    const panStartPos = (0, react_1.useRef)(null);
    const onMouseDown = React.useCallback((e) => {
        if (e.button !== 0 ||
            !(0, utils_2.isEventOnCurrentBoard)(e.nativeEvent, node.id)) {
            return;
        }
        if (e.shiftKey) {
            if (e.target) {
                const el = e.target;
                if (el.classList.contains("connections-view")) {
                    onChangeBoardData({
                        selectedInstances: [],
                        selectedConnections: [],
                        from: undefined,
                        to: undefined,
                    });
                    startSelectionBox(e);
                }
            }
        }
        else {
            // Default to panning only if the click is on the background
            if (e.target) {
                const el = e.target;
                if (el.classList.contains("connections-view")) {
                    setIsPanning(true);
                    panStartPos.current = { x: e.clientX, y: e.clientY };
                }
            }
        }
    }, [node.id, onChangeBoardData, startSelectionBox]);
    const onMouseUp = React.useCallback((e) => {
        setDraggedConnection(null);
        setIsPanning(false);
        panStartPos.current = null;
        if (!(0, utils_2.isEventOnCurrentBoard)(e.nativeEvent, node.id)) {
            return;
        }
        if (selectionBox) {
            endSelectionBox(e.shiftKey, (ids) => {
                onChangeBoardData({ selectedInstances: ids });
            });
        }
    }, [node.id, endSelectionBox, onChangeBoardData, selectionBox]);
    const onMouseMove = React.useCallback((e) => {
        if (!(0, utils_2.isEventOnCurrentBoard)(e.nativeEvent, node.id)) {
            isBoardInFocus.current = false;
            return;
        }
        isBoardInFocus.current = true;
        updateClosestPinAndMousePos(e);
        if (isPanning && panStartPos.current) {
            const dx = (panStartPos.current.x - e.clientX) / viewPort.zoom;
            const dy = (panStartPos.current.y - e.clientY) / viewPort.zoom;
            setViewPort({
                ...viewPort,
                pos: {
                    x: viewPort.pos.x + dx,
                    y: viewPort.pos.y + dy,
                },
            });
            panStartPos.current = { x: e.clientX, y: e.clientY };
        }
        else if (selectionBox) {
            updateSelectionBox(lastMousePos.current);
        }
        onChangeBoardData({ lastMousePos: lastMousePos.current });
    }, [
        node.id,
        updateClosestPinAndMousePos,
        selectionBox,
        onChangeBoardData,
        lastMousePos,
        updateSelectionBox,
        isPanning,
        viewPort,
        setViewPort,
    ]);
    const onMouseLeave = React.useCallback((e) => {
        var _a;
        if (((_a = e.relatedTarget) === null || _a === void 0 ? void 0 : _a.className) === "bp5-menu") {
            // hack to ignore context menu opening as mouse leave
            return;
        }
        isBoardInFocus.current = false;
    }, []);
    const onDblClickInstance = React.useCallback((ins, shift) => {
        if (shift) {
            if (!(0, core_1.isVisualNode)(ins.node)) {
                toast({
                    description: "Cannot inspect a non visual node",
                    variant: "default",
                });
                //`Impossible state inspecting visual node`);
                return;
            }
            setOpenInlineInstance({
                insId: `${currentInsId}.${ins.id}`,
                node: ins.node,
            });
        }
        else {
            if ((0, core_1.isCodeNodeInstance)(ins)) {
                setEditedNodeInstance({ ins: ins });
            }
            else if ((0, core_1.isVisualNodeInstance)(ins)) {
                if ((0, core_1.isVisualNode)(ins.node) && ins.source.type === "inline") {
                    setOpenInlineInstance({ insId: ins.id, node: ins.node });
                }
                else {
                    toast({
                        description: "Editing this type of node is not supported",
                        variant: "default",
                    });
                }
                return;
            }
            else {
                toast({
                    description: "Editing this type of node is not supported",
                    variant: "default",
                });
            }
        }
    }, [currentInsId, toast]);
    const renderMainPins = (type) => {
        const from = boardData.from;
        const pins = type === "input" ? inputs : outputs;
        const positionMap = type === "input" ? inputsPosition : outputsPosition;
        const selectionPinId = type === "input" ? from === null || from === void 0 ? void 0 : from.pinId : to === null || to === void 0 ? void 0 : to.pinId;
        return (0, utils_1.entries)(pins).map(([k, v]) => {
            var _a;
            return ((0, jsx_runtime_1.jsx)(node_io_view_1.NodeIoView, { currentInsId: currentInsId, ancestorInsIds: props.ancestorsInsIds, type: type, pos: positionMap[k] || { x: 0, y: 0 }, id: k, onDelete: nodeIoEditable ? onRemoveIoPin : undefined, onRename: nodeIoEditable ? onRenameIoPin : undefined, closest: !!(closestPin &&
                    closestPin.type === type &&
                    closestPin.ins.id === node.id &&
                    closestPin.pin === k), connected: false, onChangeInputMode: type === "input" ? onChangeInputMode : undefined, viewPort: viewPort, onDragStart: onStartDraggingNodeIo, onDragEnd: onDragEndNodeIo, onDragMove: onDragMoveNodeIo, onSelect: (id, type, event) => onNodeIoPinClick(id, type, event), onSetDescription: onNodeIoSetDescription, selected: selectionPinId === k || selectedInstances.includes(`io_${type}_${k}`), description: (_a = v.description) !== null && _a !== void 0 ? _a : '', onMouseUp: onNodeIoMouseUp, onMouseDown: onNodeIoMouseDown, increasedDropArea: !!draggedConnection }, k));
        });
    };
    const onMaybeZoomOrPan = React.useCallback((e) => {
        const scrollThreshold = 0.5; // Ignore very small deltas
        // If requireModifierForZoom is true, only zoom when modifier key is pressed
        const shouldZoom = requireModifierForZoom ? (e.ctrlKey || e.metaKey) : true;
        if (!shouldZoom) {
            // Allow the event to bubble up for normal page scrolling
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (e.ctrlKey || e.metaKey) { // Explicit zoom gesture (pinch or cmd/ctrl+scroll)
            if (Math.abs(e.deltaY) > scrollThreshold) {
                const zoomDiff = e.deltaY * -0.005; // Sensitivity for pinch
                onZoom(viewPort.zoom + zoomDiff, "mouse");
            }
        }
        else {
            // Handle Vertical Scroll (Zoom) - only when requireModifierForZoom is false
            if (Math.abs(e.deltaY) > scrollThreshold) {
                const zoomDiff = e.deltaY * -0.01; // Sensitivity for scroll zoom
                onZoom(viewPort.zoom + zoomDiff, "mouse");
            }
        }
    }, [onZoom, viewPort, requireModifierForZoom]);
    (0, react_1.useEffect)(() => {
        const { current } = boardRef;
        if (current) {
            // Use passive: false since we call preventDefault
            current.addEventListener("wheel", onMaybeZoomOrPan, { passive: false });
            return () => {
                // Ensure the listener is removed with the same options
                current.removeEventListener("wheel", onMaybeZoomOrPan, { capture: false });
            };
        }
    }, [onMaybeZoomOrPan]);
    const backgroundStyle = {
        backgroundPositionX: (0, utils_2.roundNumber)(-viewPort.pos.x * viewPort.zoom),
        backgroundPositionY: (0, utils_2.roundNumber)(-viewPort.pos.y * viewPort.zoom),
        backgroundSize: (0, utils_2.roundNumber)(25 * viewPort.zoom) + "px",
    };
    // unoptimized code to get connected inputs
    const instancesConnectToPinsRef = React.useRef(new Map());
    // auto prune orphan connections if their inputs/outputs no longer exist
    (0, usePruneOrphanConnections_1.usePruneOrphanConnections)(instances, connections, node, onChange);
    // for each instance, if there's a visible input or output that doesn't exist, reset the visible inputs/outputs to be the full list
    React.useEffect(() => {
        let invalids = [];
        const newNode = (0, immer_1.produce)(node, (draft) => {
            draft.instances = draft.instances.map((ins, idx) => {
                const node = ins.node;
                if (node) {
                    const nodeInputs = (0, core_1.getNodeInputs)(node);
                    const nodeOutputs = (0, core_1.getNodeOutputs)(node);
                    if (ins.visibleInputs) {
                        const invalidInputs = ins.visibleInputs.filter((pinId) => !nodeInputs[pinId]);
                        if (invalidInputs.length > 0) {
                            ins.visibleInputs = undefined;
                            invalids.push(...invalidInputs);
                        }
                    }
                    if (ins.visibleOutputs) {
                        const invalidOutputs = ins.visibleOutputs.filter((pinId) => !nodeOutputs[pinId]);
                        if (invalidOutputs.length > 0) {
                            ins.visibleOutputs = undefined;
                            invalids.push(...invalidOutputs);
                        }
                    }
                }
                return ins;
            });
        });
        if (invalids.length > 0) {
            toast({
                description: `Found ${invalids.length} invalid visible inputs/outputs: ${invalids.join(", ")}. Resetting to full list`,
                variant: "default",
            });
            onChange(newNode, (0, flyde_flow_change_type_1.functionalChange)("reset corrupt visible inputs/outputs"));
        }
    }, [instances, onChange, node, toast, node.instances]);
    (0, react_1.useEffect)(() => {
        const instanceMap = new Map(instances.map((ins) => [ins.id, ins]));
        instancesConnectToPinsRef.current = connections.reduce((m, conn) => {
            const v = m.get(conn.to.insId) || {};
            const p = v[conn.to.pinId] || [];
            const newV = {
                ...v,
                [conn.to.pinId]: [...p, instanceMap.get(conn.from.insId)],
            };
            m.set(conn.to.insId, newV);
            return m;
        }, new Map());
    }, [connections, instances]);
    (0, use_hotkeys_1.useHotkeys)("shift+c", fitToScreen, { text: "Center viewport", group: "Viewport Controls" }, [], isBoardInFocus);
    (0, use_hotkeys_1.useHotkeys)("cmd+c, ctrl+c", onCopyInner, { text: "Copy instances", group: "Editing" }, [], isBoardInFocus);
    (0, use_hotkeys_1.useHotkeys)("cmd+v, ctrl+v", onPaste, { text: "Paste instances", group: "Editing" }, [], isBoardInFocus);
    (0, use_hotkeys_1.useHotkeys)("s", selectClosest, { text: "Select pin closest to mouse", group: "Selection" }, [], isBoardInFocus);
    (0, use_hotkeys_1.useHotkeys)("cmd+k, ctrl+k", (e) => {
        e.preventDefault();
        setCommandMenuOpen(true);
    }, { text: "Open command menu", group: "General" }, [], isBoardInFocus);
    const onChangeInspected = React.useCallback((changedInlineNode, type) => {
        if (!openInlineInstance) {
            throw new Error("impossible state");
        }
        const newNode = (0, immer_1.produce)(node, (draft) => {
            const ins = draft.instances.find((i) => i.id === openInlineInstance.insId);
            if (!ins || !(0, core_1.isInlineVisualNodeInstance)(ins)) {
                throw new Error("impossible state");
            }
            ins.source.data = changedInlineNode;
        });
        onChange(newNode, (0, flyde_flow_change_type_1.functionalChange)("Inner change: " + type.message));
        setOpenInlineInstance((obj) => ({
            ...obj,
            node: changedInlineNode,
            insId: openInlineInstance.insId
        }));
    }, [onChange, openInlineInstance, node]);
    const [inspectedBoardData, setInspectedBoardData] = (0, react_1.useState)({
        selectedInstances: [],
        selectedConnections: [],
        viewPort: exports.defaultViewPort,
        lastMousePos: { x: 0, y: 0 },
    });
    const onChangeInspectedBoardData = React.useCallback((partial) => {
        return setInspectedBoardData((data) => ({ ...data, ...partial }));
    }, []);
    const maybeGetInlineProps = (ins) => {
        if (openInlineInstance && openInlineInstance.insId === ins.id) {
            return {
                currentInsId: openInlineInstance.insId,
                ancestorsInsIds: (0, core_1.fullInsIdPath)(currentInsId, ancestorsInsIds),
                boardData: inspectedBoardData,
                onChangeBoardData: onChangeInspectedBoardData,
                onCopy: onCopy,
                clipboardData: props.clipboardData,
                onInspectPin: props.onInspectPin,
                nodeIoEditable: props.nodeIoEditable,
                node: openInlineInstance.node,
                onChangeNode: onChangeInspected,
                parentViewport: exports.defaultViewPort,
                parentBoardPos: boardPos,
                queuedInputsData: props.queuedInputsData,
            };
        }
        else {
            return undefined;
        }
    };
    const maybeGetFutureConnection = () => {
        if (from &&
            (((closestPin === null || closestPin === void 0 ? void 0 : closestPin.type) === "input" && (closestPin === null || closestPin === void 0 ? void 0 : closestPin.ins.id) !== node.id) ||
                ((closestPin === null || closestPin === void 0 ? void 0 : closestPin.ins.id) === node.id && (closestPin === null || closestPin === void 0 ? void 0 : closestPin.type) === "output"))) {
            const to = closestPin.ins.id === node.id
                ? { pinId: closestPin.pin, insId: core_1.THIS_INS_ID }
                : { insId: closestPin.ins.id, pinId: closestPin.pin };
            // Prevent connection between main input and output
            if (from.insId === core_1.THIS_INS_ID && to.insId === core_1.THIS_INS_ID) {
                return undefined;
            }
            return { from, to };
        }
        else if (to &&
            (((closestPin === null || closestPin === void 0 ? void 0 : closestPin.type) === "output" && (closestPin === null || closestPin === void 0 ? void 0 : closestPin.ins.id) !== node.id) ||
                ((closestPin === null || closestPin === void 0 ? void 0 : closestPin.ins.id) === node.id && (closestPin === null || closestPin === void 0 ? void 0 : closestPin.type) === "input"))) {
            const from = closestPin.ins.id === node.id
                ? { pinId: closestPin.pin, insId: core_1.THIS_INS_ID }
                : { insId: closestPin.ins.id, pinId: closestPin.pin };
            // Prevent connection between main input and output
            if (from.insId === core_1.THIS_INS_ID && to.insId === core_1.THIS_INS_ID) {
                return undefined;
            }
            return { from, to };
        }
    };
    const maybeRenderFutureConnection = () => {
        const maybeFutureConnection = maybeGetFutureConnection();
        if (maybeFutureConnection) {
            const { from, to } = maybeFutureConnection;
            return {
                connection: { from, to },
                type: connections.some((conn) => (0, core_1.connectionDataEquals)(conn, maybeFutureConnection))
                    ? "future-remove"
                    : "future-add",
            };
        }
    };
    React.useImperativeHandle(thisRef, () => {
        const ref = {
            centerInstance(insId) {
                const ins = node.instances.find((ins) => ins.id === insId);
                if (ins) {
                    const pos = (0, physics_1.vSub)(ins.pos, (0, physics_1.vec)(vpSize.width / 2, vpSize.height / 2));
                    setViewPort({ ...viewPort, pos });
                }
            },
            centerViewPort() {
                fitToScreen();
            },
            getViewPort() {
                return viewPort;
            },
            clearSelection: () => {
                clearSelections();
            },
        };
        return ref;
    });
    // use this to debug positioning/layout related stuff
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [layoutDebuggers, setLayoutDebuggers] = React.useState([]);
    const connectionsToRender = connections.filter((conn) => {
        // do not render on top of a future connection so it shows removal properly
        const fConn = maybeGetFutureConnection();
        if (!fConn) {
            return true;
        }
        return !(0, core_1.connectionDataEquals)(fConn, conn);
    });
    const closeInlineEditor = React.useCallback(() => {
        setOpenInlineInstance(undefined);
        setInspectedBoardData(exports.defaultBoardData);
    }, []);
    const toggleConnectionHidden = React.useCallback((connection) => {
        const val = (0, immer_1.produce)(node, (draft) => {
            const conn = draft.connections.find((conn) => (0, core_1.connectionDataEquals)(conn, connection));
            if (!conn) {
                console.warn("connection not found", connection);
                return;
            }
            conn.hidden = !conn.hidden;
        });
        onChange(val, (0, flyde_flow_change_type_1.functionalChange)("toggle connection hidden"));
    }, [onChange, node]);
    const removeConnection = React.useCallback((connection) => {
        const val = (0, immer_1.produce)(node, (draft) => {
            draft.connections = draft.connections.filter((conn) => !(0, core_1.connectionDataEquals)(conn, connection));
        });
        onChange(val, (0, flyde_flow_change_type_1.functionalChange)("remove connection"));
    }, [onChange, node]);
    const onPinMouseDown = React.useCallback((ins, pinId, pinType) => {
        if (pinType === "input") {
            setDraggedConnection({
                to: (0, core_1.connectionNode)(ins.id, pinId),
                from: undefined,
            });
        }
        else {
            setDraggedConnection({
                from: (0, core_1.connectionNode)(ins.id, pinId),
                to: undefined,
            });
        }
    }, []);
    const onPinMouseUp = React.useCallback((ins, pinId, pinType) => {
        if (draggedConnection) {
            if (draggedConnection.from && pinType === "input") {
                onConnectionClose(draggedConnection.from, (0, core_1.connectionNode)(ins.id, pinId), "pinDrag");
            }
            else if (draggedConnection.to && pinType === "output") {
                onConnectionClose((0, core_1.connectionNode)(ins.id, pinId), draggedConnection.to, "pinDrag");
            }
        }
        setDraggedConnection(null);
    }, [draggedConnection, onConnectionClose]);
    const onNodeIoMouseDown = React.useCallback((id, type) => {
        if (type === "input") {
            setDraggedConnection({
                to: (0, core_1.externalConnectionNode)(id),
                from: undefined,
            });
        }
        else {
            setDraggedConnection({
                from: (0, core_1.externalConnectionNode)(id),
                to: undefined,
            });
        }
    }, []);
    const onNodeIoMouseUp = React.useCallback((id, type) => {
        if (draggedConnection) {
            if (draggedConnection.from && type === "input") {
                onConnectionClose(draggedConnection.from, (0, core_1.externalConnectionNode)(id), "nodeIoPinDrag");
            }
            else if (draggedConnection.to && type === "output") {
                onConnectionClose((0, core_1.externalConnectionNode)(id), draggedConnection.to, "nodeIoPinDrag");
            }
        }
        setDraggedConnection(null);
    }, [draggedConnection, onConnectionClose]);
    const onSaveInstanceConfig = React.useCallback((val) => {
        if (!editedNodeInstance) {
            throw new Error("impossible state");
        }
        const newInstance = { ...editedNodeInstance.ins, config: val };
        return resolveInstance({ instance: newInstance }).then((resolvedNode) => {
            const newNode = (0, immer_1.produce)(node, (draft) => {
                const ins = draft.instances.find((i) => i.id === editedNodeInstance.ins.id);
                if (!ins || !(0, core_1.isCodeNodeInstance)(ins)) {
                    throw new Error(`Impossible state`);
                }
                ins.config = newInstance.config;
                ins.node = resolvedNode.node;
            });
            onChange(newNode, (0, flyde_flow_change_type_1.functionalChange)("save macro instance"));
            setEditedNodeInstance(undefined);
        }).catch(error => {
            console.error("Failed to resolve instance:", error);
            throw error;
        });
    }, [editedNodeInstance, resolveInstance, node, onChange]);
    const selectionIndicatorData = React.useMemo(() => {
        if (from) {
            return { type: "input", pinId: from.pinId };
        }
        else if (to) {
            return { type: "output", pinId: to.pinId };
        }
        else if (selectedInstances.length > 0) {
            // Filter out IO pins from regular instances
            const regularInstances = selectedInstances.filter(id => !id.startsWith('io_input_') && !id.startsWith('io_output_'));
            // If we have a mix of regular instances and IO pins, or just multiple IO pins,
            // treat them all as instances for selection purposes
            return { type: "instances", ids: selectedInstances };
        }
        else if (selectedConnections.length > 0) {
            return { type: "connections", ids: selectedConnections };
        }
        else {
            return undefined;
        }
    }, [from, to, selectedInstances, selectedConnections]);
    const onCenterSelection = React.useCallback(() => {
        if (selectionIndicatorData) {
            const { type } = selectionIndicatorData;
            const pos = (() => {
                switch (type) {
                    case "instances": {
                        const ins = node.instances.find((ins) => selectedInstances.includes(ins.id));
                        if (ins) {
                            return ins.pos;
                        }
                        break;
                    }
                    case "input": {
                        const pos = inputsPosition[selectionIndicatorData.pinId];
                        if (pos) {
                            return pos;
                        }
                        break;
                    }
                    case "output": {
                        const pos = outputsPosition[selectionIndicatorData.pinId];
                        if (pos) {
                            return pos;
                        }
                        break;
                    }
                }
            })();
            if (!pos) {
                return;
            }
            const vp = (0, utils_2.fitViewPortToRect)({ x: pos.x, y: pos.y, w: 1, h: 1 }, vpSize);
            vp.zoom = viewPort.zoom;
            (0, utils_2.animateViewPort)(viewPort, vp, 500, (vp) => {
                setViewPort(vp);
            });
        }
    }, [
        inputsPosition,
        node.instances,
        outputsPosition,
        selectedInstances,
        selectionIndicatorData,
        setViewPort,
        viewPort,
        vpSize,
    ]);
    const closeRunModal = React.useCallback(() => {
        setRunModalVisible(false);
    }, []);
    const openRunModal = React.useCallback(() => {
        setRunModalVisible(true);
    }, []);
    const onDragOver = React.useCallback((e) => {
        e.preventDefault();
    }, []);
    const onDrop = React.useCallback((e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("application/json");
        if (data) {
            const droppedNode = JSON.parse(data);
            onAddNode(droppedNode);
        }
    }, [onAddNode]);
    const onSaveCustomNode = React.useCallback(async (code) => {
        const node = await onCreateCustomNode({ code });
        // console.log("node", node);
        // await onImportNode(node);
        await onAddNode(node);
        setIsAddingCustomNode(false);
    }, [onAddNode, onCreateCustomNode]);
    const onViewForkCode = React.useCallback(async (instance) => {
        const node = instance.node;
        if ((0, core_1.isVisualNode)(node)) {
            toast({
                description: "Visual nodes cannot be forked yet",
                variant: "destructive",
            });
            return;
        }
        const codeNodeDef = node;
        try {
            if (!codeNodeDef.sourceCode) {
                toast({
                    description: "No source code found",
                    variant: "destructive",
                });
                return;
            }
            setCustomNodeForkData({
                node: codeNodeDef,
                initialCode: codeNodeDef.sourceCode,
            });
            setIsAddingCustomNode(true);
        }
        catch (e) {
            console.error("Failed to get node source:", e);
        }
    }, [toast]);
    const [commandMenuOpen, setCommandMenuOpen] = (0, react_1.useState)(false);
    try {
        return ((0, jsx_runtime_1.jsxs)(ui_1.ContextMenu, { children: [(0, jsx_runtime_1.jsxs)(ui_1.ContextMenuTrigger, { className: (0, classnames_1.default)("visual-node-editor", props.className, {
                        dark: darkMode
                    }), "data-id": node.id, disabled: !isBoardInFocus.current, children: [(0, jsx_runtime_1.jsxs)("main", { className: "board-editor-inner", onMouseDown: onMouseDown, onMouseUp: onMouseUp, onMouseMove: onMouseMove, onMouseLeave: onMouseLeave, onDragOver: onDragOver, onDrop: onDrop, ref: boardRef, style: {
                                ...backgroundStyle,
                                cursor: isPanning ? 'grabbing' : 'default',
                            }, children: [(0, jsx_runtime_1.jsx)(React.Fragment, { children: (0, jsx_runtime_1.jsx)(layout_debugger_1.LayoutDebugger, { vp: viewPort, node: node, extraDebug: utils_2.emptyList, mousePos: lastMousePos.current }) }), (0, jsx_runtime_1.jsx)(ConnectionView_1.ConnectionView, { currentInsId: currentInsId, ancestorsInsIds: ancestorsInsIds, size: vpSize, node: node, boardPos: boardPos, instances: node.instances, connections: connectionsToRender, futureConnection: maybeRenderFutureConnection(), onDblClick: core_1.noop, viewPort: viewPort, parentVp: parentViewport, selectedInstances: selectedInstances, selectedConnections: selectedConnections, toggleHidden: toggleConnectionHidden, removeConnection: removeConnection, onSelectConnection: onSelectConnection, lastMousePos: lastMousePos.current, draggedSource: draggedConnection }), renderMainPins("input"), instances.map((ins, idx) => {
                                    var _a, _b, _c;
                                    return ((0, jsx_runtime_1.jsx)(InstanceView_1.InstanceView, { onUngroup: onUnGroup, connectionsPerInput: instancesConnectToPinsRef.current.get(ins.id) || utils_2.emptyObj, ancestorsInsIds: (0, core_1.fullInsIdPath)(currentInsId, ancestorsInsIds), onPinClick: onPinClick, onPinDblClick: core_1.noop, onDragStart: onStartDraggingInstance, onDragEnd: onInstanceDragEnd, onDragMove: onInstanceDragMove, onDblClick: onDblClickInstance, onSelect: onSelectInstance, onToggleSticky: onToggleSticky, selected: selectedInstances.indexOf(ins.id) !== -1, dragged: draggingId === ins.id, increasedPinDropArea: !!draggedConnection, onInspectPin: _onInspectPin, selectedInput: to && (0, core_1.isInternalConnectionNode)(to) && to.insId === ins.id
                                            ? to.pinId
                                            : undefined, selectedOutput: from &&
                                            (0, core_1.isInternalConnectionNode)(from) &&
                                            from.insId === ins.id
                                            ? from.pinId
                                            : undefined, closestPin: closestPin && closestPin.ins.id === ins.id
                                            ? closestPin
                                            : undefined, queuedInputsData: (_a = queueInputsData === null || queueInputsData === void 0 ? void 0 : queueInputsData[ins.id]) !== null && _a !== void 0 ? _a : utils_2.emptyObj, instance: ins, connections: connections, 
                                        // was too lazy to remove/fix the breakpoint/log below
                                        onTogglePinBreakpoint: core_1.noop, onTogglePinLog: core_1.noop, 
                                        // onTogglePinLog={onToggleLog}
                                        // onTogglePinBreakpoint={onToggleBreakpoint}
                                        viewPort: viewPort, onChangeVisibleInputs: onChangeVisibleInputs, onChangeVisibleOutputs: onChangeVisibleOutputs, onSetDisplayName: onChangeInstanceDisplayName, onDeleteInstance: onDeleteInstance, forceShowMinimized: from || (draggedConnection === null || draggedConnection === void 0 ? void 0 : draggedConnection.from)
                                            ? "input"
                                            : to || (draggedConnection === null || draggedConnection === void 0 ? void 0 : draggedConnection.to)
                                                ? "output"
                                                : undefined, isConnectedInstanceSelected: selectedInstances.some((selInsId) => connections.some(({ from, to }) => {
                                            return ((from.insId === ins.id && to.insId === selInsId) ||
                                                (from.insId === selInsId && to.insId === ins.id));
                                        })), inlineGroupProps: maybeGetInlineProps(ins), onCloseInlineEditor: closeInlineEditor, inlineEditorPortalDomNode: inlineEditorPortalRootRef.current, onChangeStyle: onChangeInstanceStyle, onGroupSelected: onGroupSelectedInternal, onPinMouseDown: onPinMouseDown, onPinMouseUp: onPinMouseUp, onViewForkCode: onViewForkCode, hadError: (_c = (_b = props.instancesWithErrors) === null || _b === void 0 ? void 0 : _b.has((0, core_1.fullInsIdPath)(ins.id))) !== null && _c !== void 0 ? _c : false }, ins.id));
                                }), (0, jsx_runtime_1.jsx)(SelectionBox_1.SelectionBox, { selectionBox: selectionBox, viewPort: viewPort }), renderMainPins("output"), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-4 right-5 z-10", children: (0, jsx_runtime_1.jsxs)(ui_2.Button, { variant: "outline", onClick: () => setCommandMenuOpen(true), className: "add-nodes border shadow-sm relative group inline-flex items-center gap-1 dark:bg-neutral-900 dark:border-neutral-950 px-2 h-8 dark:hover:bg-neutral-950 bg-neutral-100 border-neutral-200 hover:border-neutral-300", children: [(0, jsx_runtime_1.jsx)("span", { className: "size-5", children: (0, jsx_runtime_1.jsx)(ui_1.Plus, { className: "w-5 h-5 dark:text-white text-neutral-800" }) }), " ", (0, jsx_runtime_1.jsx)(ui_1.HotkeyIndication, { hotkey: "cmd+K" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "viewport-controls-and-help", children: [(0, jsx_runtime_1.jsx)(ui_2.Button, { variant: "ghost", size: "sm", onClick: fitToScreen, children: "Center" }), (0, jsx_runtime_1.jsx)(ui_2.Slider, { min: 0.3, max: 2, step: 0.05, className: "w-[100px]", value: [viewPort.zoom], onValueChange: ([value]) => onZoom(value !== null && value !== void 0 ? value : 0) }), isRootInstance ? (0, jsx_runtime_1.jsx)(HelpBubble_1.HelpBubble, {}) : null] }), editedNodeInstance ? ((0, jsx_runtime_1.jsx)(InstanceConfigEditor_1.InstanceConfigEditor, { onCancel: () => setEditedNodeInstance(undefined), onSubmit: onSaveInstanceConfig, ins: editedNodeInstance.ins, editorNode: node, onFork: onViewForkCode })) : null, (0, jsx_runtime_1.jsx)("div", { className: "inline-editor-portal-root" }), (0, jsx_runtime_1.jsx)(CommandMenu_1.CommandMenu, { open: commandMenuOpen, onOpenChange: setCommandMenuOpen, onAddNode: onAddNode, onClickCustomNode: () => setIsAddingCustomNode(true) })] }), selectionIndicatorData ? ((0, jsx_runtime_1.jsx)(SelectionIndicator_1.SelectionIndicator, { selection: selectionIndicatorData, onCenter: onCenterSelection, onGroup: onGroupSelectedInternal, onDelete: onDeleteInstances })) : null, (0, jsx_runtime_1.jsx)(OnboardingTips_1.OnboardingTips, {}), isAddingCustomNode ? ((0, jsx_runtime_1.jsx)(CustomNodeModal_1.CustomNodeModal, { isOpen: isAddingCustomNode, onClose: () => {
                                setIsAddingCustomNode(false);
                                setCustomNodeForkData(undefined);
                            }, onSave: onSaveCustomNode, forkMode: customNodeForkData })) : null, (0, jsx_runtime_1.jsx)("div", { className: "run-btn-container", children: (0, jsx_runtime_1.jsxs)(ui_2.Button, { className: "run-btn absolute top-4 left-1/2 -translate-x-1/2 z-10", onClick: openRunModal, size: "sm", variant: "outline", children: [(0, jsx_runtime_1.jsx)(ui_2.Play, { className: "mr h-3 w-3" }), "Test Flow"] }) }), runModalVisible ? ((0, jsx_runtime_1.jsx)(RunFlowModal_1.RunFlowModal, { node: node, onClose: closeRunModal })) : null] }), (0, jsx_runtime_1.jsx)(EditorContextMenu_1.EditorContextMenu, { nodeIoEditable: nodeIoEditable, lastMousePos: lastMousePos, onOpenNodesLibrary: () => setCommandMenuOpen(true) }), (0, jsx_runtime_1.jsx)(ui_2.Toaster, {})] }));
    }
    catch (e) {
        console.error(e);
        return (0, jsx_runtime_1.jsxs)("div", { children: ["Error rendering board - ", e.toString()] });
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlzdWFsTm9kZUVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvVmlzdWFsTm9kZUVkaXRvci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQjtBQUUvQixzQ0E0QnFCO0FBRXJCLCtEQUErRTtBQUMvRSxxRUFHMEM7QUFDMUMsb0NBQXlDO0FBRXpDLDhCQUtlO0FBQ2YsaUNBQTJEO0FBRTNELG1DQVVpQjtBQUVqQixxREFBa0Q7QUFFbEQsaUNBQWdDO0FBQ2hDLGlDQUErRDtBQUMvRCxnRUFBNEQ7QUFDNUQsNkVBQXVEO0FBRXZELGlEQUE2RDtBQUU3RCx3Q0FBb0Q7QUFDcEQsdURBQXdFO0FBQ3hFLDBEQUFzRDtBQUN0RCxvREFBb0Q7QUFDcEQsa0ZBRytDO0FBRS9DLGdEQUFnRDtBQUNoRCw0REFBb0M7QUFDcEMsZ0VBQW1FO0FBRW5FLDZDQUEwQztBQUMxQyxvRUFBNkQ7QUFDN0QsaUVBR2dDO0FBQ2hDLDZEQUc4QjtBQUM5QixpREFBOEM7QUFFOUMsNkVBQTBFO0FBQzFFLDJFQUF3RTtBQUN4RSw4REFBMkQ7QUFDM0QsdURBQW9EO0FBQ3BELHlFQUFzRTtBQUN0RSx1RUFHbUM7QUFDbkMsMkRBQXdEO0FBQ3hELHVFQUFvRTtBQUNwRSw4QkFBZ0U7QUFDaEUsMkRBQXdEO0FBRTNDLFFBQUEsV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUVqQixRQUFBLGVBQWUsR0FBYTtJQUN2QyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDbkIsSUFBSSxFQUFFLENBQUM7Q0FDUixDQUFDO0FBRVcsUUFBQSxnQkFBZ0IsR0FBeUI7SUFDcEQsaUJBQWlCLEVBQUUsRUFBRTtJQUNyQixtQkFBbUIsRUFBRSxFQUFFO0lBQ3ZCLFFBQVEsRUFBRSx1QkFBZTtJ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