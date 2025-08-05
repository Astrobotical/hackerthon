import React from "react";
export interface EditorContextMenuProps {
    nodeIoEditable: boolean;
    lastMousePos: React.RefObject<{
        x: number;
        y: number;
    }>;
    onOpenNodesLibrary: () => void;
}
export declare function EditorContextMenu(props: EditorContextMenuProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EditorContextMenu.d.ts.map