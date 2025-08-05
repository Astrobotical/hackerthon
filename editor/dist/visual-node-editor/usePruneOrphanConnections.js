"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePruneOrphanConnections = usePruneOrphanConnections;
const react_1 = require("react");
const immer_1 = require("immer");
const core_1 = require("@flyde/core");
const ui_1 = require("../ui");
function usePruneOrphanConnections(instances, connections, node, onChange) {
    const { toast } = (0, ui_1.useToast)();
    (0, react_1.useEffect)(() => {
        const validInputs = new Map();
        const validOutputs = new Map();
        // ugly hack in mid big refactor - TODO: rethink
        const isLoading = node.instances.some((ins) => ins.node.id === "__loading__");
        if (isLoading) {
            return;
        }
        instances.forEach((ins, idx) => {
            var _a;
            const nodeDef = (_a = node.instances[idx]) === null || _a === void 0 ? void 0 : _a.node;
            if (nodeDef) {
                validInputs.set(ins.id, (0, core_1.keys)((0, core_1.getNodeInputs)(nodeDef)));
                validOutputs.set(ins.id, (0, core_1.keys)((0, core_1.getNodeOutputs)(nodeDef)));
            }
        });
        validInputs.set(core_1.THIS_INS_ID, (0, core_1.keys)(node.outputs));
        validOutputs.set(core_1.THIS_INS_ID, (0, core_1.keys)(node.inputs));
        const orphanConnections = connections.filter((conn) => {
            var _a, _b;
            const inputsExist = (_a = validInputs
                .get(conn.to.insId)) === null || _a === void 0 ? void 0 : _a.includes(conn.to.pinId);
            const outputsExist = (_b = validOutputs
                .get(conn.from.insId)) === null || _b === void 0 ? void 0 : _b.includes(conn.from.pinId);
            return !(inputsExist && outputsExist);
        });
        if (orphanConnections.length > 0) {
            console.warn(`${orphanConnections.length} orphan connections removed`, orphanConnections);
            const newNode = (0, immer_1.produce)(node, (draft) => {
                draft.connections = node.connections.filter((conn) => !orphanConnections.includes(conn));
            });
            onChange(newNode, {
                type: "functional",
                message: "prune orphan connections",
            });
        }
    }, [instances, onChange, connections, node, toast]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlUHJ1bmVPcnBoYW5Db25uZWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvdXNlUHJ1bmVPcnBoYW5Db25uZWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWdCQSw4REEwREM7QUExRUQsaUNBQWtDO0FBQ2xDLGlDQUFnQztBQUVoQyxzQ0FTcUI7QUFFckIsOEJBQWlDO0FBRWpDLFNBQWdCLHlCQUF5QixDQUN2QyxTQUF5QixFQUN6QixXQUE2QixFQUM3QixJQUFzQixFQUN0QixRQUE4RTtJQUU5RSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBQSxhQUFRLEdBQUUsQ0FBQztJQUM3QixJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFO1FBQ2IsTUFBTSxXQUFXLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7UUFDaEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7UUFFakQsZ0RBQWdEO1FBQ2hELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUNuQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssYUFBYSxDQUN2QyxDQUFDO1FBRUYsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNkLE9BQU87UUFDVCxDQUFDO1FBRUQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTs7WUFDN0IsTUFBTSxPQUFPLEdBQUcsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywwQ0FBRSxJQUFJLENBQUM7WUFDMUMsSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDWixXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBQSxXQUFJLEVBQUMsSUFBQSxvQkFBYSxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUEsV0FBSSxFQUFDLElBQUEscUJBQWMsRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsV0FBVyxDQUFDLEdBQUcsQ0FBQyxrQkFBVyxFQUFFLElBQUEsV0FBSSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2pELFlBQVksQ0FBQyxHQUFHLENBQUMsa0JBQVcsRUFBRSxJQUFBLFdBQUksRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUVqRCxNQUFNLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7WUFDcEQsTUFBTSxXQUFXLEdBQUcsTUFBQSxXQUFXO2lCQUM1QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsMENBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLE1BQU0sWUFBWSxHQUFHLE1BQUEsWUFBWTtpQkFDOUIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLDBDQUNuQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixPQUFPLENBQUMsQ0FBQyxXQUFXLElBQUksWUFBWSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxPQUFPLENBQUMsSUFBSSxDQUNWLEdBQUcsaUJBQWlCLENBQUMsTUFBTSw2QkFBNkIsRUFDeEQsaUJBQWlCLENBQ2xCLENBQUM7WUFFRixNQUFNLE9BQU8sR0FBRyxJQUFBLGVBQU8sRUFBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDdEMsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FDekMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUM1QyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFDSCxRQUFRLENBQUMsT0FBTyxFQUFFO2dCQUNoQixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsT0FBTyxFQUFFLDBCQUEwQjthQUNwQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQyJ9