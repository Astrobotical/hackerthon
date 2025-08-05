export type FlydeFlowChangeType = {
    type: "functional" | "meta";
    message: string;
};
export declare const functionalChange: (message: string) => FlydeFlowChangeType;
export declare const metaChange: (message?: string) => FlydeFlowChangeType;
//# sourceMappingURL=flyde-flow-change-type.d.ts.map