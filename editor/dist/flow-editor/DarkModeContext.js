"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDarkMode = exports.DarkModeProvider = void 0;
const react_1 = require("react");
const DarkModeContext = (0, react_1.createContext)(true);
exports.DarkModeProvider = DarkModeContext.Provider;
const useDarkMode = () => {
    return (0, react_1.useContext)(DarkModeContext);
};
exports.useDarkMode = useDarkMode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFya01vZGVDb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Zsb3ctZWRpdG9yL0RhcmtNb2RlQ29udGV4dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQWtEO0FBRWxELE1BQU0sZUFBZSxHQUFHLElBQUEscUJBQWEsRUFBVSxJQUFJLENBQUMsQ0FBQztBQUV4QyxRQUFBLGdCQUFnQixHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUM7QUFFbEQsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFO0lBQzlCLE9BQU8sSUFBQSxrQkFBVSxFQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUZXLFFBQUEsV0FBVyxlQUV0QiJ9