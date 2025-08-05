import React from "react";
import { ViewPort } from "../utils";
import { Pos } from "@flyde/core";
export interface SelectionBoxProps {
    selectionBox?: {
        from: Pos;
        to: Pos;
    };
    viewPort: ViewPort;
}
export declare const SelectionBox: React.FC<SelectionBoxProps>;
//# sourceMappingURL=SelectionBox.d.ts.map