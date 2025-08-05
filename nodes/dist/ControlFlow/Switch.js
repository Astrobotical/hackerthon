"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const editor_1 = require("@flyde/editor");
const MAX_CASES = 6;
// Template functions for AI prompts
const createConditionPrompt = (inputs, prevCondition) => `You are an expert JS condition generator. You will receive a user's request for a condition to be used in a Switch component.
Your task is to return a valid JS expression that evaluates to a boolean value based on the user's request.
You can use the "inputs" object to access the inputs to the Switch.

Example conditions:
- inputs.value < 2
- inputs.name === "John"
- inputs.score >= 90 && inputs.attendance > 0.8
- inputs.status.toLowerCase() === "active"

## Currently defined inputs: ${inputs}

## Previous condition:
${prevCondition}

## User request:
{{prompt}}

- Return plain code, no wrapping code like \`\`\`js or \`\`\` or \`
- Do not use "return" statement, just the expression
`;
const createOutputPrompt = (inputs, conditionExpr, prevOutput) => `You are an expert JS expression generator. You will receive a user's request for an output expression to be used in a Switch component.
Your task is to return a valid JS expression based on the user's request.
You can use the "inputs" object to access the inputs to the Switch.

Example outputs:
- inputs.value.toUpperCase()
- inputs.firstName + " " + inputs.lastName
- inputs.price * 0.9
- { name: inputs.name, score: inputs.score }

## Currently defined inputs: ${inputs}
${conditionExpr ? `## This expression will be triggered when the condition is: "${conditionExpr}"` : ''}

## Previous expression:
${prevOutput}

## User request:
{{prompt}}

- Return plain code, no wrapping code like \`\`\`js or \`\`\` or \`
- Do not use "return" statement, just the expression
`;
// Reusable expression input component
const ExpressionInput = ({ label, value, onChange, aiPrompt, placeholder = "Describe the expression", description, nodeId, insId }) => (react_2.default.createElement("div", { style: { marginBottom: "1rem" } },
    react_2.default.createElement(editor_1.FormGroup, { label: label, aiGenerate: {
            prompt: aiPrompt,
            placeholder,
            onComplete: onChange,
            nodeId,
            insId
        } },
        react_2.default.createElement(editor_1.Input, { value: value, onChange: (e) => onChange(e.target.value) })),
    description && (react_2.default.createElement("p", { style: { fontSize: "0.875rem", color: "#666", marginTop: "0.25rem" } }, description))));
