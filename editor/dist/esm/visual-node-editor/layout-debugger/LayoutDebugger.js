import { createElement as _createElement } from "react";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { values } from "@flyde/core";
import React from "react";
import { logicalPosToRenderedPos } from "../utils";
const PosView = ({ pos }) => {
    return (_jsxs("span", { children: [pos.x.toFixed(1), ", ", pos.y.toFixed(1)] }));
};
export const PosDebugger = (props) => {
    return (_jsx("span", { className: "pos-debugger", children: _jsx(PosView, { pos: props.pos }) }));
};
export const LayoutDebuggerItem = (props) => {
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
    return (_jsx("div", { className: "layout-debugger", style: fixerStyle, children: _jsxs("span", { className: "drag-sim", style: dragSimStyle, children: [_jsx(PosDebugger, { pos: pos }), _jsx("div", { className: "layout-debugger-zoom-wrapper", style: zoomWrapperStyle, children: _jsx("div", { className: "layout-debugger-inner", style: insideElemStyle }) })] }) }));
};
const isPosDebugger = () => {
    try {
        return localStorage.getItem("pos-debugger") === "true";
    }
    catch (e) {
        return false;
    }
};
const isDebug = isPosDebugger();
export const LayoutDebugger = (props) => {
    const { extraDebug, vp, node, mousePos } = props;
    if (!isDebug) {
        return null;
    }
    const itemElems = extraDebug.map((props, idx) => (_createElement(LayoutDebuggerItem, { ...props, key: idx })));
    const baseNodeElems = [
        ...node.instances.map((i) => i.pos),
        ...values(node.inputsPosition),
        ...values(node.outputsPosition),
    ].map((pos) => (_jsx(LayoutDebuggerItem, { pos: pos, viewPort: vp, size: { width: 0, height: 0 }, color: "red" })));
    const mouseRenderedPos = logicalPosToRenderedPos(mousePos, vp);
    const viewPortData = (_jsxs("div", { className: "viewport-data", children: [_jsxs("div", { children: ["Pos: ", _jsx(PosView, { pos: vp.pos })] }), _jsxs("div", { children: ["Zoom: ", vp.zoom.toFixed(2), " "] }), _jsxs("div", { children: ["Mouse (logical): ", _jsx(PosView, { pos: mousePos })] }), _jsxs("div", { children: ["Rendered (rendered): ", _jsx(PosView, { pos: mouseRenderedPos })] })] }));
    return (_jsxs(React.Fragment, { children: [viewPortData, itemElems, baseNodeElems] }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0RGVidWdnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL2xheW91dC1kZWJ1Z2dlci9MYXlvdXREZWJ1Z2dlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQWMsTUFBTSxFQUFPLE1BQU0sYUFBYSxDQUFDO0FBQ3RELE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUxQixPQUFPLEVBQUUsdUJBQXVCLEVBQVksTUFBTSxVQUFVLENBQUM7QUFFN0QsTUFBTSxPQUFPLEdBQTJCLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2xELE9BQU8sQ0FDTCwyQkFDRyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFDaEMsQ0FDUixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBU0YsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUEyQixDQUFDLEtBQUssRUFBRSxFQUFFO0lBQzNELE9BQU8sQ0FDTCxlQUFNLFNBQVMsRUFBQyxjQUFjLFlBQzVCLEtBQUMsT0FBTyxJQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxHQUFJLEdBQ3RCLENBQ1IsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFzQyxDQUNuRSxLQUFLLEVBQ0wsRUFBRTtJQUNGLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFFN0MsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztJQUV4QixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEQs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