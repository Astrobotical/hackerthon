import { PinType } from "@flyde/core";
import React from "react";
export interface DataInspectionModalProps {
    onClose: () => void;
    item: {
        insId: string;
        pin?: {
            id: string;
            type: PinType;
        };
    };
    isOpen: boolean;
}
export declare const DataInspectionModal: React.FC<DataInspectionModalProps>;
//# sourceMappingURL=DataInspectionModal.d.ts.map