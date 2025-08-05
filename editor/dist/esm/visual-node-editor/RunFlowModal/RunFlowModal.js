import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
// ;
import Editor from "@monaco-editor/react";
import { useLocalStorage } from "../../lib/user-preferences";
import { InfoTooltip } from "../../lib/InfoTooltip";
import { usePorts } from "../../flow-editor/ports";
import { Button } from "../../ui";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../../ui";
import { Slider } from "../../ui";
export const RunFlowModal = React.memo(function RunFlowModal(props) {
    const { onClose, node } = props;
    const { onRunFlow } = usePorts();
    const [executionDelay, setExecutionDelay] = React.useState(0);
    const [lastValues, setLastValues] = useLocalStorage(`run-inputs-${node.id}`, Object.keys(node.inputs).reduce((acc, key) => {
        acc[key] = `Enter a value for input ${key}`;
        return acc;
    }, {}));
    const [inputsValue, setInputsValue] = React.useState(JSON.stringify(lastValues, null, 2));
    const onMonacoMount = (editor) => {
        if (editor) {
            editor.updateOptions({
                lineNumbers: "off",
                minimap: { enabled: false },
            });
        }
    };
    const _onRun = React.useCallback(() => {
        const inputs = JSON.parse(inputsValue);
        setLastValues(inputs);
        onRunFlow(inputs, executionDelay);
        onClose();
    }, [inputsValue, setLastValues, onRunFlow, executionDelay, onClose]);
    const onKeyDown = (e) => {
        if (e.key === "Enter" && e.metaKey) {
            _onRun();
        }
    };
    const flowInputs = Object.keys(node.inputs);
    const optionals = flowInputs.filter((key) => { var _a; return ((_a = node.inputs[key]) === null || _a === void 0 ? void 0 : _a.mode) !== "required"; });
    const maybeInputs = React.useMemo(() => {
        if (flowInputs.length) {
            return (_jsxs(_Fragment, { children: [_jsx("strong", { children: "This node receives external inputs. Enter values for each input below:" }), _jsx(Editor, { height: "80px", theme: "vs-dark", defaultLanguage: "json", value: inputsValue, onChange: (val) => setInputsValue(val !== null && val !== void 0 ? val : ""), onMount: onMonacoMount }), optionals.length > 0 ? (_jsxs("div", { className: "rounded-md border border-muted bg-muted/50 p-4 text-sm text-muted-foreground", children: ["Note: input(s) ", _jsx("code", { children: optionals.join(", ") }), " are optional"] })) : null] }));
        }
        else {
            return _jsx("strong", { children: "This node does not receive any external inputs." });
        }
    }, [flowInputs.length, optionals, inputsValue]);
    return (_jsx(Dialog, { open: true, onOpenChange: () => onClose(), children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsx(DialogHeader, { children: _jsxs("div", { className: "space-y-4", onKeyDown: onKeyDown, tabIndex: 0, children: [maybeInputs, _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Execution delay:" }), _jsx(InfoTooltip, { content: "Delay between each node execution. Useful for debugging." })] }), _jsx(Slider, { value: [executionDelay], onValueChange: ([value]) => setExecutionDelay(value !== null && value !== void 0 ? value : 0), min: 0, max: 1000, step: 100, className: "w-full" }), _jsxs("div", { className: "text-xs text-muted-foreground", children: [executionDelay, "ms"] })] })] }) }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: onClose, children: "Close" }), _jsx(Button, { onClick: _onRun, children: "Run" })] })] }) }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuRmxvd01vZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9SdW5GbG93TW9kYWwvUnVuRmxvd01vZGFsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFL0IsSUFBSTtBQUVKLE9BQU8sTUFBbUIsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDN0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQVFsQyxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQWdDLEtBQUssQ0FBQyxJQUFJLENBQ2pFLFNBQVMsWUFBWSxDQUFDLEtBQUs7SUFDekIsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFFaEMsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBRWpDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTlELE1BQU0sQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEdBQUcsZUFBZSxDQUNqRCxjQUFjLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxD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