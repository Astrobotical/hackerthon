"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flatten = void 0;
const namespace = "Lists";
exports.Flatten = {
    id: "Flatten",
    namespace,
    description: "Flattens a list of lists into a single list",
    inputs: { list: { description: "The list of lists" } },
    outputs: { list: { description: "The resulting list" } },
    run: ({ list }, { list: outputList }) => {
        outputList.next(list.reduce((acc, item) => [...acc, ...item], []));
    },
    icon: "fa-compress",
};
