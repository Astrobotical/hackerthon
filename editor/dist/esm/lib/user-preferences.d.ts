export declare const useUserPref: <T>(key: string, initial: T) => [T, (val: T) => void];
export declare const userPreferences: {
    getItem: (key: string) => any;
    setItem: (key: string, value: any, sessionOnly?: boolean) => boolean;
};
export declare const useResizePref: (feature: string, initial: number) => [number, (val: number) => void];
export declare const useLocalStorage: <T>(key: string, initial: T) => [T, (val: T) => void];
//# sourceMappingURL=user-preferences.d.ts.map