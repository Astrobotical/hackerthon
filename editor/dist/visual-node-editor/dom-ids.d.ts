import { PinType } from "@flyde/core";
export declare const getInstanceDomId: (insId: string, ancestorsInsIds?: string) => string;
export declare const getMainInstanceIndicatorDomId: (insId: string, ancestorsInsIds?: string) => string;
export declare const getMainPinDomId: (insId: string, pinId: string, type: PinType) => string;
export interface GetPinDomIdParams {
    fullInsIdPath: string;
    pinId: string;
    pinType: PinType;
    isMain: boolean;
}
export declare const getPinDomId: ({ pinType, fullInsIdPath, pinId, isMain, }: GetPinDomIdParams) => string;
export declare const getPinDomHandleId: ({ pinType, fullInsIdPath, pinId, isMain, }: GetPinDomIdParams) => string;
//# sourceMappingURL=dom-ids.d.ts.map