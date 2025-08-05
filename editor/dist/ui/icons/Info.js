"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = Info;
const jsx_runtime_1 = require("react/jsx-runtime");
const types_1 = require("./types");
function Info(props) {
    const { size, strokeWidth, ...rest } = { ...types_1.defaultProps, ...props };
    return ((0, jsx_runtime_1.jsxs)("svg", { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", ...rest, children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "10" }), (0, jsx_runtime_1.jsx)("line", { x1: "12", y1: "16", x2: "12", y2: "12" }), (0, jsx_runtime_1.jsx)("line", { x1: "12", y1: "8", x2: "12.01", y2: "8" })] }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91aS9pY29ucy9JbmZvLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLG9CQW1CQzs7QUFyQkQsbUNBQWtEO0FBRWxELFNBQWdCLElBQUksQ0FBQyxLQUFnQjtJQUNuQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxvQkFBWSxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUM7SUFDckUsT0FBTyxDQUNMLGlDQUNFLEtBQUssRUFBRSxJQUFJLEVBQ1gsTUFBTSxFQUFFLElBQUksRUFDWixJQUFJLEVBQUMsTUFBTSxFQUNYLE1BQU0sRUFBQyxjQUFjLEVBQ3JCLFdBQVcsRUFBRSxXQUFXLEVBQ3hCLGFBQWEsRUFBQyxPQUFPLEVBQ3JCLGNBQWMsRUFBQyxPQUFPLEVBQ3RCLE9BQU8sRUFBQyxXQUFXLEtBQ2YsSUFBSSxhQUVSLG1DQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsSUFBSSxHQUFHLEVBQ2pDLGlDQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEdBQUcsRUFDeEMsaUNBQU0sRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEdBQUcsR0FBRyxJQUNyQyxDQUNQLENBQUM7QUFDSixDQUFDIn0=