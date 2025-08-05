import { CodeNode } from "@flyde/core";
export interface SwitchConfig {
    inputs: string[];
    cases: {
        name: string;
        conditionExpression: string;
        outputExpression: string;
    }[];
    defaultCase: {
        enabled: true;
        outputExpression: string;
    } | {
        enabled: false;
    };
}
export declare const Switch: CodeNode<SwitchConfig>;
//# sourceMappingURL=Switch.flyde.d.ts.map