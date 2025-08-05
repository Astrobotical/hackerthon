"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCircle = HelpCircle;
const jsx_runtime_1 = require("react/jsx-runtime");
const types_1 = require("../../icons/types");
function HelpCircle(props) {
    const { size, strokeWidth, ...rest } = { ...types_1.defaultProps, ...props };
    return ((0, jsx_runtime_1.jsxs)("svg", { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", ...rest, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "10" }), (0, jsx_runtime_1.jsx)("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }), (0, jsx_runtime_1.jsx)("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVscENpcmNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL3VpL0hlbHBDaXJjbGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsZ0NBbUJDOztBQXJCRCw2Q0FBNEQ7QUFFNUQsU0FBZ0IsVUFBVSxDQUFDLEtBQWdCO0lBQ3pDLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLG9CQUFZLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQztJQUNyRSxPQUFPLENBQ0wsaUNBQ0UsS0FBSyxFQUFFLElBQUksRUFDWCxNQUFNLEVBQUUsSUFBSSxFQUNaLElBQUksRUFBQyxNQUFNLEVBQ1gsTUFBTSxFQUFDLGNBQWMsRUFDckIsV0FBVyxFQUFFLFdBQVcsRUFDeEIsYUFBYSxFQUFDLE9BQU8sRUFDckIsY0FBYyxFQUFDLE9BQU8sRUFDdEIsT0FBTyxFQUFDLFdBQVcsS0FDZixJQUFJLGFBRVIsbUNBQVEsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxJQUFJLEdBQUcsRUFDakMsaUNBQU0sQ0FBQyxFQUFDLHNDQUFzQyxHQUFHLEVBQ2pELGlDQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxJQUFJLEdBQUcsSUFDdkMsQ0FDUCxDQUFDO0FBQ0osQ0FBQyJ9