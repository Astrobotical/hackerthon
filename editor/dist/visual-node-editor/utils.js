"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEventOnCurrentBoard = exports.getConnectionId = exports.handleChangeNodeInputType = exports.handleIoPinRename = exports.handleInstanceDrag = exports.getInstancesInRect = exports.isJsxValue = exports.getMiddleOfViewPort = exports.fitViewPortToNode = exports.fitViewPortToRect = exports.centerBoardPosOnTarget = exports.renderedPosToLogicalPos = exports.logicalPosToRenderedPos = exports.getEffectiveNodeDimensions = exports.calcNodesPositions = exports.calcSelectionBoxArea = exports.animateViewPort = exports.easeInOutNum = exports.easeInOutPos = exports.easeInOutQuad = exports.center = exports.distance = exports.clamp = exports.domToViewPort = exports.roundNumber = exports.createNewNodeInstance = exports.getSelectionBoxRect = exports.findClosestPin = exports.changePinConfig = exports.emptyList = exports.emptyObj = void 0;
exports.getInstancePinConfig = getInstancePinConfig;
exports.isMac = isMac;
const immer = __importStar(require("immer"));
const VisualNodeEditor_1 = require("./VisualNodeEditor");
const core_1 = require("@flyde/core");
const calc_pin_position_1 = require("./connection-view/calc-pin-position");
const core_2 = require("@flyde/core");
const utils_1 = require("./instance-view/utils");
const utils_2 = require("./node-io-view/utils");
const physics_1 = require("../physics");
const instance_view_1 = require("./instance-view");
exports.emptyObj = {}; // for immutability
exports.emptyList = []; // for immutability
function getInstancePinConfig(node, insId, pinId) {
    var _a;
    const ins = node.instances.find((ins) => ins.id === insId);
    if (!ins) {
        throw new Error(`Instance ${insId} not found`);
    }
    const config = ins.inputConfig || exports.emptyObj;
    return (_a = config[pinId]) !== null && _a !== void 0 ? _a : (0, core_1.queueInputPinConfig)();
}
const changePinConfig = (value, insKey, pinId, newConfig) => {
    return immer.produce(value, (draft) => {
        var _a;
        const { instances } = draft;
        const instance = instances.find((ins) => ins.id === insKey);
        if (!instance) {
            throw new Error("blah");
        }
        const config = (_a = instance.inputConfig) !== null && _a !== void 0 ? _a : {};
        config[pinId] = newConfig;
        draft.instances = instances.map((itrIns) => itrIns === instance ? { ...instance, inputConfig: config } : itrIns);
    });
};
exports.changePinConfig = changePinConfig;
const findClosestPin = (node, mousePos, boardPos, currentInsId, ancestorsInsIds, viewPort) => {
    const rootInstance = (0, core_1.nodeInstance)(node.id, node.id, {}, {
        x: 0,
        y: 0,
    });
    const mainInputsData = (0, core_2.keys)(node.inputs).map((pinId) => {
        const pos = (0, calc_pin_position_1.calcPinPosition)({
            insId: currentInsId,
            ancestorsInsIds,
            pinId,
            pinType: "input",
            boardPos,
            viewPort,
            isMain: true,
        });
        return { id: pinId, type: "input", pos, ins: rootInstance };
    });
    const mainOutputsData = (0, core_2.keys)(node.outputs).map((pinId) => {
        const pos = (0, calc_pin_position_1.calcPinPosition)({
            insId: currentInsId,
            ancestorsInsIds,
            pinId,
            pinType: "output",
            boardPos,
            viewPort,
            isMain: true,
        });
        return { id: pinId, type: "output", pos, ins: rootInstance };
    });
    const instancesData = node.instances.reduce((acc, ins) => {
        const visibleInputs = (0, instance_view_1.getVisibleInputs)(ins, ins.node, node.connections);
        const visibleOutputs = (0, instance_view_1.getVisibleOutputs)(ins, ins.node, node.connections);
        const ips = visibleInputs.map((id) => ({
            ins,
            type: "input",
            pos: (0, calc_pin_position_1.calcPinPosition)({
                insId: ins.id,
                ancestorsInsIds: (0, core_1.fullInsIdPath)(currentInsId, ancestorsInsIds),
                pinId: id,
                pinType: "input",
                boardPos,
                viewPort,
                isMain: false,
            }),
            id,
        }));
        const ops = visibleOutputs.map((id) => ({
            ins,
            type: "output",
            pos: (0, calc_pin_position_1.calcPinPosition)({
                insId: ins.id,
                ancestorsInsIds: (0, core_1.fullInsIdPath)(currentInsId, ancestorsInsIds),
                pinId: id,
                pinType: "output",
                boardPos,
                viewPort,
                isMain: false,
            }),
            id,
        }));
        return [...acc, ...ips, ...ops];
    }, []);
    const all = [...mainInputsData, ...instancesData, ...mainOutputsData];
    let closest = { dis: 100000, item: all[0] };
    all.forEach((item) => {
        const dx = item.pos.x - mousePos.x;
        const dy = item.pos.y - mousePos.y;
        const dis = Math.sqrt(dx * dx + dy * dy);
        if (dis < closest.dis) {
            closest.dis = dis;
            closest.item = item;
        }
    });
    return closest.item;
};
exports.findClosestPin = findClosestPin;
const getSelectionBoxRect = (from, to) => {
    const mnx = Math.min(from.x, to.x);
    const mny = Math.min(from.y, to.y);
    const mxx = Math.max(from.x, to.x);
    const mxy = Math.max(from.y, to.y);
    const w = mxx - mnx;
    const h = mxy - mny;
    return { x: mnx, y: mny, w, h };
};
exports.getSelectionBoxRect = getSelectionBoxRect;
const createNewNodeInstance = (importableNode, offset = -1 * VisualNodeEditor_1.NODE_HEIGHT * 1.5, lastMousePos) => {
    // TODO - handle visual node addition
    const insId = (0, core_1.createInsId)(importableNode);
    const ins = importableNode.type === "visual"
        ? (0, core_1.visualNodeInstance)(insId, importableNode.id, importableNode.source)
        : (0, core_1.nodeInstance)(insId, importableNode.id, importableNode.source, importableNode.config, {}, {
            x: 0,
            y: 0,
        });
    const width = 300; // TODO - calc proper width
    const { x, y } = lastMousePos;
    const pos = {
        x: x - width / 2,
        y: y + offset,
    };
    return { ...ins, pos, node: importableNode.editorNode };
};
exports.createNewNodeInstance = createNewNodeInstance;
const roundNumber = (v) => Math.round(v * 100) / 100;
exports.roundNumber = roundNumber;
const domToViewPort = (p, viewPort, parentVp) => {
    return {
        x: (0, exports.roundNumber)(viewPort.pos.x + p.x / viewPort.zoom / parentVp.zoom),
        y: (0, exports.roundNumber)(viewPort.pos.y + p.y / viewPort.zoom / parentVp.zoom),
    };
};
exports.domToViewPort = domToViewPort;
const clamp = (min, max, v) => {
    return Math.max(min, Math.min(max, v));
};
exports.clamp = clamp;
const distance = (p1, p2) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
};
exports.distance = distance;
const center = (rect, vpSize, { zoom }) => {
    const ecx = rect.x + rect.w / 2;
    const ecy = rect.y + rect.h / 2;
    const { w, h } = vpSize;
    return { x: ecx - w / zoom / 2, y: ecy - h / zoom / 2 };
};
exports.center = center;
const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
exports.easeInOutQuad = easeInOutQuad;
const easeInOutPos = (p1, p2, start, duration, now) => {
    const t = (0, exports.clamp)(0, 1, (now - start) / duration);
    const m = (0, exports.easeInOutQuad)(t);
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return {
        x: p1.x + dx * m,
        y: p1.y + dy * m,
    };
};
exports.easeInOutPos = easeInOutPos;
const easeInOutNum = (n1, n2, start, duration, now) => {
    const t = (0, exports.clamp)(0, 1, (now - start) / duration);
    const m = (0, exports.easeInOutQuad)(t);
    const d = n2 - n1;
    return n1 + d * m;
};
exports.easeInOutNum = easeInOutNum;
const animateViewPort = (vp1, vp2, duration, cb) => {
    const dis = (0, exports.distance)(vp1.pos, vp2.pos);
    const start = Date.now();
    const normDuration = duration;
    if (dis === 0) {
        cb(vp1);
        return;
    }
    const animate = () => {
        const now = Date.now();
        const pos = (0, exports.easeInOutPos)(vp1.pos, vp2.pos, start, normDuration, now);
        const zoom = (0, exports.easeInOutNum)(vp1.zoom, vp2.zoom, start, normDuration, now);
        if (now - start < normDuration) {
            cb({ pos, zoom });
            requestAnimationFrame(animate);
        }
        else {
            cb({ pos, zoom });
        }
    };
    requestAnimationFrame(animate);
};
exports.animateViewPort = animateViewPort;
const calcSelectionBoxArea = (box) => {
    const rect = (0, exports.getSelectionBoxRect)(box.from, box.to);
    return rect.h * rect.w;
};
exports.calcSelectionBoxArea = calcSelectionBoxArea;
const calcPoints = (w, h, pos, tag) => {
    return {
        left: pos.x,
        right: pos.x + w,
        top: pos.y,
        bottom: pos.y + h,
        tag,
        center: (0, core_1.calcCenter)({ w, h, ...pos }),
    };
};
const calcNodesPositions = (node) => {
    const insNodes = node.instances.map((curr) => {
        const w = (0, utils_1.calcNodeWidth)(curr);
        const h = VisualNodeEditor_1.NODE_HEIGHT;
        return calcPoints(w, h, curr.pos, curr.id);
    });
    const inputsCenter = (0, core_2.keys)(node.inputs).map((curr) => {
        const w = (0, utils_2.calcNodeIoWidth)(curr);
        const h = VisualNodeEditor_1.NODE_HEIGHT;
        const pos = node.inputsPosition[curr] || { x: 0, y: 0 };
        return calcPoints(w, h, pos, "input_" + curr);
    });
    const outputsCenter = (0, core_2.keys)(node.outputs).map((curr) => {
        const w = (0, utils_2.calcNodeIoWidth)(curr);
        const h = VisualNodeEditor_1.NODE_HEIGHT;
        const pos = node.outputsPosition[curr] || { x: 0, y: 0 };
        return calcPoints(w, h, pos, "output" + curr);
    });
    return [...insNodes, ...inputsCenter, ...outputsCenter];
};
exports.calcNodesPositions = calcNodesPositions;
const getEffectiveNodeDimensions = (node) => {
    const positions = (0, exports.calcNodesPositions)(node);
    const firstPosition = positions[0] || {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    };
    const leftMost = positions.reduce((acc, curr) => (curr.left < acc ? curr.left : acc), firstPosition.left);
    const rightMost = positions.reduce((acc, curr) => (curr.right > acc ? curr.right : acc), firstPosition.right);
    const topMost = positions.reduce((acc, curr) => (curr.top < acc ? curr.top : acc), firstPosition.top);
    const bottomMost = positions.reduce((acc, curr) => (curr.bottom > acc ? curr.bottom : acc), firstPosition.bottom);
    const width = rightMost - leftMost;
    const height = bottomMost - topMost;
    const size = { width: width, height: height };
    const pos = { x: leftMost, y: topMost };
    const center = (0, core_1.calcCenter)({ w: width, h: height, ...pos });
    return { size, pos, center };
};
exports.getEffectiveNodeDimensions = getEffectiveNodeDimensions;
const logicalPosToRenderedPos = (pos, vp) => {
    const diff = (0, physics_1.vSub)(pos, vp.pos);
    return (0, physics_1.vMul)(diff, vp.zoom);
};
exports.logicalPosToRenderedPos = logicalPosToRenderedPos;
const renderedPosToLogicalPos = (renderedPos, vp) => {
    const bob = (0, physics_1.vDiv)(renderedPos, vp.zoom);
    return (0, physics_1.vAdd)(vp.pos, bob);
};
exports.renderedPosToLogicalPos = renderedPosToLogicalPos;
const centerBoardPosOnTarget = (target, vpSize, newZoom, prevVp) => {
    const renderedTargetPos = (0, exports.logicalPosToRenderedPos)(target, prevVp);
    const nextBoardPos = (0, exports.renderedPosToLogicalPos)(renderedTargetPos, {
        ...prevVp,
        zoom: newZoom,
    });
    const deltaX = Math.max(target.x, nextBoardPos.x) - Math.min(target.x, nextBoardPos.x);
    const deltaY = Math.max(target.y, nextBoardPos.y) - Math.min(target.y, nextBoardPos.y);
    const newX = newZoom > prevVp.zoom ? prevVp.pos.x + deltaX : prevVp.pos.x - deltaX;
    const newY = newZoom > prevVp.zoom ? prevVp.pos.y + deltaY : prevVp.pos.y - deltaY;
    return {
        x: newX,
        y: newY,
    };
};
exports.centerBoardPosOnTarget = centerBoardPosOnTarget;
const FIT_VIEWPORT_MIN_ZOOM = 0.3;
const FIT_VIEWPORT_MAX_ZOOM = 1;
const fitViewPortToRect = (rect, vpSize, padding = [5, 50]) => {
    const horPadding = padding[0];
    const verPadding = padding[1];
    const width = rect.w + horPadding;
    const height = rect.h + verPadding;
    const widthFit = vpSize.width / width; // i.e 2 if viewPort is twice as large, 0.5 is viewPort is half
    const heightFit = vpSize.height / height;
    const fitToGoBy = Math.min(widthFit, heightFit);
    const zoomPaddingModifier = 1.15;
    const idealZoom = fitToGoBy / zoomPaddingModifier;
    const zoom = (0, exports.clamp)(FIT_VIEWPORT_MIN_ZOOM, FIT_VIEWPORT_MAX_ZOOM, idealZoom);
    const vpX = rect.x - vpSize.width / 2 / zoom;
    const vpY = rect.y - vpSize.height / 2 / zoom + 20; // TODO - find out why "+20" is needed
    return {
        zoom,
        pos: { x: vpX, y: vpY },
    };
};
exports.fitViewPortToRect = fitViewPortToRect;
const fitViewPortToNode = (node, vpSize, padding = [20, 50]) => {
    const { size, center } = (0, exports.getEffectiveNodeDimensions)(node);
    return (0, exports.fitViewPortToRect)({
        x: center.x,
        y: center.y,
        w: size.width,
        h: size.height,
    }, vpSize, padding);
};
exports.fitViewPortToNode = fitViewPortToNode;
const getMiddleOfViewPort = (vp, vpSize) => {
    const renderedPos = {
        x: vpSize.width / 2,
        y: vpSize.height / 2,
    };
    return (0, exports.renderedPosToLogicalPos)(renderedPos, vp);
};
exports.getMiddleOfViewPort = getMiddleOfViewPort;
const isJsxValue = (val) => {
    const isIt = (j) => (0, core_2.isDefined)(j.ref) && (0, core_2.isDefined)(j.type) && (0, core_2.isDefined)(j.props);
    try {
        const j = JSON.parse(val);
        return isIt(j) || (Array.isArray(j) && isIt(j[0]));
    }
    catch (e) {
        return false;
    }
};
exports.isJsxValue = isJsxValue;
const getInstancesInRect = (selectionBox, viewPort, instances, parentVp, inputsPosition = {}, outputsPosition = {}) => {
    const { from, to } = selectionBox;
    const rect = (0, exports.getSelectionBoxRect)(from, to);
    // Handle regular instances
    const selectedInstanceIds = instances
        .filter((ins) => {
        const { pos } = ins;
        const w = (0, utils_1.calcNodeWidth)(ins) * viewPort.zoom * parentVp.zoom;
        const rec2 = {
            ...pos,
            w,
            h: VisualNodeEditor_1.NODE_HEIGHT * viewPort.zoom * parentVp.zoom,
        };
        return (0, core_1.intersectRect)(rect, rec2) || (0, core_1.intersectRect)(rec2, rect);
    })
        .map((ins) => ins.id);
    // Handle main inputs - use special "io_input_" prefix to identify them
    const selectedInputs = Object.entries(inputsPosition)
        .filter(([_, pos]) => {
        if (!pos)
            return false;
        const rec2 = {
            ...pos,
            w: (0, utils_2.calcNodeIoWidth)('input') * viewPort.zoom * parentVp.zoom,
            h: VisualNodeEditor_1.NODE_HEIGHT * viewPort.zoom * parentVp.zoom,
        };
        return (0, core_1.intersectRect)(rect, rec2) || (0, core_1.intersectRect)(rec2, rect);
    })
        .map(([pinId, _]) => `io_input_${pinId}`);
    // Handle main outputs - use special "io_output_" prefix to identify them
    const selectedOutputs = Object.entries(outputsPosition)
        .filter(([_, pos]) => {
        if (!pos)
            return false;
        const rec2 = {
            ...pos,
            w: (0, utils_2.calcNodeIoWidth)('output') * viewPort.zoom * parentVp.zoom,
            h: VisualNodeEditor_1.NODE_HEIGHT * viewPort.zoom * parentVp.zoom,
        };
        return (0, core_1.intersectRect)(rect, rec2) || (0, core_1.intersectRect)(rec2, rect);
    })
        .map(([pinId, _]) => `io_output_${pinId}`);
    return [...selectedInstanceIds, ...selectedInputs, ...selectedOutputs];
};
exports.getInstancesInRect = getInstancesInRect;
const handleInstanceDrag = (node, ins, pos, event, selected, draggingId) => {
    event.preventDefault();
    event.stopPropagation();
    const delta = (0, physics_1.vSub)(pos, ins.pos);
    const newValue = immer.produce(node, (draft) => {
        const foundIns = draft.instances.find((itrIns) => itrIns.id === ins.id);
        if (!foundIns) {
            throw new Error("impossible state dragging instance that does not exist");
        }
        if (selected.includes(ins.id)) {
            const otherInstances = draft.instances.filter((ins) => selected.includes(ins.id) && ins !== foundIns);
            otherInstances.forEach((ins) => {
                ins.pos = (0, physics_1.vAdd)(ins.pos, delta);
            });
        }
        // Update selected IO pins
        selected.forEach(id => {
            // Handle input pins (format: io_input_pinId)
            if (id.startsWith('io_input_')) {
                const pinId = id.substring('io_input_'.length);
                if (draft.inputsPosition[pinId]) {
                    draft.inputsPosition[pinId] = (0, physics_1.vAdd)(draft.inputsPosition[pinId], delta);
                }
            }
            // Handle output pins (format: io_output_pinId)
            else if (id.startsWith('io_output_')) {
                const pinId = id.substring('io_output_'.length);
                if (draft.outputsPosition[pinId]) {
                    draft.outputsPosition[pinId] = (0, physics_1.vAdd)(draft.outputsPosition[pinId], delta);
                }
            }
        });
        foundIns.pos = pos;
    });
    return newValue;
};
exports.handleInstanceDrag = handleInstanceDrag;
const handleIoPinRename = (node, type, pinId, newPinId) => {
    return immer.produce(node, (draft) => {
        if (type === "input") {
            if (!draft.inputs[pinId]) {
                throw new Error("Pin does not exist");
            }
            draft.inputs[newPinId] = draft.inputs[pinId];
            draft.inputsPosition[newPinId] = draft.inputsPosition[pinId];
            delete draft.inputs[pinId];
            draft.connections = draft.connections.map((conn) => {
                return (0, core_1.isExternalConnectionNode)(conn.from) && conn.from.pinId === pinId
                    ? { ...conn, from: { ...conn.from, pinId: newPinId } }
                    : conn;
            });
        }
        else {
            if (!draft.outputs[pinId]) {
                throw new Error("Pin does not exist");
            }
            draft.outputs[newPinId] = draft.outputs[pinId];
            draft.outputsPosition[newPinId] = draft.outputsPosition[pinId];
            draft.connections = draft.connections.map((conn) => {
                return (0, core_1.isExternalConnectionNode)(conn.to) && conn.to.pinId === pinId
                    ? { ...conn, to: { ...conn.to, pinId: newPinId } }
                    : conn;
            });
            draft.completionOutputs = (draft.completionOutputs || []).map((comp) => {
                const arr = comp.split("+"); // due to the r1+r1,r3 hack, see core tests
                return arr.map((pin) => (pin === pinId ? newPinId : pinId)).join("+");
            });
            delete draft.outputs[pinId];
        }
    });
};
exports.handleIoPinRename = handleIoPinRename;
const handleChangeNodeInputType = (node, pinId, mode) => {
    return immer.produce(node, (draft) => {
        const input = draft.inputs[pinId];
        if (!input) {
            throw new Error("Wat");
        }
        input.mode = mode;
    });
};
exports.handleChangeNodeInputType = handleChangeNodeInputType;
const getConnectionId = (connectionData) => {
    const { from, to } = connectionData;
    const { insId: fromInsId, pinId: fromPinId } = from;
    const { insId: toInsId, pinId: toPinId } = to;
    return `${fromInsId}${fromPinId}${toInsId}${toPinId}`;
};
exports.getConnectionId = getConnectionId;
function isMac() {
    var _a;
    try {
        const platform = (_a = window.navigator.platform) !== null && _a !== void 0 ? _a : "n/a";
        return /Mac|iPod|iPhone|iPad/.test(platform);
    }
    catch (e) {
        return false;
    }
}
const isEventOnCurrentBoard = (e, nodeId) => {
    const targetElem = e.target;
    const closestBoard = targetElem.closest(".visual-node-editor");
    return closestBoard && closestBoard.getAttribute("data-id") === nodeId;
};
exports.isEventOnCurrentBoard = isEventOnCurrentBoard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1DQSxvREFXQztBQTJuQkQsc0JBT0M7QUFockJELDZDQUErQjtBQUUvQix5REFBaUQ7QUFDakQsc0NBa0JxQjtBQUNyQiwyRUFBc0U7QUFFdEUsc0NBQThDO0FBQzlDLGlEQUFzRDtBQUV0RCxnREFBMEU7QUFDMUUsd0NBQW9EO0FBQ3BELG1EQUFzRTtBQUd6RCxRQUFBLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxtQkFBbUI7QUFDbEMsUUFBQSxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsbUJBQW1CO0FBRWhELFNBQWdCLG9CQUFvQixDQUNsQyxJQUFzQixFQUN0QixLQUFhLEVBQ2IsS0FBYTs7SUFFYixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQztJQUMzRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLFlBQVksS0FBSyxZQUFZLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFdBQVcsSUFBSSxnQkFBUSxDQUFDO0lBQzNDLE9BQU8sTUFBQSxNQUFNLENBQUMsS0FBSyxDQUFDLG1DQUFJLElBQUEsMEJBQW1CLEdBQUUsQ0FBQztBQUNoRCxDQUFDO0FBRU0sTUFBTSxlQUFlLEdBQUcsQ0FDN0IsS0FBdUIsRUFDdkIsTUFBYyxFQUNkLEtBQWEsRUFDYixTQUF5QixFQUN6QixFQUFFO0lBQ0YsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxF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