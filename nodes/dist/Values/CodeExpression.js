"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const editor_1 = require("@flyde/editor");
const react_1 = __importStar(require("react"));
// Sync with CodeExpression.flyde.ts if changed
const getVariables = (code) => {
    return (code.match(/inputs\.([a-zA-Z]\w*)/g) || []).map((v) => v.replace(/inputs\./, ""));
};
const CodeExpressionEditor = function CodeExpressionEditor(props) {
    var _a;
    const { value, onChange, ports, nodeId, insId } = props;
    const changeValue = (0, react_1.useCallback)((_val) => {
        onChange({ ...value, value: _val });
    }, [value, onChange]);
    const vars = getVariables((_a = value.value) !== null && _a !== void 0 ? _a : "");
    const aiContextValue = react_1.default.useMemo(() => {
        return {
            createCompletion: ports.createAiCompletion,
            enabled: !!ports.createAiCompletion,
        };
    }, [ports.createAiCompletion]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(editor_1.AiCompletionProvider, { value: aiContextValue },
            react_1.default.createElement(editor_1.FormGroup, { label: "Accepts any valid JS code that returns an expression", aiGenerate: {
                    prompt: `You are a master Node JS inline expression generator. You will receive a user's request, and an optional existing value. 
              Your task is to return a single Node JS expression that adheres to the user's request.  You can use the "inputs" object to access the external inputs.
                Example:
                Add 2 numbers: inputs.a + inputs.b
                Uppercase: inputs.name.toUpperCase()
                BMI formula: inputs.weight / (inputs.height * inputs.height)
              
              - Do not write "return" and do not use line breaks. The expression will be evaluated directly.
              - Return plain code, no wrapping code like \`\`\`js or \`\`\` or \`
              - Assume it runs in the server and cannot use any external apis, just an inline expression

              ## Previous expression:
              ${value.value}

              ## User request:
              {{prompt}}
                `,
                    placeholder: "Describe the expression you want to generate",
                    onComplete: (generatedText) => {
                        changeValue(generatedText);
                    },
                    nodeId,
                    insId
                } },
                react_1.default.createElement(editor_1.Textarea, { value: value.value, style: { width: "100%" }, onChange: (e) => changeValue(e.target.value) })),
            react_1.default.createElement("div", { style: { marginTop: "8px" } }, vars.length > 0 ? (react_1.default.createElement("span", { style: { fontSize: "0.875rem", color: "#666" } },
                "External inputs exposed from this expression:",
                " ",
                react_1.default.createElement("em", null, vars.join(", ")))) : (react_1.default.createElement("span", { style: { fontSize: "0.875rem", color: "#666" } }, "Expose external inputs by using the \"inputs\" object. For example, \"inputs.a + inputs.b\" will expose 2 inputs, a and b, and sum them."))))));
};
exports.default = CodeExpressionEditor;
