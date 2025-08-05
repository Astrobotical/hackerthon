import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { DebuggerEventType, ROOT_INS_ID, } from "@flyde/core";
import { VisualNodeEditor, defaultViewPort, } from "../visual-node-editor/VisualNodeEditor";
import { useHotkeys } from "../lib/react-utils/use-hotkeys";
import { usePorts } from "./ports";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { DataInspectionModal } from "./DataInspectionModal";
import { useDebuggerContext } from "./DebuggerContext";
import { DarkModeProvider } from "./DarkModeContext";
import { useDarkMode } from "usehooks-ts";
import { VisualNodeEditorProvider } from "../visual-node-editor/VisualNodeEditorContext";
import { AiCompletionProvider } from "../ui";
export * from "./ports";
export * from "./DebuggerContext";
library.add(fab, fas);
const maxUndoStackSize = 50;
const ignoreUndoChangeTypes = ["select", "drag-move", "order-step"];
export const FlowEditor = React.memo(React.forwardRef((props, visualEditorRef) => {
    const { state, onChangeEditorState } = props;
    const [undoStack, setUndoStack] = React.useState([]);
    const [redoStack, setRedoStack] = React.useState([]);
    const { boardData: editorBoardData } = state;
    const editedNode = state.flow.node;
    const [queuedInputsData, setQueuedInputsData] = React.useState({});
    const [instancesWithErrors, setInstancesWithErrors] = React.useState(new Set());
    const { debuggerClient } = useDebuggerContext();
    React.useEffect(() => {
        if (debuggerClient) {
            return debuggerClient.onBatchedEvents((events) => {
                events.forEach((event) => {
                    if (event.type === DebuggerEventType.INPUTS_STATE_CHANGE) {
                        setQueuedInputsData((obj) => {
                            return { ...obj, [event.insId]: event.val };
                        });
                    }
                    if (event.type === DebuggerEventType.ERROR) {
                        setInstancesWithErrors((set) => {
                            const newSet = new Set(set);
                            newSet.add(event.insId);
                            return newSet;
                        });
                    }
                });
            });
        }
        return undefined;
    }, [debuggerClient]);
    const { createAiCompletion } = usePorts();
    const onChangeFlow = React.useCallback((newFlow, changeType) => {
        console.info("onChangeFlow", changeType.type);
        if (changeType.type === "functional") {
            setUndoStack([
                { flow: { ...state.flow, ...newFlow } },
                ...undoStack.slice(0, maxUndoStackSize),
            ]);
            setRedoStack([]);
        }
        onChangeEditorState((state) => ({
            ...state,
            flow: { ...state.flow, ...newFlow },
        }));
    }, [onChangeEditorState, state.flow, undoStack]);
    const [clipboardData, setClipboardData] = React.useState({
        instances: [],
        connections: [],
    });
    const onChangeEditorBoardData = React.useCallback((partial) => {
        onChangeEditorState((state) => {
            return { ...state, boardData: { ...state.boardData, ...partial } };
        });
    }, [onChangeEditorState]);
    // clear board data that isn't related to node when it changes
    React.useEffect(() => {
        onChangeEditorBoardData({
            selectedInstances: [],
            viewPort: defaultViewPort,
            from: undefined,
            to: undefined,
            lastMousePos: { x: 0, y: 0 },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editedNode.id]);
    useHotkeys("cmd+z, ctrl+z", (e) => {
        setRedoStack([...redoStack, state]);
        const [last, ...rest] = undoStack;
        if (last) {
            onChangeEditorState((state) => ({ ...state, ...last }));
            setUndoStack(rest);
        }
        e.preventDefault();
    }, { text: "Undo last change", group: "Editing" }, [state, undoStack, redoStack]);
    const onChangeNode = React.useCallback((newNode, changeType) => {
        const shouldIgnore = ignoreUndoChangeTypes.some((str) => changeType.message.includes(str));
        if (!shouldIgnore) {
            setRedoStack([]);
        }
        onChangeFlow({ node: newNode }, changeType);
    }, [onChangeFlow]);
    const [inspectedItem, setInspectedItem] = React.useState();
    const onCloseInspectedItemModal = React.useCallback(() => setInspectedItem(undefined), []);
    const onInspectPin = React.useCallback((insId, pin) => {
        setInspectedItem({ insId, pin });
    }, []);
    const { isDarkMode } = useDarkMode();
    const AiCompletionContextValue = React.useMemo(() => {
        return {
            createCompletion: createAiCompletion !== null && createAiCompletion !== void 0 ? createAiCompletion : (() => Promise.resolve('')),
            enabled: !!createAiCompletion,
        };
    }, [createAiCompletion]);
    const renderInner = () => {
        var _a;
        return (_jsx(DarkModeProvider, { value: (_a = props.darkMode) !== null && _a !== void 0 ? _a : isDarkMode, children: _jsx(AiCompletionProvider, { value: AiCompletionContextValue, children: _jsx(VisualNodeEditorProvider, { boardData: editorBoardData, onChangeBoardData: onChangeEditorBoardData, node: editedNode, onChangeNode: onChangeNode, children: _jsxs(React.Fragment, { children: [inspectedItem && (_jsx(DataInspectionModal, { item: inspectedItem, isOpen: !!inspectedItem, onClose: onCloseInspectedItemModal })), _jsx(VisualNodeEditor, { currentInsId: ROOT_INS_ID, ref: visualEditorRef, clipboardData: clipboardData, onCopy: setClipboardData, nodeIoEditable: !editedNode.id.startsWith("Trigger"), onInspectPin: onInspectPin, queuedInputsData: queuedInputsData, initialPadding: props.initialPadding, instancesWithErrors: instancesWithErrors, tempFlow: state.flow, requireModifierForZoom: props.requireModifierForZoom }, editedNode.id)] }) }) }) }));
    };
    return _jsx("div", { className: "flyde-flow-editor", children: renderInner() });
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxvd0VkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbG93LWVkaXRvci9GbG93RWRpdG9yLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUtMLGlCQUFpQixFQUNqQixXQUFXLEdBRVosTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUNMLGdCQUFnQixFQUVoQixlQUFlLEdBRWhCLE1BQU0sd0NBQXdDLENBQUM7QUFFaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBSTVELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFbkMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUxQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN6RixPQUFPLEVBQXVCLG9CQUFvQixFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRWxFLGNBQWMsU0FBUyxDQUFDO0FBQ3hCLGNBQWMsbUJBQW1CLENBQUM7QUFFbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFzQnRCLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBYTVCLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBRXBFLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBbUMsS0FBSyxDQUFDLElBQUksQ0FDbEUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsRUFBRTtJQUMxQyxNQUFNLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFFLEdBQUcsS0FBSyxDQUFDO0lBRTdDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FFOUMsRUFBRSxDQUFDLENBQUM7SUFDTixNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBRTlDLEVBQUUsQ0FBQyxDQUFDO0lBRU4sTUFBTSxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDN0MsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFFbkMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FFNUQsRUFBRSxDQUFDLENBQUM7SUFFTixNQUFNLENBQUMsbUJBQW1CLEVBQUUsc0JBQXNCLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUVsRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFYixNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsa0JBQWtCLEVBQUUsQ0FBQztJQUVoRCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNuQixJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ25CLE9BQU8sY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUMvQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ3ZCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO3dCQUN6RCxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFOzRCQUMxQixPQUFPLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQTZCLEVBQUUsQ0FBQzt3QkFDeEUsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQztvQkFFRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQzNDLHNCQUFzQixDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7NEJBQzdCLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDeEIsT0FBTyxNQUFNLENBQUM7d0JBQ2hCLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBRXJCLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBRTFDLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQ3BDLENBQUMsT0FBbUMsRUFBRSxVQUErQixFQUFFLEVBQUU7UUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlDLElBQUksVUFBVSxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUUsQ0FBQztZQUNyQyxZQUFZLENBQUM7Z0JBQ1gsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxPQUFPLEVBQUUsRUFBRTtnQkFDdkMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQzthQUN4QyxDQUFDLENBQUM7WUFDSCxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUNELG1CQUFtQixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlCLEdBQUcsS0FBSztZQUNSLElBQUksRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLE9BQU8sRUFBRTtTQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUMsRUFDRCxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQzdDLENBQUM7SUFFRixNQUFNLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBZ0I7UUFDdEUsU0FBUyxFQUFFLEVBQUU7UUFDYixXQUFXLEVBQUUsRUFBRTtLQUNoQixDQUFDLENBQUM7SUFFSCxNQUFNLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxXQUFXLENBQy9DLENBQUMsT0FBc0MsRUFBRSxFQUFFO1FBQ3pDLG1CQUFtQixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDNUIsT0FBTyxFQUFFLEdBQUcsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLE9BQU8sRUFBRSxFQUFFLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLEVBQ0QsQ0FBQyxtQkFBbUIsQ0FBQyxDQUN0QixDQUFDO0lBRUYsOERBQThEO0lBQzlELEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ25CLHVCQUF1QixDQUFDO1lBQ3RCLGlCQUFpQixFQUFFLEVBQUU7WUFDckIsUUFBUSxFQUFFLGVBQWU7WUFDekIsSUFBSSxFQUFFLFNBQVM7WUFDZixFQUFFLEVBQUUsU0FBUztZQUNiLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtTQUM3QixDQUFDLENBQUM7UUFDSCx1REFBdUQ7SUFDekQsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFcEIsVUFBVSxDQUNSLGVBQWUsRUFDZixDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ0osWUFBWSxDQUFDLENBQUMsR0FBRyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ2xDLElBQUksSUFBSSxFQUFFLENBQUM7WUFDVCxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hELFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDO1FBQ0QsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3JCLENBQUMsRUFDRCxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQzlDLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FDOUIsQ0FBQztJQUVGLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQ3BDLENBQUMsT0FBeUIsRUFBRSxVQUErQixFQUFFLEVBQUU7UUFDN0QsTUFBTSxZQUFZLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDdEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQ2pDLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDbEIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLENBQUM7UUFFRCxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxFQUNELENBQUMsWUFBWSxDQUFDLENBQ2YsQ0FBQztJQUVGLE1BQU0sQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUdwRCxDQUFDO0lBRUwsTUFBTSx5QkFBeUIsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUNqRCxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFDakMsRUFBRSxDQUNILENBQUM7SUFFRixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUNwQyxDQUFDLEtBQWEsRUFBRSxHQUFrQyxFQUFFLEVBQUU7UUFDcEQsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDLEVBQ0QsRUFBRSxDQUNILENBQUM7SUFFRixNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsV0FBVyxFQUFFLENBQUM7SUFFckMsTUFBTSx3QkFBd0IsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFzQixHQUFHLEVBQUU7UUFDdkUsT0FBTztZQUNMLGdCQUFnQixFQUFFLGtCQUFrQixhQUFsQixrQkFBa0IsY0FBbEIsa0JBQWtCLEdBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25FLE9BQU8sRUFBRSxDQUFDLENBQUMsa0JBQWtCO1NBQzlCLENBQUM7SUFDSixDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFFekIsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFOztRQUN2QixPQUFPLENBQ0wsS0FBQyxnQkFBZ0IsSUFBQyxLQUFLLEVBQUUsTUFBQSxLQUFLLENBQUMsUUFBUSxtQ0FBSSxVQUFVLFlBQ25ELEtBQUMsb0JBQW9CLElBQUMsS0FBSyxFQUFFLHdCQUF3QixZQUNuRCxLQUFDLHdCQUF3QixJQUN2QixTQUFTLEVBQUUsZUFBZSxFQUMxQixpQkFBaUIsRUFBRSx1QkFBdUIsRUFDMUMsSUFBSSxFQUFFLFVBQVUsRUFDaEIsWUFBWSxFQUFFLFlBQVksWUFFMUIsTUFBQyxLQUFLLENBQUMsUUFBUSxlQUNaLGFBQWEsSUFBSSxDQUNoQixLQUFDLG1CQUFtQixJQUNsQixJQUFJLEVBQUUsYUFBYSxFQUNuQixNQUFNLEVBQUUsQ0FBQyxDQUFDLGFBQWEsRUFDdkIsT0FBTyxFQUFFLHlCQUF5QixHQUNsQyxDQUNILEVBQ0QsS0FBQyxnQkFBZ0IsSUFDZixZQUFZLEVBQUUsV0FBVyxFQUN6QixHQUFHLEVBQUUsZUFBZSxFQUVwQixhQUFhLEVBQUUsYUFBYSxFQUM1QixNQUFNLEVBQUUsZ0JBQWdCLEVBQ3hCLGNBQWMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUNwRCxZQUFZLEVBQUUsWUFBWSxFQUMxQixnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFDbEMsY0FBYyxFQUFFLEtBQUssQ0FBQyxjQUFjLEVBQ3BDLG1CQUFtQixFQUFFLG1CQUFtQixFQUN4QyxRQUFRLEVBQUUsS0FBSyxDQUFDLElBQUksRUFDcEIsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLHNCQUFzQixJQVQvQyxVQUFVLENBQUMsRUFBRSxDQVVsQixJQUNhLEdBQ1EsR0FDTixHQUNOLENBQ3BCLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRixPQUFPLGNBQUssU0FBUyxFQUFDLG1CQUFtQixZQUFFLFdBQVcsRUFBRSxHQUFPLENBQUM7QUFDbEUsQ0FBQyxDQUFDLENBQ0gsQ0FBQyJ9