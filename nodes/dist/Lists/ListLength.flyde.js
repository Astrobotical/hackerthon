"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListLength = void 0;
const namespace = "Lists";
exports.ListLength = {
    id: "List Length",
    icon: "fa-list",
    namespace,
    description: "Returns the length of a list",
    inputs: { list: { description: "List" } },
    outputs: { length: { description: "Length" } },
    run: ({ list }, { length }) => length.next(list.length),
};
