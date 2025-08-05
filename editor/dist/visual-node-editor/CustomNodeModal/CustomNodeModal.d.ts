import { NodeOrConfigurableDefinition } from "@flyde/core";
interface CustomNodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (code: string) => Promise<void>;
    forkMode?: {
        node: NodeOrConfigurableDefinition;
        initialCode: string;
    };
}
export declare function CustomNodeModal({ isOpen, onClose, onSave, forkMode, }: CustomNodeModalProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CustomNodeModal.d.ts.map