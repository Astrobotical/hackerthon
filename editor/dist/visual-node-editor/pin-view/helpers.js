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
exports.getOutputName = exports.getInputName = exports.useHistoryHelpers = void 0;
const react_1 = __importStar(require("react"));
const DebuggerContext_1 = require("../../flow-editor/DebuggerContext");
const core_1 = require("@flyde/core");
const INSIGHTS_TOOLTIP_INTERVAL = 500;
const useHistoryHelpers = (instanceId, pinId, type) => {
    const historyTimer = (0, react_1.useRef)();
    const { onRequestHistory } = (0, DebuggerContext_1.useDebuggerContext)();
    const [history, setHistory] = (0, react_1.useState)();
    const refreshHistory = (0, react_1.useCallback)(() => {
        clearInterval(historyTimer.current);
        onRequestHistory(instanceId, pinId !== null && pinId !== void 0 ? pinId : "", type !== null && type !== void 0 ? type : "input").then((val) => {
            setHistory(val);
        });
        historyTimer.current = setInterval(() => {
            onRequestHistory(instanceId, pinId !== null && pinId !== void 0 ? pinId : "", type !== null && type !== void 0 ? type : "input").then((val) => {
                setHistory(val);
            });
        }, INSIGHTS_TOOLTIP_INTERVAL);
    }, [instanceId, onRequestHistory, pinId, type]);
    const resetHistory = react_1.default.useCallback(() => {
        clearInterval(historyTimer.current);
        setHistory(undefined);
    }, []);
    return { history, refreshHistory, resetHistory };
};
exports.useHistoryHelpers = useHistoryHelpers;
const getInputName = (pinId) => {
    switch (pinId) {
        case core_1.TRIGGER_PIN_ID:
            return 'trigger';
        default:
            return pinId;
    }
};
exports.getInputName = getInputName;
const getOutputName = (pinId) => {
    switch (pinId) {
        case core_1.ERROR_PIN_ID:
            return "error";
        default:
            return pinId;
    }
};
exports.getOutputName = getOutputName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvcGluLXZpZXcvaGVscGVycy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTJFO0FBQzNFLHVFQUF1RTtBQUN2RSxzQ0FBMkU7QUFJM0UsTUFBTSx5QkFBeUIsR0FBRyxHQUFHLENBQUM7QUFFL0IsTUFBTSxpQkFBaUIsR0FBRyxDQUMvQixVQUFrQixFQUNsQixLQUFjLEVBQ2QsSUFBeUIsRUFDekIsRUFBRTtJQUNGLE1BQU0sWUFBWSxHQUFHLElBQUEsY0FBTSxHQUFPLENBQUM7SUFFbkMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsSUFBQSxvQ0FBa0IsR0FBRSxDQUFDO0lBRWxELE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxHQUFrQixDQUFDO0lBRXpELE1BQU0sY0FBYyxHQUFHLElBQUEsbUJBQVcsRUFBQyxHQUFHLEVBQUU7UUFDdEMsYUFBYSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksRUFBRSxFQUFFLElBQUksYUFBSixJQUFJLGNBQUosSUFBSSxHQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3RFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUN0QyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksRUFBRSxFQUFFLElBQUksYUFBSixJQUFJLGNBQUosSUFBSSxHQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN0RSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUUseUJBQXlCLENBQUMsQ0FBQztJQUNoQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFaEQsTUFBTSxZQUFZLEdBQUcsZUFBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDMUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsT0FBTyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLENBQUM7QUFDbkQsQ0FBQyxDQUFDO0FBN0JXLFFBQUEsaUJBQWlCLHFCQTZCNUI7QUFHSyxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQWEsRUFBVSxFQUFFO0lBQ3BELFFBQVEsS0FBSyxFQUFFLENBQUM7UUFDZCxLQUFLLHFCQUFjO1lBQ2pCLE9BQU8sU0FBUyxDQUFDO1FBQ25CO1lBQ0UsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztBQUNILENBQUMsQ0FBQztBQVBXLFFBQUEsWUFBWSxnQkFPdkI7QUFFSyxNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO0lBQzdDLFFBQVEsS0FBSyxFQUFFLENBQUM7UUFDZCxLQUFLLG1CQUFZO1lBQ2YsT0FBTyxPQUFPLENBQUM7UUFDakI7WUFDRSxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBUFcsUUFBQSxhQUFhLGlCQU94QiJ9