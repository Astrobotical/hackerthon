"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Remove = void 0;
const namespace = "Lists";
exports.Remove = {
    id: "Remove Item",
    namespace,
    description: "Removes an item from a list",
    inputs: {
        list: { description: "The list" },
        item: { description: "The item to remove" },
    },
    outputs: { list: { description: "The resulting list" } },
    run: ({ list, item }, { list: outputList }) => {
        outputList.next(list.filter((i) => i !== item));
    },
    icon: "fa-minus",
};
