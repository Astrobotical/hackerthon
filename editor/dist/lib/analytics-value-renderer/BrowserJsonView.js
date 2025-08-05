"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserOnlyReactJson = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const BrowserOnlyReactJson = (props) => {
    if (typeof window === "undefined") {
        return null;
    }
    const ReactJson = require("react18-json-view").default;
    return (0, jsx_runtime_1.jsx)(ReactJson, { ...props });
};
exports.BrowserOnlyReactJson = BrowserOnlyReactJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJvd3Nlckpzb25WaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9hbmFseXRpY3MtdmFsdWUtcmVuZGVyZXIvQnJvd3Nlckpzb25WaWV3LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSU8sTUFBTSxvQkFBb0IsR0FBaUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUMxRSxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN2RCxPQUFPLHVCQUFDLFNBQVMsT0FBSyxLQUFLLEdBQUksQ0FBQztBQUNsQyxDQUFDLENBQUM7QUFOVyxRQUFBLG9CQUFvQix3QkFNL0IifQ==