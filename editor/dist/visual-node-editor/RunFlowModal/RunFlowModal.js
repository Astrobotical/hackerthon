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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunFlowModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
// ;
const react_1 = __importDefault(require("@monaco-editor/react"));
const user_preferences_1 = require("../../lib/user-preferences");
const InfoTooltip_1 = require("../../lib/InfoTooltip");
const ports_1 = require("../../flow-editor/ports");
const ui_1 = require("../../ui");
const ui_2 = require("../../ui");
const ui_3 = require("../../ui");
exports.RunFlowModal = React.memo(function RunFlowModal(props) {
    const { onClose, node } = props;
    const { onRunFlow } = (0, ports_1.usePorts)();
    const [executionDelay, setExecutionDelay] = React.useState(0);
    const [lastValues, setLastValues] = (0, user_preferences_1.useLocalStorage)(`run-inputs-${node.id}`, Object.keys(node.inputs).reduce((acc, key) => {
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
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("strong", { children: "This node receives external inputs. Enter values for each input below:" }), (0, jsx_runtime_1.jsx)(react_1.default, { height: "80px", theme: "vs-dark", defaultLanguage: "json", value: inputsValue, onChange: (val) => setInputsValue(val !== null && val !== void 0 ? val : ""), onMount: onMonacoMount }), optionals.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-md border border-muted bg-muted/50 p-4 text-sm text-muted-foreground", children: ["Note: input(s) ", (0, jsx_runtime_1.jsx)("code", { children: optionals.join(", ") }), " are optional"] })) : null] }));
        }
        else {
            return (0, jsx_runtime_1.jsx)("strong", { children: "This node does not receive any external inputs." });
        }
    }, [flowInputs.length, optionals, inputsValue]);
    return ((0, jsx_runtime_1.jsx)(ui_2.Dialog, { open: true, onOpenChange: () => onClose(), children: (0, jsx_runtime_1.jsxs)(ui_2.DialogContent, { className: "sm:max-w-[425px]", children: [(0, jsx_runtime_1.jsx)(ui_2.DialogHeader, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", onKeyDown: onKeyDown, tabIndex: 0, children: [maybeInputs, (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("label", { className: "text-sm font-medium", children: "Execution delay:" }), (0, jsx_runtime_1.jsx)(InfoTooltip_1.InfoTooltip, { content: "Delay between each node execution. Useful for debugging." })] }), (0, jsx_runtime_1.jsx)(ui_3.Slider, { value: [executionDelay], onValueChange: ([value]) => setExecutionDelay(value !== null && value !== void 0 ? value : 0), min: 0, max: 1000, step: 100, className: "w-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-muted-foreground", children: [executionDelay, "ms"] })] })] }) }), (0, jsx_runtime_1.jsxs)(ui_2.DialogFooter, { children: [(0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "outline", onClick: onClose, children: "Close" }), (0, jsx_runtime_1.jsx)(ui_1.Button, { onClick: _onRun, children: "Run" })] })] }) }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuRmxvd01vZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9SdW5GbG93TW9kYWwvUnVuRmxvd01vZGFsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStCO0FBRS9CLElBQUk7QUFFSixpRUFBdUQ7QUFFdkQsaUVBQTZEO0FBQzdELHVEQUFvRDtBQUNwRCxtREFBbUQ7QUFDbkQsaUNBQWtDO0FBQ2xDLGlDQUE2RTtBQUM3RSxpQ0FBa0M7QUFRckIsUUFBQSxZQUFZLEdBQWdDLEtBQUssQ0FBQyxJQUFJLENBQ2pFLFNBQVMsWUFBWSxDQUFDLEtBQUs7SUFDekIsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFFaEMsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLElBQUEsZ0JBQVEsR0FBRSxDQUFDO0lBRWpDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTlELE1BQU0sQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEdBQUcsSUFBQSxrQ0FBZSxFQUNqRCxjQUFjLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzNDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRywyQkFBMkIsR0FBRyxFQUFFLENBQUM7UUFDNUMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLEVBQUUsRUFBNEIsQ0FBQyxDQUNqQyxDQUFDO0lBRUYsTUFBTSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUNsRCxJQUFJ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