"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateOps = void 0;
const core_1 = require("@flyde/core");
exports.DateOps = {
    id: "DateOps",
    displayName: "Date {{operation}}",
    menuDisplayName: "Date Operations",
    icon: "calendar",
    namespace: "Dates",
    description: "Performs various date operations",
    inputs: {
        operation: {
            defaultValue: "now",
            label: "Operation",
            description: "The date operation to perform",
            editorType: "select",
            typeConfigurable: false,
            editorTypeData: {
                options: ["now", "nowString", "nowISOString", "nowUnixTime"],
            },
        },
    },
    outputs: {
        value: (0, core_1.nodeOutput)(),
    },
    run: (inputs, outputs, adv) => {
        const { operation } = inputs;
        try {
            let result;
            switch (operation) {
                case "now":
                    result = new Date();
                    break;
                case "nowString":
                    result = new Date().toString();
                    break;
                case "nowISOString":
                    result = new Date().toISOString();
                    break;
                case "nowUnixTime":
                    result = new Date().getTime();
                    break;
                default:
                    throw new Error(`Unknown operation: ${operation}`);
            }
            outputs.value.next(result);
        }
        catch (error) {
            console.error("Error in DateOps:", error);
            adv.onError(error);
        }
    },
};
