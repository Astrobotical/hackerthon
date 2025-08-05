import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { configurableValue, evaluateCondition, } from "@flyde/core";
import { ConfigurableFieldEditor } from "../../ui";
import { usePorts } from "../../flow-editor/ports";
import { useState } from "react";
// Type guard to check if a field is a group
function isGroupField(field) {
    return field && field.type === "group" && Array.isArray(field.fields);
}
// Helper function to evaluate field visibility based on its condition
function evaluateFieldVisibility(field, value) {
    if (field.condition) {
        return evaluateCondition(field.condition, value);
    }
    return true;
}
// Component to render a group of fields
function GroupFields({ group, value, onChange, ports, nodeId, insId }) {
    var _a, _b, _c, _d;
    const [isCollapsed, setIsCollapsed] = useState((_b = (_a = group.typeData) === null || _a === void 0 ? void 0 : _a.defaultCollapsed) !== null && _b !== void 0 ? _b : false);
    if (!evaluateFieldVisibility(group, value)) {
        return null;
    }
    return (_jsxs("div", { style: { marginBottom: "16px" }, children: [_jsxs("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: ((_c = group.typeData) === null || _c === void 0 ? void 0 : _c.collapsible) ? "pointer" : "default",
                    color: "#666",
                    fontSize: "0.9em",
                    fontWeight: "500",
                    paddingBottom: "4px",
                    marginBottom: "8px",
                }, onClick: () => {
                    var _a;
                    if ((_a = group.typeData) === null || _a === void 0 ? void 0 : _a.collapsible) {
                        setIsCollapsed(!isCollapsed);
                    }
                }, children: [_jsx("div", { children: group.label }), ((_d = group.typeData) === null || _d === void 0 ? void 0 : _d.collapsible) && (_jsx("div", { style: { fontSize: "0.8em" }, children: isCollapsed ? "▼ Show" : "▲ Hide" }))] }), group.description && (_jsx("div", { style: {
                    marginBottom: "8px",
                    color: "#888",
                    fontSize: "0.85em",
                }, children: group.description })), !isCollapsed && (_jsx("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: group.fields.map((field) => {
                    var _a;
                    // Check if the field is a group
                    if (isGroupField(field)) {
                        return (_jsx(GroupFields, { group: field, value: value, onChange: onChange, ports: ports, nodeId: nodeId, insId: insId }, field.configKey));
                    }
                    // Check if the field should be visible
                    if (!evaluateFieldVisibility(field, value)) {
                        return null;
                    }
                    // Use ConfigurableFieldEditor for all fields
                    return (_jsx(ConfigurableFieldEditor, { value: (_a = value[field.configKey]) !== null && _a !== void 0 ? _a : configurableValue("dynamic", ""), onChange: (newValue) => onChange({
                            ...value,
                            [field.configKey]: newValue,
                        }), ports: ports, config: field, nodeId: nodeId, insId: insId }, field.configKey));
                }) }))] }));
}
export function StructuredConfigurableEditorComp(editorConfig) {
    return (props) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ports = usePorts();
        return (_jsx("div", { style: { display: "flex", flexDirection: "column", gap: "15px" }, children: editorConfig.fields.map((field) => {
                var _a;
                // Check if the field is a group
                if (isGroupField(field)) {
                    return (_jsx(GroupFields, { group: field, value: props.value, onChange: props.onChange, ports: ports, nodeId: props.nodeId, insId: props.insId }, field.configKey));
                }
                // Check if the field has a condition and evaluate it
                if (!evaluateFieldVisibility(field, props.value)) {
                    return null;
                }
                const configValue = props.value && typeof props.value === "object" ? props.value : {};
                const value = (_a = configValue[field.configKey]) !== null && _a !== void 0 ? _a : configurableValue("dynamic", "");
                // Use ConfigurableFieldEditor for all fields
                return (_jsx(ConfigurableFieldEditor, { value: value, onChange: (newValue) => props.onChange({
                        ...props.value,
                        [field.configKey]: newValue,
                    }), config: field, ports: ports, nodeId: props.nodeId, insId: props.insId }, field.configKey));
            }) }));
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RydWN0dXJlZENvbmZpZ3VyYWJsZUVkaXRvckNvbXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL0luc3RhbmNlQ29uZmlnRWRpdG9yL1N0cnVjdHVyZWRDb25maWd1cmFibGVFZGl0b3JDb21wLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUdqQixpQkFBaUIsR0FHbEIsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBZ0JqQyw0Q0FBNEM7QUFDNUMsU0FBUyxZQUFZLENBQUMsS0FBVTtJQUM5QixPQUFPLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBRUQsc0VBQXNFO0FBQ3RFLFNBQVMsdUJBQXVCLENBQUMsS0FBVSxFQUFFLEtBQVU7SUFDckQsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEIsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCx3Q0FBd0M7QUFDeEMsU0FBUyxXQUFXLENBQUMsRUFDbkIsS0FBSyxFQUNMLEtBQUssRUFDTCxRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFDTixLQUFLLEVBUU47O0lBQ0MsTUFBTSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsR0FBRyxRQUFRLENBQzVDLE1BQUEsTUFBQSxLQUFLLENBQUMsUUFBUSwwQ0FB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