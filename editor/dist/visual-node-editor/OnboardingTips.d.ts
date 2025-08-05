import React from "react";
import { VisualNode } from "@flyde/core";
import { GroupEditorBoardData } from "./VisualNodeEditor";
interface TipData {
    tip: string;
    predicate: (lastAndCurrNode: [VisualNode, VisualNode], lastAndCurrBoardData: [GroupEditorBoardData, GroupEditorBoardData]) => boolean;
}
declare const tips: Record<string, TipData>;
export type TipAction = keyof typeof tips;
interface OnboardingTipsProps {
}
export declare const OnboardingTips: React.FC<OnboardingTipsProps>;
export {};
//# sourceMappingURL=OnboardingTips.d.ts.map