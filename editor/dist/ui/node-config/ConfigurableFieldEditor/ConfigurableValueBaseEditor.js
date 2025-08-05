"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurableValueBaseEditor = ConfigurableValueBaseEditor;
const jsx_runtime_1 = require("react/jsx-runtime");
const SimpleJsonEditor_1 = require("../SimpleJsonEditor");
const react_1 = require("react");
const SecretSelector_1 = require("./SecretSelector");
const __1 = require("../..");
const inputClassName = "w-full";
function ConfigurableValueBaseEditor(props) {
    var _a, _b, _c, _d;
    const { value, onChange, fieldDefinition, ports, isExpanded, rawJsonData, onRawJsonDataChange, } = props;
    const { prompt: _prompt } = ports;
    const [options, setOptions] = (0, react_1.useState)((fieldDefinition.type === "select"
        ? fieldDefinition.typeData.options
        : []).map((opt) => typeof opt === "object" ? opt : { value: opt, label: String(opt) }) || []);
    // Track raw JSON data internally if not provided from parent
    const [internalRawJsonData, setInternalRawJsonData] = (0, react_1.useState)(rawJsonData ||
        (value.type === "json" ? JSON.stringify(value.value, null, 2) : ""));
    // Update internal state when rawJsonData prop changes
    (0, react_1.useEffect)(() => {
        if (rawJsonData !== undefined && value.type === "json") {
            setInternalRawJsonData(rawJsonData);
        }
    }, [rawJsonData, value.type]);
    // Handle raw JSON data changes
    const handleRawJsonDataChange = (rawData) => {
        setInternalRawJsonData(rawData);
        if (onRawJsonDataChange) {
            onRawJsonDataChange(rawData);
        }
    };
    (0, react_1.useEffect)(() => {
        if (fieldDefinition.type === "select" &&
            !options.some((option) => option.value === value.value) &&
            fieldDefinition.typeConfigurable !== false) {
            setOptions([
                ...options,
                { value: value.value, label: String(value.value) },
            ]);
        }
    }, [value, options, fieldDefinition.type, fieldDefinition.typeConfigurable]);
    const handleAddOption = async () => {
        if (fieldDefinition.typeConfigurable === false) {
            return; // Don't allow adding options when typeConfigurable is false
        }
        const newOption = await _prompt({ text: "Enter a new option:" });
        if (newOption && !options.some((option) => option.value === newOption)) {
            const updatedOptions = [
                ...options,
                {
                    value: newOption,
                    label: newOption,
                },
            ];
            setOptions(updatedOptions);
            onChange({ type: "select", value: newOption });
        }
    };
    switch (value.type) {
        case "number":
            return ((0, jsx_runtime_1.jsx)(__1.Input, { type: "number", value: value.value, onChange: (e) => props.onChange({
                    type: "number",
                    value: parseFloat(e.target.value),
                }), min: fieldDefinition.type === "number" && ((_a = fieldDefinition.typeData) === null || _a === void 0 ? void 0 : _a.min) !== undefined ? fieldDefinition.typeData.min : undefined, max: fieldDefinition.type === "number" && ((_b = fieldDefinition.typeData) === null || _b === void 0 ? void 0 : _b.max) !== undefined ? fieldDefinition.typeData.max : undefined, className: inputClassName }));
        case "string": {
            // Special handling for secrets
            if (fieldDefinition.type === "secret" && ports) {
                return ((0, jsx_runtime_1.jsx)(SecretSelector_1.SecretSelector, { value: value.value, onChange: (newValue) => props.onChange({ type: "string", value: newValue }), ports: ports, typeEditorData: fieldDefinition.typeData }));
            }
            if (fieldDefinition.type === "longtext") {
                return ((0, jsx_runtime_1.jsx)(__1.Textarea, { value: value.value, onChange: (e) => props.onChange({ type: "string", value: e.target.value }), rows: (_d = (_c = fieldDefinition.typeData) === null || _c === void 0 ? void 0 : _c.rows) !== null && _d !== void 0 ? _d : 5, style: {
                        minWidth: isExpanded ? "65vw" : "100%",
                        height: isExpanded ? "65vh" : undefined,
                    } }));
            }
            else {
                return ((0, jsx_runtime_1.jsx)(__1.Input, { value: value.value, onChange: (e) => props.onChange({ type: "string", value: e.target.value }), className: inputClassName }));
            }
        }
        case "json":
            return ((0, jsx_runtime_1.jsx)(SimpleJsonEditor_1.SimpleJsonEditor, { value: value.value, onChange: (value) => props.onChange({ type: "json", value }), isExpanded: isExpanded, rawData: rawJsonData || internalRawJsonData, onChangeRaw: handleRawJsonDataChange }));
        case "boolean":
            return ((0, jsx_runtime_1.jsx)(__1.Checkbox, { checked: value.value, onCheckedChange: (checked) => props.onChange({ type: "boolean", value: checked === true }) }));
        case "select": {
            return ((0, jsx_runtime_1.jsxs)(__1.Select, { value: String(value.value), onValueChange: (val) => {
                    if (val === "__other__") {
                        handleAddOption();
                    }
                    else {
                        props.onChange({ type: "select", value: val });
                    }
                }, children: [(0, jsx_runtime_1.jsx)(__1.SelectTrigger, { className: inputClassName, children: (0, jsx_runtime_1.jsx)(__1.SelectValue, {}) }), (0, jsx_runtime_1.jsxs)(__1.SelectContent, { children: [options.map((option) => ((0, jsx_runtime_1.jsx)(__1.SelectItem, { value: String(option.value), children: option.label }, String(option.value)))), fieldDefinition.typeConfigurable !== false && ((0, jsx_runtime_1.jsx)(__1.SelectItem, { value: "__other__", children: "Other (add new option)" }))] })] }));
        }
        case "dynamic":
            return ((0, jsx_runtime_1.jsx)(__1.Input, { value: `{{${fieldDefinition.configKey}}}`, disabled: true, className: inputClassName }));
        default:
            return ((0, jsx_runtime_1.jsxs)("span", { className: "text-gray-500 dark:text-gray-400 italic", children: ["Trying to render unsupported type: [", value === null || value === void 0 ? void 0 : value.type, "]"] }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJhYmxlVmFsdWVCYXNlRWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3VpL25vZGUtY29uZmlnL0NvbmZpZ3VyYWJsZUZpZWxkRWRpdG9yL0NvbmZpZ3VyYWJsZVZhbHVlQmFzZUVkaXRvci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFjQSxrRUFnTkM7O0FBdk5ELDBEQUF1RDtBQUN2RCxpQ0FBNEM7QUFDNUMscURBQWtEO0FBQ2xELDZCQUFpSDtBQUVqSCxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUM7QUFFaEMsU0FBZ0IsMkJBQTJCLENBQUMsS0FRM0M7O0lBQ0MsTUFBTSxFQUNKLEtBQUssRUFDTCxRQUFRLEVBQ1IsZUFBZSxFQUNmLEtBQUssRUFDTCxVQUFVLEVBQ1YsV0FBVyxFQUNYLG1CQUFtQixHQUNwQixHQUFHLEtBQUssQ0FBQztJQUVWLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUdwQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEtBQUssUUFBUTtRQUNoQyxDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPO1FBQ2xDLENBQUMsQ0FBQyxFQUFFLENBQ0wsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUNaLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUNuRSxJQUFJLEVBQUUsQ0FDUixDQUFDO0lBRUYsNkRBQTZEO0lBQzdELE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxzQkFBc0IsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFDNUQsV0FBVztRQUNYLENBQUMs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