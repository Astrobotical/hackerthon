"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFrom = void 0;
const core_1 = require("@flyde/core");
exports.listFrom = {
    id: "ListFrom",
    namespace: "Lists",
    mode: "advanced",
    menuDisplayName: "Merge to List",
    defaultConfig: {
        count: (0, core_1.configurableValue)("number", 2),
    },
    menuDescription: "Receives a list of values and creates a list (array) from them",
    displayName: (config) => `List from ${config.count}`,
    description: (config) => `Creates a list from ${config.count} values`,
    icon: "list",
    inputs: (config) => Object.fromEntries(Array.from({ length: config.count.value }, (_, i) => [`item${i + 1}`, {}])),
    outputs: {
        list: { description: "List containing all values" },
    },
    run: (inputs, outputs, adv) => {
        const { count } = adv.context.config;
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(inputs[`item${i + 1}`]);
        }
        outputs.list.next(result);
    },
    editorConfig: {
        type: "structured",
        fields: [
            {
                type: "number",
                label: "Count",
                description: "Number of items to create",
                configKey: "count",
                typeConfigurable: false,
            },
        ],
    },
};
