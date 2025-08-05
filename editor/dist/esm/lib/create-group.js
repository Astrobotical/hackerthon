import { keys, nodeOutput } from "@flyde/core";
import { externalConnectionNode, connectionNode, nodeInput, connectionNodeEquals, } from "@flyde/core";
import { rnd } from "../physics";
export const createGroup = async (instances, connections, name, prompt) => {
    if (instances.length === 0) {
        throw new Error("cannot create group without instances");
    }
    const instanceIds = instances.map((ins) => ins.id);
    // connections that were "left out" after the grouping make great candidates for inputs of the new node
    // in inputs case it means every instance that has a connection to an instance it the group but not out of it
    const inputCandidates = connections
        .filter((conn) => {
        const isSourceGrouped = instanceIds.includes(conn.from.insId);
        const isTargetGrouped = instanceIds.includes(conn.to.insId);
        return !isSourceGrouped && isTargetGrouped;
    })
        .filter((conn, idx, arr) => {
        // filter dupes
        return (arr.findIndex((existingConn) => connectionNodeEquals(existingConn.to, conn.to)) === idx);
    });
    // in outputs case it's vice-versa
    const outputCandidates = connections
        .filter((conn) => {
        const isSourceGrouped = instanceIds.includes(conn.from.insId);
        const isTargetGrouped = instanceIds.includes(conn.to.insId);
        return isSourceGrouped && !isTargetGrouped;
    })
        .filter((conn, idx, arr) => {
        // filter dupes
        return (arr.findIndex((existingConn) => connectionNodeEquals(existingConn.from, conn.from)) === idx);
    });
    let renamedInputs = {};
    let renamedOutputs = {};
    // if we're grouping only 2 nodes (say 2 [id]), both connected to the same pin, we want only 1 input created, not 2
    // this helps making sure of it
    let usedInputs = {};
    let usedOutputs = {};
    const externalConnections = [];
    // const inputIds = keys(looseInputs).map(k => k.split(".")[1]);
    const inputs = {};
    for (const conn of inputCandidates) {
        const targetKey = `${conn.to.insId}.${conn.to.pinId}`;
        const sourceKey = `${conn.from.insId}.${conn.from.pinId}`;
        const potential = conn.to.pinId;
        if (usedInputs[sourceKey]) {
            externalConnections.push({
                from: externalConnectionNode(usedInputs[sourceKey]),
                to: connectionNode(conn.to.insId, conn.to.pinId),
            });
            continue;
        }
        const name = inputs[potential]
            ? (await prompt(`Name this input (${potential} of ${conn.to.insId}) is already taken:`)) || `i${rnd()}`
            : potential;
        renamedInputs[targetKey] = name;
        usedInputs[sourceKey] = name;
        externalConnections.push({
            from: externalConnectionNode(name),
            to: connectionNode(conn.to.insId, conn.to.pinId),
        });
        inputs[name] = nodeInput();
    }
    const outputs = {};
    for (const conn of outputCandidates) {
        const targetKey = `${conn.to.insId}.${conn.to.pinId}`;
        const sourceKey = `${conn.from.insId}.${conn.from.pinId}`;
        const potential = conn.from.pinId;
        if (usedOutputs[targetKey]) {
            externalConnections.push({
                from: connectionNode(conn.from.insId, conn.from.pinId),
                to: externalConnectionNode(usedOutputs[targetKey]),
            });
            continue;
        }
        const name = outputs[potential]
            ? (await prompt(`Name this output (${potential} of ${conn.from.insId} is already taken:`)) || `i${rnd()}`
            : potential;
        renamedOutputs[sourceKey] = name;
        usedOutputs[targetKey] = name;
        externalConnections.push({
            from: connectionNode(conn.from.insId, conn.from.pinId),
            to: externalConnectionNode(name),
        });
        outputs[name] = nodeOutput();
    }
    const internalConnections = connections.filter((conn) => instanceIds.includes(conn.from.insId) &&
        instanceIds.includes(conn.to.insId));
    const visualNode = {
        id: name,
        inputs,
        outputs,
        instances,
        defaultStyle: {},
        inputsPosition: keys(inputs).reduce((acc, curr, idx) => ({ ...acc, [curr]: { x: 0 + 100 * idx, y: 0 } }), {}),
        outputsPosition: keys(outputs).reduce((acc, curr, idx) => ({ ...acc, [curr]: { x: 0 + 100 * idx, y: 400 } }), {}),
        connections: [...internalConnections, ...externalConnections],
        completionOutputs: keys(outputs),
    };
    return { visualNode, renamedInputs, renamedOutputs };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jcmVhdGUtZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUE2QixJQUFJLEVBQUUsVUFBVSxFQUFvRCxNQUFNLGFBQWEsQ0FBQztBQUM1SCxPQUFPLEVBRUwsc0JBQXNCLEVBQ3RCLGNBQWMsRUFDZCxTQUFTLEVBQ1Qsb0JBQW9CLEdBRXJCLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHakMsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFDOUIsU0FBK0IsRUFDL0IsV0FBNkIsRUFDN0IsSUFBWSxFQUNaLE1BQWdCLEVBQ2hCLEVBQUU7SUFDRixJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFbkQsdUdBQXVHO0lBRXZHLDZHQUE2RztJQUM3RyxNQUFNLGVBQWUsR0FBRyxXQUFXO1NBQ2hDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2YsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlELE1BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1RCxPQUFPLENBQUMsZUFBZSxJQUFJLGVBQWUsQ0FBQztJQUM3QyxDQUFDLENBQUM7U0FDRCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FB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