import * as React from "react";
import { ConnectionData } from "@flyde/core";
import { BaseConnectionViewProps } from "./ConnectionView";
export interface SingleConnectionViewProps extends BaseConnectionViewProps {
    connection: ConnectionData;
    connectionType: "regular" | "future-add" | "future-remove";
    toggleHidden: (connection: ConnectionData) => void;
    removeConnection: (connection: ConnectionData) => void;
    parentSelected: boolean;
    onSelectConnection: (connectionData: ConnectionData, ev: React.MouseEvent) => void;
    isConnectionSelected?: boolean;
    onDelete?: (connection: ConnectionData) => void;
    selectedInstances: string[];
}
export declare const SingleConnectionView: React.FC<SingleConnectionViewProps>;
//# sourceMappingURL=SingleConnectionView.d.ts.map