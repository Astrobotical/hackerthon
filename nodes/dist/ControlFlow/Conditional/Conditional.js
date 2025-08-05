"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const editor_1 = require("@flyde/editor");
const react_1 = __importDefault(require("react"));
const editor_2 = require("@flyde/editor");
// copied from Conditional.flyde.ts
var ConditionType;
(function (ConditionType) {
    ConditionType["Equal"] = "EQUAL";
    ConditionType["NotEqual"] = "NOT_EQUAL";
    ConditionType["Contains"] = "CONTAINS";
    ConditionType["NotContains"] = "NOT_CONTAINS";
    ConditionType["RegexMatches"] = "REGEX_MATCHES";
    ConditionType["Exists"] = "EXISTS";
    ConditionType["NotExists"] = "NOT_EXISTS";
})(ConditionType || (ConditionType = {}));
const conditionEnumToLabel = {
    [ConditionType.Equal]: "Equal",
    [ConditionType.NotEqual]: "Not Equal",
    [ConditionType.RegexMatches]: "Regex Matches",
    [ConditionType.Contains]: "Contains (string or array)",
    [ConditionType.NotContains]: "Not Contains (string or array)",
    [ConditionType.Exists]: "Exists (not null, undefined, or empty)",
    [ConditionType.NotExists]: "Does Not Exist (null, undefined, or empty)",
};
const leftConfig = {
    type: "string",
    configKey: "leftOperand",
    label: "Left Operand",
};
const rightConfig = {
    type: "string",
    configKey: "rightOperand",
    label: "Right Operand",
};
const ConditionalEditor = function ConditionalEditor(props) {
    const { value, onChange, ports, nodeId, insId } = props;
    const showRightOperand = ![
        ConditionType.Exists,
        ConditionType.NotExists,
    ].includes(value.condition.type);
    return (react_1.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "1rem" } },
        react_1.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem" } },
            react_1.default.createElement("label", { style: { fontSize: "0.875rem", fontWeight: 500 } }, "Condition Type"),
            react_1.default.createElement(editor_1.Select, { value: value.condition.type, onValueChange: (val) => onChange({
                    ...value,
                    condition: {
                        type: val,
                    },
                }) },
                react_1.default.createElement(editor_1.SelectTrigger, null,
                    react_1.default.createElement(editor_1.SelectValue, null)),
                react_1.default.createElement(editor_1.SelectContent, null, Object.entries(conditionEnumToLabel).map(([value, label]) => (react_1.default.createElement(editor_1.SelectItem, { key: value, value: value }, label)))))),
        (value.condition.type === ConditionType.Contains ||
            value.condition.type === ConditionType.NotContains) && (react_1.default.createElement("div", { style: { fontSize: "0.875rem", color: "var(--muted-foreground)" } }, "For \"Contains\" and \"Not Contains\", the input value can be a string or an array. If it's a string, it checks if the string contains the compared value. If it's an array, it checks if the array includes the compared value.")),
        react_1.default.createElement(editor_1.Separator, null),
        react_1.default.createElement(editor_2.ConfigurableFieldEditor, { ports: ports, value: value.leftOperand, onChange: (val) => {
                onChange({
                    ...value,
                    leftOperand: val,
                });
            }, config: leftConfig, nodeId: nodeId, insId: insId }),
        showRightOperand && (react_1.default.createElement(editor_2.ConfigurableFieldEditor, { ports: ports, value: value.rightOperand, onChange: (val) => {
                onChange({
                    ...value,
                    rightOperand: val,
                });
            }, config: rightConfig, nodeId: nodeId, insId: insId }))));
};
exports.default = ConditionalEditor;
