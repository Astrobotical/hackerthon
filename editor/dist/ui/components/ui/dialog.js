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
exports.DialogDescription = exports.DialogTitle = exports.DialogFooter = exports.DialogHeader = exports.DialogContent = exports.DialogClose = exports.DialogTrigger = exports.DialogOverlay = exports.DialogPortal = exports.Dialog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const DialogPrimitive = __importStar(require("@radix-ui/react-dialog"));
const icons_1 = require("../../icons");
const utils_1 = require("../../lib/utils");
const Dialog = DialogPrimitive.Root;
exports.Dialog = Dialog;
const DialogTrigger = DialogPrimitive.Trigger;
exports.DialogTrigger = DialogTrigger;
const DialogPortal = DialogPrimitive.Portal;
exports.DialogPortal = DialogPortal;
const DialogClose = DialogPrimitive.Close;
exports.DialogClose = DialogClose;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(DialogPrimitive.Overlay, { ref: ref, className: (0, utils_1.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className), ...props })));
exports.DialogOverlay = DialogOverlay;
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, noCloseButton, noInteractOutside, onInteractOutside, ...props }, ref) => {
    const handleInteractOutside = React.useCallback((e) => {
        if (noInteractOutside) {
            e.preventDefault();
        }
        else if (onInteractOutside) {
            onInteractOutside(e);
        }
    }, [noInteractOutside, onInteractOutside]);
    return ((0, jsx_runtime_1.jsxs)(DialogPortal, { children: [(0, jsx_runtime_1.jsx)(DialogOverlay, {}), (0, jsx_runtime_1.jsxs)(DialogPrimitive.Content, { ref: ref, className: (0, utils_1.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className), onInteractOutside: handleInteractOutside, ...props, children: [children, !noCloseButton && ((0, jsx_runtime_1.jsxs)(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [(0, jsx_runtime_1.jsx)(icons_1.X, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Close" })] }))] })] }));
});
exports.DialogContent = DialogContent;
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props }));
exports.DialogHeader = DialogHeader;
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props }));
exports.DialogFooter = DialogFooter;
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(DialogPrimitive.Title, { ref: ref, className: (0, utils_1.cn)("text-lg font-semibold leading-none tracking-tight", className), ...props })));
exports.DialogTitle = DialogTitle;
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(DialogPrimitive.Description, { ref: ref, className: (0, utils_1.cn)("text-sm text-muted-foreground", className), ...props })));
exports.DialogDescription = DialogDescription;
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3VpL2NvbXBvbmVudHMvdWkvZGlhbG9nLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStCO0FBQy9CLHdFQUEwRDtBQUMxRCx1Q0FBZ0M7QUFFaEMsMkNBQXFDO0FBRXJDLE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUM7QUF5SWxDLHdCQUFNO0FBdklSLE1BQU0sYUFBYSxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUM7QUEwSTVDLHNDQUFhO0FBeElmLE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7QUFzSTFDLG9DQUFZO0FBcElkLE1BQU0sV0FBVyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUM7QUF1SXhDLGtDQUFXO0FBckliLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBR3BDLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ2xDLHVCQUFDLGVBQWUsQ0FBQyxPQUFPLElBQ3RCLEdBQUcsRUFBRSxHQUFHLEVBQ1IsU0FBUyxFQUFFLElBQUEsVUFBRSxFQUNYLHlKQUF5SixFQUN6SixTQUFTLENBQ1YsS0FDRyxLQUFLLEdBQ1QsQ0FDSCxDQUFDLENBQUM7QUF1SEQsc0NBQWE7QUF0SGYsYUFBYSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztBQVFoRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUlwQyxDQUNFLEVBQ0UsU0FBUyxFQUNULFFBQVEsRUFDUixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixHQUFHLEtBQUssRUFDVCxFQUNELEdBQUcsRUFDSCxFQUFFO0lBQ0YsTUFBTSxxQkFBcUIsR0FBRyxL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