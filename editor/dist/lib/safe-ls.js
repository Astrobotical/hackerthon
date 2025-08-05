"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeSessionStorage = exports.safeLocalStorage = void 0;
exports.safeLocalStorage = {
    getItem: (...args) => {
        try {
            return localStorage.getItem(...args);
        }
        catch (e) {
            return null;
        }
    },
    setItem: (...args) => {
        try {
            return localStorage.setItem(...args);
        }
        catch (e) {
            return null;
        }
    },
};
exports.safeSessionStorage = {
    getItem: (...args) => {
        try {
            return sessionStorage.getItem(...args);
        }
        catch (e) {
            return null;
        }
    },
    setItem: (...args) => {
        try {
            return sessionStorage.setItem(...args);
        }
        catch (e) {
            return null;
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FmZS1scy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2FmZS1scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLGdCQUFnQixHQUNBO0lBQzNCLE9BQU8sRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUU7UUFDbkIsSUFBSSxDQUFDO1lBQ0gsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtRQUNuQixJQUFJLENBQUM7WUFDSCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNYLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7Q0FDRixDQUFDO0FBRVcsUUFBQSxrQkFBa0IsR0FDRjtJQUMzQixPQUFPLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO1FBQ25CLElBQUksQ0FBQztZQUNILE9BQU8sY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1gsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUU7UUFDbkIsSUFBSSxDQUFDO1lBQ0gsT0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO0NBQ0YsQ0FBQyJ9