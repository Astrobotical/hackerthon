import { useState, useCallback } from "react";
import { domToViewPort, calcSelectionBoxArea, getInstancesInRect } from "..";
const ALLOWED_SELECTION_BOX_CLASSES = [
    "board-editor-inner",
    "connections-view",
];
export const useSelectionBox = (node, viewPort, boardPos, parentViewport) => {
    const [selectionBox, setSelectionBox] = useState();
    const startSelectionBox = useCallback((event) => {
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
        const posInBoard = domToViewPort(normalizedPos, viewPort, parentViewport);
        setSelectionBox({ from: posInBoard, to: posInBoard });
    }, [boardPos, viewPort, parentViewport]);
    const updateSelectionBox = useCallback((posInBoard) => {
        if (!selectionBox) {
            return;
        }
        setSelectionBox({ ...selectionBox, to: posInBoard });
    }, [selectionBox]);
    const endSelectionBox = useCallback((shiftKey, onSelect) => {
        if (selectionBox && calcSelectionBoxArea(selectionBox) > 50) {
            const toSelect = getInstancesInRect(selectionBox, viewPort, node.instances, parentViewport, node.inputsPosition, node.outputsPosition);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlU2VsZWN0aW9uQm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci91c2VTZWxlY3Rpb25Cb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFJOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSxrQkFBa0IsRUFBWSxNQUFNLElBQUksQ0FBQztBQUV2RixNQUFNLDZCQUE2QixHQUFHO0lBQ3BDLG9CQUFvQjtJQUNwQixrQkFBa0I7Q0FDbkIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxDQUFDLElBQWdCLEVBQUUsUUFBa0IsRUFBRSxRQUFhLEVBQUUsY0FBd0IsRUFBRSxFQUFFO0lBQy9HLE1BQU0sQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLEdBQUcsUUFBUSxFQUEwQixDQUFDO0lBRTNFLE1BQU0saUJBQWlCLEdBQUcsV0FBVyxDQUNuQyxDQUFDLEtBQTRCLEVBQUUsRUFBRTs7UUFDL0IsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFxQixDQUFDO1FBRXZELElBQ0UsQ0FBQyxNQUFNO1lBQ1AsQ0FBQyw2QkFBNkIsQ0FBQyxRQUFRLENBQUMsTUFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxtQ0FBSSxFQUFFLENBQUMsRUFDM0UsQ0FBQztZQUNELE9BQU87UUFDVCxDQUFDO1FBQ0QsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRXhELE1BQU0sYUFBYSxHQUFHO1lBQ3BCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBQzFCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1NBQzNCLENBQUM7UUFDRixNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMxRSxlQUFlLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUMsRUFDRCxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQ3JDLENBQUM7SUFFRixNQUFNLGtCQUFrQixHQUFHLFdBQVcsQ0FDcEMsQ0FBQyxVQUFlLEVBQUUsRUFBRTtRQUNsQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDbEIsT0FBTztRQUNULENBQUM7UUFDRCxlQUFlLENBQUMsRUFBRSxHQUFHLFlBQVksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDLEVBQ0QsQ0FBQyxZQUFZLENBQUMsQ0FDZixDQUFDO0lBRUYsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUNqQyxDQUFDLFFBQWlCLEVBQUUsUUFBaUMsRUFBRSxFQUFFO1FBQ3ZELElBQUksWUFBWSxJQUFJLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQzVELE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUNqQyxZQUFZLEVBQ1osUUFBUSxFQUNSLElBQUksQ0FBQyxTQUFTLEVBQ2QsY0FBYyxFQUNkLElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksQ0FBQyxlQUFlLENBQ3JCLENBQUM7WUFDRixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckIsQ0FBQztRQUNELGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QixDQUFDLEVBQ0QsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsQ0FDL0MsQ0FBQztJQUVGLE9BQU87UUFDTCxZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLGtCQUFrQjtRQUNsQixlQUFlO0tBQ2hCLENBQUM7QUFDSixDQUFDLENBQUMifQ==