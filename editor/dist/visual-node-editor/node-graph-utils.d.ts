import { NodeInstance, ConnectionData, VisualNode } from "@flyde/core";
export declare const getLeafInstancesOfSelection: (selectedInstances: NodeInstance[], allInstances: NodeInstance[], allConnections: ConnectionData[]) => NodeInstance[];
export type InstanceWithConstPinMap = Map<string, Map<string, {
    val: any;
    insId: string;
}>>;
export declare const calculateInstancesWithSingleConstPinsMap: (node: VisualNode, constSinglePinMap: Map<string, any>) => InstanceWithConstPinMap;
//# sourceMappingURL=node-graph-utils.d.ts.map