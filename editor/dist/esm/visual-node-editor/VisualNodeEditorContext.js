import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
export const VisualNodeEditorContext = React.createContext(undefined);
export const useVisualNodeEditorContext = () => {
    const context = React.useContext(VisualNodeEditorContext);
    if (context === undefined) {
        throw new Error("useVisualNodeEditorContext must be used within a VisualNodeEditorProvider");
    }
    return context;
};
export const VisualNodeEditorProvider = ({ children, ...contextValue }) => {
    return (_jsx(VisualNodeEditorContext.Provider, { value: contextValue, children: children }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlzdWFsTm9kZUVkaXRvckNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL1Zpc3VhbE5vZGVFZGl0b3JDb250ZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBWTFCLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxhQUFhLENBRXhELFNBQVMsQ0FBQyxDQUFDO0FBRWIsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQUcsR0FBRyxFQUFFO0lBQzdDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUUxRCxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUUsQ0FBQztRQUMxQixNQUFNLElBQUksS0FBSyxDQUNiLDJFQUEyRSxDQUM1RSxDQUFDO0lBQ0osQ0FBQztJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUVqQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsWUFBWSxFQUFFLEVBQUUsRUFBRTtJQUNwQyxPQUFPLENBQ0wsS0FBQyx1QkFBdUIsQ0FBQyxRQUFRLElBQUMsS0FBSyxFQUFFLFlBQVksWUFDbEQsUUFBUSxHQUN3QixDQUNwQyxDQUFDO0FBQ0osQ0FBQyxDQUFDIn0=