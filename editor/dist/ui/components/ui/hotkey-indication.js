"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotkeyIndication = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../../lib/utils");
const react_1 = require("react");
const KEY_SYMBOLS_MAC = {
    command: "⌘",
    cmd: "⌘",
    ctrl: "Ctrl",
    shift: "⇧",
    alt: "⌥",
    enter: "↵",
    backspace: "⌫",
    delete: "⌦",
    escape: "Esc",
    tab: "⇥",
    up: "↑",
    down: "↓",
    left: "←",
    right: "→",
};
const KEY_SYMBOLS_OTHER = {
    ...KEY_SYMBOLS_MAC,
    command: "Ctrl",
    cmd: "Ctrl",
    alt: "Alt",
};
const HotkeyIndication = ({ className, hotkey, label, size = "md", }) => {
    const [keySymbols, setKeySymbols] = (0, react_1.useState)(KEY_SYMBOLS_OTHER);
    (0, react_1.useEffect)(() => {
        if (navigator.platform.toLowerCase().includes("mac")) {
            setKeySymbols(KEY_SYMBOLS_MAC);
        }
    }, []);
    const formattedHotkey = hotkey
        .toLowerCase()
        .split("+")
        .map((key) => keySymbols[key] || key.toUpperCase())
        .join(" ");
    const textSize = size === "sm" ? "10px" : size === "md" ? "12px" : "14px";
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)("text-neutral-600 dark:text-neutral-600 flex items-center gap-1", className), children: [(0, jsx_runtime_1.jsx)("span", { className: `text-[${textSize}] leading-none`, children: formattedHotkey }), label && ((0, jsx_runtime_1.jsxs)("span", { className: `text-[${textSize}] leading-none`, children: ["- ", label] }))] }));
};
exports.HotkeyIndication = HotkeyIndication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90a2V5LWluZGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdWkvY29tcG9uZW50cy91aS9ob3RrZXktaW5kaWNhdGlvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUFxQztBQUNyQyxpQ0FBNEM7QUFFNUMsTUFBTSxlQUFlLEdBQTJCO0lBQzlDLE9BQU8sRUFBRSxHQUFHO0lBQ1osR0FBRyxFQUFFLEdBQUc7SUFDUixJQUFJLEVBQUUsTUFBTTtJQUNaLEtBQUssRUFBRSxHQUFHO0lBQ1YsR0FBRyxFQUFFLEdBQUc7SUFDUixLQUFLLEVBQUUsR0FBRztJQUNWLFNBQVMsRUFBRSxHQUFHO0lBQ2QsTUFBTSxFQUFFLEdBQUc7SUFDWCxNQUFNLEVBQUUsS0FBSztJQUNiLEdBQUcsRUFBRSxHQUFHO0lBQ1IsRUFBRSxFQUFFLEdBQUc7SUFDUCxJQUFJLEVBQUUsR0FBRztJQUNULElBQUksRUFBRSxHQUFHO0lBQ1QsS0FBSyxFQUFFLEdBQUc7Q0FDWCxDQUFDO0FBRUYsTUFBTSxpQkFBaUIsR0FBRztJQUN4QixHQUFHLGVBQWU7SUFDbEIsT0FBTyxFQUFFLE1BQU07SUFDZixHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUcsRUFBRSxLQUFLO0NBQ1gsQ0FBQztBQVNLLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxFQUMvQixTQUFTLEVBQ1QsTUFBTSxFQUNOLEtBQUssRUFDTCxJQUFJLEdBQUcsSUFBSSxHQUNXLEVBQUUsRUFBRTtJQUMxQixNQUFNLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRWhFLElBQUEsaUJBQVMsRUFBQyxHQUFHLEVBQUU7UUFDYixJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDckQsYUFBYSxDQUFDLGVBQXNCLENBQUMsQ0FBQztRQUN4QyxDQUFDO0lBQ0gsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsTUFBTSxlQUFlLEdBQUcsTUFBTTtTQUMzQixXQUFXLEVBQUU7U0FDYixLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsR0FBRyxDQUNGLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBOEIsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FDekU7U0FDQSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFYixNQUFNLFFBQVEsR0FBRyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBRTFFLE9BQU8sQ0FDTCxpQ0FDRSxTQUFTLEVBQUUsSUFBQSxVQUFFLEVBQ1gsZ0VBQWdFLEVBQ2hFLFNBQVMsQ0FDVixhQUVELGlDQUFNLFNBQVMsRUFBRSxTQUFTLFFBQVEsZ0JBQWdCLFlBQy9DLGVBQWUsR0FDWCxFQUNOLEtBQUssSUFBSSxDQUNSLGtDQUFNLFNBQVMsRUFBRSxTQUFTLFFBQVEsZ0JBQWdCLG1CQUFLLEtBQUssSUFBUSxDQUNyRSxJQUNHLENBQ1AsQ0FBQztBQUNKLENBQUMsQ0FBQztBQXZDVyxRQUFBLGdCQUFnQixvQkF1QzNCIn0=