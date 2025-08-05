import * as React from "react";
import { Pos, NodeTypeIcon } from "@flyde/core";
export interface BaseNodeViewContextItem {
    label: string;
    callback: any;
}
export interface BaseNodeViewProps {
    domId?: string;
    className?: string;
    pos: Pos;
    dragged?: boolean;
    viewPort: {
        pos: Pos;
        zoom: number;
    };
    displayMode?: true;
    size?: "normal" | "wide";
    diffStatus?: "added" | "removed" | "changed";
    heading?: string;
    description?: string;
    icon?: NodeTypeIcon;
    leftSide?: React.ReactNode;
    rightSide?: React.ReactNode;
    contextMenuContent?: React.ReactNode;
    selected?: boolean;
    dark?: boolean;
    overrideNodeBodyHtml?: string;
    overrideStyle?: React.CSSProperties;
    onDragEnd: (...data: any[]) => void;
    onDragStart: (...data: any[]) => void;
    onDragMove: (ev: React.MouseEvent, pos: Pos) => void;
    onClick?: (e: React.MouseEvent) => void;
    onDoubleClick?: (e: React.MouseEvent) => void;
}
export interface PinViewProps {
    id: string;
    children?: React.ReactNode;
}
export declare const BaseNodeIcon: React.FC<{
    icon?: NodeTypeIcon;
}>;
export declare const BaseNodeView: React.FC<BaseNodeViewProps>;
//# sourceMappingURL=BaseNodeView.d.ts.map