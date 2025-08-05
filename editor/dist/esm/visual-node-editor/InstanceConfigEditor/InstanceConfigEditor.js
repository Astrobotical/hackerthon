import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, DialogTitle, useAiCompletion } from "../../ui";
import { Dialog, DialogContent, DialogHeader } from "../../ui";
import { ErrorBoundary } from "react-error-boundary";
import React, { useCallback, useMemo, useEffect } from "react";
import { loadConfigEditorComponent } from "./loadConfigEditorComponent";
import { usePorts } from "../../flow-editor/ports";
import { InstanceIcon } from "../instance-view/InstanceIcon";
import { HotkeyIndication } from "../../ui";
import { Loader } from "../../lib/loader";
export const InstanceConfigEditor = (props) => {
    var _a, _b;
    const { ins, onCancel, onFork } = props;
    const [isLoading, setIsLoading] = React.useState(false);
    const _onFork = useCallback(() => {
        onCancel();
        onFork(ins);
    }, [onCancel, onFork, ins]);
    const [instanceConfig, setInstanceConfig] = React.useState((_a = ins.config) !== null && _a !== void 0 ? _a : {});
    const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
    const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] = React.useState(false);
    const handleMacroDataChange = useCallback((newData) => {
        setInstanceConfig(newData);
        setHasUnsavedChanges(true);
    }, []);
    const handleSubmit = useCallback(() => {
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
    const handleCancel = useCallback(() => {
        if (isLoading)
            return;
        if (!hasUnsavedChanges) {
            onCancel();
            return;
        }
        setShowUnsavedChangesDialog(true);
    }, [hasUnsavedChanges, onCancel, isLoading]);
    const handleCloseUnsavedChangesDialog = useCallback(() => {
        if (isLoading)
            return;
        setShowUnsavedChangesDialog(false);
    }, [isLoading]);
    const handleDiscardChanges = useCallback(() => {
        if (isLoading)
            return;
        setShowUnsavedChangesDialog(false);
        onCancel();
    }, [onCancel, isLoading]);
    const EditorComp = useMemo(() => {
        return loadConfigEditorComponent(ins);
    }, [ins.node]);
    // Add keyboard shortcut handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleSubmit, hasUnsavedChanges]);
    const ports = usePorts();
    const aiCompletion = useAiCompletion();
    const { node } = ins;
    return (_jsxs(_Fragment, { children: [_jsx(Dialog, { open: true, onOpenChange: handleCancel, modal: false, children: _jsxs(DialogContent, { className: "flex flex-col max-h-[90vh] p-0", noInteractOutside: hasUnsavedChanges || isLoading, children: [_jsxs(DialogHeader, { className: "flex flex-row items-center py-2 px-4 border-b border-gray-200 dark:border-gray-800 space-y-0", children: [_jsx(InstanceIcon, { icon: node.icon, className: "h-5 w-5 mr-2 shrink-0" }), _jsx(DialogTitle, { className: "text-base font-medium m-0 truncate max-w-[85%] overflow-hidden", children: (_b = node.displayName) !== null && _b !== void 0 ? _b : node.id })] }), _jsxs("div", { className: "flex-1 overflow-y-auto px-4 pt-0", children: [_jsx("div", { className: "flex-none", children: node.description && (_jsx("div", { className: "flex justify-between items-center mb-3", children: _jsx("span", { className: "text-sm text-gray-500", children: node.description }) })) }), _jsx("div", { className: "flex-1 overflow-y-auto min-h-0 mb-3", children: _jsx(ErrorBoundary, { fallback: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: "Error loading config editor" }), _jsx(Button, { variant: "outline", onClick: () => setInstanceConfig({}), children: "Reset to default" })] }), children: _jsx(EditorComp, { value: instanceConfig, onChange: handleMacroDataChange, ports: ports, nodeId: ins.nodeId, insId: ins.id, createAiCompletion: aiCompletion.createCompletion }) }) })] }), _jsxs("div", { className: "flex justify-between items-center py-2 px-4 border-t border-gray-200 dark:border-gray-800", children: [_jsxs("div", { className: "text-xs text-gray-500 mr-1", children: [_jsxs("span", { className: "inline-flex items-center mr-1", children: ["Need more customization?", " "] }), _jsx(Button, { variant: "link", size: "xs", onClick: _onFork, className: "p-0 h-auto text-xs inline-flex items-center", disabled: isLoading, children: "Fork" }), " ", "this node"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: onCancel, disabled: isLoading, children: "Cancel" }), _jsx(Button, { size: "sm", onClick: handleSubmit, className: "flex items-center gap-2", disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: ["Saving ", _jsx(Loader, { minimal: true })] })) : (_jsxs(_Fragment, { children: ["Save", _jsx(HotkeyIndication, { hotkey: "cmd+enter" })] })) })] })] })] }) }), _jsx(Dialog, { open: showUnsavedChangesDialog, onOpenChange: handleCloseUnsavedChangesDialog, children: _jsxs(DialogContent, { className: "sm:max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Unsaved Changes" }) }), _jsx("div", { className: "py-4", children: _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "You have unsaved changes. Are you sure you want to exit without saving?" }) }), _jsxs("div", { className: "flex justify-end gap-3", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: handleCloseUnsavedChangesDialog, children: "Continue Editing" }), _jsx(Button, { variant: "destructive", size: "sm", onClick: handleDiscardChanges, children: "Discard Changes" })] })] }) })] }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5zdGFuY2VDb25maWdFZGl0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL0luc3RhbmNlQ29uZmlnRWRpdG9yL0luc3RhbmNlQ29uZmlnRWRpdG9yLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQVMvRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxLQUFLLEVBQUUsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUMvRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFXMUMsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQXdDLENBQ3ZFLEtBQUssRUFDTCxFQUFFOztJQUNGLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQztJQUN4QyxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFeEQsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUMvQixRQUFRLEVBQUUsQ0FBQztRQUNYLE1BQU0sQ0FB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