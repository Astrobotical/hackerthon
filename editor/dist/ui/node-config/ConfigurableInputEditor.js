"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfigurableInputEditor = exports.ConfigurableInputEditor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const radio_group_1 = require("../components/ui/radio-group");
const label_1 = require("../components/ui/label");
const ConfigurableInputEditor = function ({ value, onChange, valueRenderer: ValueRenderer, defaultStaticValue, modeLabel, }) {
    const handleModeChange = (newMode) => {
        onChange({
            mode: newMode,
            value: newMode === "static" ? defaultStaticValue : undefined,
        });
    };
    const handleValueChange = (value) => {
        onChange({
            value,
            mode: "static",
        });
    };
    const MemoValueRenderer = react_1.default.useMemo(() => ValueRenderer, [ValueRenderer]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: [(0, jsx_runtime_1.jsx)("div", { style: { marginBottom: "4px" }, children: (0, jsx_runtime_1.jsx)(label_1.Label, { children: modeLabel }) }), (0, jsx_runtime_1.jsxs)(radio_group_1.RadioGroup, { value: value.mode, onValueChange: handleModeChange, style: { display: "flex", gap: "12px" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [(0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, { value: "static", id: "static" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "static", children: "Static" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [(0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, { value: "dynamic", id: "dynamic" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "dynamic", children: "Dynamic" })] })] }), value.mode === "static" ? ((0, jsx_runtime_1.jsx)(MemoValueRenderer, { value: value.value, onChange: handleValueChange })) : null] }));
};
exports.ConfigurableInputEditor = ConfigurableInputEditor;
const createConfigurableInputEditor = (valueRenderer) => {
    return (props) => ((0, jsx_runtime_1.jsx)(exports.ConfigurableInputEditor, { ...props, valueRenderer: valueRenderer }));
};
exports.createConfigurableInputEditor = createConfigurableInputEditor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJhYmxlSW5wdXRFZGl0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdWkvbm9kZS1jb25maWcvQ29uZmlndXJhYmxlSW5wdXRFZGl0b3IudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsOERBQTBFO0FBQzFFLGtEQUErQztBQTRCeEMsTUFBTSx1QkFBdUIsR0FBRyxVQUFhLEVBQ2xELEtBQUssRUFDTCxRQUFRLEVBQ1IsYUFBYSxFQUFFLGFBQWEsRUFDNUIsa0JBQWtCLEVBQ2xCLFNBQVMsR0FDdUI7SUFDaEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFO1FBQzNDLFFBQVEsQ0FBQztZQUNQLElBQUksRUFBRSxPQUErQjtZQUNyQyxLQUFLLEVBQUUsT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFNBQWdCO1NBQ3BFLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztJQUVGLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxLQUFRLEVBQUUsRUFBRTtRQUNyQyxRQUFRLENBQUM7WUFDUCxLQUFLO1lBQ0wsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7SUFFRixNQUFNLGlCQUFpQixHQUFHLGVBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUU5RSxPQUFPLENBQ0wsaUNBQUssS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsYUFDbEUsZ0NBQUssS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxZQUNqQyx1QkFBQyxhQUFLLGNBQUUsU0FBUyxHQUFTLEdBQ3RCLEVBQ04sd0JBQUMsd0JBQVUsSUFDVCxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksRUFDakIsYUFBYSxFQUFFLGdCQUFnQixFQUMvQixLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsYUFFdkMsaUNBQUssS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsYUFDL0QsdUJBQUMsNEJBQWMsSUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxRQUFRLEdBQUcsRUFDN0MsdUJBQUMsYUFBSyxJQUFDLE9BQU8sRUFBQyxRQUFRLHVCQUFlLElBQ2xDLEVBQ04saUNBQUssS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsYUFDL0QsdUJBQUMsNEJBQWMsSUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLEVBQUUsRUFBQyxTQUFTLEdBQUcsRUFDL0MsdUJBQUMsYUFBSyxJQUFDLE9BQU8sRUFBQyxTQUFTLHdCQUFnQixJQUNwQyxJQUNLLEVBQ1osS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQ3pCLHVCQUFDLGlCQUFpQixJQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsR0FBSSxDQUN2RSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQ0osQ0FDUCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBL0NXLFFBQUEsdUJBQXVCLDJCQStDbEM7QUFFSyxNQUFNLDZCQUE2QixHQUFHLENBRzNDLGFBQTBDLEVBQzFDLEVBQUU7SUFDRixPQUFPLENBQUMsS0FBNkQsRUFBRSxFQUFFLENBQUMsQ0FDeEUsdUJBQUMsK0JBQXVCLE9BQUssS0FBSyxFQUFFLGFBQWEsRUFBRSxhQUFhLEdBQUksQ0FDckUsQ0FBQztBQUNKLENBQUMsQ0FBQztBQVJXLFFBQUEsNkJBQTZCLGlDQVF4QyJ9