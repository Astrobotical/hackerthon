import { ConfigurableValue } from "@flyde/core";
import { CodeNode } from "@flyde/core";
declare enum ConditionType {
    Equal = "EQUAL",
    NotEqual = "NOT_EQUAL",
    Contains = "CONTAINS",
    NotContains = "NOT_CONTAINS",
    RegexMatches = "REGEX_MATCHES",
    Exists = "EXISTS",
    NotExists = "NOT_EXISTS"
}
export interface ConditionalConfig {
    condition: {
        type: ConditionType;
        data?: string;
    };
    leftOperand: ConfigurableValue;
    rightOperand: ConfigurableValue;
}
export declare const Conditional: CodeNode<ConditionalConfig>;
export {};
//# sourceMappingURL=Conditional.flyde.d.ts.map