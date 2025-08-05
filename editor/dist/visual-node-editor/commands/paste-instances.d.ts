import { VisualNode, Pos } from "@flyde/core";
import { ClipboardData } from "../VisualNodeEditor";
export declare const pasteInstancesCommand: (_node: VisualNode, mousePos: Pos, clipboardData: ClipboardData) => {
    newNode: VisualNode;
    newInstances: ({
        pos: Pos;
        id: string;
        type: "code";
        nodeId: string;
        source: import("@flyde/core").CodeNodeSource;
        config: any;
        macroId?: string;
        macroData?: any;
        inputConfig: import("@flyde/core").InputPinsConfig;
        visibleInputs?: string[];
        visibleOutputs?: string[];
        displayName?: string;
        style?: import("@flyde/core").NodeStyle;
    } | {
        pos: Pos;
        id: string;
        type: "visual";
        nodeId: string;
        source: import("@flyde/core").VisualNodeSource;
        inputConfig: import("@flyde/core").InputPinsConfig;
        visibleInputs?: string[];
        visibleOutputs?: string[];
        displayName?: string;
        style?: import("@flyde/core").NodeStyle;
    })[];
};
//# sourceMappingURL=paste-instances.d.ts.map