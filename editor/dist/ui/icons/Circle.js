"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = Circle;
const jsx_runtime_1 = require("react/jsx-runtime");
const types_1 = require("./types");
function Circle(props) {
    const { size, strokeWidth, ...rest } = { ...types_1.defaultProps, ...props };
    return ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", ...rest, children: (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "10" }) }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2lyY2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3VpL2ljb25zL0NpcmNsZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSx3QkFpQkM7O0FBbkJELG1DQUFrRDtBQUVsRCxTQUFnQixNQUFNLENBQUMsS0FBZ0I7SUFDckMsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsb0JBQVksRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDO0lBQ3JFLE9BQU8sQ0FDTCxnQ0FDRSxLQUFLLEVBQUUsSUFBSSxFQUNYLE1BQU0sRUFBRSxJQUFJLEVBQ1osSUFBSSxFQUFDLE1BQU0sRUFDWCxNQUFNLEVBQUMsY0FBYyxFQUNyQixXQUFXLEVBQUUsV0FBVyxFQUN4QixhQUFhLEVBQUMsT0FBTyxFQUNyQixjQUFjLEVBQUMsT0FBTyxFQUN0QixPQUFPLEVBQUMsV0FBVyxLQUNmLElBQUksWUFFUixtQ0FBUSxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLElBQUksR0FBRyxHQUM3QixDQUNQLENBQUM7QUFDSixDQUFDIn0=