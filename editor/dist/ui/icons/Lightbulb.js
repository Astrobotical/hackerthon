"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lightbulb = Lightbulb;
const jsx_runtime_1 = require("react/jsx-runtime");
const types_1 = require("./types");
function Lightbulb(props) {
    const { size, strokeWidth, ...rest } = { ...types_1.defaultProps, ...props };
    return ((0, jsx_runtime_1.jsxs)("svg", { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", ...rest, children: [(0, jsx_runtime_1.jsx)("path", { d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M9 18h6" }), (0, jsx_runtime_1.jsx)("path", { d: "M10 22h4" })] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlnaHRidWxiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3VpL2ljb25zL0xpZ2h0YnVsYi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSw4QkFtQkM7O0FBckJELG1DQUFrRDtBQUVsRCxTQUFnQixTQUFTLENBQUMsS0FBZ0I7SUFDeEMsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsb0JBQVksRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDO0lBQ3JFLE9BQU8sQ0FDTCxpQ0FDRSxLQUFLLEVBQUUsSUFBSSxFQUNYLE1BQU0sRUFBRSxJQUFJLEVBQ1osSUFBSSxFQUFDLE1BQU0sRUFDWCxNQUFNLEVBQUMsY0FBYyxFQUNyQixXQUFXLEVBQUUsV0FBVyxFQUN4QixhQUFhLEVBQUMsT0FBTyxFQUNyQixjQUFjLEVBQUMsT0FBTyxFQUN0QixPQUFPLEVBQUMsV0FBVyxLQUNmLElBQUksYUFFUixpQ0FBTSxDQUFDLEVBQUMsc0dBQXNHLEdBQUcsRUFDakgsaUNBQU0sQ0FBQyxFQUFDLFNBQVMsR0FBRyxFQUNwQixpQ0FBTSxDQUFDLEVBQUMsVUFBVSxHQUFHLElBQ2pCLENBQ1AsQ0FBQztBQUNKLENBQUMifQ==