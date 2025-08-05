"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelectionBox = void 0;
const react_1 = require("react");
const __1 = require("..");
const ALLOWED_SELECTION_BOX_CLASSES = [
    "board-editor-inner",
    "connections-view",
];
const useSelectionBox = (node, viewPort, boardPos, parentViewport) => {
    const [selectionBox, setSelectionBox] = (0, react_1.useState)();
    const startSelectionBox = (0, react_1.useCallback)((event) => {
        var _a;
        const target = event.nativeEvent.target;
        if (!target ||
            !ALLOWED_SELECTION_BOX_CLASSES.includes((_a = target.getAttribute("class")) !== null && _a !== void 0 ? _a : '')) {
            return;
        }
        const eventPos = { x: event.clientX, y: event.clientY };
        const normalizedPos = {
            x: eventPos.x - boardPos.x,
            y: eventPos.y - boardPos.y,
        };
        const posInBoard = (0, __1.domToViewPort)(normalizedPos, viewPort, parentViewport);
        setSelectionBox({ from: posInBoard, to: posInBoard });
    }, [boardPos, viewPort, parentViewport]);
    const updateSelectionBox = (0, react_1.useCallback)((posInBoard) => {
        if (!selectionBox) {
            return;
        }
        setSelectionBox({ ...selectionBox, to: posInBoard });
    }, [selectionBox]);
    const endSelectionBox = (0, react_1.useCallback)((shiftKey, onSelect) => {
        if (selectionBox && (0, __1.calcSelectionBoxArea)(selectionBox) > 50) {
            const toSelect = (0, __1.getInstancesInRect)(selectionBox, viewPort, node.instances, parentViewport, node.inputsPosition, node.outputsPosition);
            onSelect(toSelect);
        }
        setSelectionBox(undefined);
    }, [selectionBox, viewPort, node, parentViewport]);
    return {
        selectionBox,
        startSelectionBox,
        updateSelectionBox,
        endSelectionBox,
    };
};
exports.useSelectionBox = useSelectionBox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlU2VsZWN0aW9uQm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci91c2VTZWxlY3Rpb25Cb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQThDO0FBSTlDLDBCQUF1RjtBQUV2RixNQUFNLDZCQUE2QixHQUFHO0lBQ3BDLG9CQUFvQjtJQUNwQixrQkFBa0I7Q0FDbkIsQ0FBQztBQUVLLE1BQU0sZUFBZSxHQUFHLENBQUMsSUFBZ0IsRUFBRSxRQUFrQixFQUFFLFFBQWEsRUFBRSxjQUF3QixFQUFFLEVBQUU7SUFDL0csTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRyxJQUFBLGdCQUFRLEdBQTBCLENBQUM7SUFFM0UsTUFBTSxpQkFBaUIsR0FBRyxJQUFBLG1CQUFXLEVBQ25DLENBQUMsS0FBNEIsRUFBRSxFQUFFOztRQUMvQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQXFCLENBQUM7UUFFdkQsSUFDRSxDQUFDLE1BQU07WUFDUCxDQUFDLDZCQUE2QixDQUFDLFFBQVEsQ0FBQyxNQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG1DQUFJLEVBQUUsQ0FBQyxFQUMzRSxDQUFDO1lBQ0QsT0FBTztRQUNULENBQUM7UUFDRCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFeEQsTUFBTSxhQUFhLEdBQUc7WUFDcEIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7U0FDM0IsQ0FBQztRQUNGLE1BQU0sVUFBVSxHQUFHLElBQUEsaUJBQWEsRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzFFLGVBQWUsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQyxFQUNELENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FDckMsQ0FBQztJQUVGLE1BQU0sa0JBQWtCLEdBQUcsSUFBQSxtQkFBVyxFQUNwQyxDQUFDLFVBQWUsRUFBRSxFQUFFO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNsQixPQUFPO1FBQ1QsQ0FBQztRQUNELGVBQWUsQ0FBQyxFQUFFLEdBQUcsWUFBWSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsRUFDRCxDQUFDLFlBQVksQ0FBQyxDQUNmLENBQUM7SUFFRixNQUFNLGVBQWUsR0FBRyxJQUFBLG1CQUFXLEVBQ2pDLENBQUMsUUFBaUIsRUFBRSxRQUFpQyxFQUFFLEVBQUU7UUFDdkQsSUFBSSxZQUFZLElBQUksSUFBQSx3QkFBb0IsRUFBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUM1RCxNQUFNLFFBQVEsR0FBRyxJQUFBLHNCQUFrQixFQUNqQyxZQUFZLEVBQ1osUUFBUSxFQUNSLElBQUksQ0FBQyxTQUFTLEVBQ2QsY0FBYyxFQUNkLElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksQ0FBQyxlQUFlLENBQ3JCLENBQUM7WUFDRixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckIsQ0FBQztRQUNELGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QixDQUFDLEVBQ0QsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsQ0FDL0MsQ0FBQztJQUVGLE9BQU87UUFDTCxZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLGtCQUFrQjtRQUNsQixlQUFlO0tBQ2hCLENBQUM7QUFDSixDQUFDLENBQUM7QUEzRFcsUUFBQSxlQUFlLG1CQTJEMUIifQ==