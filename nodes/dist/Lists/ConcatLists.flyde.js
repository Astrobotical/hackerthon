"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcatLists = void 0;
const namespace = "Lists";
exports.ConcatLists = {
    id: "Concat Lists",
    icon: "fa-list",
    namespace,
    description: "Concatenates two lists",
    inputs: {
        list1: { description: "First list" },
        list2: { description: "Second list" },
    },
    outputs: { list: { description: "Concatenated list" } },
    run: ({ list1, list2 }, { list }) => list.next([...list1, ...list2]),
};
