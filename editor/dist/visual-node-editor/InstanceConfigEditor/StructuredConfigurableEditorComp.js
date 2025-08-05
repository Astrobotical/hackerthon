"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructuredConfigurableEditorComp = StructuredConfigurableEditorComp;
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@flyde/core");
const ui_1 = require("../../ui");
const ports_1 = require("../../flow-editor/ports");
const react_1 = require("react");
// Type guard to check if a field is a group
function isGroupField(field) {
    return field && field.type === "group" && Array.isArray(field.fields);
}
// Helper function to evaluate field visibility based on its condition
function evaluateFieldVisibility(field, value) {
    if (field.condition) {
        return (0, core_1.evaluateCondition)(field.condition, value);
    }
    return true;
}
// Component to render a group of fields
function GroupFields({ group, value, onChange, ports, nodeId, insId }) {
    var _a, _b, _c, _d;
    const [isCollapsed, setIsCollapsed] = (0, react_1.useState)((_b = (_a = group.typeData) === null || _a === void 0 ? void 0 : _a.defaultCollapsed) !== null && _b !== void 0 ? _b : false);
    if (!evaluateFieldVisibility(group, value)) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: "16px" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
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
                }, children: [(0, jsx_runtime_1.jsx)("div", { children: group.label }), ((_d = group.typeData) === null || _d === void 0 ? void 0 : _d.collapsible) && ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: "0.8em" }, children: isCollapsed ? "▼ Show" : "▲ Hide" }))] }), group.description && ((0, jsx_runtime_1.jsx)("div", { style: {
                    marginBottom: "8px",
                    color: "#888",
                    fontSize: "0.85em",
                }, children: group.description })), !isCollapsed && ((0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: group.fields.map((field) => {
                    var _a;
                    // Check if the field is a group
                    if (isGroupField(field)) {
                        return ((0, jsx_runtime_1.jsx)(GroupFields, { group: field, value: value, onChange: onChange, ports: ports, nodeId: nodeId, insId: insId }, field.configKey));
                    }
                    // Check if the field should be visible
                    if (!evaluateFieldVisibility(field, value)) {
                        return null;
                    }
                    // Use ConfigurableFieldEditor for all fields
                    return ((0, jsx_runtime_1.jsx)(ui_1.ConfigurableFieldEditor, { value: (_a = value[field.configKey]) !== null && _a !== void 0 ? _a : (0, core_1.configurableValue)("dynamic", ""), onChange: (newValue) => onChange({
                            ...value,
                            [field.configKey]: newValue,
                        }), ports: ports, config: field, nodeId: nodeId, insId: insId }, field.configKey));
                }) }))] }));
}
function StructuredConfigurableEditorComp(editorConfig) {
    return (props) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ports = (0, ports_1.usePorts)();
        return ((0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: "15px" }, children: editorConfig.fields.map((field) => {
                var _a;
                // Check if the field is a group
                if (isGroupField(field)) {
                    return ((0, jsx_runtime_1.jsx)(GroupFields, { group: field, value: props.value, onChange: props.onChange, ports: ports, nodeId: props.nodeId, insId: props.insId }, field.configKey));
                }
                // Check if the field has a condition and evaluate it
                if (!evaluateFieldVisibility(field, props.value)) {
                    return null;
                }
                const configValue = props.value && typeof props.value === "object" ? props.value : {};
                const value = (_a = configValue[field.configKey]) !== null && _a !== void 0 ? _a : (0, core_1.configurableValue)("dynamic", "");
                // Use ConfigurableFieldEditor for all fields
                return ((0, jsx_runtime_1.jsx)(ui_1.ConfigurableFieldEditor, { value: value, onChange: (newValue) => props.onChange({
                        ...props.value,
                        [field.configKey]: newValue,
                    }), config: field, ports: ports, nodeId: props.nodeId, insId: props.insId }, field.configKey));
            }) }));
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RydWN0dXJlZENvbmZpZ3VyYWJsZUVkaXRvckNvbXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL0luc3RhbmNlQ29uZmlnRWRpdG9yL1N0cnVjdHVyZWRDb25maWd1cmFibGVFZGl0b3JDb21wLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXdKQSw0RUF3REM7O0FBaE5ELHNDQU9xQjtBQUNyQixpQ0FBbUQ7QUFDbkQsbURBQW1EO0FBQ25ELGlDQUFpQztBQWdCakMsNENBQTRDO0FBQzVDLFNBQVMsWUFBWSxDQUFDLEtBQVU7SUFDOUIsT0FBTyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQUVELHNFQUFzRTtBQUN0RSxTQUFTLHVCQUF1QixDQUFDLEtBQVUsRUFBRSxLQUFVO0lBQ3JELElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sSUFBQSx3QkFBaUIsRUFBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCx3Q0FBd0M7QUFDeEMsU0FBUyxXQUFXLENBQUMsRUFDbkIsS0FBSyxFQUNMLEtBQUssRUFDTCxRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFDTixLQUFLLEVBUU47O0lBQ0MsTUFBTSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQzVDLE1BQUEsTUFBQSxLQUFLLENBQUMsUUFBUSwwQ0FBRSxnQkFBZ0IsbUNBQUksS0FBSyxDQUMxQyxDQUFDO0lBQ0YsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFD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