import { HistoryPayload } from "@flyde/core";
interface PinTooltipContentProps {
    displayName: string;
    typeLabel: string;
    description?: string;
    history?: HistoryPayload;
    queuedValues?: number;
    className?: string;
    isLoading?: boolean;
    onInspect?: () => void;
    isExpanded?: boolean;
    onToggleExpand?: () => void;
}
export declare const PinTooltipContent: ({ displayName, typeLabel: type, description, history, className, isLoading, onInspect, isExpanded, onToggleExpand, }: PinTooltipContentProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PinTooltipContent.d.ts.map