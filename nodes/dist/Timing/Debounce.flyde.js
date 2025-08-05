"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debounce = void 0;
const common_1 = require("./common");
const namespace = common_1.TIMING_NAMESPACE;
exports.Debounce = {
    id: "Debounce",
    namespace,
    menuDisplayName: "Debounce",
    icon: "hourglass",
    displayName: "Debounce {{delayMs}}ms",
    menuDescription: "Emits the last value received after being idle for a given amount of milliseconds. Supports both static and dynamic delays.",
    description: (config) => {
        return `Debounces input values with a delay of ${(0, common_1.timeToString)(config.delayMs)}.`;
    },
    inputs: {
        value: {
            description: "Value to debounce",
            mode: "reactive",
        },
        delayMs: {
            defaultValue: 420,
            description: "Debounce delay in milliseconds",
            editorType: "number",
            editorTypeData: { min: 0 },
        },
    },
    outputs: {
        debouncedValue: { description: "Debounced value" },
    },
    completionOutputs: ["debouncedValue"],
    run: ({ value, delayMs }, outputs, adv) => {
        const { debouncedValue } = outputs;
        const timer = adv.state.get("timer");
        if (timer) {
            clearTimeout(timer);
        }
        const newTimer = setTimeout(() => {
            debouncedValue.next(value);
        }, delayMs);
        adv.state.set("timer", newTimer);
        adv.onCleanup(() => {
            clearTimeout(timer);
        });
    },
};
