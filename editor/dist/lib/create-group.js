"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroup = void 0;
const core_1 = require("@flyde/core");
const core_2 = require("@flyde/core");
const physics_1 = require("../physics");
const createGroup = async (instances, connections, name, prompt) => {
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
        return (arr.findIndex((existingConn) => (0, core_2.connectionNodeEquals)(existingConn.to, conn.to)) === idx);
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
        return (arr.findIndex((existingConn) => (0, core_2.connectionNodeEquals)(existingConn.from, conn.from)) === idx);
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
                from: (0, core_2.externalConnectionNode)(usedInputs[sourceKey]),
                to: (0, core_2.connectionNode)(conn.to.insId, conn.to.pinId),
            });
            continue;
        }
        const name = inputs[potential]
            ? (await prompt(`Name this input (${potential} of ${conn.to.insId}) is already taken:`)) || `i${(0, physics_1.rnd)()}`
            : potential;
        renamedInputs[targetKey] = name;
        usedInputs[sourceKey] = name;
        externalConnections.push({
            from: (0, core_2.externalConnectionNode)(name),
            to: (0, core_2.connectionNode)(conn.to.insId, conn.to.pinId),
        });
        inputs[name] = (0, core_2.nodeInput)();
    }
    const outputs = {};
    for (const conn of outputCandidates) {
        const targetKey = `${conn.to.insId}.${conn.to.pinId}`;
        const sourceKey = `${conn.from.insId}.${conn.from.pinId}`;
        const potential = conn.from.pinId;
        if (usedOutputs[targetKey]) {
            externalConnections.push({
                from: (0, core_2.connectionNode)(conn.from.insId, conn.from.pinId),
                to: (0, core_2.externalConnectionNode)(usedOutputs[targetKey]),
            });
            continue;
        }
        const name = outputs[potential]
            ? (await prompt(`Name this output (${potential} of ${conn.from.insId} is already taken:`)) || `i${(0, physics_1.rnd)()}`
            : potential;
        renamedOutputs[sourceKey] = name;
        usedOutputs[targetKey] = name;
        externalConnections.push({
            from: (0, core_2.connectionNode)(conn.from.insId, conn.from.pinId),
            to: (0, core_2.externalConnectionNode)(name),
        });
        outputs[name] = (0, core_1.nodeOutput)();
    }
    const internalConnections = connections.filter((conn) => instanceIds.includes(conn.from.insId) &&
        instanceIds.includes(conn.to.insId));
    const visualNode = {
        id: name,
        inputs,
        outputs,
        instances,
        defaultStyle: {},
        inputsPosition: (0, core_1.keys)(inputs).reduce((acc, curr, idx) => ({ ...acc, [curr]: { x: 0 + 100 * idx, y: 0 } }), {}),
        outputsPosition: (0, core_1.keys)(outputs).reduce((acc, curr, idx) => ({ ...acc, [curr]: { x: 0 + 100 * idx, y: 400 } }), {}),
        connections: [...internalConnections, ...externalConnections],
        completionOutputs: (0, core_1.keys)(outputs),
    };
    return { visualNode, renamedInputs, renamedOutputs };
};
exports.createGroup = createGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jcmVhdGUtZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQTRIO0FBQzVILHNDQU9xQjtBQUNyQix3Q0FBaUM7QUFHMUIsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUM5QixTQUErQixFQUMvQixXQUE2QixFQUM3QixJQUFZLEVBQ1osTUFBZ0IsRUFDaEIsRUFBRTtJQUNGLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVuRCx1R0FBdUc7SUFFdkcsNkdBQTZHO0lBQzdHLE1BQU0sZUFBZSxHQUFHLFdBQVc7U0FDaEMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDZixNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUQsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVELE9BQU8sQ0FBQyxlQUFlLElBQUksZUFBZSxDQUFDO0lBQzdDLENBQUMsQ0FBQztTQUNELE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDekIsZUFBZTtRQUNmLE9BQU8sQ0FDTCxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FDN0IsSUFBQSwyQkFBb0IsRUFBQyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxF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