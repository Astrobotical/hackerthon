"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateSelectedEditorCommand = void 0;
const core_1 = require("@flyde/core");
const immer_1 = __importDefault(require("immer"));
const handleDuplicateSelectedEditorCommand = (node, selected) => {
    const newInstancesIds = [];
    const newNode = (0, immer_1.default)(node, (draft) => {
        const instances = draft.instances;
        selected.forEach((id) => {
            const ins = instances.find((ins) => ins.id === id);
            if (!ins) {
                throw new Error(`impossible state duplicate selected no matching instance`);
            }
            if (ins) {
                const { pos } = ins;
                const newPos = { x: pos.x + 20, y: pos.y + 20 };
                const id = (0, core_1.createInsId)(node);
                const newIns = {
                    ...ins,
                    pos: newPos,
                    id,
                };
                instances.push(newIns);
                newInstancesIds.push(newIns.id);
            }
        });
    });
    return { newNode, newInstancesIds };
};
exports.handleDuplicateSelectedEditorCommand = handleDuplicateSelectedEditorCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVwbGljYXRlLWluc3RhbmNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvY29tbWFuZHMvZHVwbGljYXRlLWluc3RhbmNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzQ0FBNEQ7QUFDNUQsa0RBQTRCO0FBRXJCLE1BQU0sb0NBQW9DLEdBQUcsQ0FDbEQsSUFBc0IsRUFDdEIsUUFBa0IsRUFDbEIsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFhLEVBQUUsQ0FBQztJQUNyQyxNQUFNLE9BQU8sR0FBRyxJQUFBLGVBQU8sRUFBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN0QyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ2xDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUN0QixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDVCxNQUFNLElBQUksS0FBSyxDQUNiLDBEQUEwRCxDQUMzRCxDQUFDO1lBQ0osQ0FBQztZQUVELElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFDcEIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7Z0JBQ2hELE1BQU0sRUFBRSxHQUFHLElBQUEsa0JBQVcsRUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFN0IsTUFBTSxNQUFNLEdBQUc7b0JBQ2IsR0FBRyxHQUFHO29CQUNOLEdBQUcsRUFBRSxNQUFNO29CQUNYLEVBQUU7aUJBQ0gsQ0FBQztnQkFDRixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN2QixlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0FBL0JXLFFBQUEsb0NBQW9DLHdDQStCL0MifQ==