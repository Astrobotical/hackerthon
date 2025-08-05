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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceConfigEditor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("../../ui");
const ui_2 = require("../../ui");
const react_error_boundary_1 = require("react-error-boundary");
const react_1 = __importStar(require("react"));
const loadConfigEditorComponent_1 = require("./loadConfigEditorComponent");
const ports_1 = require("../../flow-editor/ports");
const InstanceIcon_1 = require("../instance-view/InstanceIcon");
const ui_3 = require("../../ui");
const loader_1 = require("../../lib/loader");
const InstanceConfigEditor = (props) => {
    var _a, _b;
    const { ins, onCancel, onFork } = props;
    const [isLoading, setIsLoading] = react_1.default.useState(false);
    const _onFork = (0, react_1.useCallback)(() => {
        onCancel();
        onFork(ins);
    }, [onCancel, onFork, ins]);
    const [instanceConfig, setInstanceConfig] = react_1.default.useState((_a = ins.config) !== null && _a !== void 0 ? _a : {});
    const [hasUnsavedChanges, setHasUnsavedChanges] = react_1.default.useState(false);
    const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] = react_1.default.useState(false);
    const handleMacroDataChange = (0, react_1.useCallback)((newData) => {
        setInstanceConfig(newData);
        setHasUnsavedChanges(true);
    }, []);
    const handleSubmit = (0, react_1.useCallback)(() => {
        if (isLoading)
            return;
        setIsLoading(true);
        props.onSubmit(instanceConfig)
            .then(() => {
            setHasUnsavedChanges(false);
            setIsLoading(false);
        })
            .catch((error) => {
            console.error("Failed to save config:", error);
            setIsLoading(false);
        });
    }, [props, instanceConfig, isLoading]);
    const handleCancel = (0, react_1.useCallback)(() => {
        if (isLoading)
            return;
        if (!hasUnsavedChanges) {
            onCancel();
            return;
        }
        setShowUnsavedChangesDialog(true);
    }, [hasUnsavedChanges, onCancel, isLoading]);
    const handleCloseUnsavedChangesDialog = (0, react_1.useCallback)(() => {
        if (isLoading)
            return;
        setShowUnsavedChangesDialog(false);
    }, [isLoading]);
    const handleDiscardChanges = (0, react_1.useCallback)(() => {
        if (isLoading)
            return;
        setShowUnsavedChangesDialog(false);
        onCancel();
    }, [onCancel, isLoading]);
    const EditorComp = (0, react_1.useMemo)(() => {
        return (0, loadConfigEditorComponent_1.loadConfigEditorComponent)(ins);
    }, [ins.node]);
    // Add keyboard shortcut handler
    (0, react_1.useEffect)(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleSubmit, hasUnsavedChanges]);
    const ports = (0, ports_1.usePorts)();
    const aiCompletion = (0, ui_1.useAiCompletion)();
    const { node } = ins;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ui_2.Dialog, { open: true, onOpenChange: handleCancel, modal: false, children: (0, jsx_runtime_1.jsxs)(ui_2.DialogContent, { className: "flex flex-col max-h-[90vh] p-0", noInteractOutside: hasUnsavedChanges || isLoading, children: [(0, jsx_runtime_1.jsxs)(ui_2.DialogHeader, { className: "flex flex-row items-center py-2 px-4 border-b border-gray-200 dark:border-gray-800 space-y-0", children: [(0, jsx_runtime_1.jsx)(InstanceIcon_1.InstanceIcon, { icon: node.icon, className: "h-5 w-5 mr-2 shrink-0" }), (0, jsx_runtime_1.jsx)(ui_1.DialogTitle, { className: "text-base font-medium m-0 truncate max-w-[85%] overflow-hidden", children: (_b = node.displayName) !== null && _b !== void 0 ? _b : node.id })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 overflow-y-auto px-4 pt-0", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-none", children: node.description && ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-between items-center mb-3", children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-500", children: node.description }) })) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 overflow-y-auto min-h-0 mb-3", children: (0, jsx_runtime_1.jsx)(react_error_boundary_1.ErrorBoundary, { fallback: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { children: "Error loading config editor" }), (0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "outline", onClick: () => setInstanceConfig({}), children: "Reset to default" })] }), children: (0, jsx_runtime_1.jsx)(EditorComp, { value: instanceConfig, onChange: handleMacroDataChange, ports: ports, nodeId: ins.nodeId, insId: ins.id, createAiCompletion: aiCompletion.createCompletion }) }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center py-2 px-4 border-t border-gray-200 dark:border-gray-800", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-gray-500 mr-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center mr-1", children: ["Need more customization?", " "] }), (0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "link", size: "xs", onClick: _onFork, className: "p-0 h-auto text-xs inline-flex items-center", disabled: isLoading, children: "Fork" }), " ", "this node"] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "outline", size: "sm", onClick: onCancel, disabled: isLoading, children: "Cancel" }), (0, jsx_runtime_1.jsx)(ui_1.Button, { size: "sm", onClick: handleSubmit, className: "flex items-center gap-2", disabled: isLoading, children: isLoading ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Saving ", (0, jsx_runtime_1.jsx)(loader_1.Loader, { minimal: true })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Save", (0, jsx_runtime_1.jsx)(ui_3.HotkeyIndication, { hotkey: "cmd+enter" })] })) })] })] })] }) }), (0, jsx_runtime_1.jsx)(ui_2.Dialog, { open: showUnsavedChangesDialog, onOpenChange: handleCloseUnsavedChangesDialog, children: (0, jsx_runtime_1.jsxs)(ui_2.DialogContent, { className: "sm:max-w-md", children: [(0, jsx_runtime_1.jsx)(ui_2.DialogHeader, { children: (0, jsx_runtime_1.jsx)(ui_1.DialogTitle, { children: "Unsaved Changes" }) }), (0, jsx_runtime_1.jsx)("div", { className: "py-4", children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "You have unsaved changes. Are you sure you want to exit without saving?" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-3", children: [(0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "outline", size: "sm", onClick: handleCloseUnsavedChangesDialog, children: "Continue Editing" }), (0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "destructive", size: "sm", onClick: handleDiscardChanges, children: "Discard Changes" })] })] }) })] }));
};
exports.InstanceConfigEditor = InstanceConfigEditor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5zdGFuY2VDb25maWdFZGl0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL0luc3RhbmNlQ29uZmlnRWRpdG9yL0luc3RhbmNlQ29uZmlnRWRpdG9yLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdFO0FBQ2hFLGlDQUErRDtBQVMvRCwrREFBcUQ7QUFDckQsK0NBQStEO0FBQy9ELDJFQUF3RTtBQUN4RSxtREFBbUQ7QUFDbkQsZ0VBQTZEO0FBQzdELGlDQUE0QztBQUM1Qyw2Q0FBMEM7QUFXbkMsTUFBTSxvQkFBb0IsR0FBd0MsQ0FDdkUsS0FBSyxFQUNMLEVBQUU7O0lBQ0YsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ3hDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsZUFBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV4RCxNQUFNLE9BQU8sR0FBRyxJQUFBLG1CQUFXLEVBQUMsR0FBRyxFQUFFO1FBQy9CLFFBQVEsRUFBRSxDQUFDO1FBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRTVCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsR0FBRyxlQUFLLENBQUMsUUFBUSxDQUN4RCxNQUFBLEdBQUcsQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUNGLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxvQkFBb0IsQ0FBQyxHQUFHLGVBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEUsTUFBTSxDQUFDLHdCQUF3QixFQUFFLDJCQUEyQixDQUFDLEdBQUcs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