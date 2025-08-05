"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Throttle = void 0;
const common_1 = require("./common");
const namespace = common_1.TIMING_NAMESPACE;
exports.Throttle = {
    id: "Throttle",
    namespace,
    menuDisplayName: "Throttle",
    icon: "fa-hand",
    displayName: "Throttle {{delayMs}}ms",
    menuDescription: "Limits the number of times a value is emitted to once per time configured. Supports both static and dynamic intervals.",
    description: (config) => {
        return `Throttles input values with an interval of ${(0, common_1.timeToString)(config.delayMs)}.`;
    },
    inputs: {
        value: { description: "Value to throttle", mode: "reactive" },
        delayMs: {
            defaultValue: 420,
            description: "Throttle interval in milliseconds",
            editorType: "number",
            editorTypeData: { min: 0 },
        },
    },
    outputs: {
        unthrottledValue: { description: "Unthrottled value" },
    },
    completionOutputs: [],
    run: async (inputs, outputs, adv) => {
        const { unthrottledValue } = outputs;
        const { value, delayMs } = inputs;
        const promise = adv.state.get("promise");
        if (promise) {
            adv.onError(new Error(`Throttle: Value dropped`));
            return;
        }
        else {
            unthrottledValue.next(value);
            const promise = new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, delayMs);
            });
            adv.state.set("promise", promise);
            await promise;
            adv.state.set("promise", undefined);
        }
    },
};
