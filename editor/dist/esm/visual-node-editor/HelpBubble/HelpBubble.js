import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../ui";
import { useMemo } from "react";
import * as React from "react";
import { currentHotkeys, } from "../../lib/react-utils/use-hotkeys";
import { usePorts } from "../../flow-editor/ports";
import { isMac } from "../..";
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
export function HelpBubble() {
    const [hotkeysModalOpen, setHotkeysModalOpen] = React.useState(false);
    const _isMac = useMemo(isMac, []);
    const bpHotkeys = Array.from(currentHotkeys.entries()).map(([_keys, menuData]) => {
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
    const { reportEvent } = usePorts();
    return (_jsxs("div", { className: "help-bubble", "data-tip": "Help", children: [_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", onClick: () => reportEvent("helpMenuOpen", {}), children: "Help" }) }), _jsxs(DropdownMenuContent, { className: "p-2 min-w-[200px]", sideOffset: 20, align: "end", children: [mainDocItems.map((item) => (_jsx(DropdownMenuItem, { onClick: () => {
                                    reportEvent("helpMenuItem", { item: item.title });
                                    window.open(item.link, "_blank");
                                }, children: item.title }, item.title))), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { onClick: () => {
                                    reportEvent("helpMenuItem", { item: "discord" });
                                    window.open("https://discord.gg/x7t4tjZQP8", "_blank");
                                }, children: "Discord" }), _jsx(DropdownMenuItem, { onClick: () => {
                                    setHotkeysModalOpen(true);
                                    reportEvent("helpMenuItem", { item: "hotkeys" });
                                }, children: "Hotkeys" }), _jsx(DropdownMenuItem, { onClick: () => {
                                    reportEvent("helpMenuItem", { item: "documentation" });
                                    window.open("https://www.flyde.dev/docs", "_blank");
                                }, children: "Full Documentation" })] })] }), _jsx(Dialog, { open: hotkeysModalOpen, onOpenChange: setHotkeysModalOpen, children: _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Keyboard Shortcuts" }) }), _jsx("div", { className: "space-y-4", children: groupsArray.map(([group, hotkeys]) => (_jsxs("div", { children: [_jsx("h4", { className: "text-lg font-semibold mb-2", children: group }), _jsx("div", { className: "space-y-2", children: hotkeys.map((hotkey) => (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: hotkey.label }), _jsx("kbd", { className: "px-2 py-1 bg-muted rounded", children: hotkey.combo })] }, hotkey.combo))) })] }, group))) })] }) })] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVscEJ1YmJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvSGVscEJ1YmJsZS9IZWxwQnViYmxlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzVFLE9BQU8sRUFDTCxZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixxQkFBcUIsRUFDckIsbUJBQW1CLEdBQ3BCLE1BQU0sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDaEMsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUNMLGNBQWMsR0FFZixNQUFNLG1DQUFtQyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBSTlCLFNBQVMsZ0JBQWdCLENBQUMsTUFBa0Q7SUFDMUUsT0FBTztRQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRztRQUNqQixLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJO1FBQzNCLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUs7S0FDN0IsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFdBQVcsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUVsRSxNQUFNLFlBQVksR0FBRztJQUNuQjtRQUNFLEtBQUssRUFBRSxlQUFlO1FBQ3RCLElBQUksRUFBRSwyQ0FBMkM7S0FDbEQ7SUFDRDtRQUNFLEtBQUssRUFBRSw4QkFBOEI7UUFD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