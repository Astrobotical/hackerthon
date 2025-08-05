"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Check = Check;
const jsx_runtime_1 = require("react/jsx-runtime");
const types_1 = require("./types");
function Check(props) {
    const { size, strokeWidth, ...rest } = { ...types_1.defaultProps, ...props };
    return ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", ...rest, children: (0, jsx_runtime_1.jsx)("path", { d: "M20 6 9 17l-5-5" }) }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdWkvaWNvbnMvQ2hlY2sudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esc0JBaUJDOztBQW5CRCxtQ0FBa0Q7QUFFbEQsU0FBZ0IsS0FBSyxDQUFDLEtBQWdCO0lBQ3BDLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLG9CQUFZLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQztJQUNyRSxPQUFPLENBQ0wsZ0NBQ0UsS0FBSyxFQUFFLElBQUksRUFDWCxNQUFNLEVBQUUsSUFBSSxFQUNaLElBQUksRUFBQyxNQUFNLEVBQ1gsTUFBTSxFQUFDLGNBQWMsRUFDckIsV0FBVyxFQUFFLFdBQVcsRUFDeEIsYUFBYSxFQUFDLE9BQU8sRUFDckIsY0FBYyxFQUFDLE9BQU8sRUFDdEIsT0FBTyxFQUFDLFdBQVcsS0FDZixJQUFJLFlBRVIsaUNBQU0sQ0FBQyxFQUFDLGlCQUFpQixHQUFHLEdBQ3hCLENBQ1AsQ0FBQztBQUNKLENBQUMifQ==