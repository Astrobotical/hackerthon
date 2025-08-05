import { Pos, NodeInstance, PinType, InputMode, Rect, InputPinConfig, EditorVisualNode, EditorNodeInstance, ImportableEditorNode } from "@flyde/core";
import { Size } from "../utils";
import { ConnectionData } from "@flyde/core";
export declare const emptyObj: {};
export declare const emptyList: never[];
export declare function getInstancePinConfig(node: EditorVisualNode, insId: string, pinId: string): InputPinConfig;
export declare const changePinConfig: (value: EditorVisualNode, insKey: string, pinId: string, newConfig: InputPinConfig) => EditorVisualNode;
export declare const findClosestPin: (node: EditorVisualNode, mousePos: Pos, boardPos: Pos, currentInsId: string, ancestorsInsIds: string, viewPort: ViewPort) => any;
export declare const getSelectionBoxRect: (from: Pos, to: Pos) => {
    x: number;
    y: number;
    w: number;
    h: number;
};
export declare const createNewNodeInstance: (importableNode: ImportableEditorNode, offset: number | undefined, lastMousePos: Pos) => EditorNodeInstance;
export type ViewPort = {
    pos: Pos;
    zoom: number;
};
export declare const roundNumber: (v: number) => number;
export declare const domToViewPort: (p: Pos, viewPort: ViewPort, parentVp: ViewPort) => Pos;
export declare const clamp: (min: number, max: number, v: number) => number;
export declare const distance: (p1: Pos, p2: Pos) => number;
export declare const center: (rect: Rect, vpSize: {
    w: number;
    h: number;
}, { zoom }: ViewPort) => Pos;
export declare const easeInOutQuad: (t: number) => number;
export declare const easeInOutPos: (p1: Pos, p2: Pos, start: number, duration: number, now: number) => Pos;
export declare const easeInOutNum: (n1: number, n2: number, start: number, duration: number, now: number) => number;
export declare const animateViewPort: (vp1: ViewPort, vp2: ViewPort, duration: number, cb: (vp: ViewPort) => void) => void;
export declare const calcSelectionBoxArea: (box: {
    from: Pos;
    to: Pos;
}) => number;
type Points = {
    left: number;
    right: number;
    top: number;
    bottom: number;
    center: Pos;
    tag: string;
};
export declare const calcNodesPositions: (node: EditorVisualNode) => Points[];
export declare const getEffectiveNodeDimensions: (node: EditorVisualNode) => {
    size: Size;
    pos: Pos;
    center: Pos;
};
export declare const logicalPosToRenderedPos: (pos: Pos, vp: ViewPort) => import("../physics").Vector;
export declare const renderedPosToLogicalPos: (renderedPos: Pos, vp: ViewPort) => {
    x: number;
    y: number;
};
export declare const centerBoardPosOnTarget: (target: Pos, vpSize: Size, newZoom: number, prevVp: ViewPort) => {
    x: number;
    y: number;
};
export declare const fitViewPortToRect: (rect: Rect, vpSize: Size, padding?: [number, number]) => ViewPort;
export declare const fitViewPortToNode: (node: EditorVisualNode, vpSize: Size, padding?: [number, number]) => ViewPort;
export declare const getMiddleOfViewPort: (vp: ViewPort, vpSize: Size) => {
    x: number;
    y: number;
};
export declare const isJsxValue: (val: any) => boolean;
export declare const getInstancesInRect: (selectionBox: {
    from: Pos;
    to: Pos;
}, viewPort: ViewPort, instances: NodeInstance[], parentVp: ViewPort, inputsPosition?: Record<string, Pos | undefined>, outputsPosition?: Record<string, Pos | undefined>) => string[];
export declare const handleInstanceDrag: (node: EditorVisualNode, ins: NodeInstance, pos: Pos, event: any, selected: string[], draggingId?: string) => EditorVisualNode;
export declare const handleIoPinRename: (node: EditorVisualNode, type: PinType, pinId: string, newPinId: string) => EditorVisualNode;
export declare const handleChangeNodeInputType: (node: EditorVisualNode, pinId: string, mode: InputMode) => EditorVisualNode;
export declare const getConnectionId: (connectionData: ConnectionData) => string;
export declare function isMac(): boolean;
export declare const isEventOnCurrentBoard: (e: KeyboardEvent | MouseEvent, nodeId: string) => boolean | null;
export {};
//# sourceMappingURL=utils.d.ts.map