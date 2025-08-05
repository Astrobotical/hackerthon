import { getInstanceDomId } from "../dom-ids";
import { unfoundPinPos } from "../connection-view/calc-pin-position";
export const calcNodeContent = (instance, node) => {
    var _a;
    if (instance.displayName) {
        return instance.displayName;
    }
    return (_a = node.displayName) !== null && _a !== void 0 ? _a : node.id;
};
export const calcNodeWidth = (_) => {
    return 200; // TODO: calculate width based on instance content
};
export const calcInstancePosition = (insId, parentInsId, boardPos) => {
    const domId = getInstanceDomId(insId, parentInsId);
    const elem = document.getElementById(domId);
    if (elem) {
        const { x, y, width, height } = elem.getBoundingClientRect();
        const mx = x + width / 2;
        const my = y + height / 2;
        return {
            x: mx - boardPos.x,
            y: my - boardPos.y,
        };
    }
    console.warn(`Cannot find element to draw connection to`, domId);
    return unfoundPinPos;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL2luc3RhbmNlLXZpZXcvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU0EsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUVyRSxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsQ0FDN0IsUUFBMkMsRUFDM0MsSUFBZ0QsRUFDaEQsRUFBRTs7SUFDRixJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QixPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDOUIsQ0FBQztJQUVELE9BQU8sTUFBQSxJQUFJLENBQUMsV0FBVyxtQ0FBSSxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxDQUFDLENBQWUsRUFBRSxFQUFFO0lBQy9DLE9BQU8sR0FBRyxDQUFDLENBQUMsa0RBQWtEO0FBQ2hFLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLENBQ2xDLEtBQWEsRUFDYixXQUFtQixFQUNuQixRQUFhLEVBQ2IsRUFBRTtJQUNGLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNuRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTVDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDVCxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0QsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDekIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDMUIsT0FBTztZQUNMLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztTQUNuQixDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsMkNBQTJDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFakUsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQyxDQUFDIn0=