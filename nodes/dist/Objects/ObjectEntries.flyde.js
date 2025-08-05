"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectEntries = void 0;
const namespace = "Objects";
exports.ObjectEntries = {
    id: "Entries",
    icon: "fa-box",
    namespace,
    description: "Emits the entries of an object",
    inputs: { object: { description: "Object to get entries of" } },
    outputs: { entries: { description: "The entries of object" } },
    run: ({ object }, { entries }) => entries.next(Object.entries(object)),
};
