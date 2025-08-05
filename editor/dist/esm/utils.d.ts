import React from "react";
export interface OMap<_, V> {
    [k: string]: V | undefined;
}
type Entries<V> = Array<[string, V]>;
export declare const entries: <V>(map: OMap<any, V>) => Entries<V>;
export declare const keys: <V>(map: OMap<any, V>) => string[];
export declare const values: <V>(map: OMap<any, V>) => V[];
export declare const toOmap: <V>(map: Map<string, V>) => OMap<string, V>;
export declare const createOmap: <V>(entr?: Entries<V>) => OMap<string, V>;
export declare const set: <V>(map: OMap<any, V>, k: string, v: V) => void;
export declare const isDefined: <T>(o: T | undefined) => o is T;
export type Size = {
    width: number;
    height: number;
};
export declare const toString: (v: any) => string;
export declare const timeAgo: (d: number) => string;
export declare const timeAgoFromDt: (dt: number) => string;
export declare const fullTime: (d: number) => string;
export declare const isLocal: () => boolean;
export declare const preventDefaultAnd: <T extends (...args: any[]) => any>(fn: T) => (e: React.MouseEvent) => void;
export {};
//# sourceMappingURL=utils.d.ts.map