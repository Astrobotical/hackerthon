import React from "react";
import { ImportableEditorNode } from "@flyde/core";
export interface CommandMenuProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAddNode: (node: ImportableEditorNode) => void;
    onClickCustomNode: () => void;
}
export declare const CommandMenu: React.FC<CommandMenuProps>;
//# sourceMappingURL=CommandMenu.d.ts.map