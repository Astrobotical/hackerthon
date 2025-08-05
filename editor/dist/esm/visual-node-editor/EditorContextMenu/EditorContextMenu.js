import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, } from "../../ui";
import { isDefined } from "../../utils";
import { nodeInput, nodeOutput } from "@flyde/core";
import produce from "immer";
import React from "react";
import { usePrompt, usePorts } from "../..";
import { functionalChange } from "../../flow-editor/flyde-flow-change-type";
import { useVisualNodeEditorContext } from "../VisualNodeEditorContext";
import { useToast } from "../../ui";
export function EditorContextMenu(props) {
    var _a, _b;
    const { nodeIoEditable, lastMousePos, onOpenNodesLibrary } = props;
    const maybeDisabledLabel = nodeIoEditable
        ? ""
        : " (cannot edit main node, only visual)";
    const _prompt = usePrompt();
    const { node, onChangeNode: onChange } = useVisualNodeEditorContext();
    const { reportEvent } = usePorts();
    const { toast } = useToast();
    const editCompletionOutputs = React.useCallback(async () => {
        var _a;
        const curr = (_a = node.completionOutputs) === null || _a === void 0 ? void 0 : _a.join(",");
        const newVal = await _prompt(`Edit completion outputs`, curr);
        if (isDefined(newVal) && newVal !== null) {
            const newValue = produce(node, (draft) => {
                draft.completionOutputs = newVal === "" ? undefined : newVal.split(",");
            });
            onChange(newValue, functionalChange("change node completions"));
            reportEvent("editCompletionOutputs", {
                count: newVal ? newVal.split(",").length : 0,
            });
        }
    }, [_prompt, onChange, node, reportEvent]);
    const editReactiveInputs = React.useCallback(async () => {
        var _a;
        const curr = (_a = node.reactiveInputs) === null || _a === void 0 ? void 0 : _a.join(",");
        const newVal = await _prompt(`Edit reactive inputs`, curr);
        if (isDefined(newVal) && newVal !== null) {
            const newValue = produce(node, (draft) => {
                draft.reactiveInputs = newVal === "" ? undefined : newVal.split(",");
            });
            onChange(newValue, functionalChange("change reactive inputs"));
            reportEvent("editReactiveInputs", {
                count: newVal ? newVal.split(",").length : 0,
            });
        }
    }, [_prompt, onChange, node, reportEvent]);
    const editNodeDescription = React.useCallback(async () => {
        var _a;
        const description = (_a = await _prompt(`Description?`, node.description)) !== null && _a !== void 0 ? _a : undefined;
        const newValue = produce(node, (draft) => {
            draft.description = description;
        });
        onChange(newValue, functionalChange("Edit node description"));
    }, [_prompt, onChange, node]);
    const onChangeDefaultStyle = React.useCallback((style) => {
        const newNode = produce(node, (draft) => {
            draft.defaultStyle = style;
        });
        onChange(newNode, functionalChange("change default style"));
        reportEvent("changeStyle", { isDefault: true });
    }, [onChange, node, reportEvent]);
    const copyNodeToClipboard = React.useCallback(async () => {
        const str = JSON.stringify(node);
        await navigator.clipboard.writeText(str);
        toast({
            description: "Copied!",
        });
    }, [node, toast]);
    const onAddMainPin = React.useCallback(async (type) => {
        const newPinId = await _prompt(`New ${type} pin name?`);
        if (!newPinId) {
            // name selection dismissed, cancelling
            return;
        }
        const newValue = produce(node, (draft) => {
            var _a, _b, _c;
            if (type === "input") {
                if (!node.inputs) {
                    draft.inputs = {};
                }
                draft.inputs[newPinId] = nodeInput();
                draft.inputsPosition[newPinId] = (_a = lastMousePos.current) !== null && _a !== void 0 ? _a : { x: 0, y: 0 };
            }
            else {
                if (!node.outputs) {
                    draft.outputs = {};
                }
                draft.outputs[newPinId] = nodeOutput();
                draft.outputsPosition[newPinId] = (_b = lastMousePos.current) !== null && _b !== void 0 ? _b : { x: 0, y: 0 };
                if ((_c = draft.completionOutputs) === null || _c === void 0 ? void 0 : _c.length) {
                    toast({
                        description: "Note that this node has explicit completion outputs set. You may need to update them.",
                    });
                }
            }
        });
        onChange(newValue, functionalChange("add new io pin"));
        reportEvent("addIoPin", { type });
    }, [_prompt, lastMousePos, node, onChange, reportEvent, toast]);
    return (_jsxs(ContextMenuContent, { className: "w-64", children: [_jsx(ContextMenuItem, { onSelect: onOpenNodesLibrary, children: "Open nodes menu" }), _jsx(ContextMenuSeparator, {}), _jsxs(ContextMenuItem, { disabled: !nodeIoEditable, onSelect: () => onAddMainPin("input"), children: ["Add input node ", maybeDisabledLabel] }), _jsxs(ContextMenuItem, { disabled: !nodeIoEditable, onSelect: () => onAddMainPin("output"), children: ["Add output node ", maybeDisabledLabel] }), _jsx(ContextMenuItem, { onSelect: copyNodeToClipboard, children: "Copy node to clipboard" }), _jsxs(ContextMenuItem, { onSelect: editCompletionOutputs, children: ["Edit Completion Outputs (", ((_a = node.completionOutputs) === null || _a === void 0 ? void 0 : _a.join(",")) || "n/a", ")"] }), _jsxs(ContextMenuItem, { onSelect: editReactiveInputs, children: ["Edit Reactive inputs (", ((_b = node.reactiveInputs) === null || _b === void 0 ? void 0 : _b.join(",")) || "n/a", ")"] }), _jsx(ContextMenuItem, { onSelect: editNodeDescription, children: "Edit description" })] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdG9yQ29udGV4dE1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL0VkaXRvckNvbnRleHRNZW51L0VkaXRvckNvbnRleHRNZW51LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixlQUFlLEVBQ2Ysb0JBQW9CLEdBQ3JCLE1BQU0sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFzQixTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hFLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDNUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDNUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQVFwQyxNQUFNLFVBQVUsaUJBQWlCLENBQUMsS0FBNkI7O0lBQzdELE1BQU0sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ25FLE1BQU0sa0JBQWtCLEdBQUcsY0FBYztRQUN2QyxDQUFDLENBQUMsRUFBRTtRQUNKLENBQUMsQ0FBQyx1Q0FBdUMsQ0FBQztJQUU1QyxNQUFNLE9BQU8sR0FBRyxTQUFTLEVBQUUsQ0FBQztJQUU1QixNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsR0FBRywwQkFBMEIsRUFBRSxDQUFDO0lBQ3RFLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztJ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