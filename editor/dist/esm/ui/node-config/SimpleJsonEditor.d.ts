export type JsonValue = string | number | boolean | null | JsonValue[] | {
    [key: string]: JsonValue;
};
export declare function SimpleJsonEditor(props: {
    value: JsonValue;
    onChange: (value: JsonValue) => void;
    label?: string;
    isExpanded?: boolean;
    rawData?: string;
    onChangeRaw?: (rawData: string) => void;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SimpleJsonEditor.d.ts.map