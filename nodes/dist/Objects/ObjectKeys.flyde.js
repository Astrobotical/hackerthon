"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectKeys = void 0;
const namespace = "Objects";
exports.ObjectKeys = {
    id: "Keys",
    icon: "fa-key",
    namespace,
    description: "Emits the keys of an object",
    inputs: { object: { description: "Object to get keys of" } },
    outputs: { keys: { description: "The keys of object" } },
    run: ({ object }, { keys }) => keys.next(Object.keys(object)),
};
