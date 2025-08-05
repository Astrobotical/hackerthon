"use strict";
"use client";
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
exports.ContextMenuRadioGroup = exports.ContextMenuSubTrigger = exports.ContextMenuSubContent = exports.ContextMenuSub = exports.ContextMenuPortal = exports.ContextMenuGroup = exports.ContextMenuShortcut = exports.ContextMenuSeparator = exports.ContextMenuLabel = exports.ContextMenuRadioItem = exports.ContextMenuCheckboxItem = exports.ContextMenuItem = exports.ContextMenuContent = exports.ContextMenuTrigger = exports.ContextMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const ContextMenuPrimitive = __importStar(require("@radix-ui/react-context-menu"));
const icons_1 = require("../../icons");
const utils_1 = require("../../lib/utils");
const ContextMenu = ContextMenuPrimitive.Root;
exports.ContextMenu = ContextMenu;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
exports.ContextMenuTrigger = ContextMenuTrigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
exports.ContextMenuGroup = ContextMenuGroup;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
exports.ContextMenuPortal = ContextMenuPortal;
const ContextMenuSub = ContextMenuPrimitive.Sub;
exports.ContextMenuSub = ContextMenuSub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
exports.ContextMenuRadioGroup = ContextMenuRadioGroup;
const ContextMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(ContextMenuPrimitive.SubTrigger, { ref: ref, className: (0, utils_1.cn)("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", inset && "pl-8", className), ...props, children: [children, (0, jsx_runtime_1.jsx)(icons_1.ChevronRight, { className: "ml-auto h-4 w-4" })] })));
exports.ContextMenuSubTrigger = ContextMenuSubTrigger;
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;
const ContextMenuSubContent = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(ContextMenuPrimitive.SubContent, { ref: ref, className: (0, utils_1.cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props })));
exports.ContextMenuSubContent = ContextMenuSubContent;
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;
const ContextMenuContent = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(ContextMenuPrimitive.Portal, { children: (0, jsx_runtime_1.jsx)(ContextMenuPrimitive.Content, { ref: ref, className: (0, utils_1.cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props }) })));
exports.ContextMenuContent = ContextMenuContent;
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;
const ContextMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => ((0, jsx_runtime_1.jsx)(ContextMenuPrimitive.Item, { ref: ref, className: (0, utils_1.cn)("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50", inset && "pl-8", className), ...props })));
exports.ContextMenuItem = ContextMenuItem;
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;
const ContextMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(ContextMenuPrimitive.CheckboxItem, { ref: ref, className: (0, utils_1.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50", className), checked: checked, ...props, children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: (0, jsx_runtime_1.jsx)(ContextMenuPrimitive.ItemIndicator, { children: (0, jsx_runtime_1.jsx)(icons_1.Check, { className: "h-4 w-4" }) }) }), children] })));
exports.ContextMenuCheckboxItem = ContextMenuCheckboxItem;
ContextMenuCheckboxItem.displayName =
    ContextMenuPrimitive.CheckboxItem.displayName;
const ContextMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(ContextMenuPrimitive.RadioItem, { ref: ref, className: (0, utils_1.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50", className), ...props, children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: (0, jsx_runtime_1.jsx)(ContextMenuPrimitive.ItemIndicator, { children: (0, jsx_runtime_1.jsx)(icons_1.Circle, { className: "h-4 w-4 fill-current" }) }) }), children] })));
exports.ContextMenuRadioItem = ContextMenuRadioItem;
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;
const ContextMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => ((0, jsx_runtime_1.jsx)(ContextMenuPrimitive.Label, { ref: ref, className: (0, utils_1.cn)("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className), ...props })));
exports.ContextMenuLabel = ContextMenuLabel;
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;
const ContextMenuSeparator = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(ContextMenuPrimitive.Separator, { ref: ref, className: (0, utils_1.cn)("-mx-1 my-1 h-px bg-border", className), ...props })));
exports.ContextMenuSeparator = ContextMenuSeparator;
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;
const ContextMenuShortcut = ({ className, ...props }) => {
    return ((0, jsx_runtime_1.jsx)("span", { className: (0, utils_1.cn)("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props }));
};
exports.ContextMenuShortcut = ContextMenuShortcut;
ContextMenuShortcut.displayName = "ContextMenuShortcut";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3VpL2NvbXBvbmVudHMvdWkvY29udGV4dC1tZW51LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWIsNkNBQStCO0FBQy9CLG1GQUFxRTtBQUNyRSx1Q0FBMEQ7QUFFMUQsMkNBQXFDO0FBRXJDLE1BQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQztBQWdMNUMsa0NBQVc7QUE5S2IsTUFBTSxrQkFBa0IsR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLENBQUM7QUErS3RELGdEQUFrQjtBQTdLcEIsTUFBTSxnQkFBZ0IsR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7QUFxTGxELDRDQUFnQjtBQW5MbEIsTUFBTSxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLENBQUM7QUFvTHBELDhDQUFpQjtBQWxMbkIsTUFBTSxjQUFjLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxDQUFDO0FBbUw5Qyx3Q0FBYztBQWpMaEIsTUFBTSxxQkFBcUIsR0FBRyxvQkFBb0IsQ0FBQyxVQUFVLENBQUM7QUFvTDVELHNEQUFxQjtBQWxMdkIsTUFBTSxxQkFBcUIsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUs1QyxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ25ELHdCQUFDLG9CQUFvQixDQUFDLFVBQVUsSUFDOUIsR0FBRyxFQUFFLEdBQUcsRUFDUixTQUFTLEVBQUUsSUFBQSxVQUFFLEVBQ1gsNE1BQTRNLEVBQzVNLEtBQUssSUFBSSxNQUFNLEVBQ2YsU0FBUyxDQUNWLEtBQ0csS0FBSyxhQUVSLFFBQVEsRUFDVCx1QkFBQyxvQkFBWSxJQUFDLFNBQVMsRUFBQyxpQkFB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