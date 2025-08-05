"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetListElement = void 0;
const namespace = "Lists";
exports.GetListElement = {
    id: "Get List Element",
    icon: "fa-list",
    namespace,
    description: "Returns the element at the specified index",
    inputs: {
        list: { description: "List" },
        index: { description: "Index" },
    },
    outputs: { element: { description: "Element" } },
    run: ({ list, index }, { element }) => element.next(list[index]),
};
