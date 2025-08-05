import { HistoryPayload } from "@flyde/core";
export declare const useHistoryHelpers: (instanceId: string, pinId?: string, type?: "input" | "output") => {
    history: HistoryPayload | undefined;
    refreshHistory: () => void;
    resetHistory: () => void;
};
export declare const getInputName: (pinId: string) => string;
export declare const getOutputName: (pinId: string) => string;
//# sourceMappingURL=helpers.d.ts.map