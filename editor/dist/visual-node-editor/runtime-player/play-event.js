"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playEvent = exports.cancelTimers = void 0;
const core_1 = require("@flyde/core");
const dom_ids_1 = require("../dom-ids");
const BLINK_TIMEOUT = 20000; // also change animation time in scss
const debug = (0, core_1.debugLogger)("runtime-player:play-event");
const getCancelTimerKey = (event, suffix) => {
    /*
        on inputs and outputs the id is the ins + pin, and on others it's ins
        this ensures that clearing timeouts work across relevant elements only
       */
    if (event.type === core_1.DebuggerEventType.INPUT_CHANGE ||
        event.type === core_1.DebuggerEventType.OUTPUT_CHANGE) {
        return `${(0, core_1.fullInsIdPath)(event.insId, event.ancestorsInsIds)}.${event.pinId}`;
    }
    else {
        return (0, core_1.fullInsIdPath)(event.insId, event.ancestorsInsIds);
    }
};
exports.cancelTimers = new Map();
const playEvent = (event) => {
    var _a, _b;
    switch (event.type) {
        case core_1.DebuggerEventType.INPUT_CHANGE:
        case core_1.DebuggerEventType.OUTPUT_CHANGE: {
            const { pinId, insId, ancestorsInsIds } = event;
            const pinType = event.type === core_1.DebuggerEventType.INPUT_CHANGE ? "input" : "output";
            const domIds = [
                (0, dom_ids_1.getPinDomId)({
                    fullInsIdPath: (0, core_1.fullInsIdPath)(insId, ancestorsInsIds),
                    pinId,
                    pinType,
                    isMain: true,
                }),
            ];
            const mainPinDomId = (0, dom_ids_1.getMainPinDomId)(insId, pinId, pinType);
            const mainPinElement = (_a = document.getElementById(mainPinDomId)) === null || _a === void 0 ? void 0 : _a.parentElement;
            if (mainPinElement) {
                mainPinElement.setAttribute("data-runtime", "done"); //should be "active", but wanted to piggy back existing node css
            }
            else {
                debug(`No DOM element with Id [${mainPinDomId}] found to play event`, event);
            }
            /* events from the root instance are not shown on "regular" pins but just on "main" ones */
            if (insId !== core_1.ROOT_INS_ID) {
                domIds.push((0, dom_ids_1.getPinDomId)({
                    fullInsIdPath: (0, core_1.fullInsIdPath)(insId, ancestorsInsIds),
                    pinId,
                    pinType,
                    isMain: false,
                }));
            }
            domIds.forEach((domId, idx) => {
                const cancelTimerKey = getCancelTimerKey(event, `${idx}`);
                clearTimeout(exports.cancelTimers.get(cancelTimerKey));
                const element = document.getElementById(domId);
                const connDomIdAttr = `${insId}.${pinId}`;
                const connectionElems = event.type === core_1.DebuggerEventType.OUTPUT_CHANGE
                    ? document.querySelectorAll(`[data-from-id="${connDomIdAttr}"]`)
                    : [];
                if (!element) {
                    debug(`No DOM element with Id [${domId}] found to play event`, event);
                }
                else {
                    clearTimeout(exports.cancelTimers.get(cancelTimerKey));
                    element.removeAttribute("data-runtime");
                    connectionElems.forEach((connElem) => {
                        connElem.removeAttribute("data-runtime");
                    });
                    setTimeout(() => {
                        element.setAttribute("data-runtime", "active");
                        connectionElems.forEach((connElem) => {
                            connElem.setAttribute("data-runtime", "active");
                        });
                    }, 0);
                    const timer = setTimeout(() => {
                        element.removeAttribute("data-runtime");
                        connectionElems.forEach((connElem) => {
                            connElem.removeAttribute("data-runtime");
                        });
                        exports.cancelTimers.delete(cancelTimerKey);
                    }, BLINK_TIMEOUT);
                    exports.cancelTimers.set(getCancelTimerKey(event), timer);
                }
            });
            break;
        }
        case core_1.DebuggerEventType.PROCESSING_CHANGE: {
            const { insId, ancestorsInsIds } = event;
            const domIds = [(0, dom_ids_1.getMainInstanceIndicatorDomId)(insId, ancestorsInsIds)];
            if (insId !== core_1.ROOT_INS_ID) {
                domIds.push((0, dom_ids_1.getInstanceDomId)(insId, ancestorsInsIds));
            }
            domIds.forEach((domId, idx) => {
                var _a;
                const timerKey = getCancelTimerKey(event, `${idx}`);
                const element = (_a = document.getElementById(domId)) === null || _a === void 0 ? void 0 : _a.parentElement;
                if (!element) {
                    debug(`No DOM element with Id [${domId}] found to play event`, event);
                    return;
                }
                if (event.val === true) {
                    element.setAttribute("data-runtime", "processing");
                    clearTimeout(exports.cancelTimers.get(timerKey));
                }
                else {
                    // if the processing is done, but there was an error, don't remove the error indication
                    element.removeAttribute("data-runtime");
                    setTimeout(() => {
                        if (element.getAttribute("data-runtime") === "error") {
                            return;
                        }
                        element.setAttribute("data-runtime", "done");
                    }, 0);
                    const timer = setTimeout(() => {
                        element.removeAttribute("data-runtime");
                        exports.cancelTimers.delete(timerKey);
                    }, BLINK_TIMEOUT);
                    exports.cancelTimers.set(timerKey, timer);
                }
            });
            break;
        }
        case core_1.DebuggerEventType.ERROR: {
            const { insId, ancestorsInsIds } = event;
            const domIds = [(0, dom_ids_1.getMainInstanceIndicatorDomId)(insId, ancestorsInsIds)];
            if (insId !== core_1.ROOT_INS_ID) {
                domIds.push((0, dom_ids_1.getInstanceDomId)(insId, ancestorsInsIds));
            }
            domIds.forEach((domId, idx) => {
                var _a;
                const timerKey = getCancelTimerKey(event, `${idx}`);
                const element = (_a = document.getElementById(domId)) === null || _a === void 0 ? void 0 : _a.parentElement;
                if (!element) {
                    debug(`No DOM element with Id [${domId}] found to play event`, event);
                    return;
                }
                clearTimeout(exports.cancelTimers.get(timerKey));
                element.removeAttribute("data-runtime");
                setTimeout(() => {
                    element.setAttribute("data-runtime", "error");
                });
                const timer = setTimeout(() => {
                    element.removeAttribute("data-runtime");
                    exports.cancelTimers.delete(timerKey);
                }, BLINK_TIMEOUT);
                exports.cancelTimers.set(timerKey, timer);
            });
            const fakeErrorPinEvent = {
                ...event,
                type: core_1.DebuggerEventType.OUTPUT_CHANGE,
                pinId: core_1.ERROR_PIN_ID,
            };
            (0, exports.playEvent)(fakeErrorPinEvent);
            break;
        }
        case core_1.DebuggerEventType.INPUTS_STATE_CHANGE: {
            const { insId, ancestorsInsIds } = event;
            (0, core_1.entries)(event.val).forEach(([k, v]) => {
                const domId = (0, dom_ids_1.getPinDomId)({
                    fullInsIdPath: (0, core_1.fullInsIdPath)(insId, ancestorsInsIds),
                    pinId: k,
                    pinType: "input",
                    isMain: false,
                });
                const element = document.getElementById(domId);
                if (!element) {
                    debug(`No DOM element with Id [${domId}] found to play event`, event);
                    return;
                }
                if (v > 0) {
                    element.setAttribute("data-runtime-queue", `${v}`);
                }
                else {
                    element.removeAttribute("data-runtime-queue");
                }
            });
            const someWaiting = Object.values(event.val).some((v) => (v !== null && v !== void 0 ? v : 0) > 0);
            const instanceDomId = (0, dom_ids_1.getInstanceDomId)(insId, ancestorsInsIds);
            const instanceElem = (_b = document.getElementById(instanceDomId)) === null || _b === void 0 ? void 0 : _b.parentElement;
            if (!instanceElem) {
                debug(`No DOM element with Id [${instanceDomId}] found to play event`, event);
                return;
            }
            if (someWaiting && !instanceElem.getAttribute("data-runtime")) {
                instanceElem.setAttribute("data-runtime", "waiting");
            }
            break;
        }
    }
};
exports.playEvent = playEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS1ldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvcnVudGltZS1wbGF5ZXIvcGxheS1ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FRcUI7QUFDckIsd0NBS29CO0FBRXBCLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxDQUFDLHFDQUFxQztBQUVsRSxNQUFNLEtBQUssR0FBRyxJQUFBLGtCQUFXLEVBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUV2RCxNQUFNLGlCQUFpQixHQUFHLENBQUMsS0FBb0IsRUFBRSxNQUFlLEVBQUUsRUFBRTtJQUNsRTs7O1NBR0s7SUFDTCxJQUNFLEtBQUssQ0FBQyxJQUFJLEtBQUssd0JBQWlCLENBQUMsWUFBWTtRQUM3QyxLQUFLLENBQUMsSUFBSSxLQUFLLHdCQUFpQixDQUFDLGFBQWEsRUFDOUMsQ0FBQztRQUNELE9BQU8sR0FBRyxJQUFBLG9CQUFhLEVBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQ25FLEVBQUUsQ0FBQztJQUNQLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyxJQUFBLG9CQUFhLEVBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDM0QsQ0FBQztBQUNILENBQUMsQ0FBQztBQUNXLFFBQUEsWUFBWSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFFL0IsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFvQixFQUFFLEVBQUU7O0lBQ2hELFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLEtBQUssd0JBQWlCLENBQUMsWUFBWSxDQUFDO1FBQ3BDLEtBQUssd0JBQWlCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxlQUFlLEVB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