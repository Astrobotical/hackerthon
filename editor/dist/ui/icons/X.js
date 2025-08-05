"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X = X;
const jsx_runtime_1 = require("react/jsx-runtime");
const types_1 = require("./types");
function X(props) {
    const { size, strokeWidth, ...rest } = { ...types_1.defaultProps, ...props };
    return ((0, jsx_runtime_1.jsxs)("svg", { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", ...rest, children: [(0, jsx_runtime_1.jsx)("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), (0, jsx_runtime_1.jsx)("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91aS9pY29ucy9YLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGNBa0JDOztBQXBCRCxtQ0FBa0Q7QUFFbEQsU0FBZ0IsQ0FBQyxDQUFDLEtBQWdCO0lBQ2hDLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLG9CQUFZLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQztJQUNyRSxPQUFPLENBQ0wsaUNBQ0UsS0FBSyxFQUFFLElBQUksRUFDWCxNQUFNLEVBQUUsSUFBSSxFQUNaLElBQUksRUFBQyxNQUFNLEVBQ1gsTUFBTSxFQUFDLGNBQWMsRUFDckIsV0FBVyxFQUFFLFdBQVcsRUFDeEIsYUFBYSxFQUFDLE9BQU8sRUFDckIsY0FBYyxFQUFDLE9BQU8sRUFDdEIsT0FBTyxFQUFDLFdBQVcsS0FDZixJQUFJLGFBRVIsaUNBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLElBQUksR0FBRyxFQUN0QyxpQ0FBTSxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxHQUFHLElBQ2xDLENBQ1AsQ0FBQztBQUNKLENBQUMifQ==