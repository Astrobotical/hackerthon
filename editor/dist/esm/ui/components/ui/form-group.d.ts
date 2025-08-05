import * as React from "react";
export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: React.ReactNode;
    inline?: boolean;
    aiGenerate?: {
        prompt: string;
        placeholder?: string;
        onComplete: (generatedText: string) => void;
        jsonMode?: boolean;
        nodeId: string;
        insId?: string;
    };
}
declare const FormGroup: React.ForwardRefExoticComponent<FormGroupProps & React.RefAttributes<HTMLDivElement>>;
export { FormGroup };
//# sourceMappingURL=form-group.d.ts.map