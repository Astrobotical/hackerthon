"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeExpression = void 0;
const getVariables = (code) => {
    return (code.match(/inputs\.([a-zA-Z]\w*)/g) || []).map((v) => v.replace(/inputs\./, ""));
};
exports.CodeExpression = {
    id: "CodeExpression",
    namespace: "Values",
    mode: "advanced",
    icon: "code",
    menuDisplayName: "JS Expression",
    menuDescription: "Evaluates a JS expression. Supports dynamic variables",
    displayName: () => "Code Expression",
    description: (config) => `Evaluates the expression \`${config.value}\``,
    aliases: ["JS", "JavaScript", "Custom"],
    defaultConfig: {
        value: "`Hello ${inputs.firstName} ${inputs.lastName}`",
    },
    inputs: (config) => {
        var _a, _b;
        const inputNames = getVariables((_a = config.value) !== null && _a !== void 0 ? _a : "");
        return Object.fromEntries((_b = inputNames.map((input) => [input, {}])) !== null && _b !== void 0 ? _b : []);
    },
    outputs: () => ({
        value: {
            displayName: "Value",
            description: "The result of the expression evaluation",
        },
    }),
    run: (inputs, outputs, adv) => {
        try {
            const resFn = eval(`(inputs, adv) => (${adv.context.config.value})`);
            outputs.value.next(resFn(inputs, adv));
        }
        catch (e) {
            adv.onError(e);
        }
    },
    editorConfig: {
        type: "custom",
        editorComponentBundlePath: "../../dist/ui/CodeExpression.js",
    },
};
