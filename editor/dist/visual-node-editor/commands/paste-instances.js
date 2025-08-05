"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pasteInstancesCommand = void 0;
const core_1 = require("@flyde/core");
const immer_1 = __importDefault(require("immer"));
const pasteInstancesCommand = (_node, mousePos, clipboardData) => {
    const newInstances = clipboardData.instances.map((ins) => {
        const id = (0, core_1.createInsId)(_node);
        return {
            ...ins,
            pos: mousePos,
            id,
        };
    });
    const idMap = new Map(newInstances.map((ins, idx) => {
        var _a;
        return [(_a = clipboardData.instances[idx]) === null || _a === void 0 ? void 0 : _a.id, ins.id];
    }));
    const newNode = (0, immer_1.default)(_node, (draft) => {
        draft.instances.push(...newInstances);
        const newConnections = clipboardData.connections.map(({ from, to }) => {
            return {
                from: { ...from, insId: idMap.get(from.insId) || from.insId },
                to: { ...to, insId: idMap.get(to.insId) || to.insId },
            };
        });
        draft.connections.push(...newConnections);
    });
    return { newNode, newInstances };
};
exports.pasteInstancesCommand = pasteInstancesCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzdGUtaW5zdGFuY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9jb21tYW5kcy9wYXN0ZS1pbnN0YW5jZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0NBQTJEO0FBQzNELGtEQUE0QjtBQUdyQixNQUFNLHFCQUFxQixHQUFHLENBQ25DLEtBQWlCLEVBQ2pCLFFBQWEsRUFDYixhQUE0QixFQUM1QixFQUFFO0lBQ0YsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUN2RCxNQUFNLEVBQUUsR0FBRyxJQUFBLGtCQUFXLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsT0FBTztZQUNMLEdBQUcsR0FBRztZQUNOLEdBQUcsRUFBRSxRQUFRO1lBQ2IsRUFBRTtTQUNILENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUNuQixZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFOztRQUM1QixPQUFPLENBQUMsTUFBQSxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywwQ0FBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUMsQ0FBQyxDQUNILENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxJQUFBLGVBQU8sRUFBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN2QyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDO1FBRXRDLE1BQU0sY0FBYyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNwRSxPQUFPO2dCQUNMLElBQUksRUFBRSxFQUFFLEdBQUcsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUM3RCxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRTthQUN0RCxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsQ0FBQztBQUNuQyxDQUFDLENBQUM7QUFqQ1csUUFBQSxxQkFBcUIseUJBaUNoQyJ9