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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowEditor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const core_1 = require("@flyde/core");
const VisualNodeEditor_1 = require("../visual-node-editor/VisualNodeEditor");
const use_hotkeys_1 = require("../lib/react-utils/use-hotkeys");
const ports_1 = require("./ports");
const fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
const free_brands_svg_icons_1 = require("@fortawesome/free-brands-svg-icons");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const DataInspectionModal_1 = require("./DataInspectionModal");
const DebuggerContext_1 = require("./DebuggerContext");
const DarkModeContext_1 = require("./DarkModeContext");
const usehooks_ts_1 = require("usehooks-ts");
const VisualNodeEditorContext_1 = require("../visual-node-editor/VisualNodeEditorContext");
const ui_1 = require("../ui");
__exportStar(require("./ports"), exports);
__exportStar(require("./DebuggerContext"), exports);
fontawesome_svg_core_1.library.add(free_brands_svg_icons_1.fab, free_solid_svg_icons_1.fas);
const maxUndoStackSize = 50;
const ignoreUndoChangeTypes = ["select", "drag-move", "order-step"];
exports.FlowEditor = React.memo(React.forwardRef((props, visualEditorRef) => {
    const { state, onChangeEditorState } = props;
    const [undoStack, setUndoStack] = React.useState([]);
    const [redoStack, setRedoStack] = React.useState([]);
    const { boardData: editorBoardData } = state;
    const editedNode = state.flow.node;
    const [queuedInputsData, setQueuedInputsData] = React.useState({});
    const [instancesWithErrors, setInstancesWithErrors] = React.useState(new Set());
    const { debuggerClient } = (0, DebuggerContext_1.useDebuggerContext)();
    React.useEffect(() => {
        if (debuggerClient) {
            return debuggerClient.onBatchedEvents((events) => {
                events.forEach((event) => {
                    if (event.type === core_1.DebuggerEventType.INPUTS_STATE_CHANGE) {
                        setQueuedInputsData((obj) => {
                            return { ...obj, [event.insId]: event.val };
                        });
                    }
                    if (event.type === core_1.DebuggerEventType.ERROR) {
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
    const { createAiCompletion } = (0, ports_1.usePorts)();
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
            viewPort: VisualNodeEditor_1.defaultViewPort,
            from: undefined,
            to: undefined,
            lastMousePos: { x: 0, y: 0 },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editedNode.id]);
    (0, use_hotkeys_1.useHotkeys)("cmd+z, ctrl+z", (e) => {
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
    const { isDarkMode } = (0, usehooks_ts_1.useDarkMode)();
    const AiCompletionContextValue = React.useMemo(() => {
        return {
            createCompletion: createAiCompletion !== null && createAiCompletion !== void 0 ? createAiCompletion : (() => Promise.resolve('')),
            enabled: !!createAiCompletion,
        };
    }, [createAiCompletion]);
    const renderInner = () => {
        var _a;
        return ((0, jsx_runtime_1.jsx)(DarkModeContext_1.DarkModeProvider, { value: (_a = props.darkMode) !== null && _a !== void 0 ? _a : isDarkMode, children: (0, jsx_runtime_1.jsx)(ui_1.AiCompletionProvider, { value: AiCompletionContextValue, children: (0, jsx_runtime_1.jsx)(VisualNodeEditorContext_1.VisualNodeEditorProvider, { boardData: editorBoardData, onChangeBoardData: onChangeEditorBoardData, node: editedNode, onChangeNode: onChangeNode, children: (0, jsx_runtime_1.jsxs)(React.Fragment, { children: [inspectedItem && ((0, jsx_runtime_1.jsx)(DataInspectionModal_1.DataInspectionModal, { item: inspectedItem, isOpen: !!inspectedItem, onClose: onCloseInspectedItemModal })), (0, jsx_runtime_1.jsx)(VisualNodeEditor_1.VisualNodeEditor, { currentInsId: core_1.ROOT_INS_ID, ref: visualEditorRef, clipboardData: clipboardData, onCopy: setClipboardData, nodeIoEditable: !editedNode.id.startsWith("Trigger"), onInspectPin: onInspectPin, queuedInputsData: queuedInputsData, initialPadding: props.initialPadding, instancesWithErrors: instancesWithErrors, tempFlow: state.flow, requireModifierForZoom: props.requireModifierForZoom }, editedNode.id)] }) }) }) }));
    };
    return (0, jsx_runtime_1.jsx)("div", { className: "flyde-flow-editor", children: renderInner() });
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxvd0VkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mbG93LWVkaXRvci9GbG93RWRpdG9yLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStCO0FBQy9CLHNDQVFxQjtBQUNyQiw2RUFLZ0Q7QUFFaEQsZ0VBQTREO0FBSTVELG1DQUFtQztBQUVuQyw0RUFBNEQ7QUFDNUQsOEVBQXlEO0FBQ3pELDRFQUF3RDtBQUN4RCwrREFBNEQ7QUFDNUQsdURBQXVEO0FBQ3ZELHVEQUFxRDtBQUNyRCw2Q0FBMEM7QUFFMUMsMkZBQXlGO0FBQ3pGLDhCQUFrRTtBQUVsRSwwQ0FBd0I7QUFDeEIsb0RBQWtDO0FBRWxDLDhCQUFPLENBQUMsR0FBRyxDQUFDLDJCQUFHLEVBQUUsMEJBQUcsQ0FBQyxDQUFDO0FBc0J0QixNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQWE1QixNQUFNLHFCQUFxQixHQUFHLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUV2RCxRQUFBLFVBQVUsR0FBbUMsS0FBSyxDQUFDLElBQUksQ0FDbEUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsRUFBRTtJQUMxQyxNQUFNLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFFLEdBQUcsS0FBSyxDQUFDO0lBRTdDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FFOUMsRUFBRSxDQUFDLENBQUM7SUFDTixNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBRTlDLEVBQUUsQ0FBQyxDQUFDO0lBRU4sTUFBTSxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDN0MsTUFBTSxVQUFVLEdBQUcsS0FBSyxD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