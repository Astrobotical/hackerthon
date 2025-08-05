import { OMap, EditorNodeInstance, EditorVisualNode } from "@flyde/core";
import { ConnectionData } from "@flyde/core";
import { PromptFn } from "..";
export declare const createGroup: (instances: EditorNodeInstance[], connections: ConnectionData[], name: string, prompt: PromptFn) => Promise<{
    visualNode: EditorVisualNode;
    renamedInputs: OMap<string>;
    renamedOutputs: OMap<string>;
}>;
//# sourceMappingURL=create-group.d.ts.map