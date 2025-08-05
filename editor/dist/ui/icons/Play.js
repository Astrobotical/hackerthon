"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Play = Play;
const jsx_runtime_1 = require("react/jsx-runtime");
const types_1 = require("./types");
function Play(props) {
    const { size, strokeWidth, ...rest } = { ...types_1.defaultProps, ...props };
    return ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", ...rest, children: (0, jsx_runtime_1.jsx)("polygon", { points: "5 3 19 12 5 21 5 3" }) }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91aS9pY29ucy9QbGF5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLG9CQWlCQzs7QUFuQkQsbUNBQWtEO0FBRWxELFNBQWdCLElBQUksQ0FBQyxLQUFnQjtJQUNuQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxvQkFBWSxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUM7SUFDckUsT0FBTyxDQUNMLGdDQUNFLEtBQUssRUFBRSxJQUFJLEVBQ1gsTUFBTSxFQUFFLElBQUksRUFDWixJQUFJLEVBQUMsTUFBTSxFQUNYLE1BQU0sRUFBQyxjQUFjLEVBQ3JCLFdBQVcsRUFBRSxXQUFXLEVBQ3hCLGFBQWEsRUFBQyxPQUFPLEVBQ3JCLGNBQWMsRUFBQyxPQUFPLEVBQ3RCLE9BQU8sRUFBQyxXQUFXLEtBQ2YsSUFBSSxZQUVSLG9DQUFTLE1BQU0sRUFBQyxvQkFBb0IsR0FBRyxHQUNuQyxDQUNQLENBQUM7QUFDSixDQUFDIn0=