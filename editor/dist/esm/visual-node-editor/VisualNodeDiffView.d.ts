import * as React from "react";
import { EditorVisualNode } from "@flyde/core";
export type DiffStatus = "added" | "removed" | "changed" | undefined;
export interface VisualNodeDiffViewProps {
    node: EditorVisualNode;
    comparisonNode: EditorVisualNode;
    currentInsId: string;
    ancestorsInsIds?: string;
    className?: string;
    initialPadding?: [number, number];
}
export declare const VisualNodeDiffView: React.FC<VisualNodeDiffViewProps>;
//# sourceMappingURL=VisualNodeDiffView.d.ts.map