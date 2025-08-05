"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slice = void 0;
const namespace = "Lists";
exports.Slice = {
    id: "Slice",
    namespace,
    description: "Returns a slice of a list from the specified start index to the specified end index",
    inputs: {
        list: { description: "The list" },
        start: { description: "The index to start slicing from" },
        end: { description: "The index to end slicing at" },
    },
    outputs: { list: { description: "The resulting list" } },
    run: ({ list, start, end }, { list: outputList }) => {
        outputList.next(list.slice(start, end));
    },
    icon: "fa-cut",
};
