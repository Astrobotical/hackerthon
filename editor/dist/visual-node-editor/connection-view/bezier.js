"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcBezierPath = exports.Position = void 0;
exports.getBezierCenter = getBezierCenter;
var Position;
(function (Position) {
    Position["Left"] = "left";
    Position["Top"] = "top";
    Position["Right"] = "right";
    Position["Bottom"] = "bottom";
})(Position || (exports.Position = Position = {}));
function calculateControlOffset(distance, curvature) {
    if (distance >= 0) {
        return 0.5 * distance;
    }
    else {
        return curvature * 35 * Math.sqrt(-distance);
    }
}
function calculateHorizontalOffset(distanceX, distanceY) {
    distanceX = Math.abs(distanceX);
    distanceY = Math.abs(distanceY);
    let cx = distanceX / 2;
    if (cx < 50 && cx >= 0) {
        cx = 50;
        if (distanceY < 50)
            cx -= 50 - distanceY;
    }
    if (cx > 230)
        cx = 230;
    return cx;
}
function getControlWithCurvature({ pos, x1, y1, x2, y2, c, }) {
    let ctX, ctY;
    switch (pos) {
        case Position.Left:
            ctX = x1 - calculateHorizontalOffset(x2 - x1, y2 - y1);
            ctY = y1;
            break;
        case Position.Right:
            ctX = x1 + calculateHorizontalOffset(x2 - x1, y2 - y1);
            ctY = y1;
            break;
        case Position.Top:
            ctX = x1;
            ctY = y1 - calculateControlOffset(y1 - y2, c);
            break;
        case Position.Bottom:
            ctX = x1;
            ctY = y1 + calculateControlOffset(y2 - y1, c);
            break;
    }
    return [ctX, ctY];
}
const calcBezierPath = ({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, curvature = 0.25, }) => {
    const [sourceControlX, sourceControlY] = getControlWithCurvature({
        pos: sourcePosition,
        x1: sourceX,
        y1: sourceY,
        x2: targetX,
        y2: targetY,
        c: curvature,
    });
    const [targetControlX, targetControlY] = getControlWithCurvature({
        pos: targetPosition,
        x1: targetX,
        y1: targetY,
        x2: sourceX,
        y2: sourceY,
        c: curvature,
    });
    return `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`;
};
exports.calcBezierPath = calcBezierPath;
function getBezierCenter({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, curvature = 0.25, }) {
    const [sourceControlX, sourceControlY] = getControlWithCurvature({
        pos: sourcePosition,
        x1: sourceX,
        y1: sourceY,
        x2: targetX,
        y2: targetY,
        c: curvature,
    });
    const [targetControlX, targetControlY] = getControlWithCurvature({
        pos: targetPosition,
        x1: targetX,
        y1: targetY,
        x2: sourceX,
        y2: sourceY,
        c: curvature,
    });
    // cubic bezier t=0.5 mid point, not the actual mid point, but easy to calculate
    // https://stackoverflow.com/questions/67516101/how-to-find-distance-mid-point-of-bezier-curve
    const centerX = sourceX * 0.125 +
        sourceControlX * 0.375 +
        targetControlX * 0.375 +
        targetX * 0.125;
    const centerY = sourceY * 0.125 +
        sourceControlY * 0.375 +
        targetControlY * 0.375 +
        targetY * 0.125;
    const xOffset = Math.abs(centerX - sourceX);
    const yOffset = Math.abs(centerY - sourceY);
    return [centerX, centerY, xOffset, yOffset];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmV6aWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9jb25uZWN0aW9uLXZpZXcvYmV6aWVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUEwR0EsMENBd0NDO0FBbEpELElBQVksUUFLWDtBQUxELFdBQVksUUFBUTtJQUNsQix5QkFBYSxDQUFBO0lBQ2IsdUJBQVcsQ0FBQTtJQUNYLDJCQUFlLENBQUE7SUFDZiw2QkFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBTFcsUUFBUSx3QkFBUixRQUFRLFFBS25CO0FBcUJELFNBQVMsc0JBQXNCLENBQUMsUUFBZ0IsRUFBRSxTQUFpQjtJQUNqRSxJQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNsQixPQUFPLEdBQUcsR0FBRyxRQUFRLENBQUM7SUFDeEIsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLFNBQVMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7QUFDSCxDQUFDO0FBQ0QsU0FBUyx5QkFBeUIsQ0FBQyxTQUFpQixFQUFFLFNBQWlCO0lBQ3JFLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRWhDLElBQUksRUFBRSxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFFdkIsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN2QixFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ1IsSUFBSSxTQUFTLEdBQUcsRUFBRTtZQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFJLEVBQUUsR0FBRyxHQUFHO1FBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQztJ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