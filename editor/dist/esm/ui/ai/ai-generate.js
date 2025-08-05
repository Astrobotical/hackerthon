import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { Popover, PopoverContent, PopoverTrigger, } from "../components/ui/popover";
import { Textarea } from "../components/ui/textarea";
import { AiIcon } from "../icons/AiIcon";
import { HotkeyIndication } from "../components/ui/hotkey-indication";
import { cn } from "../lib/utils";
import { useAiCompletion } from "./context";
export function AiGenerate({ prompt, placeholder, onComplete, className, jsonMode = false, currentValue, nodeId, insId }) {
    const { createCompletion, enabled } = useAiCompletion();
    const [isOpen, setIsOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [input, setInput] = useState("");
    const textareaRef = useRef(null);
    useEffect(() => {
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
    return (_jsxs(Popover, { open: isOpen, onOpenChange: setIsOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { size: "xs", variant: "outline", className: cn("gap-2", className), disabled: isGenerating, children: [_jsx(AiIcon, {}), "Generate"] }) }), _jsx(PopoverContent, { className: "w-80 text-foreground", sideOffset: 5, children: _jsxs("div", { className: "space-y-4", children: [_jsx(Textarea, { ref: textareaRef, placeholder: placeholder, value: input, onChange: (e) => setInput(e.target.value), className: "min-h-[100px]", onKeyDown: (e) => {
                                if (e.key === "Enter" && !e.shiftKey && input) {
                                    e.preventDefault();
                                    handleGenerate();
                                }
                            } }), _jsx("div", { className: "flex justify-end items-center gap-2", children: _jsx(Button, { onClick: handleGenerate, disabled: !input || isGenerating, className: "gap-2", variant: "outline", size: "xs", children: isGenerating ? (_jsx(_Fragment, { children: "Generating..." })) : (_jsxs(_Fragment, { children: ["Create ", _jsx(HotkeyIndication, { hotkey: "enter" })] })) }) })] }) })] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWktZ2VuZXJhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdWkvYWkvYWktZ2VuZXJhdGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFDTCxPQUFPLEVBQ1AsY0FBYyxFQUNkLGNBQWMsR0FDZixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNsQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBYTVDLE1BQU0sVUFBVSxVQUFVLENBQUMsRUFDekIsTUFBTSxFQUNOLFdBQVcsRUFDWCxVQUFVLEVBQ1YsU0FBUyxFQUNULFFBQVEsR0FBRyxLQUFLLEVBQ2hCLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNXO0lBQ2hCLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsR0FBRyxlQUFlLEVBQUUsQ0FBQztJQUN4RCxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxNQUFNLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QyxNQUFNLFdB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