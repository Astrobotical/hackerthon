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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const input_1 = require("./input");
const NumericInput = React.forwardRef(({ value, onValueChange, min, max, step = 1, ...props }, ref) => {
    const handleChange = (e) => {
        const newValue = e.target.value === "" ? 0 : parseFloat(e.target.value);
        if (!isNaN(newValue)) {
            if (min !== undefined && newValue < min)
                return;
            if (max !== undefined && newValue > max)
                return;
            onValueChange(newValue);
        }
    };
    return ((0, jsx_runtime_1.jsx)(input_1.Input, { ref: ref, type: "number", value: value, onChange: handleChange, min: min, max: max, step: step, ...props }));
});
exports.NumericInput = NumericInput;
NumericInput.displayName = "NumericInput";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL3VpL251bWVyaWMtaW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFDL0IsbUNBQWdDO0FBV2hDLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQ25DLENBQUMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQzlELE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBc0MsRUFBRSxFQUFFO1FBQzlELE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDckIsSUFBSSxHQUFHLEtBQUssU0FBUyxJQUFJLFFBQVEsR0FBRyxHQUFHO2dCQUFFLE9BQU87WUFDaEQsSUFBSSxHQUFHLEtBQUssU0FBUyxJQUFJLFFBQVEsR0FBRyxHQUFHO2dCQUFFLE9BQU87WUFDaEQsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFCLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixPQUFPLENBQ0wsdUJBQUMsYUFBSyxJQUNKLEdBQUcsRUFBRSxHQUFHLEVBQ1IsSUFBSSxFQUFDLFFBQVEsRUFDYixLQUFLLEVBQUUsS0FBSyxFQUNaLFFBQVEsRUFBRSxZQUFZLEVBQ3RCLEdBQUcsRUFBRSxHQUFHLEVBQ1IsR0FBRyxFQUFFLEdBQUcsRUFDUixJQUFJLEVBQUUsSUFBSSxLQUNOLEtBQUssR0FDVCxDQUNILENBQUM7QUFDSixDQUFDLENBQ0YsQ0FBQztBQUdPLG9DQUFZO0FBRnJCLFlBQVksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDIn0=