"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutDebugger = exports.LayoutDebuggerItem = exports.PosDebugger = void 0;
const react_1 = require("react");
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@flyde/core");
const react_2 = __importDefault(require("react"));
const utils_1 = require("../utils");
const PosView = ({ pos }) => {
    return ((0, jsx_runtime_1.jsxs)("span", { children: [pos.x.toFixed(1), ", ", pos.y.toFixed(1)] }));
};
const PosDebugger = (props) => {
    return ((0, jsx_runtime_1.jsx)("span", { className: "pos-debugger", children: (0, jsx_runtime_1.jsx)(PosView, { pos: props.pos }) }));
};
exports.PosDebugger = PosDebugger;
const LayoutDebuggerItem = (props) => {
    const { pos, viewPort, size, color } = props;
    const z = viewPort.zoom;
    const correctX = pos.x * z - viewPort.pos.x * z;
    const correctY = pos.y * z - viewPort.pos.y * z;
    const dx = correctX - pos.x;
    const dy = correctY - pos.y;
    const fixerStyle = {
        transform: `translate(${dx}px, ${dy}px)`,
    };
    const zoomWrapperStyle = {
        transform: `scale(${viewPort.zoom})`,
    };
    const dragSimStyle = {
        transform: `translate(${pos.x}px, ${pos.y}px)`,
    };
    const insideElemStyle = {
        width: `${size.width}px`,
        height: `${size.height}px`,
        backgroundColor: color,
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "layout-debugger", style: fixerStyle, children: (0, jsx_runtime_1.jsxs)("span", { className: "drag-sim", style: dragSimStyle, children: [(0, jsx_runtime_1.jsx)(exports.PosDebugger, { pos: pos }), (0, jsx_runtime_1.jsx)("div", { className: "layout-debugger-zoom-wrapper", style: zoomWrapperStyle, children: (0, jsx_runtime_1.jsx)("div", { className: "layout-debugger-inner", style: insideElemStyle }) })] }) }));
};
exports.LayoutDebuggerItem = LayoutDebuggerItem;
const isPosDebugger = () => {
    try {
        return localStorage.getItem("pos-debugger") === "true";
    }
    catch (e) {
        return false;
    }
};
const isDebug = isPosDebugger();
const LayoutDebugger = (props) => {
    const { extraDebug, vp, node, mousePos } = props;
    if (!isDebug) {
        return null;
    }
    const itemElems = extraDebug.map((props, idx) => ((0, react_1.createElement)(exports.LayoutDebuggerItem, { ...props, key: idx })));
    const baseNodeElems = [
        ...node.instances.map((i) => i.pos),
        ...(0, core_1.values)(node.inputsPosition),
        ...(0, core_1.values)(node.outputsPosition),
    ].map((pos) => ((0, jsx_runtime_1.jsx)(exports.LayoutDebuggerItem, { pos: pos, viewPort: vp, size: { width: 0, height: 0 }, color: "red" })));
    const mouseRenderedPos = (0, utils_1.logicalPosToRenderedPos)(mousePos, vp);
    const viewPortData = ((0, jsx_runtime_1.jsxs)("div", { className: "viewport-data", children: [(0, jsx_runtime_1.jsxs)("div", { children: ["Pos: ", (0, jsx_runtime_1.jsx)(PosView, { pos: vp.pos })] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Zoom: ", vp.zoom.toFixed(2), " "] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Mouse (logical): ", (0, jsx_runtime_1.jsx)(PosView, { pos: mousePos })] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Rendered (rendered): ", (0, jsx_runtime_1.jsx)(PosView, { pos: mouseRenderedPos })] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_2.default.Fragment, { children: [viewPortData, itemElems, baseNodeElems] }));
};
exports.LayoutDebugger = LayoutDebugger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0RGVidWdnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL2xheW91dC1kZWJ1Z2dlci9MYXlvdXREZWJ1Z2dlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBc0Q7QUFDdEQsa0RBQTBCO0FBRTFCLG9DQUE2RDtBQUU3RCxNQUFNLE9BQU8sR0FBMkIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDbEQsT0FBTyxDQUNMLDZDQUNHLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUNoQyxDQUNSLENBQUM7QUFDSixDQUFDLENBQUM7QUFTSyxNQUFNLFdBQVcsR0FBMkIsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUMzRCxPQUFPLENBQ0wsaUNBQU0sU0FBUyxFQUFDLGNBQWMsWUFDNUIsdUJBQUMsT0FBTyxJQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxHQUFJLEdBQ3RCLENBQ1IsQ0FBQztBQUNKLENBQUMsQ0FBQztBQU5XLFFBQUEsV0FBVyxlQU10QjtBQUVLLE1BQU0sa0JBQWtCLEdBQXNDLENBQ25FLEtBQUssRUFDTCxFQUFFO0lBQ0YsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEtBQUssQ0FBQztJQUU3QyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBRXhCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMs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