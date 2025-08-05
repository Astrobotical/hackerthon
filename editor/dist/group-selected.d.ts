import { EditorVisualNode } from "@flyde/core";
import { PromptFn } from "./flow-editor/ports";
export declare const groupSelected: (selected: string[], node: EditorVisualNode, nodeName: string, prompt: PromptFn) => Promise<{
    newNode: EditorVisualNode;
    currentNode: EditorVisualNode;
}>;
//# sourceMappingURL=group-selected.d.ts.map