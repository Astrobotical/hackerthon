import { useState, useCallback, useRef } from "react";
import { findClosestPin, domToViewPort } from "./utils";
export function useClosestPinAndMousePos(node, currentInsId, ancestorsInsIds, viewPort, boardPos, parentViewport) {
    const [closestPin, setClosestPin] = useState();
    const lastMousePos = useRef({ x: 400, y: 400 });
    const updateClosestPinAndMousePos = useCallback((e) => {
        const eventPos = { x: e.clientX, y: e.clientY };
        const normalizedPos = {
            x: eventPos.x - boardPos.x,
            y: eventPos.y - boardPos.y,
        };
        const posInBoard = domToViewPort(normalizedPos, viewPort, parentViewport);
        const closest = findClosestPin(node, normalizedPos, boardPos, currentInsId, ancestorsInsIds !== null && ancestorsInsIds !== void 0 ? ancestorsInsIds : "", viewPort);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQ2xvc2VzdFBpbkFuZE1vdXNlUG9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci91c2VDbG9zZXN0UGluQW5kTW91c2VQb3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRXRELE9BQU8sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBU3hELE1BQU0sVUFBVSx3QkFBd0IsQ0FDdEMsSUFBc0IsRUFDdEIsWUFBb0IsRUFDcEIsZUFBbUMsRUFDbkMsUUFBa0IsRUFDbEIsUUFBYSxFQUNiLGNBQXdCO0lBRXhCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEdBQUcsUUFBUSxFQUFrQixDQUFDO0lBQy9ELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBTSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFckQsTUFBTSwyQkFBMkIsR0FBRyxXQUFXLENBQzdDLENBQUMsQ0FBbUIsRUFBRSxFQUFFO1FBQ3RCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoRCxNQUFNLGFBQWEsR0FBRztZQUNwQixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUMxQixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztTQUMzQixDQUFDO1FBQ0YsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFMUUsTUFBTSxPQUFPLEdBQUcsY0FBYyxDQUM1QixJQUFJLEVBQ0osYUFBYSxFQUNiLFFBQVEsRUFDUixZQUFZLEVBQ1osZUFBZSxhQUFmLGVBQWUsY0FBZixlQUFlLEdBQUksRUFBRSxFQUNyQixRQUFRLENBQ1QsQ0FBQztRQUVGLElBQUksT0FBTyxFQUFFLENBQUM7WUFDWixNQUFNLFlBQVksR0FDaEIsQ0FBQyxVQUFVO2dCQUNYLFVBQVUsQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUc7Z0JBQzlCLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLElBQUksWUFBWSxFQUFFLENBQUM7Z0JBQ2pCLGFBQWEsQ0FBQztvQkFDWixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7b0JBQ2hCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxFQUFFO2lCQUNoQixDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQzthQUFNLENBQUM7WUFDTixhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUVELFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0lBQ3BDLENBQUMsRUFDRDtRQUNFLElBQUk7UUFDSixRQUFRO1FBQ1IsWUFBWTtRQUNaLGVBQWU7UUFDZixRQUFRO1FBQ1IsY0FBYztRQUNkLFVBQVU7S0FDWCxDQUNGLENBQUM7SUFFRixPQUFPO1FBQ0wsVUFBVTtRQUNWLFlBQVk7UUFDWiwyQkFBMkI7S0FDNUIsQ0FBQztBQUNKLENBQUMifQ==