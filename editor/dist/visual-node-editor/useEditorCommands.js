"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEditorCommands = useEditorCommands;
const core_1 = require("@flyde/core");
const react_1 = __importDefault(require("react"));
const __1 = require("..");
const flyde_flow_change_type_1 = require("../flow-editor/flyde-flow-change-type");
const VisualNodeEditorContext_1 = require("./VisualNodeEditorContext");
const immer_1 = __importDefault(require("immer"));
const duplicate_instances_1 = require("./commands/duplicate-instances");
const group_selected_1 = require("../group-selected");
const close_connection_1 = require("./commands/close-connection");
const ui_1 = require("../ui");
function useEditorCommands(lastMousePos, vpSize, isBoardInFocus) {
    const { node, onChangeNode: onChange, onChangeBoardData, boardData, } = (0, VisualNodeEditorContext_1.useVisualNodeEditorContext)();
    const { from, to, viewPort, selectedInstances, selectedConnections } = boardData;
    const _prompt = (0, __1.usePrompt)();
    const _confirm = (0, __1.useConfirm)();
    const { toast } = (0, ui_1.useToast)();
    const { reportEvent, resolveInstance } = (0, __1.usePorts)();
    const onRenameIoPin = react_1.default.useCallback(async (type, pinId) => {
        const newName = (await _prompt("New name?", pinId)) || pinId;
        const newValue = (0, __1.handleIoPinRename)(node, type, pinId, newName);
        onChange(newValue, (0, flyde_flow_change_type_1.functionalChange)("rename io pin"));
    }, [node, onChange, _prompt]);
    const onChangeInputMode = react_1.default.useCallback((pinId, mode) => {
        const newValue = (0, __1.handleChangeNodeInputType)(node, pinId, mode);
        onChange(newValue, (0, flyde_flow_change_type_1.functionalChange)("toggle io pin optional"));
    }, [node, onChange]);
    const onToggleSticky = react_1.default.useCallback((ins, pinId, forceValue) => {
        const currConfig = (0, __1.getInstancePinConfig)(node, ins.id, pinId);
        const newConfig = (0, core_1.isStickyInputPinConfig)(currConfig)
            ? (0, core_1.queueInputPinConfig)()
            : (0, core_1.stickyInputPinConfig)();
        onChange((0, __1.changePinConfig)(node, ins.id, pinId, newConfig), (0, flyde_flow_change_type_1.functionalChange)("toggle-sticky"));
        reportEvent("togglePinSticky", {
            isSticky: (0, core_1.isStickyInputPinConfig)(newConfig),
        });
    }, [onChange, node, reportEvent]);
    const onRemoveIoPin = react_1.default.useCallback((type, pinId) => {
        const newValue = (0, immer_1.default)(node, (draft) => {
            if (type === "input") {
                delete draft.inputs[pinId];
                draft.connections = draft.connections.filter((conn) => !((0, core_1.isExternalConnectionNode)(conn.from) && conn.from.pinId === pinId));
            }
            else {
                draft.connections = draft.connections.filter((conn) => !((0, core_1.isExternalConnectionNode)(conn.to) && conn.to.pinId === pinId));
                draft.completionOutputs = (draft.completionOutputs || [])
                    .map((comp) => {
                    const arr = comp.split("+"); // due to the r1+r1,r3 hack, see core tests
                    return arr.filter((pin) => pin !== pinId).join("+");
                })
                    .filter((i) => !!i);
                delete draft.outputs[pinId];
            }
        });
        if (from && from.insId === core_1.THIS_INS_ID && from.pinId === pinId) {
            onChangeBoardData({ from: undefined });
        }
        else if (to && to.insId === core_1.THIS_INS_ID && to.pinId === pinId) {
            onChangeBoardData({ to: undefined });
        }
        onChange(newValue, (0, flyde_flow_change_type_1.functionalChange)("remove io pin"));
    }, [node, from, to, onChange, onChangeBoardData]);
    const onDeleteInstances = react_1.default.useCallback((ids) => {
        const newConnections = node.connections.filter(({ from, to }) => {
            return (!ids.includes((0, __1.getConnectionId)({ from, to })) &&
                !ids.includes(from.insId) &&
                !ids.includes(to.insId));
        });
        const newValue = (0, immer_1.default)(node, (draft) => {
            draft.connections = newConnections;
            draft.instances = draft.instances.filter((_ins) => !ids.includes(_ins.id));
        });
        onChangeBoardData({ selectedInstances: [], selectedConnections: [] });
        onChange(newValue, (0, flyde_flow_change_type_1.functionalChange)("delete-ins"));
    }, [onChange, onChangeBoardData, node]);
    const onUnGroup = react_1.default.useCallback((groupNodeIns) => {
        if ((0, core_1.isInlineVisualNodeInstance)(groupNodeIns)) {
            const visualNode = groupNodeIns.source.data;
            if (!(0, core_1.isVisualNode)(visualNode)) {
                toast({
                    description: "Not supported",
                    variant: "destructive",
                });
                return;
            }
            const newNode = (0, immer_1.default)(node, (draft) => {
                draft.instances = draft.instances.filter((ins) => ins.id !== groupNodeIns.id);
                draft.connections = draft.connections.filter(({ from, to }) => from.insId !== groupNodeIns.id && to.insId !== groupNodeIns.id);
                draft.instances.push(...visualNode.instances);
                draft.connections.push(...visualNode.connections.filter((conn) => {
                    return ((0, core_1.isInternalConnectionNode)(conn.from) &&
                        (0, core_1.isInternalConnectionNode)(conn.to));
                }));
            });
            onChange(newNode, { type: "functional", message: "ungroup" });
            // todo - combine the above with below to an atomic action
            onChangeBoardData({ selectedInstances: [] });
        }
        else {
            toast({
                description: "Cannot ungroup an imported group",
                variant: "destructive",
            });
        }
    }, [node, onChange, onChangeBoardData, toast]);
    const onNodeIoSetDescription = react_1.default.useCallback((type, pinId, description) => {
        const newNode = (0, immer_1.default)(node, (draft) => {
            if (type === "input") {
                if (!draft.inputs[pinId]) {
                    throw new Error("Pin does not exist");
                }
                draft.inputs[pinId].description = description;
            }
            else {
                if (!draft.outputs[pinId]) {
                    throw new Error("Pin does not exist");
                }
                draft.outputs[pinId].description = description;
            }
        });
        onChange(newNode, (0, flyde_flow_change_type_1.functionalChange)("Node io description"));
    }, [onChange, node]);
    const onChangeInstanceDisplayName = react_1.default.useCallback((ins, name) => {
        const newNode = (0, immer_1.default)(node, (draft) => {
            draft.instances = draft.instances.map((i) => {
                return i.id === ins.id ? { ...i, displayName: name } : i;
            });
        });
        onChange(newNode, (0, flyde_flow_change_type_1.functionalChange)("change instance display name"));
    }, [node, onChange]);
    const onChangeVisibleInputs = react_1.default.useCallback((ins, inputs) => {
        const newNode = (0, immer_1.default)(node, (draft) => {
            draft.instances = draft.instances.map((i) => {
                return i.id === ins.id ? { ...i, visibleInputs: inputs } : i;
            });
        });
        onChange(newNode, (0, flyde_flow_change_type_1.functionalChange)("change instance visible inputs"));
    }, [node, onChange]);
    const onChangeInstanceStyle = react_1.default.useCallback((instance, style) => {
        const newNode = (0, immer_1.default)(node, (draft) => {
            draft.instances = draft.instances.map((ins) => {
                return ins.id === instance.id ? { ...ins, style } : ins;
            });
        });
        onChange(newNode, (0, flyde_flow_change_type_1.functionalChange)("change instance style"));
        reportEvent("changeStyle", { isDefault: false });
    }, [onChange, node, reportEvent]);
    const onChangeVisibleOutputs = react_1.default.useCallback((ins, outputs) => {
        const newNode = (0, immer_1.default)(node, (draft) => {
            draft.instances = draft.instances.map((i) => {
                return i.id === ins.id ? { ...i, visibleOutputs: outputs } : i;
            });
        });
        onChange(newNode, (0, flyde_flow_change_type_1.functionalChange)("change instance visible outputs"));
    }, [node, onChange]);
    const deleteSelection = react_1.default.useCallback(async () => {
        const { selectedConnections, selectedInstances, from, to } = boardData;
        const idsToDelete = [...selectedInstances, ...selectedConnections];
        if (idsToDelete.length === 0) {
            if (from && (0, core_1.isExternalConnectionNode)(from)) {
                if (await _confirm(`Are you sure you want to remove main input ${from.pinId}?`)) {
                    onRemoveIoPin("input", from.pinId);
                }
            }
            else if (to && (0, core_1.isExternalConnectionNode)(to)) {
                if (await _confirm(`Are you sure you want to remove main output ${to.pinId}?`)) {
                    onRemoveIoPin("output", to.pinId);
                }
            }
        }
        else {
            onDeleteInstances(idsToDelete);
        }
    }, [_confirm, boardData, onDeleteInstances, onRemoveIoPin]);
    const onAddNode = react_1.default.useCallback(async (importableNode, position) => {
        // Calculate the center of the viewport
        const targetPos = {
            x: viewPort.pos.x + vpSize.width / (2 * viewPort.zoom),
            y: viewPort.pos.y + vpSize.height / (2 * viewPort.zoom),
        };
        const newNodeIns = (0, __1.createNewNodeInstance)(importableNode, 0, targetPos);
        const newNode = (0, immer_1.default)(node, (draft) => {
            draft.instances.push(newNodeIns);
        });
        const newState = (0, immer_1.default)(boardData, (draft) => {
            draft.selectedInstances = [newNodeIns.id];
        });
        onChange(newNode, (0, flyde_flow_change_type_1.functionalChange)("add new instance"));
        onChangeBoardData(newState);
        reportEvent("addNode", {
            nodeId: importableNode.id,
            source: "actionMenu",
        });
        // ugly hack to resolve advanced configs lazyly - TODO - make this part of the "get library data" mechanism
        const maybeEditorConfig = importableNode.editorNode.editorConfig;
        if (maybeEditorConfig && maybeEditorConfig.type === "custom") {
            resolveInstance({ instance: newNodeIns }).then((resolvedNode) => {
                const newNode = (0, immer_1.default)(node, (draft) => {
                    draft.instances.push(resolvedNode);
                });
                onChange(newNode, (0, flyde_flow_change_type_1.functionalChange)("add node - resolved"));
            });
        }
    }, [boardData, node, onChange, onChangeBoardData, reportEvent, resolveInstance, viewPort.pos.x, viewPort.pos.y, viewPort.zoom, vpSize.height, vpSize.width]);
    const onSelectInstance = react_1.default.useCallback(({ id }, ev) => {
        const newSelectedIfSelectionExists = ev.shiftKey
            ? selectedInstances.filter((sid) => sid !== id)
            : [];
        const newSelectedIfSelectionIsNew = ev.shiftKey
            ? [...selectedInstances, id]
            : [id];
        const newSelected = selectedInstances.includes(id)
            ? newSelectedIfSelectionExists
            : newSelectedIfSelectionIsNew;
        onChangeBoardData({
            selectedInstances: newSelected,
            selectedConnections: [],
            from: undefined,
            to: undefined,
        });
    }, [onChangeBoardData, selectedInstances]);
    const selectAll = react_1.default.useCallback(() => {
        const allIds = node.instances.map((i) => i.id);
        onChangeBoardData({
            selectedInstances: allIds,
            selectedConnections: [],
            from: undefined,
            to: undefined,
        });
    }, [onChangeBoardData, node.instances]);
    const onDeleteInstance = react_1.default.useCallback((ins) => {
        onDeleteInstances([ins.id]);
    }, [onDeleteInstances]);
    const duplicate = react_1.default.useCallback(() => {
        const { newNode, newInstancesIds } = (0, duplicate_instances_1.handleDuplicateSelectedEditorCommand)(node, selectedInstances);
        onChange(newNode, (0, flyde_flow_change_type_1.functionalChange)("duplicated instances"));
        onChangeBoardData({
            selectedInstances: newInstancesIds,
        });
        // onChange(duplicateSelected(value), functionalChange("duplicate"));
    }, [onChange, onChangeBoardData, node, selectedInstances]);
    const onSelectConnection = react_1.default.useCallback((connection, ev) => {
        const connectionId = (0, __1.getConnectionId)(connection);
        const newSelected = selectedConnections.includes(connectionId)
            ? selectedConnections.filter((id) => id !== connectionId)
            : [...(ev.shiftKey ? selectedConnections : []), connectionId];
        onChangeBoardData({
            selectedConnections: newSelected,
            selectedInstances: [],
        });
    }, [onChangeBoardData, selectedConnections]);
    const onZoom = react_1.default.useCallback((_newZoom, source) => {
        const newZoom = Math.min(Math.max(_newZoom, 0.3), 2);
        const targetPos = source === "mouse"
            ? lastMousePos.current
            : {
                x: viewPort.pos.x + vpSize.width / 2,
                y: viewPort.pos.y + vpSize.height / 2,
            };
        const newPos = (0, __1.centerBoardPosOnTarget)(targetPos, vpSize, newZoom, viewPort);
        onChangeBoardData({
            viewPort: { ...viewPort, zoom: newZoom, pos: newPos },
            // const newCenter = centerBoardPosOnTarget(lastMousePos.current, vpSize, newZoom, viewPort);
        });
    }, [lastMousePos, onChangeBoardData, viewPort, vpSize]);
    const clearSelections = react_1.default.useCallback(() => {
        onChangeBoardData({
            from: undefined,
            to: undefined,
            selectedInstances: [],
            selectedConnections: [],
        });
    }, [onChangeBoardData]);
    const onConnectionClose = react_1.default.useCallback((from, to, source) => {
        // Prevent connection between main input and output
        if (from.insId === core_1.THIS_INS_ID && to.insId === core_1.THIS_INS_ID) {
            toast({
                description: "Cannot connect main input to main output",
                variant: "destructive",
            });
            return;
        }
        const newNode = (0, close_connection_1.handleConnectionCloseEditorCommand)(node, {
            from,
            to,
        });
        onChange(newNode, (0, flyde_flow_change_type_1.functionalChange)("close-connection"));
        onChangeBoardData({ from: undefined, to: undefined });
        reportEvent("createConnection", { source });
    }, [onChange, onChangeBoardData, node, reportEvent, toast]);
    const onGroupSelectedInternal = react_1.default.useCallback(async () => {
        const name = await _prompt("New visual node name?");
        if (!name)
            return;
        const { currentNode } = await (0, group_selected_1.groupSelected)(boardData.selectedInstances, node, name, _prompt);
        onChange(currentNode, (0, flyde_flow_change_type_1.functionalChange)("group node"));
        onChangeBoardData({ selectedInstances: [] });
        toast({
            description: "Node grouped",
        });
        reportEvent("groupSelected", {
            count: boardData.selectedInstances.length,
        });
    }, [
        _prompt,
        boardData.selectedInstances,
        node,
        onChange,
        onChangeBoardData,
        reportEvent,
        toast,
    ]);
    const onNodeIoPinClick = react_1.default.useCallback((pinId, type, event) => {
        const { to: currTo, from: currFrom, selectedInstances } = boardData;
        const ioId = `io_${type}_${pinId}`;
        // If shift key is pressed, toggle selection of this pin as part of a multi-select
        if (event === null || event === void 0 ? void 0 : event.shiftKey) {
            const newSelected = selectedInstances.includes(ioId)
                ? selectedInstances.filter(id => id !== ioId)
                : [...selectedInstances, ioId];
            onChangeBoardData({
                selectedInstances: newSelected,
                from: undefined,
                to: undefined
            });
            return;
        }
        const relevantCurrPin = type === "input" ? currFrom : currTo;
        const relevantTargetPin = type === "input" ? currTo : currFrom;
        const newPin = { pinId, insId: core_1.THIS_INS_ID };
        const targetObj = type === "input" ? { from: newPin } : { to: newPin };
        if (relevantCurrPin && relevantCurrPin.pinId === pinId) {
            // selecting the same pin so deselect both
            onChangeBoardData({ from: undefined, to: undefined });
        }
        else if (!relevantTargetPin) {
            // nothing was selected, selecting a new pin
            onChangeBoardData({
                ...targetObj,
                selectedInstances: [], // Clear selected instances when selecting a pin
            });
        }
        else {
            //close the connection if we have a target match
            if (type === "input" && currTo) {
                onConnectionClose(newPin, currTo, "nodeIoClick");
            }
            else if (currFrom) {
                onConnectionClose(currFrom, newPin, "nodeIoClick");
            }
        }
    }, [boardData, onChangeBoardData, onConnectionClose]);
    const onPinClick = react_1.default.useCallback((ins, pinId, type) => {
        const { from: currFrom, to: currTo } = boardData;
        if ((from && from.insId === ins.id) || (to && to.insId === ins.id)) {
            // trying to connect the same instance to itself, so clear selection
            onChangeBoardData({ from: undefined, to: undefined });
        }
        else if (type === "input") {
            const to = { insId: ins.id, pinId };
            // is selecting same one
            if (currTo &&
                currTo.pinId === pinId &&
                ((0, core_1.isInternalConnectionNode)(currTo) ? currTo.insId === ins.id : true)) {
                onChangeBoardData({ to: undefined });
            }
            else if (from) {
                onConnectionClose(from, to, "pinClick");
            }
            else {
                onChangeBoardData({
                    to,
                    selectedInstances: [],
                    selectedConnections: [],
                });
            }
        }
        else {
            const from = { insId: ins.id, pinId };
            if (currFrom &&
                currFrom.pinId === pinId &&
                ((0, core_1.isInternalConnectionNode)(currFrom)
                    ? currFrom.insId === ins.id
                    : true)) {
                onChangeBoardData({ from: undefined });
            }
            else if (to) {
                onConnectionClose(from, to, "pinClick");
            }
            else {
                onChangeBoardData({
                    from,
                    selectedInstances: [],
                    selectedConnections: [],
                });
            }
        }
    }, [boardData, from, onChangeBoardData, onConnectionClose, to]);
    (0, __1.useHotkeys)("cmd+=, ctrl+=", (e) => {
        onZoom(viewPort.zoom + 0.1, "hotkey");
        e.preventDefault();
    }, { text: "Zoom in board", group: "Viewport Controls" }, [viewPort, onZoom], isBoardInFocus);
    (0, __1.useHotkeys)("cmd+-, ctrl+-", (e) => {
        onZoom(viewPort.zoom - 0.1, "hotkey");
        e.preventDefault();
    }, { text: "Zoom out board", group: "Viewport Controls" }, [onZoom, viewPort.zoom], isBoardInFocus);
    (0, __1.useHotkeys)("cmd+0, ctrl+0", (e) => {
        onZoom(1);
        e.preventDefault();
    }, { text: "Reset zoom", group: "Viewport Controls" }, [viewPort, onZoom], isBoardInFocus);
    (0, __1.useHotkeys)("backspace, delete", deleteSelection, { text: "Delete instances", group: "Editing" }, [], isBoardInFocus);
    (0, __1.useHotkeys)("cmd+d, ctrl+d", (e) => {
        e.preventDefault();
        duplicate();
    }, { text: "Duplicate selected instances", group: "Editing" }, [], isBoardInFocus);
    (0, __1.useHotkeys)("cmd+a, ctrl+a", selectAll, { text: "Select all", group: "Selection" }, [], isBoardInFocus);
    (0, __1.useHotkeys)("esc", clearSelections, { text: "Clear selections", group: "Selection" }, [], isBoardInFocus);
    return {
        onRenameIoPin,
        onChangeInputMode,
        onToggleSticky,
        onRemoveIoPin,
        onDeleteInstances,
        onUnGroup,
        onNodeIoSetDescription,
        onChangeInstanceDisplayName,
        onChangeVisibleInputs,
        onChangeVisibleOutputs,
        onChangeInstanceStyle,
        deleteSelection,
        onAddNode,
        onSelectInstance,
        selectAll,
        onDeleteInstance,
        duplicate,
        onSelectConnection,
        onZoom,
        clearSelections,
        onConnectionClose,
        onGroupSelectedInternal,
        onNodeIoPinClick,
        onPinClick,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlRWRpdG9yQ29tbWFuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL3VzZUVkaXRvckNvbW1hbmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBNENBLDhDQWlvQkM7QUE3cUJELHNDQW9CcUI7QUFDckIsa0RBQTBCO0FBQzFCLDBCQWFZO0FBQ1osa0ZBQXlFO0FBQ3pFLHVFQUF1RTtBQUN2RSxrREFBNEI7QUFDNUIsd0VBQXNGO0FBQ3RGLHNEQUFrRDtBQUNsRCxrRUFBaUY7QUFDakYsOEJBQWlDO0FBRWpDLFNBQWdCLGlCQUFpQixDQUMvQixZQUF5QyxFQUN6QyxNQUFZLEVBQ1osY0FBK0M7SUFFL0MsTUFBTSxFQUNKLElBQUksRUFDSixZQUFZLEVBQUUsUUFBUSxFQUN0QixpQkFBaUIsRUFDakIsU0FBUyxHQUNWLEdBQUcsSUFBQSxvREFBMEIsR0FBRSxDQUFDO0lBRWpDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxHQUNsRSxTQUFTLENBQUM7SUFFWixNQUFNLE9BQU8sR0FBRyxJQUFBLGFBQVMsR0FBRSxDQUFDO0lBQzVCLE1BQU0sUUFBUSxHQUFHLElBQUEsY0FBVSxHQUFFLENBQUM7SUFFOUIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUEsYUFBUSxHQUFFLENBQUM7SUFFN0IsTUFBTSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsR0FBRyxJQUFBLFlBQVEsR0FBRSxDQUFDO0lBRXBELE1BQU0sYUFBYSxHQUFHLGVBQUssQ0FBQyxXQUFXLENBQ3JDLEtBQUssRUFBRSxJQUFhLEVBQUUsS0FBYSxFQUFFLEVBQUU7UUFDckMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUM7UUFDN0QsTUFBTSxRQUFRLEdB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