"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = exports.useResizePref = exports.userPreferences = exports.useUserPref = void 0;
const React = __importStar(require("react"));
const utils_1 = require("../utils");
const safe_ls_1 = require("./safe-ls");
const createUserPreferences = () => {
    const prefixedKey = (k) => `up.${k}`;
    return {
        getItem: (key) => {
            const strLs = safe_ls_1.safeLocalStorage.getItem(prefixedKey(key)) || "";
            const strSs = safe_ls_1.safeSessionStorage.getItem(prefixedKey(key)) || "";
            try {
                const obj = JSON.parse(strSs || strLs);
                return obj.value;
            }
            catch (e) {
                return undefined;
            }
        },
        setItem: (key, value, sessionOnly = false) => {
            const storage = sessionOnly ? sessionStorage : safe_ls_1.safeLocalStorage;
            try {
                const str = JSON.stringify({ value });
                storage.setItem(prefixedKey(key), str);
                return true;
            }
            catch (e) {
                console.error("Error saving user preference", e);
                return false;
            }
        },
    };
};
const useUserPref = (key, initial) => {
    const [val, setVal] = React.useState(() => {
        const existing = exports.userPreferences.getItem(key);
        return (0, utils_1.isDefined)(existing) ? existing : initial;
    });
    React.useEffect(() => {
        const existing = exports.userPreferences.getItem(key);
        const val = (0, utils_1.isDefined)(existing) ? existing : initial;
        setVal(val);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);
    const setAndSave = (val) => {
        exports.userPreferences.setItem(key, val);
        setVal(val);
    };
    return [val, setAndSave];
};
exports.useUserPref = useUserPref;
exports.userPreferences = createUserPreferences();
const useResizePref = (feature, initial) => {
    const prefKey = `resize.${feature}`;
    return (0, exports.useUserPref)(prefKey, initial);
};
exports.useResizePref = useResizePref;
const safelyGetItem = (key) => {
    const val = safe_ls_1.safeLocalStorage.getItem(key);
    if (!val) {
        return null;
    }
    try {
        return JSON.parse(val).value;
    }
    catch (e) {
        return null;
    }
};
const useLocalStorage = (key, initial) => {
    const [val, setVal] = React.useState(safelyGetItem(key) || initial);
    const setAndSave = React.useCallback((value) => {
        safe_ls_1.safeLocalStorage.setItem(key, JSON.stringify({ value }));
        setVal(value);
    }, [key]);
    React.useEffect(() => {
        const existing = safelyGetItem(key);
        if (!existing) {
            safe_ls_1.safeLocalStorage.setItem(key, JSON.stringify({ value: initial }));
        }
    }, [key, initial, setAndSave]);
    return [val, setAndSave];
};
exports.useLocalStorage = useLocalStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcmVmZXJlbmNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdXNlci1wcmVmZXJlbmNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFDL0Isb0NBQXFDO0FBQ3JDLHVDQUFpRTtBQUVqRSxNQUFNLHFCQUFxQixHQUFHLEdBQUcsRUFBRTtJQUNqQyxNQUFNLFdBQVcsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUM3QyxPQUFPO1FBQ0wsT0FBTyxFQUFFLENBQUMsR0FBVyxFQUFFLEVBQUU7WUFDdkIsTUFBTSxLQUFLLEdBQUcsMEJBQWdCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvRCxNQUFNLEtBQUssR0FBRyw0QkFBa0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pFLElBQUksQ0FBQztnQkFDSCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ25CLENBQUM7WUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUNYLE9BQU8sU0FBUyxDQUFDO1lBQ25CLENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUMsR0FBVyxFQUFFLEtBQVUsRUFBRSxjQUF1QixLQUFLLEVBQUUsRUFBRTtZQUNqRSxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsMEJBQWdCLENBQUM7WUFDaEUsSUFBSSxDQUFDO2dCQUNILE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFB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