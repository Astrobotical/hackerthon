"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prepend = void 0;
const namespace = "Lists";
exports.Prepend = {
    id: "Prepend",
    namespace,
    description: "Prepends an item to a list",
    inputs: {
        list: { description: "The list" },
        item: { description: "The item to prepend" },
    },
    outputs: { list: { description: "The resulting list" } },
    run: ({ list, item }, { list: outputList }) => {
        outputList.next([item, ...list]);
    },
    icon: "fa-arrow-up",
};
