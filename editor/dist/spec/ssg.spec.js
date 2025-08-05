"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@flyde/core");
const chai_1 = require("chai");
const lodash_1 = require("lodash");
const ReactDOMServer = __importStar(require("react-dom/server"));
const __1 = require("..");
const visual_node_editor_1 = require("../visual-node-editor");
describe("ssg/ssr support", () => {
    beforeEach(() => {
        chai_1.assert.equal(typeof document, "undefined");
    });
    it("renders into string without throwing in the absence of DOM", () => {
        const id = "node";
        const node = (0, core_1.visualNode)({
            id,
            inputs: { a: (0, core_1.nodeInput)() },
            outputs: { r: (0, core_1.nodeOutput)() },
            instances: [
                (0, core_1.nodeInstance)("i1", id, { type: "package", data: {} }),
                (0, core_1.nodeInstance)("i2", id, { type: "package", data: {} }),
            ],
            connections: [(0, core_1.connectionData)("i1.r", "i2.a")],
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
                    viewPort: visual_node_editor_1.defaultViewPort,
                    lastMousePos: { x: 0, y: 0 },
                    selectedConnections: [],
                },
            },
            onChangeEditorState: lodash_1.noop,
        };
        let s = "";
        chai_1.assert.doesNotThrow(() => {
            const comp = (0, jsx_runtime_1.jsx)(__1.FlowEditor, { ...props });
            s = ReactDOMServer.renderToString(comp);
            // assert.notInclude(s, 'Error')
        });
        chai_1.assert.notInclude(s, "Error");
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NnLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlYy9zc2cuc3BlYy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBT3FCO0FBQ3JCLCtCQUE4QjtBQUM5QixtQ0FBOEI7QUFDOUIsaUVBQW1EO0FBRW5ELDBCQUFnQztBQUVoQyw4REFBd0Q7QUFFeEQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtJQUMvQixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsYUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw0REFBNEQsRUFBRSxHQUFHLEVBQUU7UUFDcEUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLE1BQU0sSUFBSSxHQUFHLElBQUEsaUJBQVUsRUFBQztZQUN0QixFQUFFO1lBQ0YsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUEsZ0JBQVMsR0FBRSxFQUFFO1lBQzFCLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFBLGlCQUFVLEdBQUUsRUFBRTtZQUM1QixTQUFTLEVBQUU7Z0JBQ1QsSUFBQSxtQkFBWSxFQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDckQsSUFBQSxtQkFBWSxFQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQzthQUN0RDtZQUNELFdBQVcsRUFBRSxDQUFDLElBQUEscUJBQWMsRUFBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDOUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxTQUFTLEdBQWU7WUFDNUIsRUFBRSxFQUFFLE9BQU87WUFDWCxNQUFNLEVBQUUsRUFBRTtZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsY0FBYyxFQUFFLEVBQUU7WUFDbEIsZUFBZSxFQUFFLEVBQUU7WUFDbkIsV0FBVyxFQUFFLEVBQUU7WUFDZixTQUFTLEVBQUUsRUFBRTtTQUVkLENBQUE7UUFDRCxNQUFNLFVBQVUsR0FBRztZQUNqQixHQUFHLElBQUk7WUFDUCxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3BDLEdBQUcsQ0FBQztnQkFDSixJQUFJLEVBQUUsU0FBUzthQUNoQixDQUFDLENBQUM7U0FDSixDQUFDO1FBQ0YsTUFBTSxLQUFLLEdBQXlCO1lBQ2xDLEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLFVBQVU7aUJBQ2pCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxpQkFBaUIsRUFBRSxFQUFFO29CQUNyQixRQUFRLEVBQUUsb0NBQWU7b0JBQ3pCLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDNUIsbUJBQW1CLEVBQUUsRUFBRTtpQkFDeEI7YUFDRjtZQUNELG1CQUFtQixFQUFFLGFBQUk7U0FDMUIsQ0FBQztRQUVGLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLGFBQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxHQUFHLHVCQUFDLGNBQVUsT0FBSyxLQUFLLEdBQUksQ0FBQztZQUN2QyxDQUFDLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQyxJQUFXLENBQUMsQ0FBQztZQUMvQyxnQ0FBZ0M7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxhQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=