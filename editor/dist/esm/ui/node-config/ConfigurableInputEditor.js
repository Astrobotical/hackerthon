import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
export const ConfigurableInputEditor = function ({ value, onChange, valueRenderer: ValueRenderer, defaultStaticValue, modeLabel, }) {
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
    const MemoValueRenderer = React.useMemo(() => ValueRenderer, [ValueRenderer]);
    return (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: [_jsx("div", { style: { marginBottom: "4px" }, children: _jsx(Label, { children: modeLabel }) }), _jsxs(RadioGroup, { value: value.mode, onValueChange: handleModeChange, style: { display: "flex", gap: "12px" }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [_jsx(RadioGroupItem, { value: "static", id: "static" }), _jsx(Label, { htmlFor: "static", children: "Static" })] }), _jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [_jsx(RadioGroupItem, { value: "dynamic", id: "dynamic" }), _jsx(Label, { htmlFor: "dynamic", children: "Dynamic" })] })] }), value.mode === "static" ? (_jsx(MemoValueRenderer, { value: value.value, onChange: handleValueChange })) : null] }));
};
export const createConfigurableInputEditor = (valueRenderer) => {
    return (props) => (_jsx(ConfigurableInputEditor, { ...props, valueRenderer: valueRenderer }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJhYmxlSW5wdXRFZGl0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdWkvbm9kZS1jb25maWcvQ29uZmlndXJhYmxlSW5wdXRFZGl0b3IudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUE0Qi9DLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLFVBQWEsRUFDbEQsS0FBSyxFQUNMLFFBQVEsRUFDUixhQUFhLEVBQUUsYUFBYSxFQUM1QixrQkFBa0IsRUFDbEIsU0FBUyxHQUN1QjtJQUNoQyxNQUFNLGdCQUFnQixHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUU7UUFDM0MsUUFBUSxDQUFDO1lBQ1AsSUFBSSxFQUFFLE9BQStCO1lBQ3JDLEtBQUssRUFBRSxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsU0FBZ0I7U0FDcEUsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBRUYsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEtBQVEsRUFBRSxFQUFFO1FBQ3JDLFFBQVEsQ0FBQztZQUNQLEtBQUs7WUFDTCxJQUFJLEVBQUUsUUFBUTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztJQUVGLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBRTlFLE9BQU8sQ0FDTCxlQUFLLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGFBQ2xFLGNBQUssS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxZQUNqQyxLQUFDLEtBQUssY0FBRSxTQUFTLEdBQVMsR0FDdEIsRUFDTixNQUFDLFVBQVUsSUFDVCxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksRUFDakIsYUFBYSxFQUFFLGdCQUFnQixFQUMvQixLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsYUFFdkMsZUFBSyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxhQUMvRCxLQUFDLGNBQWMsSUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxRQUFRLEdBQUcsRUFDN0MsS0FBQyxLQUFLLElBQUMsT0FBTyxFQUFDLFFBQVEsdUJBQWUsSUFDbEMsRUFDTixlQUFLLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGFBQy9ELEtBQUMsY0FBYyxJQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFDLFNBQVMsR0FBRyxFQUMvQyxLQUFDLEtBQUssSUFBQyxPQUFPLEVBQUMsU0FBUyx3QkFBZ0IsSUFDcEMsSUFDSyxFQUNaLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUN6QixLQUFDLGlCQUFpQixJQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsR0FBSSxDQUN2RSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQ0osQ0FDUCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sNkJBQTZCLEdBQUcsQ0FHM0MsYUFBMEMsRUFDMUMsRUFBRTtJQUNGLE9BQU8sQ0FBQyxLQUE2RCxFQUFFLEVBQUUsQ0FBQyxDQUN4RSxLQUFDLHVCQUF1QixPQUFLLEtBQUssRUFBRSxhQUFhLEVBQUUsYUFBYSxHQUFJLENBQ3JFLENBQUM7QUFDSixDQUFDLENBQUMifQ==