const SwitchEditor = function SwitchEditor(props) {
    const { value, onChange, ports, nodeId, insId } = props;
    const aiContextValue = react_2.default.useMemo(() => {
        return {
            createCompletion: ports.createAiCompletion,
            enabled: !!ports.createAiCompletion,
        };
    }, [ports.createAiCompletion]);
    // Helper functions for updating config
    const updateInput = (index, newValue) => {
        const newInputs = [...value.inputs];
        newInputs[index] = newValue;
        onChange({ ...value, inputs: newInputs });
    };
    const removeInput = (index) => {
        const newInputs = [...value.inputs];
        newInputs.splice(index, 1);
        onChange({ ...value, inputs: newInputs });
    };
    const addInput = () => {
        const newInputs = [...value.inputs];
        newInputs.push(`value${newInputs.length + 1}`);
        onChange({ ...value, inputs: newInputs });
    };
    const updateCase = (index, field, newValue) => {
        const newCases = [...value.cases];
        newCases[index] = { ...newCases[index], [field]: newValue };
        onChange({ ...value, cases: newCases });
    };
    const removeCase = (index) => {
        const newCases = [...value.cases];
        newCases.splice(index, 1);
        onChange({ ...value, cases: newCases });
    };
    const addCase = () => {
        const newCases = [...value.cases];
        newCases.push({
            name: `case${newCases.length + 1}`,
            conditionExpression: "",
            outputExpression: "",
        });
        onChange({ ...value, cases: newCases });
    };
    const updateDefaultCase = (enabled, outputExpression = "") => {
        onChange({
            ...value,
            defaultCase: {
                enabled,
                outputExpression: enabled ? outputExpression : undefined,
            },
        });
    };
    const inputsElem = (0, react_1.useMemo)(() => {
        const inputs = value.inputs.map((input, i) => (react_2.default.createElement("div", { key: i, style: { marginBottom: "1rem" } },
            react_2.default.createElement(editor_1.Label, { style: { marginBottom: "0.5rem", display: "block" } },
                "Input name no. ",
                i + 1,
                ":"),
            react_2.default.createElement("div", { style: { display: "flex", gap: "0.5rem" } },
                react_2.default.createElement(editor_1.Input, { value: input, onChange: (e) => updateInput(i, e.target.value) }),
                value.inputs.length > 1 && (react_2.default.createElement(editor_1.Button, { variant: "outline", size: "sm", onClick: () => removeInput(i) }, "X"))))));
        return (react_2.default.createElement("div", null,
            inputs,
            inputs.length < 6 && (react_2.default.createElement(editor_1.Button, { variant: "outline", onClick: addInput, style: { marginTop: "0.5rem" } }, "Add input"))));
    }, [value.inputs]);
    const casesElem = (0, react_1.useMemo)(() => {
        const inputsList = value.inputs.join(", ");
        // Common descriptions
        const conditionDesc = "The condition to evaluate to check whether this case should be activated. any JS expression. You can access the inputs data using the inputs object.";
        const outputDesc = "The expression to output if this case is activated. Accepts any JS expression. You can access the inputs data using the inputs object.";
        const cases = value.cases.map((case_, i) => {
            return (react_2.default.createElement("div", { key: i, style: { marginBottom: "2rem" } },
                react_2.default.createElement("div", { style: { marginBottom: "1rem" } },
                    react_2.default.createElement(editor_1.Label, { style: { marginBottom: "0.5rem", display: "block" } },
                        "Case no. ",
                        i + 1,
                        " name:"),
                    react_2.default.createElement("div", { style: { display: "flex", gap: "0.5rem" } },
                        react_2.default.createElement(editor_1.Input, { value: case_.name, onChange: (e) => updateCase(i, "name", e.target.value) }),
                        value.cases.length > 1 && (react_2.default.createElement(editor_1.Button, { variant: "outline", size: "sm", onClick: () => removeCase(i) }, "X")))),
                react_2.default.createElement(ExpressionInput, { label: `Case no. ${i + 1} condition expression:`, value: case_.conditionExpression, onChange: (val) => updateCase(i, "conditionExpression", val), aiPrompt: createConditionPrompt(inputsList, case_.conditionExpression), placeholder: "Describe the condition (e.g. 'value less than 2')", description: conditionDesc, nodeId: nodeId, insId: insId }),
                react_2.default.createElement(ExpressionInput, { label: `Case no. ${i + 1} output expression:`, value: case_.outputExpression, onChange: (val) => updateCase(i, "outputExpression", val), aiPrompt: createOutputPrompt(inputsList, case_.conditionExpression, case_.outputExpression), placeholder: "Describe what to output when this condition is true", description: outputDesc, nodeId: nodeId, insId: insId })));
        });
        return (react_2.default.createElement("div", null,
            cases,
            cases.length < MAX_CASES && (react_2.default.createElement(editor_1.Button, { variant: "outline", onClick: addCase, style: { marginTop: "0.5rem" } }, "Add case"))));
    }, [value.cases, value.inputs]);
    return (react_2.default.createElement(editor_1.AiCompletionProvider, { value: aiContextValue },
        react_2.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "1.5rem" } },
            inputsElem,
            react_2.default.createElement(editor_1.Separator, null),
            casesElem,
            react_2.default.createElement(editor_1.Separator, null),
            react_2.default.createElement("div", null,
                react_2.default.createElement("div", { style: { marginBottom: "1rem" } },
                    react_2.default.createElement(editor_1.Checkbox, { checked: value.defaultCase.enabled, onCheckedChange: (checked) => updateDefaultCase(!!checked), label: "Enable default case (if no case is activated). If disabled, reaching a case that is not activated will output an error." })),
                value.defaultCase.enabled && (react_2.default.createElement(ExpressionInput, { label: "Default case output expression:", value: value.defaultCase.outputExpression, onChange: (val) => updateDefaultCase(true, val), aiPrompt: createOutputPrompt(value.inputs.join(", "), null, value.defaultCase.outputExpression), placeholder: "Describe what to output when no conditions match", description: "The expression to output if no case is activated. Accepts any JS expression. You can access the inputs data using the inputs object.", nodeId: nodeId, insId: insId }))))));
};
exports.default = SwitchEditor;
