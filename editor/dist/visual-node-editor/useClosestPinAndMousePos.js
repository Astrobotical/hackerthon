"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClosestPinAndMousePos = useClosestPinAndMousePos;
const react_1 = require("react");
const utils_1 = require("./utils");
function useClosestPinAndMousePos(node, currentInsId, ancestorsInsIds, viewPort, boardPos, parentViewport) {
    const [closestPin, setClosestPin] = (0, react_1.useState)();
    const lastMousePos = (0, react_1.useRef)({ x: 400, y: 400 });
    const updateClosestPinAndMousePos = (0, react_1.useCallback)((e) => {
        const eventPos = { x: e.clientX, y: e.clientY };
        const normalizedPos = {
            x: eventPos.x - boardPos.x,
            y: eventPos.y - boardPos.y,
        };
        const posInBoard = (0, utils_1.domToViewPort)(normalizedPos, viewPort, parentViewport);
        const closest = (0, utils_1.findClosestPin)(node, normalizedPos, boardPos, currentInsId, ancestorsInsIds !== null && ancestorsInsIds !== void 0 ? ancestorsInsIds : "", viewPort);
        if (closest) {
            const isNewClosest = !closestPin ||
                closestPin.ins !== closest.ins ||
                (closestPin.ins === closest.ins && closestPin.pin !== closest.id);
            if (isNewClosest) {
                setClosestPin({
                    ins: closest.ins,
                    type: closest.type,
                    pin: closest.id,
                });
            }
        }
        else {
            setClosestPin(undefined);
        }
        lastMousePos.current = posInBoard;
    }, [
        node,
        boardPos,
        currentInsId,
        ancestorsInsIds,
        viewPort,
        parentViewport,
        closestPin,
    ]);
    return {
        closestPin,
        lastMousePos,
        updateClosestPinAndMousePos,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQ2xvc2VzdFBpbkFuZE1vdXNlUG9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci91c2VDbG9zZXN0UGluQW5kTW91c2VQb3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFXQSw0REErREM7QUExRUQsaUNBQXNEO0FBRXRELG1DQUF3RDtBQVN4RCxTQUFnQix3QkFBd0IsQ0FDdEMsSUFBc0IsRUFDdEIsWUFBb0IsRUFDcEIsZUFBbUMsRUFDbkMsUUFBa0IsRUFDbEIsUUFBYSxFQUNiLGNBQXdCO0lBRXhCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxHQUFrQixDQUFDO0lBQy9ELE1BQU0sWUFBWSxHQUFHLElBQUEsY0FBTSxFQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUVyRCxNQUFNLDJCQUEyQixHQUFHLElBQUEsbUJBQVcsRUFDN0MsQ0FBQyxDQUFtQixFQUFFLEVBQUU7UUFDdEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hELE1BQU0sYUFBYSxHQUFHO1lBQ3BCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBQzFCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1NBQzNCLENBQUM7UUFDRixNQUFNLFVBQVUsR0FBRyxJQUFBLHFCQUFhLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUUxRSxNQUFNLE9BQU8sR0FBRyxJQUFBLHNCQUFjLEVBQzVCLElBQUksRUFDSixhQUFhLEVBQ2IsUUFBUSxFQUNSLFlBQVksRUFDWixlQUFlLGFBQWYsZUFBZSxjQUFmLGVBQWUsR0FBSSxFQUFFLEVBQ3JCLFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLE1BQU0sWUFBWSxHQUNoQixDQUFDLFVBQVU7Z0JBQ1gsVUFBVSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsR0FBRztnQkFDOUIsQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEUsSUFBSSxZQUFZLEVBQUUsQ0FBQztnQkFDakIsYUFBYSxDQUFDO29CQUNaLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztvQkFDaEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO29CQUNsQixHQUFHLEVBQUUsT0FBTyxDQUFDLEVBQUU7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBRUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7SUFDcEMsQ0FBQyxFQUNEO1FBQ0UsSUFBSTtRQUNKLFFBQVE7UUFDUixZQUFZO1FBQ1osZUFBZTtRQUNmLFFBQVE7UUFDUixjQUFjO1FBQ2QsVUFBVTtLQUNYLENBQ0YsQ0FBQztJQUVGLE9BQU87UUFDTCxVQUFVO1FBQ1YsWUFBWTtRQUNaLDJCQUEyQjtLQUM1QixDQUFDO0FBQ0osQ0FBQyJ9