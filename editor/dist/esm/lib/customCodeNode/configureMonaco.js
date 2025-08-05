import { flydeCoreTypes } from "../../types/flyde-core-types";
export function configureMonaco(monaco) {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(flydeCoreTypes, "file:///node_modules/@flyde/core/index.d.ts");
    const compilerOptions = monaco.languages.typescript.typescriptDefaults.getCompilerOptions();
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        ...compilerOptions,
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        module: monaco.languages.typescript.ModuleKind.ESNext,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        allowNonTsExtensions: true,
        isolatedModules: true,
        noEmit: true,
        jsx: monaco.languages.typescript.JsxEmit.React,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlTW9uYWNvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9jdXN0b21Db2RlTm9kZS9jb25maWd1cmVNb25hY28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTlELE1BQU0sVUFBVSxlQUFlLENBQUMsTUFBVztJQUN6QyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQ3hELGNBQWMsRUFDZCw2Q0FBNkMsQ0FDOUMsQ0FBQztJQUVGLE1BQU0sZUFBZSxHQUNuQixNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3RFLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDO1FBQ2hFLEdBQUcsZUFBZTtRQUNsQixNQUFNLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU07UUFDdkQsTUFBTSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNO1FBQ3JELGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLE1BQU07UUFDekUsb0JBQW9CLEVBQUUsSUFBSTtRQUMxQixlQUFlLEVBQUUsSUFBSTtRQUNyQixNQUFNLEVBQUUsSUFBSTtRQUNaLEdBQUcsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSztLQUMvQyxDQUFDLENBQUM7QUFDTCxDQUFDIn0=