"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupSelected = void 0;
const core_1 = require("@flyde/core");
const immer_1 = __importDefault(require("immer"));
const create_group_1 = require("./lib/create-group");
const groupSelected = async (selected, node, nodeName, prompt) => {
    var _a, _b;
    const { instances, connections } = node;
    const relevantInstances = instances.filter((ins) => selected.includes(ins.id));
    const relevantConnections = connections.filter(({ from, to }) => {
        return (selected.indexOf(from.insId) !== -1 || selected.indexOf(to.insId) !== -1);
    });
    if (!relevantInstances.length) {
        throw new Error("visual without selections");
    }
    const { visualNode, renamedInputs, renamedOutputs } = await (0, create_group_1.createGroup)(relevantInstances, relevantConnections, nodeName, prompt);
    const midPos = relevantInstances.reduce((p, c) => {
        return (0, core_1.middlePos)(c.pos, p);
    }, (_b = (_a = instances[0]) === null || _a === void 0 ? void 0 : _a.pos) !== null && _b !== void 0 ? _b : { x: 0, y: 0 });
    const newInstance = (0, core_1.inlineVisualNodeInstance)((0, core_1.createInsId)(visualNode), visualNode, {}, midPos);
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
        currentNode: (0, immer_1.default)(node, (draft) => {
            draft.instances = [...newInstancesArr, { ...newInstance, node: visualNode }];
            draft.connections = newConnections;
        }),
    };
};
exports.groupSelected = groupSelected;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtc2VsZWN0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZ3JvdXAtc2VsZWN0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0NBT3FCO0FBQ3JCLGtEQUE0QjtBQUM1QixxREFBaUQ7QUFHMUMsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUNoQyxRQUFrQixFQUNsQixJQUFzQixFQUN0QixRQUFnQixFQUNoQixNQUFnQixFQUN1RCxFQUFFOztJQUN6RSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQztJQUN4QyxNQUFNLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUNqRCxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FDMUIsQ0FBQztJQUVGLE1BQU0sbUJBQW1CLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDOUQsT0FBTyxDQUNMLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUN6RSxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxNQUFNLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsR0FBRyxNQUFNLElBQUEsMEJBQVcsRUFDckUsaUJBQWlCLEVBQ2pCLG1CQUFtQixFQUNuQixRQUFRLEVBQ1IsTUFBTSxDQUNQLENBQUM7SUFDRixNQUFNLE1BQU0sR0FB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