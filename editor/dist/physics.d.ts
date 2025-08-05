import { Size } from "./utils";
export interface Vector {
    x: number;
    y: number;
}
export declare const size: (w: number, h: number) => Size;
export declare const vec: (x: number, y: number) => {
    x: number;
    y: number;
};
export interface Entity extends Object {
    id: string;
    p: Vector;
    v: Vector;
    m: number;
    f: Vector;
    c?: string;
    s: Size;
}
export declare const rnd: (top?: number, min?: number) => number;
export declare const vZero: Vector;
export declare const vMul: ({ x, y }: Vector, s: number) => Vector;
export declare const vDiv: ({ x, y }: Vector, s: number) => Vector;
export declare const vAdd: (a: Vector, b: Vector) => {
    x: number;
    y: number;
};
export declare const vSub: (a: Vector, b: Vector) => {
    x: number;
    y: number;
};
export declare const vLen: ({ x, y }: Vector) => number;
export declare const vNorm: (a: Vector) => Vector;
export declare const vToStr: ({ x, y }: Vector) => string;
export declare const coulombs: (e1: Entity, e2: Entity, rep: number) => Vector;
export declare const hookes: (e1: Entity, e2: Entity, minLength: number, maxLength: number, rep: number) => Vector;
export declare const itrPhysics: <T extends Entity>(dt: number, e: T) => T;
export declare const totalEnergy: (ents: Entity[]) => number;
//# sourceMappingURL=physics.d.ts.map