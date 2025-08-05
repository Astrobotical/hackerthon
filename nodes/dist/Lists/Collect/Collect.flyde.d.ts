import { CodeNode } from "@flyde/core";
import type { ConfigurableInput } from "@flyde/editor";
export type CollectConfigTime = {
    strategy: "time";
    time: ConfigurableInput<number>;
};
export type CollectConfigCount = {
    strategy: "count";
    count: ConfigurableInput<number>;
};
export type CollectConfigTrigger = {
    strategy: "trigger";
};
export type CollectConfig = CollectConfigTime | CollectConfigCount | CollectConfigTrigger;
export declare const Collect: CodeNode<CollectConfig>;
//# sourceMappingURL=Collect.flyde.d.ts.map