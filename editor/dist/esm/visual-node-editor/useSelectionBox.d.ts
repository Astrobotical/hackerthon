import { Pos, VisualNode } from "@flyde/core";
import { ViewPort } from "..";
export declare const useSelectionBox: (node: VisualNode, viewPort: ViewPort, boardPos: Pos, parentViewport: ViewPort) => {
    selectionBox: {
        from: Pos;
        to: Pos;
    } | undefined;
    startSelectionBox: (event: React.MouseEvent<any>) => void;
    updateSelectionBox: (posInBoard: Pos) => void;
    endSelectionBox: (shiftKey: boolean, onSelect: (ids: string[]) => void) => void;
};
//# sourceMappingURL=useSelectionBox.d.ts.map