import React from "react";
import { ImportableEditorNode } from "@flyde/core";
export interface NodeItemProps {
    node: ImportableEditorNode;
    groupTitle: string;
    onSelect: (value: string) => void;
}
export declare const NodeItem: React.FC<NodeItemProps>;
export declare const CustomNodeButton: React.FC<{
    onSelect: (value: string) => void;
}>;
//# sourceMappingURL=CommandMenuNodeItem.d.ts.map