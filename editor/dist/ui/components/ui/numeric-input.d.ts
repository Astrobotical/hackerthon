import * as React from "react";
export interface NumericInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    value: number;
    onValueChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}
declare const NumericInput: React.ForwardRefExoticComponent<NumericInputProps & React.RefAttributes<HTMLInputElement>>;
export { NumericInput };
//# sourceMappingURL=numeric-input.d.ts.map