import { NodeInstance, Pos, NodeDefinition } from "@flyde/core";
export declare const calcNodeContent: (instance: Pick<NodeInstance, "displayName">, node: Pick<NodeDefinition, "displayName" | "id">) => string;
export declare const calcNodeWidth: (_: NodeInstance) => number;
export declare const calcInstancePosition: (insId: string, parentInsId: string, boardPos: Pos) => {
    x: number;
    y: number;
};
//# sourceMappingURL=utils.d.ts.map