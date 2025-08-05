"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateInstancesWithSingleConstPinsMap = exports.getLeafInstancesOfSelection = void 0;
const getLeafInstancesOfSelection = (selectedInstances, allInstances, allConnections) => {
    const allConnected = selectedInstances.reduce((acc, curr) => {
        const instancesConnectedToCurr = allConnections
            .filter((conn) => conn.to.insId === curr.id)
            .map((conn) => allInstances.find((ins) => ins.id === conn.from.insId))
            .filter((ins) => !!ins);
        return [...acc, ...instancesConnectedToCurr];
    }, []);
    // find all the instances who are only connected to our dragged piece, so we can assume the intent is to drag them too
    return allConnected.filter((ins) => {
        const insConnectedIds = allConnections.filter((conn) => conn.from.insId === ins.id || conn.to.insId === ins.id);
        return insConnectedIds.length === 1 && !selectedInstances.includes(ins); //only those who are singly connected
    });
};
exports.getLeafInstancesOfSelection = getLeafInstancesOfSelection;
const calculateInstancesWithSingleConstPinsMap = (node, constSinglePinMap) => {
    const { connections } = node;
    return connections
        .filter((conn) => {
        return constSinglePinMap.has(conn.from.insId);
    })
        .reduce((accMap, conn) => {
        const constVal = constSinglePinMap.get(conn.from.insId);
        const targetInstance = conn.to.insId;
        const pinMap = accMap.get(targetInstance) || new Map();
        pinMap.set(conn.to.pinId, { val: constVal, insId: conn.from.insId });
        accMap.set(targetInstance, pinMap);
        return accMap;
    }, new Map());
};
exports.calculateInstancesWithSingleConstPinsMap = calculateInstancesWithSingleConstPinsMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1ncmFwaC11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3Ivbm9kZS1ncmFwaC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFTyxNQUFNLDJCQUEyQixHQUFHLENBQ3pDLGlCQUFpQyxFQUNqQyxZQUE0QixFQUM1QixjQUFnQyxFQUNoQixFQUFFO0lBQ2xCLE1BQU0sWUFBWSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBaUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDMUUsTUFBTSx3QkFBd0IsR0FBRyxjQUFjO2FBQzVDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUMzQyxHQUFHLENBQ0YsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNQLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQWlCLENBQ3pFO2FBQ0EsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsd0JBQXdCLENBQUMsQ0FBQztJQUMvQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUCxzSEFBc0g7SUFDdEgsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDakMsTUFBTSxlQUFlLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FDM0MsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FDakUsQ0FBQztRQUNGLE9BQU8sZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxxQ0FBcUM7SUFDaEgsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUF2QlcsUUFBQSwyQkFBMkIsK0JBdUJ0QztBQU9LLE1BQU0sd0NBQXdDLEdBQUcsQ0FDdEQsSUFBZ0IsRUFDaEIsaUJBQW1DLEVBQ1YsRUFBRTtJQUMzQixNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBRTdCLE9BQU8sV0FBVztTQUNmLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2YsT0FBTyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUM7U0FDRCxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDdkIsTUFBTSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDckMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUM7QUFsQlcsUUFBQSx3Q0FBd0MsNENBa0JuRCJ9