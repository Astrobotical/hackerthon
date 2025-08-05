"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectValues = void 0;
const namespace = "Objects";
exports.ObjectValues = {
    id: "Values",
    namespace,
    description: "Emits the values of an object",
    inputs: { object: { description: "Object to get values of" } },
    outputs: { values: { description: "The values of object" } },
    run: ({ object }, { values }) => values.next(Object.values(object)),
};
