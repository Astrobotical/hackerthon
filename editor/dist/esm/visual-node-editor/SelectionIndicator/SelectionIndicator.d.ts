import React from "react";
export type SelectionTypeInput = {
    type: "input";
    pinId: string;
};
export type SelectionTypeOutput = {
    type: "output";
    pinId: string;
};
export type SelectionTypeInstances = {
    type: "instances";
    ids: string[];
};
export type SelectionTypeConnections = {
    type: "connections";
    ids: string[];
};
export type SelectionType = SelectionTypeInput | SelectionTypeOutput | SelectionTypeInstances | SelectionTypeConnections;
export interface SelectionIndicatorProps {
    selection: SelectionType | undefined;
    onCenter: () => void;
    onGroup: () => void;
    onDelete: (ids: string[]) => void;
}
export declare const SelectionIndicator: React.FC<SelectionIndicatorProps>;
//# sourceMappingURL=SelectionIndicator.d.ts.map