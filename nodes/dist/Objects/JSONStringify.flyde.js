"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONStringify = void 0;
const namespace = "Objects";
exports.JSONStringify = {
    id: "JSON Stringify",
    icon: "fa-pen-fancy",
    namespace,
    description: "Stringifies an object into a JSON string",
    inputs: { object: { description: "Object to stringify" } },
    outputs: { json: { description: "The stringified JSON" } },
    run: ({ object }, { json }) => json.next(JSON.stringify(object, null, "\t")),
};
