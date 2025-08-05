"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentHotkeys = void 0;
exports.useHotkeys = useHotkeys;
const hotkeys_js_1 = __importDefault(require("hotkeys-js"));
const react_1 = require("react");
exports.currentHotkeys = new Map();
function useHotkeys(keys, callback, menuData, deps = [], controlRef) {
    const memoisedCallback = (0, react_1.useCallback)((...args) => {
        if (!controlRef || controlRef.current) {
            callback(...args);
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps, callback]);
    (0, react_1.useEffect)(() => {
        (0, hotkeys_js_1.default)(keys, {}, memoisedCallback);
        exports.currentHotkeys.set(keys, menuData);
        return () => {
            exports.currentHotkeys.delete(keys);
            hotkeys_js_1.default.unbind(keys, memoisedCallback);
        };
    }, [keys, memoisedCallback, menuData]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWhvdGtleXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3JlYWN0LXV0aWxzL3VzZS1ob3RrZXlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQWFBLGdDQTJCQztBQXhDRCw0REFBbUQ7QUFDbkQsaUNBQStDO0FBVXBDLFFBQUEsY0FBYyxHQUFHLElBQUksR0FBRyxFQUEyQixDQUFDO0FBRS9ELFNBQWdCLFVBQVUsQ0FDeEIsSUFBWSxFQUNaLFFBQW9CLEVBQ3BCLFFBQXlCLEVBQ3pCLE9BQWMsRUFBRSxFQUNoQixVQUE0QztJQUc1QyxNQUFNLGdCQUFnQixHQUFHLElBQUEsbUJBQVcsRUFDbEMsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO1FBQ1YsSUFBSSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDcEIsQ0FBQztJQUNILENBQUM7SUFDRCx1REFBdUQ7SUFDdkQsQ0FBQyxHQUFHLElBQUksRUFBRSxRQUFRLENBQUMsQ0FDcEIsQ0FBQztJQUVGLElBQUEsaUJBQVMsRUFBQyxHQUFHLEVBQUU7UUFDYixJQUFBLG9CQUFPLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BDLHNCQUFjLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVuQyxPQUFPLEdBQUcsRUFBRTtZQUNWLHNCQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLG9CQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3hDLENBQUMsQ0FBQztJQUNKLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLENBQUMifQ==