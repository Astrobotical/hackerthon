import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from "classnames";
import { forwardRef } from "react";
import { calcBezierPath, Position } from "../bezier";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, } from "../../../ui";
export const ConnectionViewPath = forwardRef((props, ref) => {
    const { from, to, className, zoom, dashed, onMouseEnter, onMouseLeave, onDelete, onToggleHidden, } = props;
    const { x: x1, y: y1 } = from;
    const { x: x2, y: y2 } = to;
    const d = calcBezierPath({
        sourceX: x1,
        sourceY: y1,
        sourcePosition: Position.Right,
        targetX: x2,
        targetY: y2,
        targetPosition: Position.Left,
        curvature: 0.3,
    });
    const isSelected = className.split(/\s+/).includes("selected");
    const isPendingSelection = className.includes("pending-selection");
    const strokeWidth = (isSelected ? 4 : 2.5) * zoom;
    const strokeDasharray = dashed || isPendingSelection ? 6 * zoom : undefined;
    const pathProximityMask = (_jsx("path", { onClick: props.onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, d: d, className: "cursor-pointer", style: { opacity: 0, strokeWidth: 40 * zoom } }));
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
    const borderPath = (_jsx("path", { d: d, ref: ref, style: {
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
    const path = (_jsx("path", { d: d, style: {
            stroke: getPathStroke(),
            strokeWidth: isSelected ? 1.2 * zoom : zoom,
            fill: "none",
            strokeDasharray,
        } }));
    return (_jsxs(ContextMenu, { children: [_jsx(ContextMenuTrigger, { asChild: true, children: _jsxs("g", { className: classNames("connection-view-path", className), children: [borderPath, path, pathProximityMask] }) }), _jsxs(ContextMenuContent, { children: [onToggleHidden && (_jsx(ContextMenuItem, { onClick: onToggleHidden, children: "Toggle Hidden" })), _jsx(ContextMenuItem, { onClick: onDelete, className: "text-destructive", children: "Delete connection" })] })] }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdGlvblZpZXdQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9jb25uZWN0aW9uLXZpZXcvQ29ubmVjdGlvblZpZXdQYXRoL0Nvbm5lY3Rpb25WaWV3UGF0aC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFjLEVBQUUsVUFBVSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3JELE9BQU8sRUFDTCxXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixrQkFBa0IsR0FDbkIsTUFBTSxhQUFhLENBQUM7QUFlckIsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQXNDLFVBQVUsQ0FDN0UsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDYixNQUFNLEVBQ0osSUFBSSxFQUNKLEVBQUUsRUFDRixTQUFTLEVBQ1QsSUFBSSxFQUNKLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUNaLFFBQVEsRUFDUixjQUFjLEdBQ2YsR0FBRyxLQUFLLENBQUM7SUFDVixNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQzlCLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFFNUIsTUFBTSxDQUFDLEdBQUcsY0FBYyxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLEVBQUU7UUFDWCxjQUFjLEVBQUUsUUFBUSxDQUFDLEtBQUs7UUFDOUIsT0FBTyxFQUFFLEVBQUU7UUFDWCxPQUFPLEVBQUUsRUFBRTtRQUNYLGNBQWMsRUFBRSxRQUFRLENBQUMsSUFB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