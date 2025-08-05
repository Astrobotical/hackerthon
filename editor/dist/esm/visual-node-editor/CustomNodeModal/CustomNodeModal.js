import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useMemo, useEffect } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";
import { configureMonaco } from "../../lib/customCodeNode/configureMonaco";
import { useConfirm } from "../../flow-editor/ports/ports";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "../../ui";
import { Button, HotkeyIndication } from "../../ui";
import { Alert, AlertDescription } from "../../ui";
import { useToast } from "../../ui";
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
export function CustomNodeModal({ isOpen, onClose, onSave, forkMode, }) {
    const confirm = useConfirm();
    const { toast } = useToast();
    const [code, setCode] = useState((forkMode === null || forkMode === void 0 ? void 0 : forkMode.initialCode) || defaultContent);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const handleEditorChange = useCallback((value) => {
        const newCode = value || "";
        setCode(newCode);
        setHasChanges(true);
    }, []);
    const handleClose = useCallback(async () => {
        if (!hasChanges ||
            (await confirm("You have unsaved changes. Are you sure you want to close?"))) {
            onClose();
        }
    }, [hasChanges, onClose, confirm]);
    const editorOptions = useMemo(() => {
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
    const monaco = useMonaco();
    useEffect(() => {
        if (monaco) {
            configureMonaco(monaco);
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
    return (_jsx(Dialog, { open: isOpen, onOpenChange: handleClose, children: _jsxs(DialogContent, { className: "max-w-4xl", onKeyDown: handleKeyDown, tabIndex: 0, children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: forkMode ? "Fork Custom Node" : "Create Custom Node" }) }), _jsxs("div", { className: "space-y-4", children: [forkMode && (_jsx(Alert, { children: _jsxs(AlertDescription, { children: ["You are forking a new custom code node from", " ", forkMode.node.displayName || forkMode.node.id] }) })), _jsx(Editor, { height: "400px", defaultLanguage: "typescript", value: code, onChange: handleEditorChange, theme: "vs-dark", options: editorOptions, loading: _jsx("div", { children: "Loading editor..." }), onMount: handleEditorDidMount })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: handleClose, disabled: isSaving, children: "Cancel" }), _jsxs(Button, { onClick: handleSave, disabled: isSaving, className: "flex items-center gap-2", children: [isSaving ? "Saving..." : "Save", _jsx(HotkeyIndication, { hotkey: "cmd+enter" })] })] })] }) }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tTm9kZU1vZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9DdXN0b21Ob2RlTW9kYWwvQ3VzdG9tTm9kZU1vZGFsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNsRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBVyxNQUFNLHNCQUFzQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUNMLE1BQU0sRUFDTixhQUFhLEVBQ2IsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEdBQ2IsTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFjLE1BQU0sVUFBVSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFTcEMsTUFBTSxjQUFjLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXdCdEIsQ0FBQztBQUVGLE1BQU0sVUFBVSxlQUFlLENBQUMsRUFDOUIsTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEVBQ04sUUFBUSxHQUNhO0lBQ3JCLE1BQU0sT0FBTyxHQUFHLFVBQVUsRUFBRSxDQUFDO0lBQzdCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztJQUM3QixNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLFFBQVEsQ0FDOUIsQ0FBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUs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