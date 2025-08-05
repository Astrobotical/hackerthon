import { createInsId } from "@flyde/core";
import produce from "immer";
export const handleDuplicateSelectedEditorCommand = (node, selected) => {
    const newInstancesIds = [];
    const newNode = produce(node, (draft) => {
        const instances = draft.instances;
        selected.forEach((id) => {
            const ins = instances.find((ins) => ins.id === id);
            if (!ins) {
                throw new Error(`impossible state duplicate selected no matching instance`);
            }
            if (ins) {
                const { pos } = ins;
                const newPos = { x: pos.x + 20, y: pos.y + 20 };
                const id = createInsId(node);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVwbGljYXRlLWluc3RhbmNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvY29tbWFuZHMvZHVwbGljYXRlLWluc3RhbmNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFvQixNQUFNLGFBQWEsQ0FBQztBQUM1RCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFFNUIsTUFBTSxDQUFDLE1BQU0sb0NBQW9DLEdBQUcsQ0FDbEQsSUFBc0IsRUFDdEIsUUFBa0IsRUFDbEIsRUFBRTtJQUNGLE1BQU0sZUFBZSxHQUFhLEVBQUUsQ0FBQztJQUNyQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDdEMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNsQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDdEIsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ1QsTUFBTSxJQUFJLEtBQUssQ0FDYiwwREFBMEQsQ0FDM0QsQ0FBQztZQUNKLENBQUM7WUFFRCxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQ3BCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO2dCQUNoRCxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTdCLE1BQU0sTUFBTSxHQUFHO29CQUNiLEdBQUcsR0FBRztvQkFDTixHQUFHLEVBQUUsTUFBTTtvQkFDWCxFQUFFO2lCQUNILENBQUM7Z0JBQ0YsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkIsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEMsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDO0FBQ3RDLENBQUMsQ0FBQyJ9