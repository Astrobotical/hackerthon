import { FormGroup, NumericInput, RadioGroup, RadioGroupItem } from "@flyde/editor";
import React from "react";
import { ConfigurableInputEditor } from "@flyde/editor";
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
    const handleStrategyChange = React.useCallback((value) => {
        const strategy = value;
        const defaultValue = defaultValuePerStrategy[strategy];
        onChange(defaultValue);
    }, [onChange, value]);
    const innerEditor = React.useMemo(() => {
        switch (value.strategy) {
            case "count":
                return (React.createElement(ConfigurableInputEditor, { value: value.count, onChange: (count) => onChange({ ...value, count }), valueRenderer: (props) => (React.createElement(FormGroup, { label: "Count:", inline: true },
                        React.createElement(NumericInput, { value: props.value, onValueChange: (e) => onChange({
                                ...value,
                                count: { mode: "static", value: e },
                            }), style: { width: 80 } }))), modeLabel: "Count mode:", defaultStaticValue: 2 }));
            case "time":
                return (React.createElement(ConfigurableInputEditor, { value: value.time, onChange: (time) => onChange({ ...value, time }), valueRenderer: (props) => (React.createElement(FormGroup, { label: "Time:", inline: true },
                        React.createElement(NumericInput, { value: props.value, onValueChange: (e) => onChange({
                                ...value,
                                time: { mode: "static", value: e },
                            }), style: { width: 80 } }))), modeLabel: "Time mode:", defaultStaticValue: 2000 }));
        }
    }, [value, onChange]);
    return (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "1rem" } },
        React.createElement("div", { style: { display: "flex", gap: "1rem" } },
            React.createElement(RadioGroup, { value: value.strategy, onValueChange: handleStrategyChange },
                React.createElement("div", { style: { display: "flex", gap: "1rem" } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } },
                        React.createElement(RadioGroupItem, { value: "count", id: "count" }),
                        React.createElement("label", { htmlFor: "count" }, "Count")),
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } },
                        React.createElement(RadioGroupItem, { value: "time", id: "time" }),
                        React.createElement("label", { htmlFor: "time" }, "Time")),
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } },
                        React.createElement(RadioGroupItem, { value: "trigger", id: "trigger" }),
                        React.createElement("label", { htmlFor: "trigger" }, "Dynamic"))))),
        innerEditor));
};
export default CollectEditor;
