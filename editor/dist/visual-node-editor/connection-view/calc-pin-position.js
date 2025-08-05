"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcTargetPos = exports.calcStartPos = exports.unfoundPinPos = void 0;
exports.calcPinPosition = calcPinPosition;
const core_1 = require("@flyde/core");
const __1 = require("../..");
const dom_ids_1 = require("../dom-ids");
const elemPos = (elem, boardPos) => {
    const { x, y, width, height } = elem.getBoundingClientRect();
    const mx = x + width / 2;
    const my = y + height / 2;
    return {
        x: mx - boardPos.x,
        y: my - boardPos.y,
    };
};
exports.unfoundPinPos = { x: 99999, y: 99999 };
function calcPinPosition(params) {
    const fullParams = {
        fullInsIdPath: (0, core_1.fullInsIdPath)(params.insId, params.ancestorsInsIds),
        pinId: params.pinId,
        pinType: params.pinType,
        isMain: params.isMain,
    };
    const domId = (0, dom_ids_1.getPinDomHandleId)(fullParams);
    const elem = document.getElementById(domId);
    if (!elem) {
        (0, __1.logger)("calcPinPosition: cannot find element", { domId });
        return exports.unfoundPinPos;
    }
    return elemPos(elem, params.boardPos);
}
const calcStartPos = (props) => {
    const { connectionNode, boardPos, ancestorsInsIds, viewPort, currentInsId } = props;
    if ((0, core_1.isExternalConnectionNode)(connectionNode)) {
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
            ancestorsInsIds: (0, core_1.fullInsIdPath)(currentInsId, ancestorsInsIds),
            isMain: false,
            pinType: "output",
            boardPos,
            viewPort,
        });
    }
};
exports.calcStartPos = calcStartPos;
const calcTargetPos = (props) => {
    const { connectionNode, boardPos, ancestorsInsIds, viewPort, currentInsId } = props;
    if ((0, core_1.isExternalConnectionNode)(connectionNode)) {
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
            ancestorsInsIds: (0, core_1.fullInsIdPath)(currentInsId, ancestorsInsIds),
            isMain: false,
            pinType: "input",
            boardPos,
            viewPort,
        });
    }
};
exports.calcTargetPos = calcTargetPos;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsYy1waW4tcG9zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL2Nvbm5lY3Rpb24tdmlldy9jYWxjLXBpbi1wb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUF3QkEsMENBc0JDO0FBOUNELHNDQU1xQjtBQUNyQiw2QkFBeUM7QUFDekMsd0NBQStDO0FBRS9DLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBYSxFQUFFLFFBQWEsRUFBTyxFQUFFO0lBQ3BELE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUU3RCxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUN6QixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUUxQixPQUFPO1FBQ0wsQ0FBQyxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUNsQixDQUFDLEVBQUUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDO0tBQ25CLENBQUM7QUFDSixDQUFDLENBQUM7QUFFVyxRQUFBLGFBQWEsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBRXBELFNBQWdCLGVBQWUsQ0FBQyxNQVEvQjtJQUNDLE1BQU0sVUFBVSxHQUFHO1FBQ2pCLGFBQWEsRUFBRSxJQUFBLG9CQUFhLEVBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDO1FBQ2xFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztRQUNuQixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87UUFDdkIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO0tBQ3RCLENBQUM7SUFDRixNQUFNLEtBQUssR0FBRyxJQUFBLDJCQUFpQixFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1YsSUFBQSxVQUFNLEVBQUMsc0NBQXNDLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzFELE9BQU8scUJBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0QsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRU0sTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQU01QixFQUFPLEVBQUU7SUFDUixNQUFNLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxHQUN6RSxLQUFLLENBQUM7SUFFUixJQUFJLElBQUEsK0JBQXdCLEVBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztRQUM3QyxPQUFPLGVBQWUsQ0FBQztZQUNyQixLQUFLLEVBQUUsY0FBYyxDQUFDLEtBQUs7WUFDM0IsS0FBSyxFQUFFLFlBQVk7WUFDbkIsZUFBZSxFQUFFLGVBQWU7WUFDaEMsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsT0FBTztZQUNoQixRQUFRO1lBQ1IsUUFBUTtTQUNULENBQUMsQ0FBQztJQUNMLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyxlQUFlLENBQUM7WUFDckIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxLQUFLO1lBQzNCLEtBQUssRUFBRSxjQUFjLENBQUMsS0FBSztZQUMzQixlQUFlLEVBQUUsSUFBQSxvQkFBYSxFQUFDLFlBQVksRUFBRSxlQUFlLENBQUM7WUFDN0QsTUFBTSxFQUFFLEtBQUs7WUFDYixPQUFPLEVBQUUsUUFBUTtZQUNqQixRQUFRO1lBQ1IsUUFBUTtTQUNULENBQUMsQ0FBQztJQUNMLENBQUM7QUFDSCxDQUFDLENBQUM7QUEvQlcsUUFBQSxZQUFZLGdCQStCdkI7QUFFSyxNQUFNLGFBQWEsR0FBRyxDQUFDLEtBTTdCLEVBQU8sRUFBRTtJQUNSLE1BQU0sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEdBQ3pFLEtBQUssQ0FBQztJQUVSLElBQUksSUFBQSwrQkFBd0IsRUFBQyxjQUFjLENBQUMsRUFBRSxDQUFDO1FBQzdDLE9BQU8sZUFBZSxDQUFDO1lBQ3JCLEtBQUssRUFBRSxjQUFjLENBQUMsS0FBSztZQUMzQixLQUFLLEVBQUUsWUFBWTtZQUNuQixlQUFlLEVBQUUsZUFBZTtZQUNoQyxNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLFFBQVE7WUFDUixRQUFRO1NBQ1QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLGVBQWUsQ0FBQztZQUNyQixLQUFLLEVBQUUsY0FBYyxDQUFDLEtBQUs7WUFDM0IsS0FBSyxFQUFFLGNBQWMsQ0FBQyxLQUFLO1lBQzNCLGVBQWUsRUFBRSxJQUFBLG9CQUFhLEVBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQztZQUM3RCxNQUFNLEVBQUUsS0FBSztZQUNiLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFFBQVE7WUFDUixRQUFRO1NBQ1QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztBQUNILENBQUMsQ0FBQztBQS9CVyxRQUFBLGFBQWEsaUJBK0J4QiJ9