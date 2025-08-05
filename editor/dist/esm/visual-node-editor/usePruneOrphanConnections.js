import { useEffect } from "react";
import { produce } from "immer";
import { THIS_INS_ID, getNodeInputs, getNodeOutputs, keys, } from "@flyde/core";
import { useToast } from "../ui";
export function usePruneOrphanConnections(instances, connections, node, onChange) {
    const { toast } = useToast();
    useEffect(() => {
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
                validInputs.set(ins.id, keys(getNodeInputs(nodeDef)));
                validOutputs.set(ins.id, keys(getNodeOutputs(nodeDef)));
            }
        });
        validInputs.set(THIS_INS_ID, keys(node.outputs));
        validOutputs.set(THIS_INS_ID, keys(node.inputs));
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
            const newNode = produce(node, (draft) => {
                draft.connections = node.connections.filter((conn) => !orphanConnections.includes(conn));
            });
            onChange(newNode, {
                type: "functional",
                message: "prune orphan connections",
            });
        }
    }, [instances, onChange, connections, node, toast]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlUHJ1bmVPcnBoYW5Db25uZWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvdXNlUHJ1bmVPcnBoYW5Db25uZWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFaEMsT0FBTyxFQUlMLFdBQVcsRUFDWCxhQUFhLEVBQ2IsY0FBYyxFQUNkLElBQUksR0FFTCxNQUFNLGFBQWEsQ0FBQztBQUVyQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRWpDLE1BQU0sVUFBVSx5QkFBeUIsQ0FDdkMsU0FBeUIsRUFDekIsV0FBNkIsRUFDN0IsSUFBc0IsRUFDdEIsUUFBOEU7SUFFOUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQzdCLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDYixNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztRQUNoRCxNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztRQUVqRCxnREFBZ0Q7UUFDaEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ25DLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxhQUFhLENBQ3ZDLENBQUM7UUFFRixJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ2QsT0FBTztRQUNULENBQUM7UUFFRCxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFOztZQUM3QixNQUFNLE9BQU8sR0FBRyxNQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDBDQUFFLElBQUksQ0FBQztZQUMxQyxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUNaLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNqRCxZQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFakQsTUFBTSxpQkFBaUIsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7O1lBQ3BELE1BQU0sV0FBVyxHQUFHLE1BQUEsV0FBVztpQkFDNUIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLDBDQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixNQUFNLFlBQVksR0FBRyxNQUFBLFlBQVk7aUJBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQywwQ0FDbkIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsT0FBTyxDQUFDLENBQUMsV0FBVyxJQUFJLFlBQVksQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDakMsT0FBTyxDQUFDLElBQUksQ0FDVixHQUFHLGlCQUFpQixDQUFDLE1BQU0sNkJBQTZCLEVBQ3hELGlCQUFpQixDQUNsQixDQUFDO1lBRUYsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN0QyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUN6QyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQzVDLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztZQUNILFFBQVEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLElBQUksRUFBRSxZQUFZO2dCQUNsQixPQUFPLEVBQUUsMEJBQTBCO2FBQ3BDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN0RCxDQUFDIn0=