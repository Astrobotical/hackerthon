import { EditorCodeNodeInstance, EditorNodeInstance, EditorVisualNode } from "@flyde/core";
import React from "react";
export interface InstanceConfigEditorProps {
    ins: EditorCodeNodeInstance;
    editorNode: EditorVisualNode;
    onCancel: () => void;
    onSubmit: (value: any) => Promise<void>;
    onFork: (ins: EditorNodeInstance) => void;
}
export declare const InstanceConfigEditor: React.FC<InstanceConfigEditorProps>;
//# sourceMappingURL=InstanceConfigEditor.d.ts.map