import { isStickyInputPinConfig, queueInputPinConfig, stickyInputPinConfig, THIS_INS_ID, isInternalConnectionNode, isVisualNode, isInlineVisualNodeInstance, isExternalConnectionNode, } from "@flyde/core";
import React from "react";
import { handleIoPinRename, handleChangeNodeInputType, getInstancePinConfig, changePinConfig, usePrompt, usePorts, getConnectionId, useConfirm, createNewNodeInstance, centerBoardPosOnTarget, useHotkeys, } from "..";
import { functionalChange } from "../flow-editor/flyde-flow-change-type";
import { useVisualNodeEditorContext } from "./VisualNodeEditorContext";
import produce from "immer";
import { handleDuplicateSelectedEditorCommand } from "./commands/duplicate-instances";
import { groupSelected } from "../group-selected";
import { handleConnectionCloseEditorCommand } from "./commands/close-connection";
import { useToast } from "../ui";
export function useEditorCommands(lastMousePos, vpSize, isBoardInFocus) {
    const { node, onChangeNode: onChange, onChangeBoardData, boardData, } = useVisualNodeEditorContext();
    const { from, to, viewPort, selectedInstances, selectedConnections } = boardData;
    const _prompt = usePrompt();
    const _confirm = useConfirm();
    const { toast } = useToast();
    const { reportEvent, resolveInstance } = usePorts();
    const onRenameIoPin = React.useCallback(async (type, pinId) => {
        const newName = (await _prompt("New name?", pinId)) || pinId;
        const newValue = handleIoPinRename(node, type, pinId, newName);
        onChange(newValue, functionalChange("rename io pin"));
    }, [node, onChange, _prompt]);
    const onChangeInputMode = React.useCallback((pinId, mode) => {
        const newValue = handleChangeNodeInputType(node, pinId, mode);
        onChange(newValue, functionalChange("toggle io pin optional"));
    }, [node, onChange]);
    const onToggleSticky = React.useCallback((ins, pinId, forceValue) => {
        const currConfig = getInstancePinConfig(node, ins.id, pinId);
        const newConfig = isStickyInputPinConfig(currConfig)
            ? queueInputPinConfig()
            : stickyInputPinConfig();
        onChange(changePinConfig(node, ins.id, pinId, newConfig), functionalChange("toggle-sticky"));
        reportEvent("togglePinSticky", {
            isSticky: isStickyInputPinConfig(newConfig),
        });
    }, [onChange, node, reportEvent]);
    const onRemoveIoPin = React.useCallback((type, pinId) => {
        const newValue = produce(node, (draft) => {
            if (type === "input") {
                delete draft.inputs[pinId];
                draft.connections = draft.connections.filter((conn) => !(isExternalConnectionNode(conn.from) && conn.from.pinId === pinId));
            }
            else {
                draft.connections = draft.connections.filter((conn) => !(isExternalConnectionNode(conn.to) && conn.to.pinId === pinId));
                draft.completionOutputs = (draft.completionOutputs || [])
                    .map((comp) => {
                    const arr = comp.split("+"); // due to the r1+r1,r3 hack, see core tests
                    return arr.filter((pin) => pin !== pinId).join("+");
                })
                    .filter((i) => !!i);
                delete draft.outputs[pinId];
            }
        });
        if (from && from.insId === THIS_INS_ID && from.pinId === pinId) {
            onChangeBoardData({ from: undefined });
        }
        else if (to && to.insId === THIS_INS_ID && to.pinId === pinId) {
            onChangeBoardData({ to: undefined });
        }
        onChange(newValue, functionalChange("remove io pin"));
    }, [node, from, to, onChange, onChangeBoardData]);
    const onDeleteInstances = React.useCallback((ids) => {
        const newConnections = node.connections.filter(({ from, to }) => {
            return (!ids.includes(getConnectionId({ from, to })) &&
                !ids.includes(from.insId) &&
                !ids.includes(to.insId));
        });
        const newValue = produce(node, (draft) => {
            draft.connections = newConnections;
            draft.instances = draft.instances.filter((_ins) => !ids.includes(_ins.id));
        });
        onChangeBoardData({ selectedInstances: [], selectedConnections: [] });
        onChange(newValue, functionalChange("delete-ins"));
    }, [onChange, onChangeBoardData, node]);
    const onUnGroup = React.useCallback((groupNodeIns) => {
        if (isInlineVisualNodeInstance(groupNodeIns)) {
            const visualNode = groupNodeIns.source.data;
            if (!isVisualNode(visualNode)) {
                toast({
                    description: "Not supported",
                    variant: "destructive",
                });
                return;
            }
            const newNode = produce(node, (draft) => {
                draft.instances = draft.instances.filter((ins) => ins.id !== groupNodeIns.id);
                draft.connections = draft.connections.filter(({ from, to }) => from.insId !== groupNodeIns.id && to.insId !== groupNodeIns.id);
                draft.instances.push(...visualNode.instances);
                draft.connections.push(...visualNode.connections.filter((conn) => {
                    return (isInternalConnectionNode(conn.from) &&
                        isInternalConnectionNode(conn.to));
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
    const onNodeIoSetDescription = React.useCallback((type, pinId, description) => {
        const newNode = produce(node, (draft) => {
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
        onChange(newNode, functionalChange("Node io description"));
    }, [onChange, node]);
    const onChangeInstanceDisplayName = React.useCallback((ins, name) => {
        const newNode = produce(node, (draft) => {
            draft.instances = draft.instances.map((i) => {
                return i.id === ins.id ? { ...i, displayName: name } : i;
            });
        });
        onChange(newNode, functionalChange("change instance display name"));
    }, [node, onChange]);
    const onChangeVisibleInputs = React.useCallback((ins, inputs) => {
        const newNode = produce(node, (draft) => {
            draft.instances = draft.instances.map((i) => {
                return i.id === ins.id ? { ...i, visibleInputs: inputs } : i;
            });
        });
        onChange(newNode, functionalChange("change instance visible inputs"));
    }, [node, onChange]);
    const onChangeInstanceStyle = React.useCallback((instance, style) => {
        const newNode = produce(node, (draft) => {
            draft.instances = draft.instances.map((ins) => {
                return ins.id === instance.id ? { ...ins, style } : ins;
            });
        });
        onChange(newNode, functionalChange("change instance style"));
        reportEvent("changeStyle", { isDefault: false });
    }, [onChange, node, reportEvent]);
    const onChangeVisibleOutputs = React.useCallback((ins, outputs) => {
        const newNode = produce(node, (draft) => {
            draft.instances = draft.instances.map((i) => {
                return i.id === ins.id ? { ...i, visibleOutputs: outputs } : i;
            });
        });
        onChange(newNode, functionalChange("change instance visible outputs"));
    }, [node, onChange]);
    const deleteSelection = React.useCallback(async () => {
        const { selectedConnections, selectedInstances, from, to } = boardData;
        const idsToDelete = [...selectedInstances, ...selectedConnections];
        if (idsToDelete.length === 0) {
            if (from && isExternalConnectionNode(from)) {
                if (await _confirm(`Are you sure you want to remove main input ${from.pinId}?`)) {
                    onRemoveIoPin("input", from.pinId);
                }
            }
            else if (to && isExternalConnectionNode(to)) {
                if (await _confirm(`Are you sure you want to remove main output ${to.pinId}?`)) {
                    onRemoveIoPin("output", to.pinId);
                }
            }
        }
        else {
            onDeleteInstances(idsToDelete);
        }
    }, [_confirm, boardData, onDeleteInstances, onRemoveIoPin]);
    const onAddNode = React.useCallback(async (importableNode, position) => {
        // Calculate the center of the viewport
        const targetPos = {
            x: viewPort.pos.x + vpSize.width / (2 * viewPort.zoom),
            y: viewPort.pos.y + vpSize.height / (2 * viewPort.zoom),
        };
        const newNodeIns = createNewNodeInstance(importableNode, 0, targetPos);
        const newNode = produce(node, (draft) => {
            draft.instances.push(newNodeIns);
        });
        const newState = produce(boardData, (draft) => {
            draft.selectedInstances = [newNodeIns.id];
        });
        onChange(newNode, functionalChange("add new instance"));
        onChangeBoardData(newState);
        reportEvent("addNode", {
            nodeId: importableNode.id,
            source: "actionMenu",
        });
        // ugly hack to resolve advanced configs lazyly - TODO - make this part of the "get library data" mechanism
        const maybeEditorConfig = importableNode.editorNode.editorConfig;
        if (maybeEditorConfig && maybeEditorConfig.type === "custom") {
            resolveInstance({ instance: newNodeIns }).then((resolvedNode) => {
                const newNode = produce(node, (draft) => {
                    draft.instances.push(resolvedNode);
                });
                onChange(newNode, functionalChange("add node - resolved"));
            });
        }
    }, [boardData, node, onChange, onChangeBoardData, reportEvent, resolveInstance, viewPort.pos.x, viewPort.pos.y, viewPort.zoom, vpSize.height, vpSize.width]);
    const onSelectInstance = React.useCallback(({ id }, ev) => {
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
    const selectAll = React.useCallback(() => {
        const allIds = node.instances.map((i) => i.id);
        onChangeBoardData({
            selectedInstances: allIds,
            selectedConnections: [],
            from: undefined,
            to: undefined,
        });
    }, [onChangeBoardData, node.instances]);
    const onDeleteInstance = React.useCallback((ins) => {
        onDeleteInstances([ins.id]);
    }, [onDeleteInstances]);
    const duplicate = React.useCallback(() => {
        const { newNode, newInstancesIds } = handleDuplicateSelectedEditorCommand(node, selectedInstances);
        onChange(newNode, functionalChange("duplicated instances"));
        onChangeBoardData({
            selectedInstances: newInstancesIds,
        });
        // onChange(duplicateSelected(value), functionalChange("duplicate"));
    }, [onChange, onChangeBoardData, node, selectedInstances]);
    const onSelectConnection = React.useCallback((connection, ev) => {
        const connectionId = getConnectionId(connection);
        const newSelected = selectedConnections.includes(connectionId)
            ? selectedConnections.filter((id) => id !== connectionId)
            : [...(ev.shiftKey ? selectedConnections : []), connectionId];
        onChangeBoardData({
            selectedConnections: newSelected,
            selectedInstances: [],
        });
    }, [onChangeBoardData, selectedConnections]);
    const onZoom = React.useCallback((_newZoom, source) => {
        const newZoom = Math.min(Math.max(_newZoom, 0.3), 2);
        const targetPos = source === "mouse"
            ? lastMousePos.current
            : {
                x: viewPort.pos.x + vpSize.width / 2,
                y: viewPort.pos.y + vpSize.height / 2,
            };
        const newPos = centerBoardPosOnTarget(targetPos, vpSize, newZoom, viewPort);
        onChangeBoardData({
            viewPort: { ...viewPort, zoom: newZoom, pos: newPos },
            // const newCenter = centerBoardPosOnTarget(lastMousePos.current, vpSize, newZoom, viewPort);
        });
    }, [lastMousePos, onChangeBoardData, viewPort, vpSize]);
    const clearSelections = React.useCallback(() => {
        onChangeBoardData({
            from: undefined,
            to: undefined,
            selectedInstances: [],
            selectedConnections: [],
        });
    }, [onChangeBoardData]);
    const onConnectionClose = React.useCallback((from, to, source) => {
        // Prevent connection between main input and output
        if (from.insId === THIS_INS_ID && to.insId === THIS_INS_ID) {
            toast({
                description: "Cannot connect main input to main output",
                variant: "destructive",
            });
            return;
        }
        const newNode = handleConnectionCloseEditorCommand(node, {
            from,
            to,
        });
        onChange(newNode, functionalChange("close-connection"));
        onChangeBoardData({ from: undefined, to: undefined });
        reportEvent("createConnection", { source });
    }, [onChange, onChangeBoardData, node, reportEvent, toast]);
    const onGroupSelectedInternal = React.useCallback(async () => {
        const name = await _prompt("New visual node name?");
        if (!name)
            return;
        const { currentNode } = await groupSelected(boardData.selectedInstances, node, name, _prompt);
        onChange(currentNode, functionalChange("group node"));
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
    const onNodeIoPinClick = React.useCallback((pinId, type, event) => {
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
        const newPin = { pinId, insId: THIS_INS_ID };
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
    const onPinClick = React.useCallback((ins, pinId, type) => {
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
                (isInternalConnectionNode(currTo) ? currTo.insId === ins.id : true)) {
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
                (isInternalConnectionNode(currFrom)
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
    useHotkeys("cmd+=, ctrl+=", (e) => {
        onZoom(viewPort.zoom + 0.1, "hotkey");
        e.preventDefault();
    }, { text: "Zoom in board", group: "Viewport Controls" }, [viewPort, onZoom], isBoardInFocus);
    useHotkeys("cmd+-, ctrl+-", (e) => {
        onZoom(viewPort.zoom - 0.1, "hotkey");
        e.preventDefault();
    }, { text: "Zoom out board", group: "Viewport Controls" }, [onZoom, viewPort.zoom], isBoardInFocus);
    useHotkeys("cmd+0, ctrl+0", (e) => {
        onZoom(1);
        e.preventDefault();
    }, { text: "Reset zoom", group: "Viewport Controls" }, [viewPort, onZoom], isBoardInFocus);
    useHotkeys("backspace, delete", deleteSelection, { text: "Delete instances", group: "Editing" }, [], isBoardInFocus);
    useHotkeys("cmd+d, ctrl+d", (e) => {
        e.preventDefault();
        duplicate();
    }, { text: "Duplicate selected instances", group: "Editing" }, [], isBoardInFocus);
    useHotkeys("cmd+a, ctrl+a", selectAll, { text: "Select all", group: "Selection" }, [], isBoardInFocus);
    useHotkeys("esc", clearSelections, { text: "Clear selections", group: "Selection" }, [], isBoardInFocus);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlRWRpdG9yQ29tbWFuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL3VzZUVkaXRvckNvbW1hbmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFJTCxzQkFBc0IsRUFDdEIsbUJBQW1CLEVBQ25CLG9CQUFvQixFQUNwQixXQUFXLEVBQ1gsd0JBQXdCLEVBQ3hCLFlBQVksRUFLWiwwQkFBMEIsRUFDMUIsd0JBQXdCLEdBS3pCLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHlCQUF5QixFQUN6QixvQkFBb0IsRUFDcEIsZUFBZSxFQUNmLFNBQVMsRUFDVCxRQUFRLEVBQ1IsZUFBZSxFQUNmLFVBQVUsRUFDVixxQkFBcUIsRUFDckIsc0JBQXNCLEVBRXRCLFVBQVUsR0FDWCxNQUFNLElBQUksQ0FBQztBQUNaLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZFLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUVqQyxNQUFNLFVBQVUsaUJBQWlCLENBQy9CLFlBQXlDLEVBQ3pDLE1BQVksRUFDWixjQUErQztJQUUvQyxNQUFNLEVBQ0osSUFBSSxFQUNKLFlBQVksRUFBRSxRQUFRLEVBQ3RCLGlCQUFpQixFQUNqQixTQUFTLEdBQ1YsR0FBRywwQkFBMEIsRUFB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