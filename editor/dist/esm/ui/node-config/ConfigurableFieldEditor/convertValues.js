export function convertValue(oldType, newType, value) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydFZhbHVlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9ub2RlLWNvbmZpZy9Db25maWd1cmFibGVGaWVsZEVkaXRvci9jb252ZXJ0VmFsdWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sVUFBVSxZQUFZLENBQzFCLE9BQWtDLEVBQ2xDLE9BQWtDLEVBQ2xDLEtBQVU7SUFFVixRQUFRLE9BQU8sRUFBRSxDQUFDO1FBQ2hCLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNkLFFBQVEsT0FBTyxFQUFFLENBQUM7Z0JBQ2hCLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDWixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9CLENBQUM7Z0JBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDUixPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2QsUUFBUSxPQUFPLEVBQUUsQ0FBQztnQkFDaEIsS0FBSyxRQUFRLENBQUM7Z0JBQ2QsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNaLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFlLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzt3QkFDbEIsT0FBTyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztvQkFDRCxPQUFPLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQztnQkFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNSLE9BQU8sS0FBSyxDQUFDO2dCQUNmLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNmLFFBQVEsT0FBTyxFQUFFLENBQUM7Z0JBQ2hCLEtBQUssTUFBTSxDQUFDO2dCQUNaLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDZCxPQUFPLEtBQUssS0FBSyxNQUFNLElBQUksS0FBSyxLQUFLLEdBQUcsQ0FBQztnQkFDM0MsQ0FBQztnQkFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNSLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDakIsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNSLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDIn0=