import React from "react";
export type ConfigurableInputStatic<T> = {
    mode: "static";
    value: T;
};
export type ConfigurableInputDynamic = {
    mode: "dynamic";
};
export type ConfigurableInput<T> = ConfigurableInputStatic<T> | ConfigurableInputDynamic;
export interface ValueCompProps<T> {
    value: T;
    onChange: (value: T) => void;
}
export interface ConfigurableInputEditorProps<T> {
    value: ConfigurableInput<T>;
    onChange: (value: ConfigurableInput<T>) => void;
    valueRenderer: React.FC<ValueCompProps<T>>;
    modeLabel: string;
    defaultStaticValue: T;
}
export declare const ConfigurableInputEditor: <T>({ value, onChange, valueRenderer: ValueRenderer, defaultStaticValue, modeLabel, }: ConfigurableInputEditorProps<T>) => import("react/jsx-runtime").JSX.Element;
export declare const createConfigurableInputEditor: <T extends Record<string, unknown>>(valueRenderer: React.FC<ValueCompProps<T>>) => (props: Omit<ConfigurableInputEditorProps<T>, "valueRenderer">) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ConfigurableInputEditor.d.ts.map