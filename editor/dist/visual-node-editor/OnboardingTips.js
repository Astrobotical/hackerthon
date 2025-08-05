"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingTips = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const VisualNodeEditorContext_1 = require("./VisualNodeEditorContext");
const ports_1 = require("../flow-editor/ports");
const user_preferences_1 = require("../lib/user-preferences");
const ui_1 = require("../ui");
const utils_1 = require("../lib/utils");
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
    const [isMounted, setIsMounted] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setIsMounted(true);
    }, []);
    return isMounted;
};
const OnboardingTips = () => {
    var _a, _b;
    const { node, boardData } = (0, VisualNodeEditorContext_1.useVisualNodeEditorContext)();
    const { reportEvent } = (0, ports_1.usePorts)();
    const isMounted = useIsMounted();
    const [currentTip, setCurrentTip] = (0, user_preferences_1.useLocalStorage)("onboarding-tip", tipsOrder[0]);
    const [showFeedback, setShowFeedback] = (0, react_1.useState)(false);
    const [isCompleted, setIsCompleted] = (0, user_preferences_1.useLocalStorage)("onboarding-tip-completed", false);
    const lastBoardData = (0, react_1.useRef)();
    const lastNode = (0, react_1.useRef)();
    const [showTips, setShowTips] = (0, react_1.useState)(false);
    const [isAdvancing, setIsAdvancing] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setTimeout(() => setShowTips(true), 1000);
    }, []);
    (0, react_1.useEffect)(() => {
        if (!showTips || lastBoardData.current) {
            return;
        }
        lastBoardData.current = boardData;
        lastNode.current = node;
    }, [showTips, boardData, node]);
    const currIndex = (0, react_1.useMemo)(() => {
        return currentTip ? tipsOrder.indexOf(currentTip) : -1;
    }, [currentTip]);
    const advanceTip = (0, react_1.useCallback)(() => {
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
    (0, react_1.useEffect)(() => {
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
    return !isMounted || isCompleted ? null : ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-md transition-all duration-200 ease-in-out", !showTips && "opacity-0 -translate-y-2", showTips && "opacity-100 translate-y-0", "onboarding-tips"), children: (0, jsx_runtime_1.jsxs)(ui_1.Alert, { variant: "default", className: (0, utils_1.cn)("flex items-start gap-2 shadow-lg p-3", !showFeedback && "bg-secondary"), children: [(0, jsx_runtime_1.jsx)("div", { className: "mt-0.5 shrink-0", children: showFeedback ? ((0, jsx_runtime_1.jsx)(ui_1.Check, { className: "h-4 w-4" })) : ((0, jsx_runtime_1.jsx)(ui_1.Lightbulb, { className: "h-4 w-4" })) }), (0, jsx_runtime_1.jsx)(ui_1.AlertDescription, { children: showFeedback
                        ? currIndex === tipsOrder.length - 1
                            ? "Great job! For more tips, check out the help menu."
                            : "Great job! Moving to the next tip..."
                        : (_b = (_a = tips[currentTip]) === null || _a === void 0 ? void 0 : _a.tip) !== null && _b !== void 0 ? _b : "n/a" })] }) }));
};
exports.OnboardingTips = OnboardingTips;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT25ib2FyZGluZ1RpcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL09uYm9hcmRpbmdUaXBzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaUNBTWU7QUFFZix1RUFBdUU7QUFFdkUsZ0RBQWdEO0FBQ2hELDhEQUEwRDtBQUUxRCw4QkFBa0U7QUFDbEUsd0NBQWtDO0FBVWxDLE1BQU0sSUFBSSxHQUE0QjtJQUNwQyxHQUFHLEVBQUU7UUFDSCxHQUFHLEVBQUUsZ0VBQWdFO1FBQ3JFLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsRUFBRSxFQUFFO1lBQy9DLE1BQU0sRUFBRSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkUsTUFBTSxFQUFFLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUV2RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN2QixDQUFDO0tBQ0Y7SUFDRCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsMERBQTBEO1FBQy9ELFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsRUFBRSxFQUFFO1lBQy9DLE1BQU0sRUFBRSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ3JFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFF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