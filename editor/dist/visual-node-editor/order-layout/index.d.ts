import { Vector } from "../../physics";
import { Size } from "../../utils";
export type LayoutNodeData = {
    [id: string]: {
        p: Vector;
        s: Size;
    };
};
export type LayoutData = {
    nodes: LayoutNodeData;
    edges: Array<[string, string]>;
};
export declare const orderLayout: ({ nodes, edges }: LayoutData, maxItrs: number, onItr?: (ld: LayoutData, idx: number) => void) => LayoutData & {
    itrs: number;
    timeout: boolean;
    total: number;
};
//# sourceMappingURL=index.d.ts.map