"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogEntry = void 0;
const createLogEntry = (val) => {
    const time = new Date().toLocaleTimeString();
    let strVal = val;
    if (!["string", "number"].includes(typeof val)) {
        try {
            strVal = JSON.stringify(strVal);
        }
        catch (e) {
            console.warn("unable to stringify value", val, e);
            strVal = `Error! Unable to stringify value`;
        }
    }
    return { time, val: strVal };
};
exports.createLogEntry = createLogEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWxvZy1lbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY3JlYXRlLWxvZy1lbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBTyxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFO0lBQ3pDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM3QyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDakIsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDO1lBQ0gsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCxPQUFPLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsRCxNQUFNLEdBQUcsa0NBQWtDLENBQUM7UUFDOUMsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFiVyxRQUFBLGNBQWMsa0JBYXpCIn0=