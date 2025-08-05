import { createContext, useContext } from "react";
// eslint-disable-next-line @typescript-eslint/no-redeclare
const AiCompletionContext = createContext(null);
export const useAiCompletion = () => {
    const context = useContext(AiCompletionContext);
    if (!context) {
        return {
            createCompletion: () => Promise.resolve(""),
            enabled: false,
        };
    }
    return context;
};
export const AiCompletionProvider = AiCompletionContext.Provider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9haS9jb250ZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQVFsRCwyREFBMkQ7QUFDM0QsTUFBTSxtQkFBbUIsR0FBRyxhQUFhLENBQTZCLElBQUksQ0FBQyxDQUFDO0FBRTVFLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxHQUFHLEVBQUU7SUFDbEMsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2IsT0FBTztZQUNMLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQzNDLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQztJQUNKLENBQUM7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMifQ==