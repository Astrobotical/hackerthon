"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const editor_1 = require("@flyde/editor");
const react_1 = __importDefault(require("react"));
const editor_2 = require("@flyde/editor");
const defaultValuePerStrategy = {
    count: {
        strategy: "count",
        count: { mode: "static", value: 2 },
    },
    time: {
        strategy: "time",
        time: { mode: "static", value: 2000 },
    },
    trigger: {
        strategy: "trigger",
    },
};
const CollectEditor = function CollectEditor({ value, onChange, }) {
    const handleStrategyChange = react_1.default.useCallback((value) => {
        const strategy = value;
        const defaultValue = defaultValuePerStrategy[strategy];
        onChange(defaultValue);
    }, [onChange, value]);
    const innerEditor = react_1.default.useMemo(() => {
        switch (value.strategy) {
            case "count":
                return (react_1.default.createElement(editor_2.ConfigurableInputEditor, { value: value.count, onChange: (count) => onChange({ ...value, count }), valueRenderer: (props) => (react_1.default.createElement(editor_1.FormGroup, { label: "Count:", inline: true },
                        react_1.default.createElement(editor_1.NumericInput, { value: props.value, onValueChange: (e) => onChange({
                                ...value,
                                count: { mode: "static", value: e },
                            }), style: { width: 80 } }))), modeLabel: "Count mode:", defaultStaticValue: 2 }));
            case "time":
                return (react_1.default.createElement(editor_2.ConfigurableInputEditor, { value: value.time, onChange: (time) => onChange({ ...value, time }), valueRenderer: (props) => (react_1.default.createElement(editor_1.FormGroup, { label: "Time:", inline: true },
                        react_1.default.createElement(editor_1.NumericInput, { value: props.value, onValueChange: (e) => onChange({
                                ...value,
                                time: { mode: "static", value: e },
                            }), style: { width: 80 } }))), modeLabel: "Time mode:", defaultStaticValue: 2000 }));
        }
    }, [value, onChange]);
    return (react_1.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "1rem" } },
        react_1.default.createElement("div", { style: { display: "flex", gap: "1rem" } },
            react_1.default.createElement(editor_1.RadioGroup, { value: value.strategy, onValueChange: handleStrategyChange },
                react_1.default.createElement("div", { style: { display: "flex", gap: "1rem" } },
                    react_1.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } },
                        react_1.default.createElement(editor_1.RadioGroupItem, { value: "count", id: "count" }),
                        react_1.default.createElement("label", { htmlFor: "count" }, "Count")),
                    react_1.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } },
                        react_1.default.createElement(editor_1.RadioGroupItem, { value: "time", id: "time" }),
                        react_1.default.createElement("label", { htmlFor: "time" }, "Time")),
                    react_1.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } },
                        react_1.default.createElement(editor_1.RadioGroupItem, { value: "trigger", id: "trigger" }),
                        react_1.default.createElement("label", { htmlFor: "trigger" }, "Dynamic"))))),
        innerEditor));
};
exports.default = CollectEditor;
