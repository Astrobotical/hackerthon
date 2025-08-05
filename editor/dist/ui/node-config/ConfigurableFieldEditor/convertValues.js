"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertValue = convertValue;
function convertValue(oldType, newType, value) {
    switch (newType) {
        case "string": {
            switch (oldType) {
                case "json": {
                    return JSON.stringify(value);
                }
                default: {
                    return value.toString();
                }
            }
        }
        case "number": {
            switch (oldType) {
                case "string":
                case "json": {
                    const parsed = parseFloat(value);
                    if (isNaN(parsed)) {
                        return 0;
                    }
                    return parsed;
                }
                default: {
                    return value;
                }
            }
        }
        case "boolean": {
            switch (oldType) {
                case "json":
                case "string": {
                    return value === "true" || value === "1";
                }
                default: {
                    return !!value;
                }
            }
        }
        default: {
            return value;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydFZhbHVlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9ub2RlLWNvbmZpZy9Db25maWd1cmFibGVGaWVsZEVkaXRvci9jb252ZXJ0VmFsdWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esb0NBOENDO0FBOUNELFNBQWdCLFlBQVksQ0FDMUIsT0FBa0MsRUFDbEMsT0FBa0MsRUFDbEMsS0FBVTtJQUVWLFFBQVEsT0FBTyxFQUFFLENBQUM7UUFDaEIsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2QsUUFBUSxPQUFPLEVBQUUsQ0FBQztnQkFDaEIsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNaLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztnQkFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNSLE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUMxQixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZCxRQUFRLE9BQU8sRUFBRSxDQUFDO2dCQUNoQixLQUFLLFFBQVEsQ0FBQztnQkFDZCxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1osTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQWUsQ0FBQyxDQUFDO29CQUMzQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO3dCQUNsQixPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO29CQUNELE9BQU8sTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ1IsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2YsUUFBUSxPQUFPLEVBQUUsQ0FBQztnQkFDaEIsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNkLE9BQU8sS0FBSyxLQUFLLE1BQU0sSUFBSSxLQUFLLEtBQUssR0FBRyxDQUFDO2dCQUMzQyxDQUFDO2dCQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ1IsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUNqQixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1IsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUMifQ==