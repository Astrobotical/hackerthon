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
exports.CommandSeparator = exports.CommandShortcut = exports.CommandItem = exports.CommandGroup = exports.CommandEmpty = exports.CommandList = exports.CommandInput = exports.CommandDialog = exports.Command = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cmdk_1 = require("cmdk");
const icons_1 = require("../../icons");
const utils_1 = require("../../lib/utils");
const dialog_1 = require("./dialog");
const Command = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(cmdk_1.Command, { ref: ref, className: (0, utils_1.cn)("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className), ...props })));
exports.Command = Command;
Command.displayName = cmdk_1.Command.displayName;
const CommandDialog = ({ children, ...props }) => {
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { ...props, children: (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, { className: "overflow-hidden p-0 top-[35%] translate-y-0", children: (0, jsx_runtime_1.jsx)(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-1 [&_[cmdk-item]_svg]:h-3 [&_[cmdk-item]_svg]:w-3", children: children }) }) }));
};
exports.CommandDialog = CommandDialog;
const CommandInput = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [(0, jsx_runtime_1.jsx)(icons_1.Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }), (0, jsx_runtime_1.jsx)(cmdk_1.Command.Input, { ref: ref, className: (0, utils_1.cn)("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className), ...props })] })));
exports.CommandInput = CommandInput;
CommandInput.displayName = cmdk_1.Command.Input.displayName;
const CommandList = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(cmdk_1.Command.List, { ref: ref, className: (0, utils_1.cn)("max-h-[300px] overflow-y-auto overflow-x-hidden", className), ...props })));
exports.CommandList = CommandList;
CommandList.displayName = cmdk_1.Command.List.displayName;
const CommandEmpty = React.forwardRef((props, ref) => ((0, jsx_runtime_1.jsx)(cmdk_1.Command.Empty, { ref: ref, className: "py-6 text-center text-sm", ...props })));
exports.CommandEmpty = CommandEmpty;
CommandEmpty.displayName = cmdk_1.Command.Empty.displayName;
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(cmdk_1.Command.Group, { ref: ref, className: (0, utils_1.cn)("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className), ...props })));
exports.CommandGroup = CommandGroup;
CommandGroup.displayName = cmdk_1.Command.Group.displayName;
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(cmdk_1.Command.Separator, { ref: ref, className: (0, utils_1.cn)("-mx-1 h-px bg-border", className), ...props })));
exports.CommandSeparator = CommandSeparator;
CommandSeparator.displayName = cmdk_1.Command.Separator.displayName;
const CommandItem = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(cmdk_1.Command.Item, { ref: ref, className: (0, utils_1.cn)("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-1 [&_svg]:shrink-0", className), ...props })));
exports.CommandItem = CommandItem;
CommandItem.displayName = cmdk_1.Command.Item.displayName;
const CommandShortcut = ({ className, ...props }) => {
    return ((0, jsx_runtime_1.jsx)("span", { className: (0, utils_1.cn)("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props }));
};
exports.CommandShortcut = CommandShortcut;
CommandShortcut.displayName = "CommandShortcut";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL3VpL2NvbW1hbmQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFFL0IsK0JBQW1EO0FBQ25ELHVDQUFxQztBQUVyQywyQ0FBcUM7QUFDckMscUNBQWlEO0FBRWpELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBRzlCLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQ2xDLHVCQUFDLGNBQWdCLElBQ2YsR0FBRyxFQUFFLEdBQUcsRUFDUixTQUFTLEVBQUUsSUFBQSxVQUFFLEVBQ1gsMkZBQTJGLEVBQzNGLFNBQVMsQ0FDVixLQUNHLEtBQUssR0FDVCxDQUNILENBQUMsQ0FBQztBQXlIRCwwQkFBTztBQXhIVCxPQUFPLENBQUMsV0FBVyxHQUFHLGNBQWdCLENBQUMsV0FBVyxDQUFDO0FBRW5ELE1BQU0sYUFBYSxHQUFHLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLEVBQWUsRUFBRSxFQUFFO0lBQzVELE9BQU8sQ0FDTCx1QkFBQyxlQUFNLE9BQUssS0FBSyxZQUNmLHVCQUFDLHNCQUFhLElBQUMsU0FBUyxFQUFDLDZDQUE2QyxZQUNwRSx1QkFBQyxPQUFPLElBQUMsU0FBUyxFQUFDLDZXQUE2VyxZQUM3WCxRQUFRLEdBQ0QsR0FDSSxHQUNULENBQ1YsQ0FBQztBQUNKLENBQUMsQ0FBQztBQTZHQSxzQ0FBYTtBQTNHZixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUduQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEdBQUcsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUNsQyxpQ0FBSyxTQUFTLEVBQUMsaUNBQWlDLHdCQUFvQixFQUFF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