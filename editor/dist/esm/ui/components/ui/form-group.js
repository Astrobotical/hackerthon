import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Label } from "./label";
import { cn } from "../../lib/utils";
import { AiGenerate } from "../../ai/ai-generate";
const FormGroup = React.forwardRef(({ className, children, label, inline, aiGenerate, ...props }, ref) => {
    return (_jsxs("div", { ref: ref, className: cn("flex", inline ? "flex-row items-center gap-2" : "flex-col gap-1.5", className), ...props, children: [_jsxs("div", { className: "inline-flex items-center w-full justify-between", children: [label && _jsx(Label, { children: label }), aiGenerate && (_jsx(AiGenerate, { ...aiGenerate }))] }), children] }));
});
FormGroup.displayName = "FormGroup";
export { FormGroup };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL3VpL2Zvcm0tZ3JvdXAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFlbEQsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FDaEMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNwRSxPQUFPLENBQ0wsZUFDRSxHQUFHLEVBQUUsR0FBRyxFQUNSLFNBQVMsRUFBRSxFQUFFLENBQ1gsTUFBTSxFQUNOLE1BQU0sQ0FBQyxDQUFDLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixFQUMzRCxTQUFTLENBQ1YsS0FDRyxLQUFLLGFBRVQsZUFBSyxTQUFTLEVBQUMsaURBQWlELGFBQzdELEtBQUssSUFBSSxLQUFDLEtBQUssY0FBRSxLQUFLLEdBQVMsRUFDL0IsVUFBVSxJQUFJLENBQ2IsS0FBQyxVQUFVLE9BQ0wsVUFBVSxHQUNkLENBQ0gsSUFDRyxFQUNMLFFBQVEsSUFDTCxDQUNQLENBQUM7QUFDSixDQUFDLENBQ0YsQ0FBQztBQUNGLFNBQVMsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBRXBDLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyJ9