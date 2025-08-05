import { DebuggerEventType, debugLogger, entries, ERROR_PIN_ID, fullInsIdPath, ROOT_INS_ID, } from "@flyde/core";
import { getInstanceDomId, getMainInstanceIndicatorDomId, getMainPinDomId, getPinDomId, } from "../dom-ids";
const BLINK_TIMEOUT = 20000; // also change animation time in scss
const debug = debugLogger("runtime-player:play-event");
const getCancelTimerKey = (event, suffix) => {
    /*
        on inputs and outputs the id is the ins + pin, and on others it's ins
        this ensures that clearing timeouts work across relevant elements only
       */
    if (event.type === DebuggerEventType.INPUT_CHANGE ||
        event.type === DebuggerEventType.OUTPUT_CHANGE) {
        return `${fullInsIdPath(event.insId, event.ancestorsInsIds)}.${event.pinId}`;
    }
    else {
        return fullInsIdPath(event.insId, event.ancestorsInsIds);
    }
};
export const cancelTimers = new Map();
export const playEvent = (event) => {
    var _a, _b;
    switch (event.type) {
        case DebuggerEventType.INPUT_CHANGE:
        case DebuggerEventType.OUTPUT_CHANGE: {
            const { pinId, insId, ancestorsInsIds } = event;
            const pinType = event.type === DebuggerEventType.INPUT_CHANGE ? "input" : "output";
            const domIds = [
                getPinDomId({
                    fullInsIdPath: fullInsIdPath(insId, ancestorsInsIds),
                    pinId,
                    pinType,
                    isMain: true,
                }),
            ];
            const mainPinDomId = getMainPinDomId(insId, pinId, pinType);
            const mainPinElement = (_a = document.getElementById(mainPinDomId)) === null || _a === void 0 ? void 0 : _a.parentElement;
            if (mainPinElement) {
                mainPinElement.setAttribute("data-runtime", "done"); //should be "active", but wanted to piggy back existing node css
            }
            else {
                debug(`No DOM element with Id [${mainPinDomId}] found to play event`, event);
            }
            /* events from the root instance are not shown on "regular" pins but just on "main" ones */
            if (insId !== ROOT_INS_ID) {
                domIds.push(getPinDomId({
                    fullInsIdPath: fullInsIdPath(insId, ancestorsInsIds),
                    pinId,
                    pinType,
                    isMain: false,
                }));
            }
            domIds.forEach((domId, idx) => {
                const cancelTimerKey = getCancelTimerKey(event, `${idx}`);
                clearTimeout(cancelTimers.get(cancelTimerKey));
                const element = document.getElementById(domId);
                const connDomIdAttr = `${insId}.${pinId}`;
                const connectionElems = event.type === DebuggerEventType.OUTPUT_CHANGE
                    ? document.querySelectorAll(`[data-from-id="${connDomIdAttr}"]`)
                    : [];
                if (!element) {
                    debug(`No DOM element with Id [${domId}] found to play event`, event);
                }
                else {
                    clearTimeout(cancelTimers.get(cancelTimerKey));
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
                        cancelTimers.delete(cancelTimerKey);
                    }, BLINK_TIMEOUT);
                    cancelTimers.set(getCancelTimerKey(event), timer);
                }
            });
            break;
        }
        case DebuggerEventType.PROCESSING_CHANGE: {
            const { insId, ancestorsInsIds } = event;
            const domIds = [getMainInstanceIndicatorDomId(insId, ancestorsInsIds)];
            if (insId !== ROOT_INS_ID) {
                domIds.push(getInstanceDomId(insId, ancestorsInsIds));
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
                    clearTimeout(cancelTimers.get(timerKey));
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
                        cancelTimers.delete(timerKey);
                    }, BLINK_TIMEOUT);
                    cancelTimers.set(timerKey, timer);
                }
            });
            break;
        }
        case DebuggerEventType.ERROR: {
            const { insId, ancestorsInsIds } = event;
            const domIds = [getMainInstanceIndicatorDomId(insId, ancestorsInsIds)];
            if (insId !== ROOT_INS_ID) {
                domIds.push(getInstanceDomId(insId, ancestorsInsIds));
            }
            domIds.forEach((domId, idx) => {
                var _a;
                const timerKey = getCancelTimerKey(event, `${idx}`);
                const element = (_a = document.getElementById(domId)) === null || _a === void 0 ? void 0 : _a.parentElement;
                if (!element) {
                    debug(`No DOM element with Id [${domId}] found to play event`, event);
                    return;
                }
                clearTimeout(cancelTimers.get(timerKey));
                element.removeAttribute("data-runtime");
                setTimeout(() => {
                    element.setAttribute("data-runtime", "error");
                });
                const timer = setTimeout(() => {
                    element.removeAttribute("data-runtime");
                    cancelTimers.delete(timerKey);
                }, BLINK_TIMEOUT);
                cancelTimers.set(timerKey, timer);
            });
            const fakeErrorPinEvent = {
                ...event,
                type: DebuggerEventType.OUTPUT_CHANGE,
                pinId: ERROR_PIN_ID,
            };
            playEvent(fakeErrorPinEvent);
            break;
        }
        case DebuggerEventType.INPUTS_STATE_CHANGE: {
            const { insId, ancestorsInsIds } = event;
            entries(event.val).forEach(([k, v]) => {
                const domId = getPinDomId({
                    fullInsIdPath: fullInsIdPath(insId, ancestorsInsIds),
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
            const instanceDomId = getInstanceDomId(insId, ancestorsInsIds);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS1ldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvcnVudGltZS1wbGF5ZXIvcGxheS1ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxPQUFPLEVBQ1AsWUFBWSxFQUNaLGFBQWEsRUFDYixXQUFXLEdBQ1osTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUNMLGdCQUFnQixFQUNoQiw2QkFBNkIsRUFDN0IsZUFBZSxFQUNmLFdBQVcsR0FDWixNQUFNLFlBQVksQ0FBQztBQUVwQixNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsQ0FBQyxxQ0FBcUM7QUFFbEUsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFFdkQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEtBQW9CLEVBQUUsTUFBZSxFQUFFLEVBQUU7SUFDbEU7OztTQUdLO0lBQ0wsSUFDRSxLQUFLLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDLFlBQVk7UUFDN0MsS0FBSyxDQUFDLElBQUksS0FBSyxpQkFBaUIsQ0FBQyxhQUFhLEVBQzlDLENBQUM7UUFDRCxPQUFPLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUNuRSxFQUFFLENBQUM7SUFDUCxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzNELENBQUM7QUFDSCxDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUV0QyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFvQixFQUFFLEVBQUU7O0lBQ2hELFFB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