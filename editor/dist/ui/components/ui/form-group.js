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
exports.FormGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const label_1 = require("./label");
const utils_1 = require("../../lib/utils");
const ai_generate_1 = require("../../ai/ai-generate");
const FormGroup = React.forwardRef(({ className, children, label, inline, aiGenerate, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, utils_1.cn)("flex", inline ? "flex-row items-center gap-2" : "flex-col gap-1.5", className), ...props, children: [(0, jsx_runtime_1.jsxs)("div", { className: "inline-flex items-center w-full justify-between", children: [label && (0, jsx_runtime_1.jsx)(label_1.Label, { children: label }), aiGenerate && ((0, jsx_runtime_1.jsx)(ai_generate_1.AiGenerate, { ...aiGenerate }))] }), children] }));
});
exports.FormGroup = FormGroup;
FormGroup.displayName = "FormGroup";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL3VpL2Zvcm0tZ3JvdXAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFDL0IsbUNBQWdDO0FBQ2hDLDJDQUFxQztBQUNyQyxzREFBa0Q7QUFlbEQsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FDaEMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNwRSxPQUFPLENBQ0wsaUNBQ0UsR0FBRyxFQUFFLEdBQUcsRUFDUixTQUFTLEVBQUUsSUFBQSxVQUFFLEVBQ1gsTUFBTSxFQUNOLE1BQU0sQ0FBQyxDQUFDLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixFQUMzRCxTQUFTLENBQ1YsS0FDRyxLQUFLLGFBRVQsaUNBQUssU0FBUyxFQUFDLGlEQUFpRCxhQUM3RCxLQUFLLElBQUksdUJBQUMsYUFBSyxjQUFFLEtBQUssR0FBUyxFQUMvQixVQUFVLElBQUksQ0FDYix1QkFBQyx3QkFBVSxPQUNMLFVBQVUsR0FDZCxDQUNILElBQ0csRUFDTCxRQUFRLElBQ0wsQ0FDUCxDQUFDO0FBQ0osQ0FBQyxDQUNGLENBQUM7QUFHTyw4QkFBUztBQUZsQixTQUFTLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyJ9