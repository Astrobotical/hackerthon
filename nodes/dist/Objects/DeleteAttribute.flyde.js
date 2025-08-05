"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAttribute = void 0;
const namespace = "Objects";
exports.DeleteAttribute = {
    id: "Delete Attribute",
    icon: "fa-box",
    namespace,
    description: "Deletes an attribute from an object",
    inputs: {
        object: { description: "Object to delete attribute from" },
        attribute: { description: "Attribute to delete" },
    },
    outputs: {
        object: {
            description: "The object with the attribute deleted",
        },
    },
    run: ({ object, attribute }, { object: outputObject }) => {
        // delete attribute from object while supporting dot notation
        const attributes = attribute.value.split(".");
        const last = attributes.pop();
        const target = attributes.reduce((obj, i) => obj[i], object.value);
        delete target[last];
        outputObject.next(object.value);
    },
};
