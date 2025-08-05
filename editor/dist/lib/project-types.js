"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeProjectMap = exports.emptyCliProject = exports.emptyMobileProject = exports.emptyLambdaProject = exports.emptyServerProject = exports.emptyWebUiProject = void 0;
const core_1 = require("@flyde/core");
exports.emptyWebUiProject = {
    id: "new-web-ui-project",
    inputs: {},
    outputs: {
        jsx: (0, core_1.nodeOutput)(),
    },
    inputsPosition: { mouse: { x: 0, y: 0 }, keyPress: { x: 200, y: 0 } },
    outputsPosition: { response: { x: 0, y: 400 } },
    connections: [],
    instances: [],
    completionOutputs: [],
    reactiveInputs: [],
};
exports.emptyServerProject = {
    id: "new-server-project",
    inputs: {
        request: (0, core_1.nodeInput)(),
    },
    outputs: {
        response: (0, core_1.nodeOutput)(),
    },
    inputsPosition: { request: { x: 0, y: 0 } },
    outputsPosition: { response: { x: 0, y: 400 } },
    connections: [],
    instances: [],
};
exports.emptyLambdaProject = {
    id: "new-lambda-project",
    inputs: {
        context: (0, core_1.nodeInput)(),
    },
    outputs: {
        response: (0, core_1.nodeOutput)(),
    },
    inputsPosition: { context: { x: 0, y: 0 } },
    outputsPosition: { response: { x: 0, y: 400 } },
    connections: [],
    instances: [],
};
exports.emptyMobileProject = {
    id: "new-mobile-project",
    inputs: {},
    outputs: {
        jsx: (0, core_1.nodeOutput)(),
    },
    inputsPosition: { context: { x: 0, y: 0 } },
    outputsPosition: { response: { x: 0, y: 400 } },
    connections: [],
    instances: [],
};
exports.emptyCliProject = {
    id: "new-cli-project",
    inputs: {
        args: (0, core_1.nodeInput)(),
    },
    outputs: {
        stdout: (0, core_1.nodeOutput)(true),
        stderr: (0, core_1.nodeOutput)(true),
        exit: (0, core_1.nodeOutput)(true),
    },
    inputsPosition: { args: { x: 0, y: 0 } },
    outputsPosition: {
        stdout: { x: -100, y: 400 },
        stderr: { x: 0, y: 400 },
        exit: { x: 100, y: 400 },
    },
    connections: [],
    instances: [],
};
exports.typeProjectMap = {
    server: exports.emptyServerProject,
    "web-ui": exports.emptyWebUiProject,
    lambda: exports.emptyLambdaProject,
    mobile: exports.emptyMobileProject,
    cli: exports.emptyCliProject,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC10eXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcHJvamVjdC10eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBZ0U7QUFFbkQsUUFBQSxpQkFBaUIsR0FBZTtJQUMzQyxFQUFFLEVBQUUsb0JBQW9CO0lBQ3hCLE1BQU0sRUFBRSxFQUFFO0lBQ1YsT0FBTyxFQUFFO1FBQ1AsR0FBRyxFQUFFLElBQUEsaUJBQVUsR0FBRTtLQUNsQjtJQUNELGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3JFLGVBQWUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQy9DLFdBQVcsRUFBRSxFQUFFO0lBQ2YsU0FBUyxFQUFFLEVBQUU7SUFDYixpQkFBaUIsRUFBRSxFQUFFO0lBQ3JCLGNBQWMsRUFBRSxFQUFFO0NBQ25CLENBQUM7QUFFVyxRQUFBLGtCQUFrQixHQUFlO0lBQzVDLEVBQUUsRUFBRSxvQkFBb0I7SUFDeEIsTUFBTSxFQUFFO1FBQ04sT0FBTyxFQUFFLElBQUEsZ0JBQVMsR0FBRTtLQUNyQjtJQUNELE9BQU8sRUFBRTtRQUNQLFFBQVEsRUFBRSxJQUFBLGlCQUFVLEdBQUU7S0FDdkI7SUFDRCxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMzQyxlQUFlLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUMvQyxXQUFXLEVBQUUsRUFBRTtJQUNmLFNBQVMsRUFBRSxFQUFFO0NBQ2QsQ0FBQztBQUVXLFFBQUEsa0JBQWtCLEdBQWU7SUFDNUMsRUFBRSxFQUFFLG9CQUFvQjtJQUN4QixNQUFNLEVBQUU7UUFDTixPQUFPLEVBQUUsSUFBQSxnQkFBUyxHQUFFO0tBQ3JCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsUUFBUSxFQUFFLElBQUEsaUJBQVUsR0FBRTtLQUN2QjtJQUNELGNBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzNDLGVBQWUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQy9DLFdBQVcsRUFBRSxFQUFFO0lBQ2YsU0FBUyxFQUFFLEVBQUU7Q0FDZCxDQUFDO0FBRVcsUUFBQSxrQkFBa0IsR0FBZTtJQUM1QyxFQUFFLEVBQUUsb0JBQW9CO0lBQ3hCLE1BQU0sRUFBRSxFQUFFO0lBQ1YsT0FBTyxFQUFFO1FBQ1AsR0FBRyxFQUFFLElBQUEsaUJBQVUsR0FBRTtLQUNsQjtJQUNELGNBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzNDLGVBQWUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQy9DLFdBQVcsRUFBRSxFQUFFO0lBQ2YsU0FBUyxFQUFFLEVBQUU7Q0FDZCxDQUFDO0FBRVcsUUFBQSxlQUFlLEdBQWU7SUFDekMsRUFBRSxFQUFFLGlCQUFpQjtJQUNyQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsSUFBQSxnQkFBUyxHQUFFO0tBQ2xCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsTUFBTSxFQUFFLElBQUEsaUJBQVUsRUFBQyxJQUFJLENBQUM7UUFDeEIsTUFBTSxFQUFFLElBQUEsaUJBQVUsRUFBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxFQUFFLElBQUEsaUJBQVUsRUFBQyxJQUFJLENBQUM7S0FDdkI7SUFDRCxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN4QyxlQUFlLEVBQUU7UUFDZixNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRTtRQUMzQixNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7UUFDeEIsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFO0tBQ3pCO0lBQ0QsV0FBVyxFQUFFLEVBQUU7SUFDZixTQUFTLEVBQUUsRUFBRTtDQUNkLENBQUM7QUFFVyxRQUFBLGNBQWMsR0FBZ0M7SUFDekQsTUFBTSxFQUFFLDBCQUFrQjtJQUMxQixRQUFRLEVBQUUseUJBQWlCO0lBQzNCLE1BQU0sRUFBRSwwQkFBa0I7SUFDMUIsTUFBTSxFQUFFLDBCQUFrQjtJQUMxQixHQUFHLEVBQUUsdUJBQWU7Q0FDckIsQ0FBQyJ9