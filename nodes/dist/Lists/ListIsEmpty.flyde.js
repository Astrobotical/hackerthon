"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListIsEmpty = void 0;
const namespace = "Lists";
exports.ListIsEmpty = {
    id: "List Is Empty",
    icon: "fa-list",
    namespace,
    description: "Returns true if the list is empty",
    inputs: { list: { description: "List" } },
    outputs: { isEmpty: { description: "Is empty" } },
    run: ({ list }, { isEmpty }) => isEmpty.next(list.length === 0),
};
