import { jsx as _jsx } from "react/jsx-runtime";
export const BrowserOnlyReactJson = (props) => {
    if (typeof window === "undefined") {
        return null;
    }
    const ReactJson = require("react18-json-view").default;
    return _jsx(ReactJson, { ...props });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJvd3Nlckpzb25WaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9hbmFseXRpY3MtdmFsdWUtcmVuZGVyZXIvQnJvd3Nlckpzb25WaWV3LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQWlDLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDMUUsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUUsQ0FBQztRQUNsQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDdkQsT0FBTyxLQUFDLFNBQVMsT0FBSyxLQUFLLEdBQUksQ0FBQztBQUNsQyxDQUFDLENBQUMifQ==