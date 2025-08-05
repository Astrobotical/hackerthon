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
exports.HelpBubble = HelpBubble;
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("../../ui");
const ui_2 = require("../../ui");
const ui_3 = require("../../ui");
const react_1 = require("react");
const React = __importStar(require("react"));
const use_hotkeys_1 = require("../../lib/react-utils/use-hotkeys");
const ports_1 = require("../../flow-editor/ports");
const __1 = require("../..");
function hotkeyToBpHotkey(hotkey) {
    return {
        combo: hotkey.key,
        label: hotkey.menuData.text,
        group: hotkey.menuData.group,
    };
}
const groupsOrder = ["Viewport Controls", "Editing", "Selection"];
const mainDocItems = [
    {
        title: "Core Concepts",
        link: "https://www.flyde.dev/docs/core-concepts/",
    },
    {
        title: "Integrate With Existing Code",
        link: "https://www.flyde.dev/docs/integrate-flows/",
    },
    {
        title: "Creating Custom Nodes",
        link: "https://www.flyde.dev/docs/custom-nodes/",
    },
    {
        title: "Trouble-shooting",
        link: "https://www.flyde.dev/docs/troubleshooting/",
    },
    {
        title: "Flowcode - Hosted API Builder",
        link: "https://www.getflowcode.io/?ref=help-menu",
    },
];
function HelpBubble() {
    const [hotkeysModalOpen, setHotkeysModalOpen] = React.useState(false);
    const _isMac = (0, react_1.useMemo)(__1.isMac, []);
    const bpHotkeys = Array.from(use_hotkeys_1.currentHotkeys.entries()).map(([_keys, menuData]) => {
        const keys = _keys.split(/,\s*/).find((key) => {
            return _isMac && key.includes("cmd") ? true : !key.includes("cmd");
        });
        return hotkeyToBpHotkey({ key: keys, menuData });
    });
    const groupedHotkeys = bpHotkeys.reduce((acc, hotkey) => {
        if (!acc[hotkey.group]) {
            acc[hotkey.group] = [];
        }
        acc[hotkey.group].push(hotkey);
        return acc;
    }, {});
    const groupsArray = Object.entries(groupedHotkeys).sort((a, b) => {
        return groupsOrder.indexOf(b[0]) - groupsOrder.indexOf(a[0]);
    });
    const { reportEvent } = (0, ports_1.usePorts)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "help-bubble", "data-tip": "Help", children: [(0, jsx_runtime_1.jsxs)(ui_3.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(ui_3.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "outline", onClick: () => reportEvent("helpMenuOpen", {}), children: "Help" }) }), (0, jsx_runtime_1.jsxs)(ui_3.DropdownMenuContent, { className: "p-2 min-w-[200px]", sideOffset: 20, align: "end", children: [mainDocItems.map((item) => ((0, jsx_runtime_1.jsx)(ui_3.DropdownMenuItem, { onClick: () => {
                                    reportEvent("helpMenuItem", { item: item.title });
                                    window.open(item.link, "_blank");
                                }, children: item.title }, item.title))), (0, jsx_runtime_1.jsx)(ui_3.DropdownMenuSeparator, {}), (0, jsx_runtime_1.jsx)(ui_3.DropdownMenuItem, { onClick: () => {
                                    reportEvent("helpMenuItem", { item: "discord" });
                                    window.open("https://discord.gg/x7t4tjZQP8", "_blank");
                                }, children: "Discord" }), (0, jsx_runtime_1.jsx)(ui_3.DropdownMenuItem, { onClick: () => {
                                    setHotkeysModalOpen(true);
                                    reportEvent("helpMenuItem", { item: "hotkeys" });
                                }, children: "Hotkeys" }), (0, jsx_runtime_1.jsx)(ui_3.DropdownMenuItem, { onClick: () => {
                                    reportEvent("helpMenuItem", { item: "documentation" });
                                    window.open("https://www.flyde.dev/docs", "_blank");
                                }, children: "Full Documentation" })] })] }), (0, jsx_runtime_1.jsx)(ui_2.Dialog, { open: hotkeysModalOpen, onOpenChange: setHotkeysModalOpen, children: (0, jsx_runtime_1.jsxs)(ui_2.DialogContent, { children: [(0, jsx_runtime_1.jsx)(ui_2.DialogHeader, { children: (0, jsx_runtime_1.jsx)(ui_2.DialogTitle, { children: "Keyboard Shortcuts" }) }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: groupsArray.map(([group, hotkeys]) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-lg font-semibold mb-2", children: group }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: hotkeys.map((hotkey) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { children: hotkey.label }), (0, jsx_runtime_1.jsx)("kbd", { className: "px-2 py-1 bg-muted rounded", children: hotkey.combo })] }, hotkey.combo))) })] }, group))) })] }) })] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVscEJ1YmJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvSGVscEJ1YmJsZS9IZWxwQnViYmxlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFEQSxnQ0E0R0M7O0FBaktELGlDQUFrQztBQUNsQyxpQ0FBNEU7QUFDNUUsaUNBTWtCO0FBQ2xCLGlDQUFnQztBQUNoQyw2Q0FBK0I7QUFDL0IsbUVBRzJDO0FBQzNDLG1EQUFtRDtBQUNuRCw2QkFBOEI7QUFJOUIsU0FBUyxnQkFBZ0IsQ0FBQyxNQUFrRDtJQUMxRSxPQUFPO1FBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHO1FBQ2pCLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUk7UUFDM0IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSztLQUM3QixDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sV0FBVyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRWxFLE1BQU0sWUFBWSxHQUFHO0lBQ25CO1FBQ0UsS0FBSyxFQUFFLGVBQWU7UUFDdEIsSUFBSSxFQUFFLDJDQUEyQztLQUNsRDtJQUNEO1FBQ0UsS0FBSyxFQUFFLDhCQUE4QjtRQUNyQyxJQUFJLEVBQUUsNkNBQTZDO0tBQ3BEO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsdUJBQXVCO1FBQzlCLElBQUksRUFBRSwwQ0FBMEM7S0FDakQ7SUFDRDtRQUNFLEtBQUssRUFBRSxrQkFBa0I7UUFDekIsSUFBSSxFQUFFLDZDQUE2QztLQUNwRDtJQUNEO1FBQ0UsS0FBSyxFQUFFLCtCQUErQjtRQUN0QyxJQUFJLEVBQUUsMkNBQTJDO0tBQ2xEO0NBQ0YsQ0FBQztBQUVGLFNBQWdCLFVBQVU7SUFDeEIsTUFBTSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixDQUFD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