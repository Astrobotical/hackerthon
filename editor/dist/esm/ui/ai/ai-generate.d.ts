interface AiGenerateProps {
    prompt: string;
    placeholder?: string;
    onComplete: (generatedText: string) => void;
    className?: string;
    jsonMode?: boolean;
    currentValue?: any;
    nodeId: string;
    insId?: string;
}
export declare function AiGenerate({ prompt, placeholder, onComplete, className, jsonMode, currentValue, nodeId, insId }: AiGenerateProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=ai-generate.d.ts.map