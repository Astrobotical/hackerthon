import { jsx as _jsx } from "react/jsx-runtime";
import { connectionData, visualNode, nodeInput, nodeInstance, nodeOutput, } from "@flyde/core";
import { assert } from "chai";
import { noop } from "lodash";
import * as ReactDOMServer from "react-dom/server";
import { FlowEditor } from "..";
import { defaultViewPort } from "../visual-node-editor";
describe("ssg/ssr support", () => {
    beforeEach(() => {
        assert.equal(typeof document, "undefined");
    });
    it("renders into string without throwing in the absence of DOM", () => {
        const id = "node";
        const node = visualNode({
            id,
            inputs: { a: nodeInput() },
            outputs: { r: nodeOutput() },
            instances: [
                nodeInstance("i1", id, { type: "package", data: {} }),
                nodeInstance("i2", id, { type: "package", data: {} }),
            ],
            connections: [connectionData("i1.r", "i2.a")],
        });
        const dummyNode = {
            id: 'dummy',
            inputs: {},
            outputs: {},
            inputsPosition: {},
            outputsPosition: {},
            connections: [],
            instances: [],
        };
        const editorNode = {
            ...node,
            instances: node.instances.map((i) => ({
                ...i,
                node: dummyNode
            })),
        };
        const props = {
            state: {
                flow: {
                    node: editorNode,
                },
                boardData: {
                    selectedInstances: [],
                    viewPort: defaultViewPort,
                    lastMousePos: { x: 0, y: 0 },
                    selectedConnections: [],
                },
            },
            onChangeEditorState: noop,
        };
        let s = "";
        assert.doesNotThrow(() => {
            const comp = _jsx(FlowEditor, { ...props });
            s = ReactDOMServer.renderToString(comp);
            // assert.notInclude(s, 'Error')
        });
        assert.notInclude(s, "Error");
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NnLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3BlYy9zc2cuc3BlYy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQ2QsVUFBVSxFQUNWLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxHQUVYLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEtBQUssY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFaEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXhELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUU7SUFDL0IsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNERBQTRELEVBQUUsR0FBRyxFQUFFO1FBQ3BFLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUNsQixNQUFNLElBQUksR0FBRyxVQUFVLENBQUM7WUFDdEIsRUFBRTtZQUNGLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRTtZQUMxQixPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDNUIsU0FBUyxFQUFFO2dCQUNULFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ3JELFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7YUFDdEQ7WUFDRCxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzlDLENBQUMsQ0FBQztRQUNILE1BQU0sU0FBUyxHQUFlO1lBQzVCLEVBQUUsRUFBRSxPQUFPO1lBQ1gsTUFBTSxFQUFFLEVBQUU7WUFDVixPQUFPLEVBQUUsRUFBRTtZQUNYLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLGVBQWUsRUFBRSxFQUFFO1lBQ25CLFdBQVcsRUFBRSxFQUFFO1lBQ2YsU0FBUyxFQUFFLEVBQUU7U0FFZCxDQUFBO1FBQ0QsTUFBTSxVQUFVLEdBQUc7WUFDakIsR0FBRyxJQUFJO1lBQ1AsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxHQUFHLENBQUM7Z0JBQ0osSUFBSSxFQUFFLFNBQVM7YUFDaEIsQ0FBQyxDQUFDO1NBQ0osQ0FBQztRQUNGLE1BQU0sS0FBSyxHQUF5QjtZQUNsQyxLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxVQUFVO2lCQUNqQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsaUJBQWlCLEVBQUUsRUFBRTtvQkFDckIsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDNUIsbUJBQW1CLEVBQUUsRUFBRTtpQkFDeEI7YUFDRjtZQUNELG1CQUFtQixFQUFFLElBQUk7U0FDMUIsQ0FBQztRQUVGLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxHQUFHLEtBQUMsVUFBVSxPQUFLLEtBQUssR0FBSSxDQUFDO1lBQ3ZDLENBQUMsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDLElBQVcsQ0FBQyxDQUFDO1lBQy9DLGdDQUFnQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==