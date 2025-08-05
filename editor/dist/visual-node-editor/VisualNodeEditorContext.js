"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualNodeEditorProvider = exports.useVisualNodeEditorContext = exports.VisualNodeEditorContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
exports.VisualNodeEditorContext = react_1.default.createContext(undefined);
const useVisualNodeEditorContext = () => {
    const context = react_1.default.useContext(exports.VisualNodeEditorContext);
    if (context === undefined) {
        throw new Error("useVisualNodeEditorContext must be used within a VisualNodeEditorProvider");
    }
    return context;
};
exports.useVisualNodeEditorContext = useVisualNodeEditorContext;
const VisualNodeEditorProvider = ({ children, ...contextValue }) => {
    return ((0, jsx_runtime_1.jsx)(exports.VisualNodeEditorContext.Provider, { value: contextValue, children: children }));
};
exports.VisualNodeEditorProvider = VisualNodeEditorProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlzdWFsTm9kZUVkaXRvckNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL1Zpc3VhbE5vZGVFZGl0b3JDb250ZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsa0RBQTBCO0FBWWIsUUFBQSx1QkFBdUIsR0FBRyxlQUFLLENBQUMsYUFBYSxDQUV4RCxTQUFTLENBQUMsQ0FBQztBQUVOLE1BQU0sMEJBQTBCLEdBQUcsR0FBRyxFQUFFO0lBQzdDLE1BQU0sT0FBTyxHQUFHLGVBQUssQ0FBQyxVQUFVLENBQUMsK0JBQXVCLENBQUMsQ0FBQztJQUUxRCxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUUsQ0FBQztRQUMxQixNQUFNLElBQUksS0FBSyxDQUNiLDJFQUEyRSxDQUM1RSxDQUFDO0lBQ0osQ0FBQztJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQVRXLFFBQUEsMEJBQTBCLDhCQVNyQztBQUVLLE1BQU0sd0JBQXdCLEdBRWpDLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxZQUFZLEVBQUUsRUFBRSxFQUFFO0lBQ3BDLE9BQU8sQ0FDTCx1QkFBQywrQkFBdUIsQ0FBQyxRQUFRLElBQUMsS0FBSyxFQUFFLFlBQVksWUFDbEQsUUFBUSxHQUN3QixDQUNwQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBUlcsUUFBQSx3QkFBd0IsNEJBUW5DIn0=