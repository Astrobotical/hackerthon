"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiCompletionProvider = exports.useAiCompletion = void 0;
const react_1 = require("react");
// eslint-disable-next-line @typescript-eslint/no-redeclare
const AiCompletionContext = (0, react_1.createContext)(null);
const useAiCompletion = () => {
    const context = (0, react_1.useContext)(AiCompletionContext);
    if (!context) {
        return {
            createCompletion: () => Promise.resolve(""),
            enabled: false,
        };
    }
    return context;
};
exports.useAiCompletion = useAiCompletion;
exports.AiCompletionProvider = AiCompletionContext.Provider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91aS9haS9jb250ZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBa0Q7QUFRbEQsMkRBQTJEO0FBQzNELE1BQU0sbUJBQW1CLEdBQUcsSUFBQSxxQkFBYSxFQUE2QixJQUFJLENBQUMsQ0FBQztBQUVyRSxNQUFNLGVBQWUsR0FBRyxHQUFHLEVBQUU7SUFDbEMsTUFBTSxPQUFPLEdBQUcsSUFBQSxrQkFBVSxFQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2IsT0FBTztZQUNMLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQzNDLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQztJQUNKLENBQUM7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUM7QUFUVyxRQUFBLGVBQWUsbUJBUzFCO0FBRVcsUUFBQSxvQkFBb0IsR0FBRyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMifQ==