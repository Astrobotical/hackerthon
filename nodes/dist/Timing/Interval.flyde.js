"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = void 0;
const common_1 = require("./common");
const namespace = common_1.TIMING_NAMESPACE;
exports.Interval = {
    id: "Interval",
    namespace,
    menuDisplayName: "Interval",
    icon: "stopwatch",
    menuDescription: "Emits a value every interval",
    description: "Emits a value every interval",
    displayName: "Emits {{value}} every {{time}}ms",
    inputs: {
        value: {
            description: "Value to emit (supports templates)",
            editorType: "json",
        },
        time: {
            defaultValue: 1000,
            description: "Interval",
            editorType: "number",
        },
    },
    outputs: {
        value: { description: "Emitted value" },
    },
    completionOutputs: [],
    run: (inputs, outputs, adv) => {
        const { time, value } = inputs;
        const existingTimer = adv.state.get("timer");
        if (existingTimer) {
            clearInterval(existingTimer);
        }
        const timer = setInterval(() => {
            outputs.value.next(value);
        }, time);
        adv.state.set("timer", timer);
        adv.onCleanup(() => {
            clearInterval(timer);
        });
    },
};
