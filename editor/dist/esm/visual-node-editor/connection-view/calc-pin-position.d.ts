import { ConnectionNode, PinType, Pos } from "@flyde/core";
import { ViewPort } from "../..";
export declare const unfoundPinPos: {
    x: number;
    y: number;
};
export declare function calcPinPosition(params: {
    insId: string;
    ancestorsInsIds?: string;
    pinId: string;
    pinType: PinType;
    isMain: boolean;
    boardPos: Pos;
    viewPort: ViewPort;
}): Pos;
export declare const calcStartPos: (props: {
    connectionNode: ConnectionNode;
    boardPos: Pos;
    ancestorsInsIds?: string;
    viewPort: ViewPort;
    currentInsId: string;
}) => Pos;
export declare const calcTargetPos: (props: {
    connectionNode: ConnectionNode;
    boardPos: Pos;
    ancestorsInsIds?: string;
    viewPort: ViewPort;
    currentInsId: string;
}) => Pos;
//# sourceMappingURL=calc-pin-position.d.ts.map