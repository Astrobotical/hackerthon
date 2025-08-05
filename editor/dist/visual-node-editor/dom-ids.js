"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPinDomHandleId = exports.getPinDomId = exports.getMainPinDomId = exports.getMainInstanceIndicatorDomId = exports.getInstanceDomId = void 0;
const core_1 = require("@flyde/core");
const getInstanceDomId = (insId, ancestorsInsIds) => {
    return `ins:${(0, core_1.fullInsIdPath)(insId, ancestorsInsIds)}`.replace(/\s+/g, "-");
};
exports.getInstanceDomId = getInstanceDomId;
const getMainInstanceIndicatorDomId = (insId, ancestorsInsIds) => {
    return `main-ins:${(0, core_1.fullInsIdPath)(insId, ancestorsInsIds)}`.replace(/\s+/g, "-");
};
exports.getMainInstanceIndicatorDomId = getMainInstanceIndicatorDomId;
const getMainPinDomId = (insId, pinId, type) => {
    return `main-pin:${insId}:${pinId}:${type}`.replace(/\s+/g, "-");
};
exports.getMainPinDomId = getMainPinDomId;
const getPinDomId = ({ pinType, fullInsIdPath, pinId, isMain, }) => {
    return `${isMain ? "main-" : ""}pin:${pinType}:${fullInsIdPath}:${pinId}`.replace(/\s+/g, "-");
};
exports.getPinDomId = getPinDomId;
const getPinDomHandleId = ({ pinType, fullInsIdPath, pinId, isMain, }) => {
    return `pin-handle:${pinType}:${fullInsIdPath}:${isMain ? "main-" : ""}${pinId}`.replace(/\s+/g, "-");
};
exports.getPinDomHandleId = getPinDomHandleId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLWlkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvZG9tLWlkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBcUQ7QUFFOUMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEtBQWEsRUFBRSxlQUF3QixFQUFFLEVBQUU7SUFDMUUsT0FBTyxPQUFPLElBQUEsb0JBQWEsRUFBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzdFLENBQUMsQ0FBQztBQUZXLFFBQUEsZ0JBQWdCLG9CQUUzQjtBQUVLLE1BQU0sNkJBQTZCLEdBQUcsQ0FDM0MsS0FBYSxFQUNiLGVBQXdCLEVBQ3hCLEVBQUU7SUFDRixPQUFPLFlBQVksSUFBQSxvQkFBYSxFQUFDLEtBQUssRUFBRSxlQUFlLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FDaEUsTUFBTSxFQUNOLEdBQUcsQ0FDSixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBUlcsUUFBQSw2QkFBNkIsaUNBUXhDO0FBRUssTUFBTSxlQUFlLEdBQUcsQ0FDN0IsS0FBYSxFQUNiLEtBQWEsRUFDYixJQUFhLEVBQ2IsRUFBRTtJQUNGLE9BQU8sWUFBWSxLQUFLLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbkUsQ0FBQyxDQUFDO0FBTlcsUUFBQSxlQUFlLG1CQU0xQjtBQVNLLE1BQU0sV0FBVyxHQUFHLENBQUMsRUFDMUIsT0FBTyxFQUNQLGFBQWEsRUFDYixLQUFLLEVBQ0wsTUFBTSxHQUNZLEVBQUUsRUFBRTtJQUN0QixPQUFPLEdBQ0wsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQ3JCLE9BQU8sT0FBTyxJQUFJLGFBQWEsSUFBSSxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2xFLENBQUMsQ0FBQztBQVRXLFFBQUEsV0FBVyxlQVN0QjtBQUVLLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxFQUNoQyxPQUFPLEVBQ1AsYUFBYSxFQUNiLEtBQUssRUFDTCxNQUFNLEdBQ1ksRUFBRSxFQUFFO0lBQ3RCLE9BQU8sY0FBYyxPQUFPLElBQUksYUFBYSxJQUMzQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFDckIsR0FBRyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQztBQVRXLFFBQUEsaUJBQWlCLHFCQVM1QiJ9