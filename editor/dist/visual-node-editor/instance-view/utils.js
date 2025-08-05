"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcInstancePosition = exports.calcNodeWidth = exports.calcNodeContent = void 0;
const dom_ids_1 = require("../dom-ids");
const calc_pin_position_1 = require("../connection-view/calc-pin-position");
const calcNodeContent = (instance, node) => {
    var _a;
    if (instance.displayName) {
        return instance.displayName;
    }
    return (_a = node.displayName) !== null && _a !== void 0 ? _a : node.id;
};
exports.calcNodeContent = calcNodeContent;
const calcNodeWidth = (_) => {
    return 200; // TODO: calculate width based on instance content
};
exports.calcNodeWidth = calcNodeWidth;
const calcInstancePosition = (insId, parentInsId, boardPos) => {
    const domId = (0, dom_ids_1.getInstanceDomId)(insId, parentInsId);
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
    return calc_pin_position_1.unfoundPinPos;
};
exports.calcInstancePosition = calcInstancePosition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL2luc3RhbmNlLXZpZXcvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBU0Esd0NBQThDO0FBQzlDLDRFQUFxRTtBQUU5RCxNQUFNLGVBQWUsR0FBRyxDQUM3QixRQUEyQyxFQUMzQyxJQUFnRCxFQUNoRCxFQUFFOztJQUNGLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQztJQUM5QixDQUFDO0lBRUQsT0FBTyxNQUFBLElBQUksQ0FBQyxXQUFXLG1DQUFJLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDckMsQ0FBQyxDQUFDO0FBVFcsUUFBQSxlQUFlLG1CQVMxQjtBQUVLLE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBZSxFQUFFLEVBQUU7SUFDL0MsT0FBTyxHQUFHLENBQUMsQ0FBQyxrREFBa0Q7QUFDaEUsQ0FBQyxDQUFDO0FBRlcsUUFBQSxhQUFhLGlCQUV4QjtBQUVLLE1BQU0sb0JBQW9CLEdBQUcsQ0FDbEMsS0FBYSxFQUNiLFdBQW1CLEVBQ25CLFFBQWEsRUFDYixFQUFFO0lBQ0YsTUFBTSxLQUFLLEdBQUcsSUFBQSwwQkFBZ0IsRUFBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDbkQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUU1QyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ1QsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdELE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLE9BQU87WUFDTCxDQUFDLEVBQUUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUM7U0FDbkIsQ0FBQztJQUNKLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRWpFLE9BQU8saUNBQWEsQ0FBQztBQUN2QixDQUFDLENBQUM7QUFyQlcsUUFBQSxvQkFBb0Isd0JBcUIvQiJ9