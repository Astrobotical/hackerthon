import { middlePos, createInsId, inlineVisualNodeInstance, } from "@flyde/core";
import produce from "immer";
import { createGroup } from "./lib/create-group";
export const groupSelected = async (selected, node, nodeName, prompt) => {
    var _a, _b;
    const { instances, connections } = node;
    const relevantInstances = instances.filter((ins) => selected.includes(ins.id));
    const relevantConnections = connections.filter(({ from, to }) => {
        return (selected.indexOf(from.insId) !== -1 || selected.indexOf(to.insId) !== -1);
    });
    if (!relevantInstances.length) {
        throw new Error("visual without selections");
    }
    const { visualNode, renamedInputs, renamedOutputs } = await createGroup(relevantInstances, relevantConnections, nodeName, prompt);
    const midPos = relevantInstances.reduce((p, c) => {
        return middlePos(c.pos, p);
    }, (_b = (_a = instances[0]) === null || _a === void 0 ? void 0 : _a.pos) !== null && _b !== void 0 ? _b : { x: 0, y: 0 });
    const newInstance = inlineVisualNodeInstance(createInsId(visualNode), visualNode, {}, midPos);
    // replace relevant nodes with new node
    const newInstancesArr = instances.filter((ins) => {
        return selected.indexOf(ins.id) === -1;
    });
    const newConnections = connections
        .map((conn) => {
        // refactor old connections to new ones
        const fromKey = `${conn.from.insId}.${conn.from.pinId}`;
        const toKey = `${conn.to.insId}.${conn.to.pinId}`;
        if (renamedInputs[toKey]) {
            return {
                ...conn,
                to: {
                    insId: newInstance.id,
                    pinId: renamedInputs[toKey],
                },
            };
        }
        else if (renamedOutputs[fromKey]) {
            return {
                ...conn,
                from: {
                    insId: newInstance.id,
                    pinId: renamedOutputs[fromKey],
                },
            };
        }
        else {
            return conn;
        }
    })
        .filter((conn) => {
        // remove any connection related to the old one
        return (selected.indexOf(conn.from.insId) === -1 &&
            selected.indexOf(conn.to.insId) === -1);
    });
    return {
        newNode: visualNode,
        currentNode: produce(node, (draft) => {
            draft.instances = [...newInstancesArr, { ...newInstance, node: visualNode }];
            draft.connections = newConnections;
        }),
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtc2VsZWN0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ3JvdXAtc2VsZWN0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxXQUFXLEVBQ1gsd0JBQXdCLEdBRXpCLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHakQsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsUUFBa0IsRUFDbEIsSUFBc0IsRUFDdEIsUUFBZ0IsRUFDaEIsTUFBZ0IsRUFDdUQsRUFBRTs7SUFDekUsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDeEMsTUFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDakQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQzFCLENBQUM7SUFFRixNQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQzlELE9BQU8sQ0FDTCxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDekUsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsTUFBTSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUs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