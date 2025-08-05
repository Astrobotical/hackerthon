import { fullInsIdPath, isExternalConnectionNode, } from "@flyde/core";
import { logger } from "../..";
import { getPinDomHandleId } from "../dom-ids";
const elemPos = (elem, boardPos) => {
    const { x, y, width, height } = elem.getBoundingClientRect();
    const mx = x + width / 2;
    const my = y + height / 2;
    return {
        x: mx - boardPos.x,
        y: my - boardPos.y,
    };
};
export const unfoundPinPos = { x: 99999, y: 99999 };
export function calcPinPosition(params) {
    const fullParams = {
        fullInsIdPath: fullInsIdPath(params.insId, params.ancestorsInsIds),
        pinId: params.pinId,
        pinType: params.pinType,
        isMain: params.isMain,
    };
    const domId = getPinDomHandleId(fullParams);
    const elem = document.getElementById(domId);
    if (!elem) {
        logger("calcPinPosition: cannot find element", { domId });
        return unfoundPinPos;
    }
    return elemPos(elem, params.boardPos);
}
export const calcStartPos = (props) => {
    const { connectionNode, boardPos, ancestorsInsIds, viewPort, currentInsId } = props;
    if (isExternalConnectionNode(connectionNode)) {
        return calcPinPosition({
            pinId: connectionNode.pinId,
            insId: currentInsId,
            ancestorsInsIds: ancestorsInsIds,
            isMain: true,
            pinType: "input",
            boardPos,
            viewPort,
        });
    }
    else {
        return calcPinPosition({
            pinId: connectionNode.pinId,
            insId: connectionNode.insId,
            ancestorsInsIds: fullInsIdPath(currentInsId, ancestorsInsIds),
            isMain: false,
            pinType: "output",
            boardPos,
            viewPort,
        });
    }
};
export const calcTargetPos = (props) => {
    const { connectionNode, boardPos, ancestorsInsIds, viewPort, currentInsId } = props;
    if (isExternalConnectionNode(connectionNode)) {
        return calcPinPosition({
            pinId: connectionNode.pinId,
            insId: currentInsId,
            ancestorsInsIds: ancestorsInsIds,
            isMain: true,
            pinType: "output",
            boardPos,
            viewPort,
        });
    }
    else {
        return calcPinPosition({
            pinId: connectionNode.pinId,
            insId: connectionNode.insId,
            ancestorsInsIds: fullInsIdPath(currentInsId, ancestorsInsIds),
            isMain: false,
            pinType: "input",
            boardPos,
            viewPort,
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsYy1waW4tcG9zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL2Nvbm5lY3Rpb24tdmlldy9jYWxjLXBpbi1wb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsYUFBYSxFQUNiLHdCQUF3QixHQUd6QixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsTUFBTSxFQUFZLE1BQU0sT0FBTyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUvQyxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQWEsRUFBRSxRQUFhLEVBQU8sRUFBRTtJQUNwRCxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFFN0QsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDekIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFFMUIsT0FBTztRQUNMLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztLQUNuQixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFFcEQsTUFBTSxVQUFVLGVBQWUsQ0FBQyxNQVEvQjtJQUNDLE1BQU0sVUFBVSxHQUFHO1FBQ2pCLGFBQWEsRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDO1FBQ2xFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztRQUNuQixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87UUFDdkIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO0tBQ3RCLENBQUM7SUFDRixNQUFNLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNWLE1BQU0sQ0FBQyxzQ0FBc0MsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDMUQsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQUNELE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxDQUFDLEtBTTVCLEVBQU8sRUFBRTtJQUNSLE1BQU0sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEdBQ3pFLEtBQUssQ0FBQztJQUVSLElBQUksd0JBQXdCLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztRQUM3QyxPQUFPLGVBQWUsQ0FBQztZQUNyQixLQUFLLEVBQUUsY0FBYyxDQUFDLEtBQUs7WUFDM0IsS0FBSyxFQUFFLFlBQVk7WUFDbkIsZUFBZSxFQUFFLGVBQWU7WUFDaEMsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsT0FBTztZQUNoQixRQUFRO1lBQ1IsUUFBUTtTQUNULENBQUMsQ0FBQztJQUNMLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyxlQUFlLENBQUM7WUFDckIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxLQUFLO1lBQzNCLEtBQUssRUFBRSxjQUFjLENBQUMsS0FBSztZQUMzQixlQUFlLEVBQUUsYUFBYSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUM7WUFDN0QsTUFBTSxFQUFFLEtBQUs7WUFDYixPQUFPLEVBQUUsUUFBUTtZQUNqQixRQUFRO1lBQ1IsUUFBUTtTQUNULENBQUMsQ0FBQztJQUNMLENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxLQU03QixFQUFPLEVBQUU7SUFDUixNQUFNLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxHQUN6RSxLQUFLLENBQUM7SUFFUixJQUFJLHdCQUF3QixDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7UUFDN0MsT0FBTyxlQUFlLENBQUM7WUFDckIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxLQUFLO1lBQzNCLEtBQUssRUFBRSxZQUFZO1lBQ25CLGVBQWUsRUFBRSxlQUFlO1lBQ2hDLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFLFFBQVE7WUFDakIsUUFBUTtZQUNSLFFBQVE7U0FDVCxDQUFDLENBQUM7SUFDTCxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sZUFBZSxDQUFDO1lBQ3JCLEtBQUssRUFBRSxjQUFjLENBQUMsS0FBSztZQUMzQixLQUFLLEVBQUUsY0FBYyxDQUFDLEtBQUs7WUFDM0IsZUFBZSxFQUFFLGFBQWEsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDO1lBQzdELE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUTtZQUNSLFFBQVE7U0FDVCxDQUFDLENBQUM7SUFDTCxDQUFDO0FBQ0gsQ0FBQyxDQUFDIn0=