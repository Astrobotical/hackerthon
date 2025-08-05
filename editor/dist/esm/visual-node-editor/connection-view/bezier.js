export var Position;
(function (Position) {
    Position["Left"] = "left";
    Position["Top"] = "top";
    Position["Right"] = "right";
    Position["Bottom"] = "bottom";
})(Position || (Position = {}));
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
export const calcBezierPath = ({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, curvature = 0.25, }) => {
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
export function getBezierCenter({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, curvature = 0.25, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmV6aWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9jb25uZWN0aW9uLXZpZXcvYmV6aWVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQU4sSUFBWSxRQUtYO0FBTEQsV0FBWSxRQUFRO0lBQ2xCLHlCQUFhLENBQUE7SUFDYix1QkFBVyxDQUFBO0lBQ1gsMkJBQWUsQ0FBQTtJQUNmLDZCQUFpQixDQUFBO0FBQ25CLENBQUMsRUFMVyxRQUFRLEtBQVIsUUFBUSxRQUtuQjtBQXFCRCxTQUFTLHNCQUFzQixDQUFDLFFBQWdCLEVBQUUsU0FBaUI7SUFDakUsSUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbEIsT0FBTyxHQUFHLEdBQUcsUUFBUSxDQUFDO0lBQ3hCLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyxTQUFTLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0FBQ0gsQ0FBQztBQUNELFNBQVMseUJBQXlCLENBQUMsU0FBaUIsRUFBRSxTQUFpQjtJQUNyRSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVoQyxJQUFJLEVBQUUsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBRXZCLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDdkIsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNSLElBQUksU0FBUyxHQUFHLEVBQUU7WUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBSSxFQUFFLEdBQUcsR0FBRztRQUFFLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDdkIs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