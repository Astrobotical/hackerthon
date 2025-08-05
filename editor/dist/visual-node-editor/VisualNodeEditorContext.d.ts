import React from "react";
import { EditorVisualNode } from "@flyde/core";
import { GroupEditorBoardData } from "./VisualNodeEditor";
import { FlydeFlowChangeType } from "../flow-editor/flyde-flow-change-type";
export interface VisualNodeEditorContextType {
    boardData: GroupEditorBoardData;
    onChangeBoardData: (partial: Partial<GroupEditorBoardData>) => void;
    node: EditorVisualNode;
    onChangeNode: (newNode: EditorVisualNode, changeType: FlydeFlowChangeType) => void;
}
export declare const VisualNodeEditorContext: React.Context<VisualNodeEditorContextType | undefined>;
export declare const useVisualNodeEditorContext: () => VisualNodeEditorContextType;
export declare const VisualNodeEditorProvider: React.FC<VisualNodeEditorContextType & {
    children: React.ReactNode;
}>;
//# sourceMappingURL=VisualNodeEditorContext.d.ts.map