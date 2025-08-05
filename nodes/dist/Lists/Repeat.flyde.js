"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repeat = void 0;
const namespace = "Lists";
exports.Repeat = {
    id: "Repeat",
    icon: "fa-list",
    namespace,
    description: "Repeats a value a number of times",
    inputs: {
        value: { description: "Value to repeat" },
        times: { description: "How many times will the value be repeated" },
    },
    outputs: { list: { description: "List" } },
    run: ({ value, times }, { list }) => {
        const result = [];
        for (let i = 0; i < times; i++) {
            result.push(value);
        }
        return list.next(result);
    },
};
