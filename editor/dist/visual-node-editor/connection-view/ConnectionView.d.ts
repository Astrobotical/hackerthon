import * as React from "react";
import { Pos, ConnectionData, ConnectionNode, EditorVisualNode, EditorNodeInstance } from "@flyde/core";
import { Size } from "../../utils";
import { ViewPort } from "../..";
export interface BaseConnectionViewProps {
    node: EditorVisualNode;
    ancestorsInsIds?: string;
    currentInsId: string;
    onDblClick: () => void;
    size: Size;
    boardPos: Pos;
    viewPort: ViewPort;
    instances: EditorNodeInstance[];
    parentVp: ViewPort;
}
export interface ConnectionViewProps extends BaseConnectionViewProps {
    connections: ConnectionData[];
    futureConnection?: {
        connection: ConnectionData;
        type: "future-add" | "future-remove";
    };
    selectedInstances: string[];
    selectedConnections: string[];
    lastMousePos: Pos;
    draggedSource: null | {
        from: ConnectionNode;
        to: undefined;
    } | {
        to: ConnectionNode;
        from: undefined;
    };
    toggleHidden: (connection: ConnectionData) => void;
    removeConnection: (connection: ConnectionData) => void;
    onSelectConnection: (connectionData: ConnectionData, ev: React.MouseEvent) => void;
}
export declare const ConnectionView: React.FC<ConnectionViewProps>;
//# sourceMappingURL=ConnectionView.d.ts.map