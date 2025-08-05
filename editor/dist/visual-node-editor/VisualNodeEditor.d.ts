import * as React from "react";
import { ConnectionData, NodeInstance, PinType, ConnectionNode, Pos, FlydeFlow } from "@flyde/core";
import { ViewPort } from "./utils";
export declare const NODE_HEIGHT = 28;
export declare const defaultViewPort: ViewPort;
export declare const defaultBoardData: GroupEditorBoardData;
export interface ClosestPinData {
    ins: NodeInstance;
    pin: string;
    type: "input" | "output";
}
export type ClipboardData = {
    instances: NodeInstance[];
    connections: ConnectionData[];
};
export type GroupEditorBoardData = {
    viewPort: ViewPort;
    selectedInstances: string[];
    selectedConnections: string[];
    lastMousePos: Pos;
    from?: ConnectionNode;
    to?: ConnectionNode;
};
export type VisualNodeEditorProps = {
    currentInsId: string;
    ancestorsInsIds?: string;
    clipboardData: ClipboardData;
    nodeIoEditable: boolean;
    thumbnailMode?: true;
    onCopy: (data: ClipboardData) => void;
    onInspectPin: (insId: string, pin: {
        id: string;
        type: PinType;
    }) => void;
    className?: string;
    parentViewport?: ViewPort;
    parentBoardPos?: Pos;
    queuedInputsData?: Record<string, Record<string, number>>;
    instancesWithErrors?: Set<string>;
    initialPadding?: [number, number];
    requireModifierForZoom?: boolean;
    tempFlow?: FlydeFlow;
};
export interface VisualNodeEditorHandle {
    centerInstance(insId: string): void;
    centerViewPort(): void;
    getViewPort(): ViewPort;
    clearSelection(): void;
}
export declare const VisualNodeEditor: React.FC<VisualNodeEditorProps & {
    ref?: any;
}>;
//# sourceMappingURL=VisualNodeEditor.d.ts.map