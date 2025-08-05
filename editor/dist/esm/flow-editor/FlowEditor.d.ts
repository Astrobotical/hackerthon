import * as React from "react";
import { Pos, VisualNode, NodeInstance, EditorVisualNode } from "@flyde/core";
import { GroupEditorBoardData } from "../visual-node-editor/VisualNodeEditor";
export * from "./ports";
export * from "./DebuggerContext";
export type FlowEditorState = {
    flow: {
        node: EditorVisualNode;
    };
    boardData: GroupEditorBoardData;
};
export type FlydeFlowEditorProps = {
    state: FlowEditorState;
    onChangeEditorState: React.Dispatch<React.SetStateAction<FlowEditorState>>;
    onNewEnvVar?: (name: string, val: any) => void;
    ref?: React.Ref<any>;
    initialPadding?: [number, number];
    darkMode?: boolean;
    requireModifierForZoom?: boolean;
    comparisonNode?: VisualNode;
};
export type ConstTargetData = {
    ins?: NodeInstance;
    pinId?: string;
    pos: Pos;
};
export type DataBuilderTarget = {
    nodeId: string;
    src: string;
};
export declare const FlowEditor: React.FC<FlydeFlowEditorProps>;
//# sourceMappingURL=FlowEditor.d.ts.map