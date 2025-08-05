import { NodeInstance, Pos, EditorVisualNode } from "@flyde/core";
import { ViewPort } from "./utils";
export interface ClosestPinData {
    ins: NodeInstance;
    pin: string;
    type: "input" | "output";
}
export declare function useClosestPinAndMousePos(node: EditorVisualNode, currentInsId: string, ancestorsInsIds: string | undefined, viewPort: ViewPort, boardPos: Pos, parentViewport: ViewPort): {
    closestPin: ClosestPinData | undefined;
    lastMousePos: import("react").MutableRefObject<Pos>;
    updateClosestPinAndMousePos: (e: React.MouseEvent) => void;
};
//# sourceMappingURL=useClosestPinAndMousePos.d.ts.map