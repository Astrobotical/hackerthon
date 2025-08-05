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
exports.Slider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const SliderPrimitive = __importStar(require("@radix-ui/react-slider"));
const utils_1 = require("../../lib/utils");
const Slider = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(SliderPrimitive.Root, { ref: ref, className: (0, utils_1.cn)("relative flex w-full touch-none select-none items-center", className), ...props, children: [(0, jsx_runtime_1.jsx)(SliderPrimitive.Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: (0, jsx_runtime_1.jsx)(SliderPrimitive.Range, { className: "absolute h-full bg-primary" }) }), (0, jsx_runtime_1.jsx)(SliderPrimitive.Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })] })));
exports.Slider = Slider;
Slider.displayName = SliderPrimitive.Root.displayName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3VpL2NvbXBvbmVudHMvdWkvc2xpZGVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQThCO0FBQzlCLHdFQUF5RDtBQUV6RCwyQ0FBb0M7QUFFcEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FHN0IsQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FDbEMsd0JBQUMsZUFBZSxDQUFDLElBQUksSUFDbkIsR0FBRyxFQUFFLEdBQUcsRUFDUixTQUFTLEVBQUUsSUFBQSxVQUFFLEVBQ1gsMERBQTBELEVBQzFELFNBQVMsQ0FDVixLQUNHLEtBQUssYUFFVCx1QkFBQyxlQUFlLENBQUMsS0FBSyxJQUFDLFNBQVMsRUFBQyx1RUFBdUUsWUFDdEcsdUJBQUMsZUFBZSxDQUFDLEtBQUssSUFBQyxTQUFTLEVBQUMsNEJBQTRCLEdBQUcsR0FDMUMsRUFDeEIsdUJBQUMsZUFBZSxDQUFDLEtBQUssSUFBQyxTQUFTLEVBQUMscU5BQXFOLEdBQUcsSUFDcE8sQ0FDeEIsQ0FBQyxDQUFBO0FBR08sd0JBQU07QUFGZixNQUFNLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFBIn0=