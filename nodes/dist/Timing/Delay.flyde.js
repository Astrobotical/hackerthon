"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delay = void 0;
const common_1 = require("./common");
const namespace = common_1.TIMING_NAMESPACE;
exports.Delay = {
    id: "Delay",
    menuDisplayName: "Delay",
    namespace,
    icon: "clock",
    menuDescription: "Delays a value by a given amount of time. Supports both static and dynamic delays.",
    description: (config) => {
        if (typeof config.delayMs === "number") {
            return `Delays a value by ${(0, common_1.timeToString)(config.delayMs)}.`;
        }
        else {
            return `Delays a value by ${config.delayMs}.`;
        }
    },
    inputs: {
        value: {
            label: "Value",
            description: "Value to delay",
        },
        delayMs: {
            defaultValue: 1000,
            label: "Delay (ms)",
            description: "Delay in milliseconds",
        },
    },
    outputs: {
        delayedValue: { description: "Delayed value" },
    },
    completionOutputs: ["delayedValue"],
    run: async (inputs, outputs) => {
        const { delayedValue } = outputs;
        const { delayMs } = inputs;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayedValue.next(inputs.value);
    },
};
