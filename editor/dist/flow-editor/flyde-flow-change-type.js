"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaChange = exports.functionalChange = void 0;
const functionalChange = (message) => ({
    type: "functional",
    message,
});
exports.functionalChange = functionalChange;
const metaChange = (message = "n/a") => ({
    type: "meta",
    message,
});
exports.metaChange = metaChange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx5ZGUtZmxvdy1jaGFuZ2UtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mbG93LWVkaXRvci9mbHlkZS1mbG93LWNoYW5nZS10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtPLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxPQUFlLEVBQXVCLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLElBQUksRUFBRSxZQUFZO0lBQ2xCLE9BQU87Q0FDUixDQUFDLENBQUM7QUFIVSxRQUFBLGdCQUFnQixvQkFHMUI7QUFFSSxNQUFNLFVBQVUsR0FBRyxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQXVCLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLElBQUksRUFBRSxNQUFNO0lBQ1osT0FBTztDQUNSLENBQUMsQ0FBQztBQUhVLFFBQUEsVUFBVSxjQUdwQiJ9