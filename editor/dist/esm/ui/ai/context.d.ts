import { AiCompletionDto } from "../../flow-editor/ports";
export interface AiCompletionContext {
    createCompletion: (dto: AiCompletionDto) => Promise<string>;
    enabled: boolean;
}
export declare const useAiCompletion: () => AiCompletionContext;
export declare const AiCompletionProvider: import("react").Provider<AiCompletionContext | null>;
//# sourceMappingURL=context.d.ts.map