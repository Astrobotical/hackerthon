"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publish = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PubSub = require("pubsub-js");
const namespace = "Control Flow";
exports.Publish = {
    id: "Publish",
    namespace,
    description: "Publishes a value by a key to all listeners in the current flow. Use 'Subscribe' to listen to events.",
    inputs: {
        key: {
            mode: "required",
            description: "A key to use to subscribe to values",
        },
        value: { mode: "required" },
    },
    outputs: {},
    run: function (inputs, _, adv) {
        const nsKey = `${adv.ancestorsInsIds}__${inputs.key}`;
        console.log("Publishing", nsKey, inputs.value);
        PubSub.publish(nsKey, inputs.value);
    },
};
