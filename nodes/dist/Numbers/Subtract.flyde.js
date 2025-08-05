"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subtract = void 0;
// for backwards compatibility
exports.Subtract = {
    id: "Subtract",
    description: "Subtract two numbers",
    inputs: {
        n1: {},
        n2: {},
    },
    outputs: {
        difference: {
            description: "The difference of the two numbers",
        },
    },
    run: (inputs, { difference }) => {
        difference.next(inputs.n1 - inputs.n2);
    },
};
