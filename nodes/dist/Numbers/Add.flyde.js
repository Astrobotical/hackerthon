"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Add = void 0;
// for backwards compatibility
exports.Add = {
    id: "Add",
    description: "Add two numbers",
    inputs: {
        n1: {},
        n2: {},
    },
    outputs: {
        sum: {
            description: "The sum of the two numbers",
        },
    },
    run: (inputs, { sum }) => {
        sum.next(inputs.n1 + inputs.n2);
    },
};
