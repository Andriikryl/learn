import React, { useEffect, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
export const Diagram = ({ title, initialNodes, initialEdges }: { title: string; initialNodes: Node[]; initialEdges: Edge[] }) => {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
  
    // Handle node changes
    const onNodesChange = (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds));
  
    // Handle edge changes
    const onEdgesChange = (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds));
  
    // Handle connections
    const onConnect = (params: Connection) =>
      setEdges((eds) => addEdge(params, eds));
  
    return (
      <div>
        <h2 className="text-lg font-semibold mt-6">{title}</h2>
        <div className="w-full h-[300px] border-2 border-black my-4">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    );
  };