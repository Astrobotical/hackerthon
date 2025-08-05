import * as immer from "immer";
import { NODE_HEIGHT } from "./VisualNodeEditor";
import { isExternalConnectionNode, nodeInstance, queueInputPinConfig, intersectRect, calcCenter, fullInsIdPath, createInsId, visualNodeInstance, } from "@flyde/core";
import { calcPinPosition } from "./connection-view/calc-pin-position";
import { keys, isDefined } from "@flyde/core";
import { calcNodeWidth } from "./instance-view/utils";
import { calcNodeIoWidth as calcIoNodeWidth } from "./node-io-view/utils";
import { vSub, vAdd, vMul, vDiv } from "../physics";
import { getVisibleInputs, getVisibleOutputs } from "./instance-view";
export const emptyObj = {}; // for immutability
export const emptyList = []; // for immutability
export function getInstancePinConfig(node, insId, pinId) {
    var _a;
    const ins = node.instances.find((ins) => ins.id === insId);
    if (!ins) {
        throw new Error(`Instance ${insId} not found`);
    }
    const config = ins.inputConfig || emptyObj;
    return (_a = config[pinId]) !== null && _a !== void 0 ? _a : queueInputPinConfig();
}
export const changePinConfig = (value, insKey, pinId, newConfig) => {
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
export const findClosestPin = (node, mousePos, boardPos, currentInsId, ancestorsInsIds, viewPort) => {
    const rootInstance = nodeInstance(node.id, node.id, {}, {
        x: 0,
        y: 0,
    });
    const mainInputsData = keys(node.inputs).map((pinId) => {
        const pos = calcPinPosition({
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
    const mainOutputsData = keys(node.outputs).map((pinId) => {
        const pos = calcPinPosition({
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
        const visibleInputs = getVisibleInputs(ins, ins.node, node.connections);
        const visibleOutputs = getVisibleOutputs(ins, ins.node, node.connections);
        const ips = visibleInputs.map((id) => ({
            ins,
            type: "input",
            pos: calcPinPosition({
                insId: ins.id,
                ancestorsInsIds: fullInsIdPath(currentInsId, ancestorsInsIds),
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
            pos: calcPinPosition({
                insId: ins.id,
                ancestorsInsIds: fullInsIdPath(currentInsId, ancestorsInsIds),
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
export const getSelectionBoxRect = (from, to) => {
    const mnx = Math.min(from.x, to.x);
    const mny = Math.min(from.y, to.y);
    const mxx = Math.max(from.x, to.x);
    const mxy = Math.max(from.y, to.y);
    const w = mxx - mnx;
    const h = mxy - mny;
    return { x: mnx, y: mny, w, h };
};
export const createNewNodeInstance = (importableNode, offset = -1 * NODE_HEIGHT * 1.5, lastMousePos) => {
    // TODO - handle visual node addition
    const insId = createInsId(importableNode);
    const ins = importableNode.type === "visual"
        ? visualNodeInstance(insId, importableNode.id, importableNode.source)
        : nodeInstance(insId, importableNode.id, importableNode.source, importableNode.config, {}, {
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
export const roundNumber = (v) => Math.round(v * 100) / 100;
export const domToViewPort = (p, viewPort, parentVp) => {
    return {
        x: roundNumber(viewPort.pos.x + p.x / viewPort.zoom / parentVp.zoom),
        y: roundNumber(viewPort.pos.y + p.y / viewPort.zoom / parentVp.zoom),
    };
};
export const clamp = (min, max, v) => {
    return Math.max(min, Math.min(max, v));
};
export const distance = (p1, p2) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
};
export const center = (rect, vpSize, { zoom }) => {
    const ecx = rect.x + rect.w / 2;
    const ecy = rect.y + rect.h / 2;
    const { w, h } = vpSize;
    return { x: ecx - w / zoom / 2, y: ecy - h / zoom / 2 };
};
export const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
export const easeInOutPos = (p1, p2, start, duration, now) => {
    const t = clamp(0, 1, (now - start) / duration);
    const m = easeInOutQuad(t);
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return {
        x: p1.x + dx * m,
        y: p1.y + dy * m,
    };
};
export const easeInOutNum = (n1, n2, start, duration, now) => {
    const t = clamp(0, 1, (now - start) / duration);
    const m = easeInOutQuad(t);
    const d = n2 - n1;
    return n1 + d * m;
};
export const animateViewPort = (vp1, vp2, duration, cb) => {
    const dis = distance(vp1.pos, vp2.pos);
    const start = Date.now();
    const normDuration = duration;
    if (dis === 0) {
        cb(vp1);
        return;
    }
    const animate = () => {
        const now = Date.now();
        const pos = easeInOutPos(vp1.pos, vp2.pos, start, normDuration, now);
        const zoom = easeInOutNum(vp1.zoom, vp2.zoom, start, normDuration, now);
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
export const calcSelectionBoxArea = (box) => {
    const rect = getSelectionBoxRect(box.from, box.to);
    return rect.h * rect.w;
};
const calcPoints = (w, h, pos, tag) => {
    return {
        left: pos.x,
        right: pos.x + w,
        top: pos.y,
        bottom: pos.y + h,
        tag,
        center: calcCenter({ w, h, ...pos }),
    };
};
export const calcNodesPositions = (node) => {
    const insNodes = node.instances.map((curr) => {
        const w = calcNodeWidth(curr);
        const h = NODE_HEIGHT;
        return calcPoints(w, h, curr.pos, curr.id);
    });
    const inputsCenter = keys(node.inputs).map((curr) => {
        const w = calcIoNodeWidth(curr);
        const h = NODE_HEIGHT;
        const pos = node.inputsPosition[curr] || { x: 0, y: 0 };
        return calcPoints(w, h, pos, "input_" + curr);
    });
    const outputsCenter = keys(node.outputs).map((curr) => {
        const w = calcIoNodeWidth(curr);
        const h = NODE_HEIGHT;
        const pos = node.outputsPosition[curr] || { x: 0, y: 0 };
        return calcPoints(w, h, pos, "output" + curr);
    });
    return [...insNodes, ...inputsCenter, ...outputsCenter];
};
export const getEffectiveNodeDimensions = (node) => {
    const positions = calcNodesPositions(node);
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
    const center = calcCenter({ w: width, h: height, ...pos });
    return { size, pos, center };
};
export const logicalPosToRenderedPos = (pos, vp) => {
    const diff = vSub(pos, vp.pos);
    return vMul(diff, vp.zoom);
};
export const renderedPosToLogicalPos = (renderedPos, vp) => {
    const bob = vDiv(renderedPos, vp.zoom);
    return vAdd(vp.pos, bob);
};
export const centerBoardPosOnTarget = (target, vpSize, newZoom, prevVp) => {
    const renderedTargetPos = logicalPosToRenderedPos(target, prevVp);
    const nextBoardPos = renderedPosToLogicalPos(renderedTargetPos, {
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
const FIT_VIEWPORT_MIN_ZOOM = 0.3;
const FIT_VIEWPORT_MAX_ZOOM = 1;
export const fitViewPortToRect = (rect, vpSize, padding = [5, 50]) => {
    const horPadding = padding[0];
    const verPadding = padding[1];
    const width = rect.w + horPadding;
    const height = rect.h + verPadding;
    const widthFit = vpSize.width / width; // i.e 2 if viewPort is twice as large, 0.5 is viewPort is half
    const heightFit = vpSize.height / height;
    const fitToGoBy = Math.min(widthFit, heightFit);
    const zoomPaddingModifier = 1.15;
    const idealZoom = fitToGoBy / zoomPaddingModifier;
    const zoom = clamp(FIT_VIEWPORT_MIN_ZOOM, FIT_VIEWPORT_MAX_ZOOM, idealZoom);
    const vpX = rect.x - vpSize.width / 2 / zoom;
    const vpY = rect.y - vpSize.height / 2 / zoom + 20; // TODO - find out why "+20" is needed
    return {
        zoom,
        pos: { x: vpX, y: vpY },
    };
};
export const fitViewPortToNode = (node, vpSize, padding = [20, 50]) => {
    const { size, center } = getEffectiveNodeDimensions(node);
    return fitViewPortToRect({
        x: center.x,
        y: center.y,
        w: size.width,
        h: size.height,
    }, vpSize, padding);
};
export const getMiddleOfViewPort = (vp, vpSize) => {
    const renderedPos = {
        x: vpSize.width / 2,
        y: vpSize.height / 2,
    };
    return renderedPosToLogicalPos(renderedPos, vp);
};
export const isJsxValue = (val) => {
    const isIt = (j) => isDefined(j.ref) && isDefined(j.type) && isDefined(j.props);
    try {
        const j = JSON.parse(val);
        return isIt(j) || (Array.isArray(j) && isIt(j[0]));
    }
    catch (e) {
        return false;
    }
};
export const getInstancesInRect = (selectionBox, viewPort, instances, parentVp, inputsPosition = {}, outputsPosition = {}) => {
    const { from, to } = selectionBox;
    const rect = getSelectionBoxRect(from, to);
    // Handle regular instances
    const selectedInstanceIds = instances
        .filter((ins) => {
        const { pos } = ins;
        const w = calcNodeWidth(ins) * viewPort.zoom * parentVp.zoom;
        const rec2 = {
            ...pos,
            w,
            h: NODE_HEIGHT * viewPort.zoom * parentVp.zoom,
        };
        return intersectRect(rect, rec2) || intersectRect(rec2, rect);
    })
        .map((ins) => ins.id);
    // Handle main inputs - use special "io_input_" prefix to identify them
    const selectedInputs = Object.entries(inputsPosition)
        .filter(([_, pos]) => {
        if (!pos)
            return false;
        const rec2 = {
            ...pos,
            w: calcIoNodeWidth('input') * viewPort.zoom * parentVp.zoom,
            h: NODE_HEIGHT * viewPort.zoom * parentVp.zoom,
        };
        return intersectRect(rect, rec2) || intersectRect(rec2, rect);
    })
        .map(([pinId, _]) => `io_input_${pinId}`);
    // Handle main outputs - use special "io_output_" prefix to identify them
    const selectedOutputs = Object.entries(outputsPosition)
        .filter(([_, pos]) => {
        if (!pos)
            return false;
        const rec2 = {
            ...pos,
            w: calcIoNodeWidth('output') * viewPort.zoom * parentVp.zoom,
            h: NODE_HEIGHT * viewPort.zoom * parentVp.zoom,
        };
        return intersectRect(rect, rec2) || intersectRect(rec2, rect);
    })
        .map(([pinId, _]) => `io_output_${pinId}`);
    return [...selectedInstanceIds, ...selectedInputs, ...selectedOutputs];
};
export const handleInstanceDrag = (node, ins, pos, event, selected, draggingId) => {
    event.preventDefault();
    event.stopPropagation();
    const delta = vSub(pos, ins.pos);
    const newValue = immer.produce(node, (draft) => {
        const foundIns = draft.instances.find((itrIns) => itrIns.id === ins.id);
        if (!foundIns) {
            throw new Error("impossible state dragging instance that does not exist");
        }
        if (selected.includes(ins.id)) {
            const otherInstances = draft.instances.filter((ins) => selected.includes(ins.id) && ins !== foundIns);
            otherInstances.forEach((ins) => {
                ins.pos = vAdd(ins.pos, delta);
            });
        }
        // Update selected IO pins
        selected.forEach(id => {
            // Handle input pins (format: io_input_pinId)
            if (id.startsWith('io_input_')) {
                const pinId = id.substring('io_input_'.length);
                if (draft.inputsPosition[pinId]) {
                    draft.inputsPosition[pinId] = vAdd(draft.inputsPosition[pinId], delta);
                }
            }
            // Handle output pins (format: io_output_pinId)
            else if (id.startsWith('io_output_')) {
                const pinId = id.substring('io_output_'.length);
                if (draft.outputsPosition[pinId]) {
                    draft.outputsPosition[pinId] = vAdd(draft.outputsPosition[pinId], delta);
                }
            }
        });
        foundIns.pos = pos;
    });
    return newValue;
};
export const handleIoPinRename = (node, type, pinId, newPinId) => {
    return immer.produce(node, (draft) => {
        if (type === "input") {
            if (!draft.inputs[pinId]) {
                throw new Error("Pin does not exist");
            }
            draft.inputs[newPinId] = draft.inputs[pinId];
            draft.inputsPosition[newPinId] = draft.inputsPosition[pinId];
            delete draft.inputs[pinId];
            draft.connections = draft.connections.map((conn) => {
                return isExternalConnectionNode(conn.from) && conn.from.pinId === pinId
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
                return isExternalConnectionNode(conn.to) && conn.to.pinId === pinId
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
export const handleChangeNodeInputType = (node, pinId, mode) => {
    return immer.produce(node, (draft) => {
        const input = draft.inputs[pinId];
        if (!input) {
            throw new Error("Wat");
        }
        input.mode = mode;
    });
};
export const getConnectionId = (connectionData) => {
    const { from, to } = connectionData;
    const { insId: fromInsId, pinId: fromPinId } = from;
    const { insId: toInsId, pinId: toPinId } = to;
    return `${fromInsId}${fromPinId}${toInsId}${toPinId}`;
};
export function isMac() {
    var _a;
    try {
        const platform = (_a = window.navigator.platform) !== null && _a !== void 0 ? _a : "n/a";
        return /Mac|iPod|iPhone|iPad/.test(platform);
    }
    catch (e) {
        return false;
    }
}
export const isEventOnCurrentBoard = (e, nodeId) => {
    const targetElem = e.target;
    const closestBoard = targetElem.closest(".visual-node-editor");
    return closestBoard && closestBoard.getAttribute("data-id") === nodeId;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlzdWFsLW5vZGUtZWRpdG9yL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRS9CLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBR0wsd0JBQXdCLEVBRXhCLFlBQVksRUFDWixtQkFBbUIsRUFFbkIsYUFBYSxFQUViLFVBQVUsRUFDVixhQUFhLEVBRWIsV0FBVyxFQUlYLGtCQUFrQixHQUNuQixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFdEUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXRELE9BQU8sRUFBRSxlQUFlLElBQUksZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUd0RSxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsbUJBQW1CO0FBQy9DLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxtQkFBbUI7QUFFaEQsTUFBTSxVQUFVLG9CQUFvQixDQUNsQyxJQUFzQixFQUN0QixLQUFhLEVBQ2IsS0FBYTs7SUFFYixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxL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