"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderVisualNode = exports.layoutToInstances = void 0;
const VisualNodeEditor_1 = require("../VisualNodeEditor");
const core_1 = require("@flyde/core");
const _1 = require(".");
const immer_1 = __importDefault(require("immer"));
const utils_1 = require("../node-io-view/utils");
const physics_1 = require("../../physics");
const utils_2 = require("../instance-view/utils");
const layoutToInstances = (ld, node) => {
    return (0, immer_1.default)(node, (draft) => {
        (0, core_1.entries)(ld.nodes).forEach(([id, node]) => {
            if (id.startsWith("ins-")) {
                const insId = id.replace("ins-", "");
                const ins = draft.instances.find((i) => i.id === insId);
                if (ins) {
                    ins.pos = node.p;
                }
                else {
                    console.warn("WAT");
                }
            }
            if (id.startsWith("node-input-")) {
                const pinId = id.replace("node-input-", "");
                draft.inputsPosition[pinId] = node.p;
            }
            if (id.startsWith("node-output-")) {
                const pinId = id.replace("node-output-", "");
                draft.outputsPosition[pinId] = node.p;
            }
        });
    });
};
exports.layoutToInstances = layoutToInstances;
const orderVisualNode = (node, itrs, onStep) => {
    const { instances, connections } = node;
    const insNodes = instances.reduce((prev, curr) => {
        const s = (0, physics_1.size)((0, utils_2.calcNodeWidth)(curr), VisualNodeEditor_1.NODE_HEIGHT);
        return {
            ...prev,
            [`ins-${curr.id}`]: { p: curr.pos, s },
        };
    }, {});
    const nodeInputNodes = (0, core_1.keys)(node.inputsPosition).reduce((prev, curr) => {
        const p = node.inputsPosition[curr];
        const s = (0, physics_1.size)((0, utils_1.calcNodeIoWidth)(curr), VisualNodeEditor_1.NODE_HEIGHT);
        return { ...prev, [`node-input-${curr}`]: { p, s } };
    }, {});
    const nodeOutputNodes = (0, core_1.keys)(node.outputsPosition).reduce((prev, curr) => {
        const p = node.outputsPosition[curr];
        const s = (0, physics_1.size)((0, utils_1.calcNodeIoWidth)(curr), VisualNodeEditor_1.NODE_HEIGHT);
        return { ...prev, [`node-output-${curr}`]: { p, s } };
    }, {});
    const nodes = { ...insNodes, ...nodeInputNodes, ...nodeOutputNodes };
    const edges = connections.map((data) => {
        const from = !(0, core_1.isExternalConnectionNode)(data.from)
            ? `ins-${data.from.insId}`
            : `node-input-${data.from.pinId}`;
        const to = !(0, core_1.isExternalConnectionNode)(data.to)
            ? `ins-${data.to.insId}`
            : `node-output-${data.to.pinId}`;
        return [from, to];
    });
    const result = (0, _1.orderLayout)({ nodes, edges }, itrs, (ld, idx) => {
        if (onStep) {
            onStep((0, exports.layoutToInstances)(ld, node), idx);
        }
    });
    const newValue = (0, exports.layoutToInstances)(result, node);
    return newValue;
};
exports.orderVisualNode = orderVisualNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Zpc3VhbC1ub2RlLWVkaXRvci9vcmRlci1sYXlvdXQvY21kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDBEQUFrRDtBQUNsRCxzQ0FNcUI7QUFDckIsd0JBQTRDO0FBQzVDLGtEQUE0QjtBQUM1QixpREFBd0Q7QUFDeEQsMkNBQXFDO0FBQ3JDLGtEQUF1RDtBQUVoRCxNQUFNLGlCQUFpQixHQUFHLENBQy9CLEVBQWMsRUFDZCxJQUFnQixFQUNKLEVBQUU7SUFDZCxPQUFPLElBQUEsZUFBTyxFQUFDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQzdCLElBQUEsY0FBTyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUMxQixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDckMsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUM7Z0JBQ3hELElBQUksR0FBRyxFQUFFLENBQUM7b0JBQ1IsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixDQUFDO3FCQUFNLENBQUM7b0JBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEIsQ0FBQztZQUNILENBQUM7WUFFRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztnQkFDakMsTUFBTSxLQUFLLEdBQUcsRUFB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