"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebuggerContext = exports.DebuggerContextProvider = void 0;
const react_1 = require("react");
const DebuggerContext = (0, react_1.createContext)({
    onRequestHistory: () => Promise.reject(new Error("Not implemented")),
});
exports.DebuggerContextProvider = DebuggerContext.Provider;
const useDebuggerContext = () => {
    return (0, react_1.useContext)(DebuggerContext);
};
exports.useDebuggerContext = useDebuggerContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVidWdnZXJDb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Zsb3ctZWRpdG9yL0RlYnVnZ2VyQ29udGV4dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsaUNBQWtEO0FBV2xELE1BQU0sZUFBZSxHQUFHLElBQUEscUJBQWEsRUFBc0I7SUFDekQsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0NBQ3JFLENBQUMsQ0FBQztBQUVVLFFBQUEsdUJBQXVCLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQztBQUV6RCxNQUFNLGtCQUFrQixHQUFHLEdBQUcsRUFBRTtJQUNyQyxPQUFPLElBQUEsa0JBQVUsRUFBQyxlQUFlLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUM7QUFGVyxRQUFBLGtCQUFrQixzQkFFN0IifQ==