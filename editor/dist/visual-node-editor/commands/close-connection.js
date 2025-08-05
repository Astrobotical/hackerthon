"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnectionCloseEditorCommand = void 0;
const core_1 = require("@flyde/core");
const immer_1 = __importDefault(require("immer"));
const handleConnectionCloseEditorCommand = (node, { from, to }) => {
    return (0, immer_1.default)(node, (draft) => {
        const existing = draft.connections.find((conn) => {
            const fromEq = (0, core_1.connectionNodeEquals)(from, conn.from);
            const toEq = (0, core_1.connectionNodeEquals)(to, conn.to);
            return fromEq && toEq;
        });
        if (existing) {
            draft.connections = draft.connections.filter((conn) => conn !== existing);
        }
        else {
            draft.connections.push({
                from,
                to,
            });
        }
    });
};
exports.handleConnectionCloseEditorCommand = handleConnectionCloseEditorCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2UtY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvY29tbWFuZHMvY2xvc2UtY29ubmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzQ0FBcUY7QUFDckYsa0RBQTRCO0FBRXJCLE1BQU0sa0NBQWtDLEdBQUcsQ0FDaEQsSUFBc0IsRUFDdEIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFrQixFQUM1QixFQUFFO0lBQ0YsT0FBTyxJQUFBLGVBQU8sRUFBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM3QixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUEsMkJBQW9CLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRCxNQUFNLElBQUksR0FBRyxJQUFBLDJCQUFvQixFQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDL0MsT0FBTyxNQUFNLElBQUksSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNiLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQztRQUM1RSxDQUFDO2FBQU0sQ0FBQztZQUNOLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUNyQixJQUFJO2dCQUNKLEVBQUU7YUFDSCxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFwQlcsUUFBQSxrQ0FBa0Msc0NBb0I3QyJ9