import { VisualNode, Pos } from "@flyde/core";
import React from "react";
import { Size } from "../../utils";
import { ViewPort } from "../utils";
export interface LayoutDebuggerItemProps {
    viewPort: ViewPort;
    pos: Pos;
    size: Size;
    color: string;
}
export declare const PosDebugger: React.FC<{
    pos: Pos;
}>;
export declare const LayoutDebuggerItem: React.FC<LayoutDebuggerItemProps>;
export interface LayoutDebuggerProps {
    extraDebug: LayoutDebuggerItemProps[];
    vp: ViewPort;
    node: VisualNode;
    mousePos: Pos;
}
export declare const LayoutDebugger: React.FC<LayoutDebuggerProps>;
//# sourceMappingURL=LayoutDebugger.d.ts.map