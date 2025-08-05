import { HotkeysEvent } from "hotkeys-js";
type CallbackFn = (event: KeyboardEvent, handler: HotkeysEvent) => void;
export interface HotkeysMenuData {
    text: string;
    order?: number;
    group: string;
}
export declare let currentHotkeys: Map<string, HotkeysMenuData>;
export declare function useHotkeys(keys: string, callback: CallbackFn, menuData: HotkeysMenuData, deps?: any[], controlRef?: React.MutableRefObject<boolean>): void;
export {};
//# sourceMappingURL=use-hotkeys.d.ts.map