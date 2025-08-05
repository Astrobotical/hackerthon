"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionViewPath = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = require("react");
const bezier_1 = require("../bezier");
const ui_1 = require("../../../ui");
exports.ConnectionViewPath = (0, react_1.forwardRef)((props, ref) => {
    const { from, to, className, zoom, dashed, onMouseEnter, onMouseLeave, onDelete, onToggleHidden, } = props;
    const { x: x1, y: y1 } = from;
    const { x: x2, y: y2 } = to;
    const d = (0, bezier_1.calcBezierPath)({
        sourceX: x1,
        sourceY: y1,
        sourcePosition: bezier_1.Position.Right,
        targetX: x2,
        targetY: y2,
        targetPosition: bezier_1.Position.Left,
        curvature: 0.3,
    });
    const isSelected = className.split(/\s+/).includes("selected");
    const isPendingSelection = className.includes("pending-selection");
    const strokeWidth = (isSelected ? 4 : 2.5) * zoom;
    const strokeDasharray = dashed || isPendingSelection ? 6 * zoom : undefined;
    const pathProximityMask = ((0, jsx_runtime_1.jsx)("path", { onClick: props.onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, d: d, className: "cursor-pointer", style: { opacity: 0, strokeWidth: 40 * zoom } }));
    // Determine stroke color based on status
    const getBorderStroke = () => {
        if (className.includes("added"))
            return "#4ADE80";
        if (className.includes("removed"))
            return "#F87171";
        if (className.includes("changed"))
            return "#60A5FA";
        if (isSelected)
            return "#2887f4"; // Brand blue for selected
        // No special color for pending selection
        return "#6A6A6A"; // Default
    };
    const borderPath = ((0, jsx_runtime_1.jsx)("path", { d: d, ref: ref, style: {
            stroke: getBorderStroke(),
            strokeWidth: strokeWidth,
            fill: "none",
            strokeDasharray,
        } }));
    // Determine inner path stroke color
    const getPathStroke = () => {
        if (className.includes("added"))
            return "#86EFAC";
        if (className.includes("removed"))
            return "#FCA5A5";
        if (className.includes("changed"))
            return "#93C5FD";
        if (isSelected)
            return "#2987f4"; // Lighter brand blue for selected
        // No special color for pending selection
        return "#D0D0D0"; // Default
    };
    const path = ((0, jsx_runtime_1.jsx)("path", { d: d, style: {
            stroke: getPathStroke(),
            strokeWidth: isSelected ? 1.2 * zoom : zoom,
            fill: "none",
            strokeDasharray,
        } }));
    return ((0, jsx_runtime_1.jsxs)(ui_1.ContextMenu, { children: [(0, jsx_runtime_1.jsx)(ui_1.ContextMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)("g", { className: (0, classnames_1.default)("connection-view-path", className), children: [borderPath, path, pathProximityMask] }) }), (0, jsx_runtime_1.jsxs)(ui_1.ContextMenuContent, { children: [onToggleHidden && ((0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: onToggleHidden, children: "Toggle Hidden" })), (0, jsx_runtime_1.jsx)(ui_1.ContextMenuItem, { onClick: onDelete, className: "text-destructive", children: "Delete connection" })] })] }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdGlvblZpZXdQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9jb25uZWN0aW9uLXZpZXcvQ29ubmVjdGlvblZpZXdQYXRoL0Nvbm5lY3Rpb25WaWV3UGF0aC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLDREQUFvQztBQUNwQyxpQ0FBMEM7QUFDMUMsc0NBQXFEO0FBQ3JELG9DQUtxQjtBQWVSLFFBQUEsa0JBQWtCLEdBQXNDLElBQUEsa0JBQVUsRUFDN0UsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDYixNQUFNLEVBQ0osSUFBSSxFQUNKLEVBQUUsRUFDRixTQUFTLEVBQ1QsSUFBSSxFQUNKLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUNaLFFBQVEsRUFDUixjQUFjLEdBQ2YsR0FBRyxLQUFLLENBQUM7SUFDVixNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQzlCLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFFNUIsTUFBTSxDQUFDLEdBQUcsSUFBQSx1QkFBYyxFQUFDO1FBQ3ZCLE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLEVBQUU7UUFDWCxjQUFjLEVBQUUsaUJBQVEsQ0FBQyxLQUFLO1FBQzlCLE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLEVBQUU7UUFDWCxjQUFjLEVBQUUsaUJBQVEsQ0FBQyxJQUFJO1FBQzdCLFNBQVMsRUFBRSxHQUFHO0tBQ2YsQ0FBQyxDQUFDO0lBRUgsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0QsTUFBTSxrQkFBa0IsR0FBRyxT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