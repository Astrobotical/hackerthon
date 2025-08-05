"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Concat = void 0;
exports.Concat = {
    id: "Concat",
    description: "Concatenate two strings",
    inputs: {
        a: {
            description: "The first string",
        },
        b: {
            description: "The second string",
        },
    },
    outputs: {
        value: {
            description: "The concatenated string",
        },
    },
    run: (inputs, { value }) => {
        value.next(inputs.a + inputs.b);
    },
};
