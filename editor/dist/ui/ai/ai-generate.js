"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiGenerate = AiGenerate;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const button_1 = require("../components/ui/button");
const popover_1 = require("../components/ui/popover");
const textarea_1 = require("../components/ui/textarea");
const AiIcon_1 = require("../icons/AiIcon");
const hotkey_indication_1 = require("../components/ui/hotkey-indication");
const utils_1 = require("../lib/utils");
const context_1 = require("./context");
function AiGenerate({ prompt, placeholder, onComplete, className, jsonMode = false, currentValue, nodeId, insId }) {
    const { createCompletion, enabled } = (0, context_1.useAiCompletion)();
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [isGenerating, setIsGenerating] = (0, react_1.useState)(false);
    const [input, setInput] = (0, react_1.useState)("");
    const textareaRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (isOpen) {
            // Give the popover time to render
            requestAnimationFrame(() => {
                var _a;
                (_a = textareaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            });
        }
    }, [isOpen]);
    if (!enabled) {
        return null;
    }
    const handleGenerate = async () => {
        try {
            setIsGenerating(true);
            // Replace template variables in the prompt
            let processedPrompt = prompt.replace(/{{prompt}}/g, input);
            // Handle the currentValue replacement
            if (currentValue !== undefined) {
                const valueString = typeof currentValue === "object"
                    ? JSON.stringify(currentValue, null, 2)
                    : String(currentValue);
                processedPrompt = processedPrompt.replace(/{{value}}/g, valueString);
            }
            const result = await createCompletion({
                prompt: processedPrompt,
                jsonMode,
                nodeId,
                insId: insId || ""
            });
            onComplete(result);
            setInput("");
            setIsOpen(false);
        }
        finally {
            setIsGenerating(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(popover_1.Popover, { open: isOpen, onOpenChange: setIsOpen, children: [(0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "xs", variant: "outline", className: (0, utils_1.cn)("gap-2", className), disabled: isGenerating, children: [(0, jsx_runtime_1.jsx)(AiIcon_1.AiIcon, {}), "Generate"] }) }), (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, { className: "w-80 text-foreground", sideOffset: 5, children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)(textarea_1.Textarea, { ref: textareaRef, placeholder: placeholder, value: input, onChange: (e) => setInput(e.target.value), className: "min-h-[100px]", onKeyDown: (e) => {
                                if (e.key === "Enter" && !e.shiftKey && input) {
                                    e.preventDefault();
                                    handleGenerate();
                                }
                            } }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-end items-center gap-2", children: (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleGenerate, disabled: !input || isGenerating, className: "gap-2", variant: "outline", size: "xs", children: isGenerating ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Generating..." })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Create ", (0, jsx_runtime_1.jsx)(hotkey_indication_1.HotkeyIndication, { hotkey: "enter" })] })) }) })] }) })] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWktZ2VuZXJhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdWkvYWkvYWktZ2VuZXJhdGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBd0JBLGdDQTZHQzs7QUFySUQsaUNBQW9EO0FBQ3BELG9EQUFpRDtBQUNqRCxzREFJa0M7QUFDbEMsd0RBQXFEO0FBQ3JELDRDQUF5QztBQUN6QywwRUFBc0U7QUFDdEUsd0NBQWtDO0FBQ2xDLHVDQUE0QztBQWE1QyxTQUFnQixVQUFVLENBQUMsRUFDekIsTUFBTSxFQUNOLFdBQVcsRUFDWCxVQUFVLEVBQ1YsU0FBUyxFQUNULFFBQVEsR0FBRyxLQUFLLEVBQ2hCLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNXO0lBQ2hCLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFBLHlCQUFlLEdBQUUsQ0FBQztJQUN4RCxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxNQUFNLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxFQUFFLENBQUMsQ0FBQztJQUN2QyxNQUFNLFdBQVcsR0FBRyxJQUFBLGNBQU0sRUFBc0IsSUFBSSxDQUFDLENBQUM7SUFFdEQsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRTtRQUNiLElBQUksTUFBTSxFQUFFLENBQUM7WUFDWCxrQ0FBa0M7WUFDbEMscUJBQXFCLENBQUMsR0FBRyxFQUFFOztnQkFDekIsTUFBQSxXQUFXLENBQUMsT0FBTywwQ0FBRSxLQUFLLEVBQUUsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDLEVBQUUsQ0FBQyxNQUFNLENB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