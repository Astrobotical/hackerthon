import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useRef, useMemo, } from "react";
import { useVisualNodeEditorContext } from "./VisualNodeEditorContext";
import { usePorts } from "../flow-editor/ports";
import { useLocalStorage } from "../lib/user-preferences";
import { Alert, AlertDescription, Lightbulb, Check } from "../ui";
import { cn } from "../lib/utils";
const tips = {
    pan: {
        tip: "Try panning the canvas by clicking and dragging the background",
        predicate: (_, [lastBoardData, currBoardData]) => {
            const dx = lastBoardData.viewPort.pos.x - currBoardData.viewPort.pos.x;
            const dy = lastBoardData.viewPort.pos.y - currBoardData.viewPort.pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance > 75;
        },
    },
    zoom: {
        tip: "Zoom in and out using the mouse wheel or trackpad scroll",
        predicate: (_, [lastBoardData, currBoardData]) => {
            const dz = lastBoardData.viewPort.zoom - currBoardData.viewPort.zoom;
            return Math.abs(dz) > 0.25;
        },
    },
    addNode: {
        tip: "Add a new node from the Cmd/Ctrl+K menu",
        predicate: ([lastNode, currNode]) => {
            return currNode.instances.length > lastNode.instances.length;
        },
    },
    connect: {
        tip: "Connect two nodes by dragging from an output pin to an input pin",
        predicate: ([lastNode, currNode]) => {
            return currNode.connections.length > lastNode.connections.length;
        },
    },
};
const tipsOrder = ["pan", "zoom", "addNode", "connect"];
const TIPS_ADVANCE_TIMEOUT = 1000;
const TIP_COMPLETED_FEEDBACK_TIMEOUT = 3000;
const ALL_TIPS_COMPLETED_FEEDBACK_TIMEOUT = 10000;
const useIsMounted = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    return isMounted;
};
export const OnboardingTips = () => {
    var _a, _b;
    const { node, boardData } = useVisualNodeEditorContext();
    const { reportEvent } = usePorts();
    const isMounted = useIsMounted();
    const [currentTip, setCurrentTip] = useLocalStorage("onboarding-tip", tipsOrder[0]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCompleted, setIsCompleted] = useLocalStorage("onboarding-tip-completed", false);
    const lastBoardData = useRef();
    const lastNode = useRef();
    const [showTips, setShowTips] = useState(false);
    const [isAdvancing, setIsAdvancing] = useState(false);
    useEffect(() => {
        setTimeout(() => setShowTips(true), 1000);
    }, []);
    useEffect(() => {
        if (!showTips || lastBoardData.current) {
            return;
        }
        lastBoardData.current = boardData;
        lastNode.current = node;
    }, [showTips, boardData, node]);
    const currIndex = useMemo(() => {
        return currentTip ? tipsOrder.indexOf(currentTip) : -1;
    }, [currentTip]);
    const advanceTip = useCallback(() => {
        setShowFeedback(true);
        const nextTip = tipsOrder[currIndex + 1];
        const isLast = currIndex === tipsOrder.length - 1;
        reportEvent("onBoardingTipCompleted", {
            tip: currentTip !== null && currentTip !== void 0 ? currentTip : "n/a",
        });
        setTimeout(() => {
            setShowFeedback(false);
            setIsAdvancing(false);
            if (isLast) {
                setIsCompleted(true);
            }
            else {
                setCurrentTip(nextTip);
            }
        }, isLast
            ? ALL_TIPS_COMPLETED_FEEDBACK_TIMEOUT
            : TIP_COMPLETED_FEEDBACK_TIMEOUT);
    }, [currIndex, reportEvent, currentTip, setIsCompleted, setCurrentTip]);
    useEffect(() => {
        if (isCompleted) {
            return;
        }
        if (!lastBoardData.current || !lastNode.current) {
            return;
        }
        if (isAdvancing) {
            return;
        }
        if (!tips[currentTip]) {
            return;
        }
        if (tips[currentTip].predicate([lastNode.current, node], [lastBoardData.current, boardData])) {
            lastNode.current = node;
            lastBoardData.current = boardData;
            setIsAdvancing(true);
            setTimeout(() => {
                advanceTip();
            }, TIPS_ADVANCE_TIMEOUT);
        }
    }, [currentTip, advanceTip, isCompleted, node, boardData, isAdvancing]);
    return !isMounted || isCompleted ? null : (_jsx("div", { className: cn("fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-md transition-all duration-200 ease-in-out", !showTips && "opacity-0 -translate-y-2", showTips && "opacity-100 translate-y-0", "onboarding-tips"), children: _jsxs(Alert, { variant: "default", className: cn("flex items-start gap-2 shadow-lg p-3", !showFeedback && "bg-secondary"), children: [_jsx("div", { className: "mt-0.5 shrink-0", children: showFeedback ? (_jsx(Check, { className: "h-4 w-4" })) : (_jsx(Lightbulb, { className: "h-4 w-4" })) }), _jsx(AlertDescription, { children: showFeedback
                        ? currIndex === tipsOrder.length - 1
                            ? "Great job! For more tips, check out the help menu."
                            : "Great job! Moving to the next tip..."
                        : (_b = (_a = tips[currentTip]) === null || _a === void 0 ? void 0 : _a.tip) !== null && _b !== void 0 ? _b : "n/a" })] }) }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT25ib2FyZGluZ1RpcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL09uYm9hcmRpbmdUaXBzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBYyxFQUNaLFFBQVEsRUFDUixTQUFTLEVBQ1QsV0FBVyxFQUNYLE1BQU0sRUFDTixPQUFPLEdBQ1IsTUFBTSxPQUFPLENBQUM7QUFFZixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV2RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTFELE9BQU8sRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNsRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBVWxDLE1BQU0sSUFBSSxHQUE0QjtJQUNwQyxHQUFHLEVBQUU7UUFDSCxHQUFHLEVBQUUsZ0VBQWdFO1FBQ3JFLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsRUFBRSxFQUFFO1lBQy9DLE1BQU0sRUFBRSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkUsTUFBTSxFQUFFLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUV2RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sUUFBUSxH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