"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorContextMenu = EditorContextMenu;
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("../../ui");
const utils_1 = require("../../utils");
const core_1 = require("@flyde/core");
const immer_1 = __importDefault(require("immer"));
const react_1 = __importDefault(require("react"));
const __1 = require("../..");
const flyde_flow_change_type_1 = require("../../flow-editor/flyde-flow-change-type");
const VisualNodeEditorContext_1 = require("../VisualNodeEditorContext");
const ui_2 = require("../../ui");
function EditorContextMenu(props) {
    var _a, _b;
    const { nodeIoEditable, lastMousePos, onOpenNodesLibrary } = props;
    const maybeDisabledLabel = nodeIoEditable
        ? ""
        : " (cannot edit main node, only visual)";
    const _prompt = (0, __1.usePrompt)();
    const { node, onChangeNode: onChange } = (0, VisualNodeEditorContext_1.useVisualNodeEditorContext)();
    const { reportEvent } = (0, __1.usePorts)();
    const { toast } = (0, ui_2.useToast)();
    const editCompletionOutputs = react_1.default.useCallback(async () => {
        var _a;
        const curr = (_a = node.completionOutputs) === null || _a === void 0 ? void 0 : _a.join(",");
        const newVal = await _prompt(`Edit completion outputs`, curr);
        if ((0, utils_1.isDefined)(newVal) && newVal !== null) {
            const newValue = (0, immer_1.default)(node, (draft) => {
                draft.completionOutputs = newVal === "" ? undefined : newVal.split(",");
            });
            onChange(newValue, (0, flyde_flow_change_type_1.functionalChange)("change node completions"));
            reportEvent("editCompletionOutputs", {
                count: newVal ? newVal.split(",").length : 0,
            });
        }
    }, [_prompt, onChange, node, reportEvent]);
    const editReactiveInputs = react_1.default.useCallback(async () => {
        var _a;
        const curr = (_a = node.reactiveInputs) === null || _a === void 0 ? void 0 : _a.join(",");
        const newVal = await _prompt(`Edit reactive inputs`, curr);
        if ((0, utils_1.isDefined)(newVal) && newVal !== null) {
            const newValue = (0, immer_1.default)(node, (draft) => {
                draft.reactiveInputs = newVal === "" ? undefined : newVal.split(",");
            });
            onChange(newValue, (0, flyde_flow_change_type_1.functionalChange)("change reactive inputs"));
            reportEvent("editReactiveInputs", {
                count: newVal ? newVal.split(",").length : 0,
            });
        }
    }, [_prompt, onChange, node, reportEvent]);
    const editNodeDescription = react_1.default.useCallback(async () => {
        var _a;
        const description = (_a = await _prompt(`Description?`, node.description)) !== null && _a !== void 0 ? _a : undefined;
        const newValue = (0, immer_1.default)(node, (draft) => {
            draft.description = description;
        });
        onChange(newValue, (0, flyde_flow_change_type_1.functionalChange)("Edit node description"));
    }, [_prompt, onChange, node]);
    const onChangeDefaultStyle = react_1.default.useCallback((style) => {
        const newNode = (0, immer_1.default)(node, (draft) => {
            draft.defaultStyle = style;
        });
        onChange(newNode, (0, flyde_flow_change_type_1.functionalChange)("change default style"));
        reportEvent("changeStyle", { isDefault: true });
    }, [onChange, node, reportEvent]);
    const copyNodeToClipboard = react_1.default.useCallback(async () => {
        const str = JSON.stringify(node);
        await navigator.clipboard.writeText(str);
        toast({
            description: "Copied!",
        });
    }, [node, toast]);
    const onAddMainPin = react_1.default.useCallback(async (type) => {
        const newPinId = await _prompt(`New ${type} pin name?`);
        if (!newPinId) {
            // name selection dismissed, cancelling
            return;
        }
        const newValue = (0, immer_1.default)(node, (draft) => {
            var _a, _b, _c;
            if (type === "input") {
                if (!node.inputs) {
                    draft.inputs = {};
                }
                draft.inputs[newPinId] = (0, core_1.nodeInput)();
                draft.inputsPosition[newPinId] = (_a = lastMousePos.current) !== null && _a !== void 0 ? _a : { x: 0, y: 0 };
            }
            else {
                if (!node.outputs) {
                    draft.outputs = {};
                }
                draft.outputs[newPinId] = (0, core_1.nodeOutput)();
                draft.outputsPosition[newPinId] = (_b = lastMousePos.current) !== null && _b !== void 0 ? _b : { x: 0, y: 0 };
                if ((_c = draft.completionOutputs) === null || _c === void 0 ? void 0 : _c.length) {
                    toast({
                        description: "Note that this node has explicit completion outputs set. You may need to update them.",
                    });
                }
            }
        });
        onChange(newValue, (0, flyde_flow_change_type_1.functionalChange)("add new io pin"));
        reportEvent("addIoPin", { type });
    }, [_prompt, lastMousePos, node, onChange, reportEvent, toast]);
    return ((0, jsx_runtime_1.jsxs)(ui_1.ContextMenuContent, { className: "w-64", children: [(0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onSelect: onOpenNodesLibrary, children: "Open nodes menu" }), (0, jsx_runtime_1.jsx)(ui_1.ContextMenuSeparator, {}), (0, jsx_runtime_1.jsxs)(ui_1.ContextMenuItem, { disabled: !nodeIoEditable, onSelect: () => onAddMainPin("input"), children: ["Add input node ", maybeDisabledLabel] }), (0, jsx_runtime_1.jsxs)(ui_1.ContextMenuItem, { disabled: !nodeIoEditable, onSelect: () => onAddMainPin("output"), children: ["Add output node ", maybeDisabledLabel] }), (0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onSelect: copyNodeToClipboard, children: "Copy node to clipboard" }), (0, jsx_runtime_1.jsxs)(ui_1.ContextMenuItem, { onSelect: editCompletionOutputs, children: ["Edit Completion Outputs (", ((_a = node.completionOutputs) === null || _a === void 0 ? void 0 : _a.join(",")) || "n/a", ")"] }), (0, jsx_runtime_1.jsxs)(ui_1.ContextMenuItem, { onSelect: editReactiveInputs, children: ["Edit Reactive inputs (", ((_b = node.reactiveInputs) === null || _b === void 0 ? void 0 : _b.join(",")) || "n/a", ")"] }), (0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onSelect: editNodeDescription, children: "Edit description" })] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdG9yQ29udGV4dE1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL0VkaXRvckNvbnRleHRNZW51L0VkaXRvckNvbnRleHRNZW51LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW9CQSw4Q0FpSkM7O0FBcktELGlDQUlrQjtBQUNsQix1Q0FBd0M7QUFDeEMsc0NBQXdFO0FBQ3hFLGtEQUE0QjtBQUM1QixrREFBMEI7QUFDMUIsNkJBQTRDO0FBQzVDLHFGQUE0RTtBQUM1RSx3RUFBd0U7QUFDeEUsaUNBQW9DO0FBUXBDLFNBQWdCLGlCQUFpQixDQUFDLEtBQTZCOztJQUM3RCxNQUFNLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNuRSxNQUFNLGtCQUFrQixHQUFHLGNBQWM7UUFDdkMsQ0FBQyxDQUFDLEVBQUU7UUFDSixDQUFDLENBQUMsdUNBQXVDLENBQUM7SUFFNUMsTUFBTSxPQUFPLEdBQUcsSUFBQSxhQUFTLEdBQUUsQ0FBQztJQUU1QixNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFBLG9EQUEwQixHQUFFLENBQUM7SUFDdEUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUEsWUFBUSxHQUFFLENBQUM7SUFFbkMsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUEsYUFBUSxHQUFFLENBQUM7SUFFN0IsTUFBTSxxQkFBcUIsR0FBRyxlQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFOztRQUN6RCxNQUFNLElBQUksR0FBRyxNQUFBLElBQUksQ0FBQyxpQkFBaUIsMENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlELElBQUksSUFB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