import { SecretTypeData } from "@flyde/core";
interface EditorPorts {
    getAvailableSecrets: () => Promise<string[]>;
    addNewSecret: (dto: {
        key: string;
        value: string;
    }) => Promise<string[]>;
}
export declare function SecretSelector({ value, onChange, ports, typeEditorData, }: {
    value: string;
    onChange: (value: string) => void;
    ports: EditorPorts;
    typeEditorData?: SecretTypeData;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SecretSelector.d.ts.map