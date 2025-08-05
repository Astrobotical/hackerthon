"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChevronLeft = ChevronLeft;
const jsx_runtime_1 = require("react/jsx-runtime");
const types_1 = require("./types");
function ChevronLeft(props) {
    const { size, strokeWidth, ...rest } = { ...types_1.defaultProps, ...props };
    return ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", ...rest, children: (0, jsx_runtime_1.jsx)("polyline", { points: "15 18 9 12 15 6" }) }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hldnJvbkxlZnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdWkvaWNvbnMvQ2hldnJvbkxlZnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esa0NBaUJDOztBQW5CRCxtQ0FBa0Q7QUFFbEQsU0FBZ0IsV0FBVyxDQUFDLEtBQWdCO0lBQzFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLG9CQUFZLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQztJQUNyRSxPQUFPLENBQ0wsZ0NBQ0UsS0FBSyxFQUFFLElBQUksRUFDWCxNQUFNLEVBQUUsSUFBSSxFQUNaLElBQUksRUFBQyxNQUFNLEVBQ1gsTUFBTSxFQUFDLGNBQWMsRUFDckIsV0FBVyxFQUFFLFdBQVcsRUFDeEIsYUFBYSxFQUFDLE9BQU8sRUFDckIsY0FBYyxFQUFDLE9BQU8sRUFDdEIsT0FBTyxFQUFDLFdBQVcsS0FDZixJQUFJLFlBRVIscUNBQVUsTUFBTSxFQUFDLGlCQUFpQixHQUFHLEdBQ2pDLENBQ1AsQ0FBQztBQUNKLENBQUMifQ==