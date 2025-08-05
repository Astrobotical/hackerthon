import { Pos } from "@flyde/core";
import React from "react";
export interface ConnectionViewPathProps {
    from: Pos;
    to: Pos;
    className: string;
    onClick?: (e: React.MouseEvent<any, MouseEvent>) => void;
    onMouseEnter?: (e: React.MouseEvent<any, MouseEvent>) => void;
    onMouseLeave?: (e: React.MouseEvent<any, MouseEvent>) => void;
    zoom: number;
    dashed?: boolean;
    onDelete?: () => void;
    onToggleHidden?: () => void;
}
export declare const ConnectionViewPath: React.FC<ConnectionViewPathProps>;
//# sourceMappingURL=ConnectionViewPath.d.ts.map