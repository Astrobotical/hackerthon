import { connectionNodeEquals } from "@flyde/core";
import produce from "immer";
export const handleConnectionCloseEditorCommand = (node, { from, to }) => {
    return produce(node, (draft) => {
        const existing = draft.connections.find((conn) => {
            const fromEq = connectionNodeEquals(from, conn.from);
            const toEq = connectionNodeEquals(to, conn.to);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2UtY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92aXN1YWwtbm9kZS1lZGl0b3IvY29tbWFuZHMvY2xvc2UtY29ubmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWtCLG9CQUFvQixFQUFvQixNQUFNLGFBQWEsQ0FBQztBQUNyRixPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFFNUIsTUFBTSxDQUFDLE1BQU0sa0NBQWtDLEdBQUcsQ0FDaEQsSUFBc0IsRUFDdEIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFrQixFQUM1QixFQUFFO0lBQ0YsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDN0IsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMvQyxNQUFNLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JELE1BQU0sSUFBSSxHQUFHLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDL0MsT0FBTyxNQUFNLElBQUksSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNiLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQztRQUM1RSxDQUFDO2FBQU0sQ0FBQztZQUNOLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUNyQixJQUFJO2dCQUNKLEVBQUU7YUFDSCxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==