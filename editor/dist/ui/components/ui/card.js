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
exports.CardContent = exports.CardDescription = exports.CardTitle = exports.CardFooter = exports.CardHeader = exports.Card = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const utils_1 = require("../../lib/utils");
const Card = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, utils_1.cn)("rounded-xl border bg-card text-card-foreground shadow", className), ...props })));
exports.Card = Card;
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, utils_1.cn)("flex flex-col space-y-1.5 p-6", className), ...props })));
exports.CardHeader = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, utils_1.cn)("font-semibold leading-none tracking-tight", className), ...props })));
exports.CardTitle = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, utils_1.cn)("text-sm text-muted-foreground", className), ...props })));
exports.CardDescription = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, utils_1.cn)("p-6 pt-0", className), ...props })));
exports.CardContent = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, utils_1.cn)("flex items-center p-6 pt-0", className), ...props })));
exports.CardFooter = CardFooter;
CardFooter.displayName = "CardFooter";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL3VpL2NhcmQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBOEI7QUFFOUIsMkNBQW9DO0FBRXBDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBRzNCLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ2xDLGdDQUNFLEdBQUcsRUFBRSxHQUFHLEVBQ1IsU0FBUyxFQUFFLElBQUEsVUFBRSxFQUNYLHVEQUF1RCxFQUN2RCxTQUFTLENBQ1YsS0FDRyxLQUFLLEdBQ1QsQ0FDSCxDQUFDLENBQUE7QUEyRE8sb0JBQUk7QUExRGIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUE7QUFFekIsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FHakMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FDbEMsZ0NBQ0UsR0FBRyxFQUFFLEdBQUcsRUFDUixTQUFTLEVBQUUsSUFBQSxVQUFFLEVBQUMsK0JBQStCLEVBQUUsU0FBUyxDQUFDLEtBQ3JELEtBQUssR0FDVCxDQUNILENBQUMsQ0FBQTtBQStDYSxnQ0FBVTtBQTlDekIsVUFBVSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUE7QUFFckMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FHaEMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FDbEMsZ0NBQ0UsR0FBRyxFQUFFLEdBQUcsRUFDUixTQUFTLEVBQUUsSUFBQSxVQUFFLEVBQUMsMkNBQTJDLEVBQUUsU0FBUyxDQUFDLEtBQ2pFLEtBQUssR0FDVCxDQUNILENBQUMsQ0FBQTtBQW1DcUMsOEJBQVM7QUFsQ2hELFNBQVMsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFBO0FBRW5DLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBR3RDLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ2xDLGdDQUNFLEdBQUcsRUFBRSxHQUFHLEVBQ1IsU0FBUyxFQUFFLElBQUEsVUFBRSxFQUFDLCtCQUErQixFQUFFLFNBQVMsQ0FBQyxLQUNyRCxLQUFLLEdBQ1QsQ0FDSCxDQUFDLENBQUE7QUF1QmdELDBDQUFlO0FBdEJqRSxlQUFlLENBQUMsV0FBVyxHQUFHLGlCQUFpQixDQUFBO0FBRS9DLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBR2xDLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ2xDLGdDQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUEsVUFBRSxFQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsS0FBTSxLQUFLLEdBQUksQ0FDbkUsQ0FBQyxDQUFBO0FBZWlFLGtDQUFXO0FBZDlFLFdBQVcsQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFBO0FBRXZDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBR2pDLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ2xDLGdDQUNFLEdBQUcsRUFBRSxHQUFHLEVBQ1IsU0FBUyxFQUFFLElBQUEsVUFBRSxFQUFDLDRCQUE0QixFQUFFLFNBQVMsQ0FBQyxLQUNsRCxLQUFLLEdBQ1QsQ0FDSCxDQUFDLENBQUE7QUFHeUIsZ0NBQVU7QUFGckMsVUFBVSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUEifQ==