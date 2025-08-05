import * as React from "react";
import { InputMode, PinType, Pos } from "@flyde/core";
export interface NodeIoViewProps {
    id: string;
    type: PinType;
    pos: Pos;
    currentInsId: string;
    ancestorInsIds?: string;
    connected: boolean;
    dragged?: boolean;
    inputMode?: InputMode;
    closest: boolean;
    viewPort: {
        pos: Pos;
        zoom: number;
    };
    increasedDropArea?: boolean;
    onDblClick?: (pinId: string, e: React.MouseEvent) => void;
    onDelete?: (type: PinType, pin: string) => void;
    onRename?: (type: PinType, pin: string) => void;
    onChangeInputMode?: (pin: string, newMode: InputMode) => void;
    onChange?: (type: PinType, pin: string) => void;
    onDragEnd: (type: PinType, pin: string, ...data: any[]) => void;
    onDragStart: (pin: string, ...data: any[]) => void;
    onDragMove: (type: PinType, pin: string, ...data: any[]) => void;
    onMouseUp: (id: string, type: PinType, e: React.MouseEvent) => void;
    onMouseDown: (id: string, type: PinType, e: React.MouseEvent) => void;
    onSelect: (id: string, type: PinType, event?: React.MouseEvent) => void;
    selected: boolean;
    description: string;
    onSetDescription: (type: PinType, pin: string, description: string) => void;
}
export declare const NodeIoView: React.FC<NodeIoViewProps>;
//# sourceMappingURL=NodeIoView.d.ts.map