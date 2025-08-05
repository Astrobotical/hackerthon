"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reverse = void 0;
const namespace = "Lists";
exports.Reverse = {
    id: "Reverse",
    icon: "fa-list",
    namespace,
    description: "Reverses a list",
    inputs: { list: { description: "List" } },
    outputs: { reversed: { description: "Reversed list" } },
    run: ({ list }, { reversed }) => reversed.next(list.reverse()),
};
