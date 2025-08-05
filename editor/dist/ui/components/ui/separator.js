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
exports.Separator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const SeparatorPrimitive = __importStar(require("@radix-ui/react-separator"));
const utils_1 = require("../../lib/utils");
const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => ((0, jsx_runtime_1.jsx)(SeparatorPrimitive.Root, { ref: ref, decorative: decorative, orientation: orientation, className: (0, utils_1.cn)("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className), ...props })));
exports.Separator = Separator;
Separator.displayName = SeparatorPrimitive.Root.displayName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VwYXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3VpL2NvbXBvbmVudHMvdWkvc2VwYXJhdG9yLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQThCO0FBQzlCLDhFQUErRDtBQUUvRCwyQ0FBb0M7QUFFcEMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FJaEMsQ0FDRSxFQUFFLFNBQVMsRUFBRSxXQUFXLEdBQUcsWUFBWSxFQUFFLFVBQVUsR0FBRyxJQUFJLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFDdEUsR0FBRyxFQUNILEVBQUUsQ0FBQyxDQUNILHVCQUFDLGtCQUFrQixDQUFDLElBQUksSUFDdEIsR0FBRyxFQUFFLEdBQUcsRUFDUixVQUFVLEVBQUUsVUFBVSxFQUN0QixXQUFXLEVBQUUsV0FBVyxFQUN4QixTQUFTLEVBQUUsSUFBQSxVQUFFLEVBQ1gsb0JBQW9CLEVBQ3BCLFdBQVcsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUM1RCxTQUFTLENBQ1YsS0FDRyxLQUFLLEdBQ1QsQ0FDSCxDQUNGLENBQUE7QUFHUSw4QkFBUztBQUZsQixTQUFTLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUEifQ==