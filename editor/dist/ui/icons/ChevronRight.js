"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChevronRight = ChevronRight;
const jsx_runtime_1 = require("react/jsx-runtime");
const types_1 = require("./types");
function ChevronRight(props) {
    const { size, strokeWidth, ...rest } = { ...types_1.defaultProps, ...props };
    return ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", ...rest, children: (0, jsx_runtime_1.jsx)("polyline", { points: "9 18 15 12 9 6" }) }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hldnJvblJpZ2h0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3VpL2ljb25zL0NoZXZyb25SaWdodC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxvQ0FpQkM7O0FBbkJELG1DQUFrRDtBQUVsRCxTQUFnQixZQUFZLENBQUMsS0FBZ0I7SUFDM0MsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsb0JBQVksRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDO0lBQ3JFLE9BQU8sQ0FDTCxnQ0FDRSxLQUFLLEVBQUUsSUFBSSxFQUNYLE1BQU0sRUFBRSxJQUFJLEVBQ1osSUFBSSxFQUFDLE1BQU0sRUFDWCxNQUFNLEVBQUMsY0FBYyxFQUNyQixXQUFXLEVBQUUsV0FBVyxFQUN4QixhQUFhLEVBQUMsT0FBTyxFQUNyQixjQUFjLEVBQUMsT0FBTyxFQUN0QixPQUFPLEVBQUMsV0FBVyxLQUNmLElBQUksWUFFUixxQ0FBVSxNQUFNLEVBQUMsZ0JBQWdCLEdBQUcsR0FDaEMsQ0FDUCxDQUFDO0FBQ0osQ0FBQyJ9