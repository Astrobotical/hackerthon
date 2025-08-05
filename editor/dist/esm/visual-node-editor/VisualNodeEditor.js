import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { THIS_INS_ID, isInlineVisualNodeInstance, isCodeNodeInstance, isInternalConnectionNode, isVisualNode, connectionDataEquals, noop, connectionNode, getNodeInputs, externalConnectionNode, fullInsIdPath, getNodeOutputs, isVisualNodeInstance, } from "@flyde/core";
import { InstanceView } from "./instance-view/InstanceView";
import { ConnectionView, } from "./connection-view/ConnectionView";
import { entries } from "../utils";
import { ContextMenu, ContextMenuTrigger, HotkeyIndication, Plus, } from "../ui";
import { useBoundingclientrect, useDidMount } from "rooks";
import { emptyObj, roundNumber, fitViewPortToNode, handleInstanceDrag, emptyList, animateViewPort, fitViewPortToRect, isEventOnCurrentBoard, } from "./utils";
import { OnboardingTips } from "./OnboardingTips";
import { produce } from "immer";
import { useState, useRef, useEffect } from "react";
import { useHotkeys } from "../lib/react-utils/use-hotkeys";
import useComponentSize from "@rehooks/component-size";
import { NodeIoView } from "./node-io-view";
import { vec, vSub, vZero, vAdd } from "../physics";
import { LayoutDebugger } from "./layout-debugger";
import { preloadMonaco } from "../lib/preload-monaco";
// import { InstancePanel } from "./instance-panel";
import { functionalChange, metaChange, } from "../flow-editor/flyde-flow-change-type";
import { usePorts } from "../flow-editor/ports";
import classNames from "classnames";
import { pasteInstancesCommand } from "./commands/paste-instances";
import { HelpBubble } from "./HelpBubble";
import { useDarkMode } from "../flow-editor/DarkModeContext";
import { InstanceConfigEditor, } from "./InstanceConfigEditor";
import { SelectionIndicator, } from "./SelectionIndicator";
import { RunFlowModal } from "./RunFlowModal";
import { EditorContextMenu } from "./EditorContextMenu/EditorContextMenu";
import { usePruneOrphanConnections } from "./usePruneOrphanConnections";
import { SelectionBox } from "./SelectionBox/SelectionBox";
import { useSelectionBox } from "./useSelectionBox";
import { useClosestPinAndMousePos } from "./useClosestPinAndMousePos";
import { useVisualNodeEditorContext, } from "./VisualNodeEditorContext";
import { useEditorCommands } from "./useEditorCommands";
import { CustomNodeModal } from "./CustomNodeModal/CustomNodeModal";
import { Button, Slider, Toaster, useToast, Play } from "../ui";
import { CommandMenu } from "./CommandMenu/CommandMenu";
export const NODE_HEIGHT = 28;
export const defaultViewPort = {
    pos: { x: 0, y: 0 },
    zoom: 1,
};
export const defaultBoardData = {
    selectedInstances: [],
    selectedConnections: [],
    viewPort: defaultViewPort,
    lastMousePos: { x: 0, y: 0 },
};
export const VisualNodeEditor = React.memo(React.forwardRef((props, thisRef) => {
    const { nodeIoEditable, onCopy, onInspectPin, currentInsId, ancestorsInsIds, queuedInputsData: queueInputsData, initialPadding, requireModifierForZoom, } = props;
    const { toast } = useToast();
    const { node, onChangeNode: onChange, boardData, onChangeBoardData, } = useVisualNodeEditorContext();
    const darkMode = useDarkMode();
    const { onCreateCustomNode, resolveInstance } = usePorts();
    const parentViewport = props.parentViewport || defaultViewPort;
    const { selectedConnections, selectedInstances, from, to } = boardData;
    const { instances, connections, inputsPosition, outputsPosition, inputs, outputs, } = node;
    const [draggingId, setDraggingId] = useState();
    const isRootInstance = ancestorsInsIds === undefined;
    const [lastSelectedId, setLastSelectedId] = useState(); // to avoid it disappearing when doubling clicking to edit
    const [didCenterInitially, setDidCenterInitially] = useState(false);
    const [runModalVisible, setRunModalVisible] = useState(false);
    const [openInlineInstance, setOpenInlineInstance] = useState();
    const [editedNodeInstance, setEditedNodeInstance] = useState();
    const [isAddingCustomNode, setIsAddingCustomNode] = useState(false);
    const [customNodeForkData, setCustomNodeForkData] = useState();
    const inlineEditorPortalRootRef = useRef(null);
    useDidMount(() => {
        var _a, _b;
        inlineEditorPortalRootRef.current = (_b = (_a = boardRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(".inline-editor-portal-root")) !== null && _b !== void 0 ? _b : null;
    });
    const viewPort = boardData.viewPort;
    const isBoardInFocus = useRef(true);
    const [draggedConnection, setDraggedConnection] = useState(null);
    const setViewPort = React.useCallback((viewPort) => {
        onChangeBoardData({ viewPort });
    }, [onChangeBoardData]);
    const isLikelyTrackpad = React.useRef(false);
    const _onInspectPin = React.useCallback((insId, pin) => {
        return onInspectPin(insId, pin);
    }, [onInspectPin]);
    useEffect(() => {
        if (lastSelectedId) {
            const t = setTimeout(() => {
                setLastSelectedId(undefined);
            }, 350);
            return () => clearTimeout(t);
        }
    }, [lastSelectedId]);
    const boardRef = useRef(null);
    const vpSize = useComponentSize(boardRef);
    const boardPos = useBoundingclientrect(boardRef) || vZero;
    const { closestPin, lastMousePos, updateClosestPinAndMousePos } = useClosestPinAndMousePos(node, currentInsId, ancestorsInsIds, viewPort, boardPos, parentViewport);
    useEffect(() => {
        preloadMonaco();
    }, []);
    const { selectionBox, startSelectionBox, updateSelectionBox, endSelectionBox, } = useSelectionBox(node, boardData.viewPort, boardPos, parentViewport);
    const { onRenameIoPin, onChangeInputMode, onToggleSticky, onRemoveIoPin, onUnGroup, onNodeIoSetDescription, onChangeInstanceDisplayName, onChangeVisibleInputs, onChangeVisibleOutputs, onChangeInstanceStyle, onDeleteInstances, onAddNode, onSelectInstance, onDeleteInstance, onSelectConnection, onZoom, clearSelections, onConnectionClose, onGroupSelectedInternal, onNodeIoPinClick, onPinClick, } = useEditorCommands(lastMousePos, vpSize, isBoardInFocus);
    const fitToScreen = () => {
        const vp = fitViewPortToNode(node, vpSize);
        animateViewPort(viewPort, vp, 500, (vp) => {
            setViewPort(vp);
        });
    };
    useEffect(() => {
        if (!didCenterInitially && vpSize.width) {
            const vp = fitViewPortToNode(node, vpSize, initialPadding);
            setViewPort(vp);
            // hackidy hack
            const timer = setTimeout(() => {
                const vp = fitViewPortToNode(node, vpSize, initialPadding);
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
        const { newNode, newInstances } = pasteInstancesCommand(node, lastMousePos.current, props.clipboardData);
        onChange(newNode, functionalChange("paste instances"));
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
        onChange({ ...node }, metaChange("drag-start"));
    }, [onChange, node]);
    const onInstanceDragMove = React.useCallback((ins, event, pos) => {
        const newValue = handleInstanceDrag(node, ins, pos, event, selectedInstances, draggingId);
        onChange(newValue, metaChange("drag-move"));
    }, [draggingId, onChange, selectedInstances, node]);
    const onInstanceDragEnd = React.useCallback((_, event) => {
        event.preventDefault();
        event.stopPropagation();
        setDraggingId(undefined);
    }, []);
    const onStartDraggingNodeIo = React.useCallback((_, event) => {
        event.preventDefault();
        event.stopPropagation();
        setDraggingId(THIS_INS_ID);
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
        const newValue = produce(node, (draft) => {
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
                            draft.inputsPosition[pinId] = vAdd(draft.inputsPosition[pinId], delta);
                        }
                    }
                    // Handle other output pins
                    else if (id.startsWith('io_output_')) {
                        const pinId = id.substring('io_output_'.length);
                        if (draft.outputsPosition[pinId]) {
                            draft.outputsPosition[pinId] = vAdd(draft.outputsPosition[pinId], delta);
                        }
                    }
                    // Handle selected regular instances
                    else {
                        const ins = draft.instances.find(ins => ins.id === id);
                        if (ins) {
                            ins.pos = vAdd(ins.pos, delta);
                        }
                    }
                });
            }
        });
        onChange(newValue, metaChange("node-io-drag-move"));
    }, [onChange, node, selectedInstances]);
    const onDragEndNodeIo = React.useCallback(async (type, pin, event, data) => {
        event.preventDefault();
        event.stopPropagation();
        // const { x, y } = data;
        setDraggingId(undefined);
    }, []);
    const [isPanning, setIsPanning] = useState(false);
    const panStartPos = useRef(null);
    const onMouseDown = React.useCallback((e) => {
        if (e.button !== 0 ||
            !isEventOnCurrentBoard(e.nativeEvent, node.id)) {
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
        if (!isEventOnCurrentBoard(e.nativeEvent, node.id)) {
            return;
        }
        if (selectionBox) {
            endSelectionBox(e.shiftKey, (ids) => {
                onChangeBoardData({ selectedInstances: ids });
            });
        }
    }, [node.id, endSelectionBox, onChangeBoardData, selectionBox]);
    const onMouseMove = React.useCallback((e) => {
        if (!isEventOnCurrentBoard(e.nativeEvent, node.id)) {
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
            if (!isVisualNode(ins.node)) {
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
            if (isCodeNodeInstance(ins)) {
                setEditedNodeInstance({ ins: ins });
            }
            else if (isVisualNodeInstance(ins)) {
                if (isVisualNode(ins.node) && ins.source.type === "inline") {
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
        return entries(pins).map(([k, v]) => {
            var _a;
            return (_jsx(NodeIoView, { currentInsId: currentInsId, ancestorInsIds: props.ancestorsInsIds, type: type, pos: positionMap[k] || { x: 0, y: 0 }, id: k, onDelete: nodeIoEditable ? onRemoveIoPin : undefined, onRename: nodeIoEditable ? onRenameIoPin : undefined, closest: !!(closestPin &&
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
    useEffect(() => {
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
        backgroundPositionX: roundNumber(-viewPort.pos.x * viewPort.zoom),
        backgroundPositionY: roundNumber(-viewPort.pos.y * viewPort.zoom),
        backgroundSize: roundNumber(25 * viewPort.zoom) + "px",
    };
    // unoptimized code to get connected inputs
    const instancesConnectToPinsRef = React.useRef(new Map());
    // auto prune orphan connections if their inputs/outputs no longer exist
    usePruneOrphanConnections(instances, connections, node, onChange);
    // for each instance, if there's a visible input or output that doesn't exist, reset the visible inputs/outputs to be the full list
    React.useEffect(() => {
        let invalids = [];
        const newNode = produce(node, (draft) => {
            draft.instances = draft.instances.map((ins, idx) => {
                const node = ins.node;
                if (node) {
                    const nodeInputs = getNodeInputs(node);
                    const nodeOutputs = getNodeOutputs(node);
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
            onChange(newNode, functionalChange("reset corrupt visible inputs/outputs"));
        }
    }, [instances, onChange, node, toast, node.instances]);
    useEffect(() => {
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
    useHotkeys("shift+c", fitToScreen, { text: "Center viewport", group: "Viewport Controls" }, [], isBoardInFocus);
    useHotkeys("cmd+c, ctrl+c", onCopyInner, { text: "Copy instances", group: "Editing" }, [], isBoardInFocus);
    useHotkeys("cmd+v, ctrl+v", onPaste, { text: "Paste instances", group: "Editing" }, [], isBoardInFocus);
    useHotkeys("s", selectClosest, { text: "Select pin closest to mouse", group: "Selection" }, [], isBoardInFocus);
    useHotkeys("cmd+k, ctrl+k", (e) => {
        e.preventDefault();
        setCommandMenuOpen(true);
    }, { text: "Open command menu", group: "General" }, [], isBoardInFocus);
    const onChangeInspected = React.useCallback((changedInlineNode, type) => {
        if (!openInlineInstance) {
            throw new Error("impossible state");
        }
        const newNode = produce(node, (draft) => {
            const ins = draft.instances.find((i) => i.id === openInlineInstance.insId);
            if (!ins || !isInlineVisualNodeInstance(ins)) {
                throw new Error("impossible state");
            }
            ins.source.data = changedInlineNode;
        });
        onChange(newNode, functionalChange("Inner change: " + type.message));
        setOpenInlineInstance((obj) => ({
            ...obj,
            node: changedInlineNode,
            insId: openInlineInstance.insId
        }));
    }, [onChange, openInlineInstance, node]);
    const [inspectedBoardData, setInspectedBoardData] = useState({
        selectedInstances: [],
        selectedConnections: [],
        viewPort: defaultViewPort,
        lastMousePos: { x: 0, y: 0 },
    });
    const onChangeInspectedBoardData = React.useCallback((partial) => {
        return setInspectedBoardData((data) => ({ ...data, ...partial }));
    }, []);
    const maybeGetInlineProps = (ins) => {
        if (openInlineInstance && openInlineInstance.insId === ins.id) {
            return {
                currentInsId: openInlineInstance.insId,
                ancestorsInsIds: fullInsIdPath(currentInsId, ancestorsInsIds),
                boardData: inspectedBoardData,
                onChangeBoardData: onChangeInspectedBoardData,
                onCopy: onCopy,
                clipboardData: props.clipboardData,
                onInspectPin: props.onInspectPin,
                nodeIoEditable: props.nodeIoEditable,
                node: openInlineInstance.node,
                onChangeNode: onChangeInspected,
                parentViewport: defaultViewPort,
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
                ? { pinId: closestPin.pin, insId: THIS_INS_ID }
                : { insId: closestPin.ins.id, pinId: closestPin.pin };
            // Prevent connection between main input and output
            if (from.insId === THIS_INS_ID && to.insId === THIS_INS_ID) {
                return undefined;
            }
            return { from, to };
        }
        else if (to &&
            (((closestPin === null || closestPin === void 0 ? void 0 : closestPin.type) === "output" && (closestPin === null || closestPin === void 0 ? void 0 : closestPin.ins.id) !== node.id) ||
                ((closestPin === null || closestPin === void 0 ? void 0 : closestPin.ins.id) === node.id && (closestPin === null || closestPin === void 0 ? void 0 : closestPin.type) === "input"))) {
            const from = closestPin.ins.id === node.id
                ? { pinId: closestPin.pin, insId: THIS_INS_ID }
                : { insId: closestPin.ins.id, pinId: closestPin.pin };
            // Prevent connection between main input and output
            if (from.insId === THIS_INS_ID && to.insId === THIS_INS_ID) {
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
                type: connections.some((conn) => connectionDataEquals(conn, maybeFutureConnection))
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
                    const pos = vSub(ins.pos, vec(vpSize.width / 2, vpSize.height / 2));
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
        return !connectionDataEquals(fConn, conn);
    });
    const closeInlineEditor = React.useCallback(() => {
        setOpenInlineInstance(undefined);
        setInspectedBoardData(defaultBoardData);
    }, []);
    const toggleConnectionHidden = React.useCallback((connection) => {
        const val = produce(node, (draft) => {
            const conn = draft.connections.find((conn) => connectionDataEquals(conn, connection));
            if (!conn) {
                console.warn("connection not found", connection);
                return;
            }
            conn.hidden = !conn.hidden;
        });
        onChange(val, functionalChange("toggle connection hidden"));
    }, [onChange, node]);
    const removeConnection = React.useCallback((connection) => {
        const val = produce(node, (draft) => {
            draft.connections = draft.connections.filter((conn) => !connectionDataEquals(conn, connection));
        });
        onChange(val, functionalChange("remove connection"));
    }, [onChange, node]);
    const onPinMouseDown = React.useCallback((ins, pinId, pinType) => {
        if (pinType === "input") {
            setDraggedConnection({
                to: connectionNode(ins.id, pinId),
                from: undefined,
            });
        }
        else {
            setDraggedConnection({
                from: connectionNode(ins.id, pinId),
                to: undefined,
            });
        }
    }, []);
    const onPinMouseUp = React.useCallback((ins, pinId, pinType) => {
        if (draggedConnection) {
            if (draggedConnection.from && pinType === "input") {
                onConnectionClose(draggedConnection.from, connectionNode(ins.id, pinId), "pinDrag");
            }
            else if (draggedConnection.to && pinType === "output") {
                onConnectionClose(connectionNode(ins.id, pinId), draggedConnection.to, "pinDrag");
            }
        }
        setDraggedConnection(null);
    }, [draggedConnection, onConnectionClose]);
    const onNodeIoMouseDown = React.useCallback((id, type) => {
        if (type === "input") {
            setDraggedConnection({
                to: externalConnectionNode(id),
                from: undefined,
            });
        }
        else {
            setDraggedConnection({
                from: externalConnectionNode(id),
                to: undefined,
            });
        }
    }, []);
    const onNodeIoMouseUp = React.useCallback((id, type) => {
        if (draggedConnection) {
            if (draggedConnection.from && type === "input") {
                onConnectionClose(draggedConnection.from, externalConnectionNode(id), "nodeIoPinDrag");
            }
            else if (draggedConnection.to && type === "output") {
                onConnectionClose(externalConnectionNode(id), draggedConnection.to, "nodeIoPinDrag");
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
            const newNode = produce(node, (draft) => {
                const ins = draft.instances.find((i) => i.id === editedNodeInstance.ins.id);
                if (!ins || !isCodeNodeInstance(ins)) {
                    throw new Error(`Impossible state`);
                }
                ins.config = newInstance.config;
                ins.node = resolvedNode.node;
            });
            onChange(newNode, functionalChange("save macro instance"));
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
            const vp = fitViewPortToRect({ x: pos.x, y: pos.y, w: 1, h: 1 }, vpSize);
            vp.zoom = viewPort.zoom;
            animateViewPort(viewPort, vp, 500, (vp) => {
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
        if (isVisualNode(node)) {
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
    const [commandMenuOpen, setCommandMenuOpen] = useState(false);
    try {
        return (_jsxs(ContextMenu, { children: [_jsxs(ContextMenuTrigger, { className: classNames("visual-node-editor", props.className, {
                        dark: darkMode
                    }), "data-id": node.id, disabled: !isBoardInFocus.current, children: [_jsxs("main", { className: "board-editor-inner", onMouseDown: onMouseDown, onMouseUp: onMouseUp, onMouseMove: onMouseMove, onMouseLeave: onMouseLeave, onDragOver: onDragOver, onDrop: onDrop, ref: boardRef, style: {
                                ...backgroundStyle,
                                cursor: isPanning ? 'grabbing' : 'default',
                            }, children: [_jsx(React.Fragment, { children: _jsx(LayoutDebugger, { vp: viewPort, node: node, extraDebug: emptyList, mousePos: lastMousePos.current }) }), _jsx(ConnectionView, { currentInsId: currentInsId, ancestorsInsIds: ancestorsInsIds, size: vpSize, node: node, boardPos: boardPos, instances: node.instances, connections: connectionsToRender, futureConnection: maybeRenderFutureConnection(), onDblClick: noop, viewPort: viewPort, parentVp: parentViewport, selectedInstances: selectedInstances, selectedConnections: selectedConnections, toggleHidden: toggleConnectionHidden, removeConnection: removeConnection, onSelectConnection: onSelectConnection, lastMousePos: lastMousePos.current, draggedSource: draggedConnection }), renderMainPins("input"), instances.map((ins, idx) => {
                                    var _a, _b, _c;
                                    return (_jsx(InstanceView, { onUngroup: onUnGroup, connectionsPerInput: instancesConnectToPinsRef.current.get(ins.id) || emptyObj, ancestorsInsIds: fullInsIdPath(currentInsId, ancestorsInsIds), onPinClick: onPinClick, onPinDblClick: noop, onDragStart: onStartDraggingInstance, onDragEnd: onInstanceDragEnd, onDragMove: onInstanceDragMove, onDblClick: onDblClickInstance, onSelect: onSelectInstance, onToggleSticky: onToggleSticky, selected: selectedInstances.indexOf(ins.id) !== -1, dragged: draggingId === ins.id, increasedPinDropArea: !!draggedConnection, onInspectPin: _onInspectPin, selectedInput: to && isInternalConnectionNode(to) && to.insId === ins.id
                                            ? to.pinId
                                            : undefined, selectedOutput: from &&
                                            isInternalConnectionNode(from) &&
                                            from.insId === ins.id
                                            ? from.pinId
                                            : undefined, closestPin: closestPin && closestPin.ins.id === ins.id
                                            ? closestPin
                                            : undefined, queuedInputsData: (_a = queueInputsData === null || queueInputsData === void 0 ? void 0 : queueInputsData[ins.id]) !== null && _a !== void 0 ? _a : emptyObj, instance: ins, connections: connections, 
                                        // was too lazy to remove/fix the breakpoint/log below
                                        onTogglePinBreakpoint: noop, onTogglePinLog: noop, 
                                        // onTogglePinLog={onToggleLog}
                                        // onTogglePinBreakpoint={onToggleBreakpoint}
                                        viewPort: viewPort, onChangeVisibleInputs: onChangeVisibleInputs, onChangeVisibleOutputs: onChangeVisibleOutputs, onSetDisplayName: onChangeInstanceDisplayName, onDeleteInstance: onDeleteInstance, forceShowMinimized: from || (draggedConnection === null || draggedConnection === void 0 ? void 0 : draggedConnection.from)
                                            ? "input"
                                            : to || (draggedConnection === null || draggedConnection === void 0 ? void 0 : draggedConnection.to)
                                                ? "output"
                                                : undefined, isConnectedInstanceSelected: selectedInstances.some((selInsId) => connections.some(({ from, to }) => {
                                            return ((from.insId === ins.id && to.insId === selInsId) ||
                                                (from.insId === selInsId && to.insId === ins.id));
                                        })), inlineGroupProps: maybeGetInlineProps(ins), onCloseInlineEditor: closeInlineEditor, inlineEditorPortalDomNode: inlineEditorPortalRootRef.current, onChangeStyle: onChangeInstanceStyle, onGroupSelected: onGroupSelectedInternal, onPinMouseDown: onPinMouseDown, onPinMouseUp: onPinMouseUp, onViewForkCode: onViewForkCode, hadError: (_c = (_b = props.instancesWithErrors) === null || _b === void 0 ? void 0 : _b.has(fullInsIdPath(ins.id))) !== null && _c !== void 0 ? _c : false }, ins.id));
                                }), _jsx(SelectionBox, { selectionBox: selectionBox, viewPort: viewPort }), renderMainPins("output"), _jsx("div", { className: "absolute top-4 right-5 z-10", children: _jsxs(Button, { variant: "outline", onClick: () => setCommandMenuOpen(true), className: "add-nodes border shadow-sm relative group inline-flex items-center gap-1 dark:bg-neutral-900 dark:border-neutral-950 px-2 h-8 dark:hover:bg-neutral-950 bg-neutral-100 border-neutral-200 hover:border-neutral-300", children: [_jsx("span", { className: "size-5", children: _jsx(Plus, { className: "w-5 h-5 dark:text-white text-neutral-800" }) }), " ", _jsx(HotkeyIndication, { hotkey: "cmd+K" })] }) }), _jsxs("div", { className: "viewport-controls-and-help", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: fitToScreen, children: "Center" }), _jsx(Slider, { min: 0.3, max: 2, step: 0.05, className: "w-[100px]", value: [viewPort.zoom], onValueChange: ([value]) => onZoom(value !== null && value !== void 0 ? value : 0) }), isRootInstance ? _jsx(HelpBubble, {}) : null] }), editedNodeInstance ? (_jsx(InstanceConfigEditor, { onCancel: () => setEditedNodeInstance(undefined), onSubmit: onSaveInstanceConfig, ins: editedNodeInstance.ins, editorNode: node, onFork: onViewForkCode })) : null, _jsx("div", { className: "inline-editor-portal-root" }), _jsx(CommandMenu, { open: commandMenuOpen, onOpenChange: setCommandMenuOpen, onAddNode: onAddNode, onClickCustomNode: () => setIsAddingCustomNode(true) })] }), selectionIndicatorData ? (_jsx(SelectionIndicator, { selection: selectionIndicatorData, onCenter: onCenterSelection, onGroup: onGroupSelectedInternal, onDelete: onDeleteInstances })) : null, _jsx(OnboardingTips, {}), isAddingCustomNode ? (_jsx(CustomNodeModal, { isOpen: isAddingCustomNode, onClose: () => {
                                setIsAddingCustomNode(false);
                                setCustomNodeForkData(undefined);
                            }, onSave: onSaveCustomNode, forkMode: customNodeForkData })) : null, _jsx("div", { className: "run-btn-container", children: _jsxs(Button, { className: "run-btn absolute top-4 left-1/2 -translate-x-1/2 z-10", onClick: openRunModal, size: "sm", variant: "outline", children: [_jsx(Play, { className: "mr h-3 w-3" }), "Test Flow"] }) }), runModalVisible ? (_jsx(RunFlowModal, { node: node, onClose: closeRunModal })) : null] }), _jsx(EditorContextMenu, { nodeIoEditable: nodeIoEditable, lastMousePos: lastMousePos, onOpenNodesLibrary: () => setCommandMenuOpen(true) }), _jsx(Toaster, {})] }));
    }
    catch (e) {
        console.error(e);
        return _jsxs("div", { children: ["Error rendering board - ", e.toString()] });
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlzdWFsTm9kZUVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvVmlzdWFsTm9kZUVkaXRvci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRS9CLE9BQU8sRUFDTCxXQUFXLEVBQ1gsMEJBQTBCLEVBQzFCLGtCQUFrQixFQUVsQix3QkFBd0IsRUFHeEIsWUFBWSxFQUNaLG9CQUFvQixFQUVwQixJQUFJLEVBQ0osY0FBYyxFQUVkLGFBQWEsRUFDYixzQkFBc0IsRUFDdEIsYUFBYSxFQUViLGNBQWMsRUFJZCxvQkFBb0IsR0FNckIsTUFBTSxhQUFhLENBQUM7QUFFckIsT0FBTyxFQUFFLFlBQVksRUFBcUIsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRSxPQUFPLEVBQ0wsY0FBYyxHQUVmLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLE9BQU8sRUFBUSxNQUFNLFVBQVUsQ0FBQztBQUV6QyxPQUFPLEVBQ0wsV0FBVyxFQUNYLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsSUFBSSxHQUNMLE1BQU0sT0FBTyxDQUFDO0FBQ2YsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFdBQVcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUUzRCxPQUFPLEVBQ0wsUUFBUSxFQUVSLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsa0JBQWtCLEVBQ2xCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsaUJBQWlCLEVBQ2pCLHFCQUFxQixHQUN0QixNQUFNLFNBQVMsQ0FBQztBQUVqQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFbEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQWEsTUFBTSxPQUFPLENBQUM7QUFDL0QsT0FBTyxF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