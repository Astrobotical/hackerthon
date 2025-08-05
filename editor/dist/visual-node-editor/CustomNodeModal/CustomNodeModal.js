"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomNodeModal = CustomNodeModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@monaco-editor/react");
const configureMonaco_1 = require("../../lib/customCodeNode/configureMonaco");
const ports_1 = require("../../flow-editor/ports/ports");
const ui_1 = require("../../ui");
const ui_2 = require("../../ui");
const ui_3 = require("../../ui");
const ui_4 = require("../../ui");
const defaultContent = `
import type { CodeNode } from "@flyde/core";

/*
 Feel free to change the content of this file to experiment with the code nodes
 You can then import any exported node here from your other visual nodes.
 
 Full API reference: https://www.flyde.dev/docs/custom-nodes/
 */

const node: CodeNode = {
  id: "Add",
  displayName: "Add",
  icon: "fa-plus",
  description: "Emits the sum of two numbers",
  inputs: {
    n1: { description: "First number to add" },
    n2: { description: "Second number to add" },
  },
  outputs: { sum: { description: "The sum of n1 and n2" } },
  run: ({ n1, n2 }, { sum }) => sum.next(n1 + n2),
};

export default node;
`;
function CustomNodeModal({ isOpen, onClose, onSave, forkMode, }) {
    const confirm = (0, ports_1.useConfirm)();
    const { toast } = (0, ui_4.useToast)();
    const [code, setCode] = (0, react_1.useState)((forkMode === null || forkMode === void 0 ? void 0 : forkMode.initialCode) || defaultContent);
    const [isSaving, setIsSaving] = (0, react_1.useState)(false);
    const [hasChanges, setHasChanges] = (0, react_1.useState)(false);
    const handleEditorChange = (0, react_1.useCallback)((value) => {
        const newCode = value || "";
        setCode(newCode);
        setHasChanges(true);
    }, []);
    const handleClose = (0, react_1.useCallback)(async () => {
        if (!hasChanges ||
            (await confirm("You have unsaved changes. Are you sure you want to close?"))) {
            onClose();
        }
    }, [hasChanges, onClose, confirm]);
    const editorOptions = (0, react_1.useMemo)(() => {
        return {
            minimap: { enabled: false },
        };
    }, []);
    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onSave(code);
            onClose(); // Close the modal only after successful save
        }
        catch (error) {
            toast({
                variant: "destructive",
                title: "Error Saving Node",
                description: error instanceof Error ? error.message : "Failed to save custom node",
            });
            console.error("Error saving custom node:", error);
        }
        finally {
            setIsSaving(false);
        }
    };
    const monaco = (0, react_2.useMonaco)();
    (0, react_1.useEffect)(() => {
        if (monaco) {
            (0, configureMonaco_1.configureMonaco)(monaco);
        }
    }, [monaco]);
    // Monaco editor onMount handler to add custom commands
    const handleEditorDidMount = (editor) => {
        if ((monaco === null || monaco === void 0 ? void 0 : monaco.KeyMod) && (monaco === null || monaco === void 0 ? void 0 : monaco.KeyCode)) {
            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
                handleSave();
            });
        }
        // Focus the editor when it mounts
        editor.focus();
    };
    // Additional keyboard handler for when focus is outside the editor
    const handleKeyDown = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault();
            handleSave();
        }
    };
    return ((0, jsx_runtime_1.jsx)(ui_1.Dialog, { open: isOpen, onOpenChange: handleClose, children: (0, jsx_runtime_1.jsxs)(ui_1.DialogContent, { className: "max-w-4xl", onKeyDown: handleKeyDown, tabIndex: 0, children: [(0, jsx_runtime_1.jsx)(ui_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(ui_1.DialogTitle, { children: forkMode ? "Fork Custom Node" : "Create Custom Node" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [forkMode && ((0, jsx_runtime_1.jsx)(ui_3.Alert, { children: (0, jsx_runtime_1.jsxs)(ui_3.AlertDescription, { children: ["You are forking a new custom code node from", " ", forkMode.node.displayName || forkMode.node.id] }) })), (0, jsx_runtime_1.jsx)(react_2.Editor, { height: "400px", defaultLanguage: "typescript", value: code, onChange: handleEditorChange, theme: "vs-dark", options: editorOptions, loading: (0, jsx_runtime_1.jsx)("div", { children: "Loading editor..." }), onMount: handleEditorDidMount })] }), (0, jsx_runtime_1.jsxs)(ui_1.DialogFooter, { children: [(0, jsx_runtime_1.jsx)(ui_2.Button, { variant: "outline", onClick: handleClose, disabled: isSaving, children: "Cancel" }), (0, jsx_runtime_1.jsxs)(ui_2.Button, { onClick: handleSave, disabled: isSaving, className: "flex items-center gap-2", children: [isSaving ? "Saving..." : "Save", (0, jsx_runtime_1.jsx)(ui_2.HotkeyIndication, { hotkey: "cmd+enter" })] })] })] }) }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tTm9kZU1vZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9DdXN0b21Ob2RlTW9kYWwvQ3VzdG9tTm9kZU1vZGFsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWlEQSwwQ0E2SEM7O0FBOUtELGlDQUFrRTtBQUNsRSxnREFBa0U7QUFFbEUsOEVBQTJFO0FBQzNFLHlEQUEyRDtBQUMzRCxpQ0FNa0I7QUFDbEIsaUNBQW9EO0FBQ3BELGlDQUErRDtBQUMvRCxpQ0FBb0M7QUFTcEMsTUFBTSxjQUFjLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXdCdEIsQ0FBQztBQUVGLFNBQWdCLGVBQWUsQ0FBQyxFQUM5QixNQUFNLEVBQ04sT0FBTyxFQUNQLE1BQU0sRUFDTixRQUFRLEdBQ2E7SUFDckIsTUFBTSxPQUFPLEdBQUcsSUFBQSxrQkFBVSxHQUFFLENBQUM7SUFDN0IsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUEsYUFBUSxHQUFFLENBQUM7SUFDN0IsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQzlCLENBQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFdBQVcsS0FBSSxjQUFjLENBQ3hDLENBQUM7SUFDRixNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBVSxLQUFLLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUVwRCxNQUFNLGtCQUFrQixHQUFHLElBQUEsbUJBQVcsRUFBQyxDQUFDLEtBQXlCLEVBQUUsRUFBRTtRQUNuRSxNQUFNLE9BQU8sR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQixh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