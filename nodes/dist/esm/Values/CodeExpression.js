import { AiCompletionProvider, FormGroup, Textarea } from "@flyde/editor";
import React, { useCallback } from "react";
// Sync with CodeExpression.flyde.ts if changed
const getVariables = (code) => {
    return (code.match(/inputs\.([a-zA-Z]\w*)/g) || []).map((v) => v.replace(/inputs\./, ""));
};
const CodeExpressionEditor = function CodeExpressionEditor(props) {
    var _a;
    const { value, onChange, ports, nodeId, insId } = props;
    const changeValue = useCallback((_val) => {
        onChange({ ...value, value: _val });
    }, [value, onChange]);
    const vars = getVariables((_a = value.value) !== null && _a !== void 0 ? _a : "");
    const aiContextValue = React.useMemo(() => {
        return {
            createCompletion: ports.createAiCompletion,
            enabled: !!ports.createAiCompletion,
        };
    }, [ports.createAiCompletion]);
    return (React.createElement("div", null,
        React.createElement(AiCompletionProvider, { value: aiContextValue },
            React.createElement(FormGroup, { label: "Accepts any valid JS code that returns an expression", aiGenerate: {
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
                React.createElement(Textarea, { value: value.value, style: { width: "100%" }, onChange: (e) => changeValue(e.target.value) })),
            React.createElement("div", { style: { marginTop: "8px" } }, vars.length > 0 ? (React.createElement("span", { style: { fontSize: "0.875rem", color: "#666" } },
                "External inputs exposed from this expression:",
                " ",
                React.createElement("em", null, vars.join(", ")))) : (React.createElement("span", { style: { fontSize: "0.875rem", color: "#666" } }, "Expose external inputs by using the \"inputs\" object. For example, \"inputs.a + inputs.b\" will expose 2 inputs, a and b, and sum them."))))));
};
export default CodeExpressionEditor;
