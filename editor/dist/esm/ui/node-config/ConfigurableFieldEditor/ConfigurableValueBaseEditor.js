import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SimpleJsonEditor } from "../SimpleJsonEditor";
import { useState, useEffect } from "react";
import { SecretSelector } from "./SecretSelector";
import { Checkbox, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "../..";
const inputClassName = "w-full";
export function ConfigurableValueBaseEditor(props) {
    var _a, _b, _c, _d;
    const { value, onChange, fieldDefinition, ports, isExpanded, rawJsonData, onRawJsonDataChange, } = props;
    const { prompt: _prompt } = ports;
    const [options, setOptions] = useState((fieldDefinition.type === "select"
        ? fieldDefinition.typeData.options
        : []).map((opt) => typeof opt === "object" ? opt : { value: opt, label: String(opt) }) || []);
    // Track raw JSON data internally if not provided from parent
    const [internalRawJsonData, setInternalRawJsonData] = useState(rawJsonData ||
        (value.type === "json" ? JSON.stringify(value.value, null, 2) : ""));
    // Update internal state when rawJsonData prop changes
    useEffect(() => {
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
    useEffect(() => {
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
            return (_jsx(Input, { type: "number", value: value.value, onChange: (e) => props.onChange({
                    type: "number",
                    value: parseFloat(e.target.value),
                }), min: fieldDefinition.type === "number" && ((_a = fieldDefinition.typeData) === null || _a === void 0 ? void 0 : _a.min) !== undefined ? fieldDefinition.typeData.min : undefined, max: fieldDefinition.type === "number" && ((_b = fieldDefinition.typeData) === null || _b === void 0 ? void 0 : _b.max) !== undefined ? fieldDefinition.typeData.max : undefined, className: inputClassName }));
        case "string": {
            // Special handling for secrets
            if (fieldDefinition.type === "secret" && ports) {
                return (_jsx(SecretSelector, { value: value.value, onChange: (newValue) => props.onChange({ type: "string", value: newValue }), ports: ports, typeEditorData: fieldDefinition.typeData }));
            }
            if (fieldDefinition.type === "longtext") {
                return (_jsx(Textarea, { value: value.value, onChange: (e) => props.onChange({ type: "string", value: e.target.value }), rows: (_d = (_c = fieldDefinition.typeData) === null || _c === void 0 ? void 0 : _c.rows) !== null && _d !== void 0 ? _d : 5, style: {
                        minWidth: isExpanded ? "65vw" : "100%",
                        height: isExpanded ? "65vh" : undefined,
                    } }));
            }
            else {
                return (_jsx(Input, { value: value.value, onChange: (e) => props.onChange({ type: "string", value: e.target.value }), className: inputClassName }));
            }
        }
        case "json":
            return (_jsx(SimpleJsonEditor, { value: value.value, onChange: (value) => props.onChange({ type: "json", value }), isExpanded: isExpanded, rawData: rawJsonData || internalRawJsonData, onChangeRaw: handleRawJsonDataChange }));
        case "boolean":
            return (_jsx(Checkbox, { checked: value.value, onCheckedChange: (checked) => props.onChange({ type: "boolean", value: checked === true }) }));
        case "select": {
            return (_jsxs(Select, { value: String(value.value), onValueChange: (val) => {
                    if (val === "__other__") {
                        handleAddOption();
                    }
                    else {
                        props.onChange({ type: "select", value: val });
                    }
                }, children: [_jsx(SelectTrigger, { className: inputClassName, children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [options.map((option) => (_jsx(SelectItem, { value: String(option.value), children: option.label }, String(option.value)))), fieldDefinition.typeConfigurable !== false && (_jsx(SelectItem, { value: "__other__", children: "Other (add new option)" }))] })] }));
        }
        case "dynamic":
            return (_jsx(Input, { value: `{{${fieldDefinition.configKey}}}`, disabled: true, className: inputClassName }));
        default:
            return (_jsxs("span", { className: "text-gray-500 dark:text-gray-400 italic", children: ["Trying to render unsupported type: [", value === null || value === void 0 ? void 0 : value.type, "]"] }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJhYmxlVmFsdWVCYXNlRWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL25vZGUtY29uZmlnL0NvbmZpZ3VyYWJsZUZpZWxkRWRpdG9yL0NvbmZpZ3VyYWJsZVZhbHVlQmFzZUVkaXRvci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUVqSCxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUM7QUFFaEMsTUFBTSxVQUFVLDJCQUEyQixDQUFDLEtBUTNDOztJQUNDLE1BQU0sRUFDSixLQUFLLEVBQ0wsUUFBUSxFQUNSLGVBQWUsRUFDZixLQUFLLEVBQ0wsVUFBVSxFQUNWLFdBQVcsRUFDWCxtQkFBbUIsR0FDcEIsR0FBRyxLQUFLLENBQUM7SUFFVixNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNsQyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FHcEMsQ0FBQyxlQUFlLENBQUMsSUFBSSxLQUFLLFFBQVE7UUFDaEMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsT0FBTztRQUNsQyxDQUFDLENBQUMsRUFBRSxDQUNMLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDWixPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxD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