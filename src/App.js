// File: src/App.jsx
import React, { useState } from "react";
import MemoryVisualizer from "./components/MemoryVisualizer";
import ControlPanel from "./components/ControlPanel";
import CompilerConsole from "./components/CompilerConsole";
import LinkedListVisualizer from "./components/LinkedListVisualizer";
import { useMemoryManager } from "./core/memoryManager";
import { runCompiler } from "./core/compiler";
import "./App.css"

function App() {
  const [memory, actions] = useMemoryManager(64); // 64 blocks
  const [logs, setLogs] = useState([]);
  const [listData, setListData] = useState([]); // for LinkedListVisualizer

  // const handleCompile = (code) => {
  //   const result = runCompiler(code, actions);

  //   // Extract list declaration line for LinkedListVisualizer
  //   const lines = code.split("\n");
  //   lines.forEach(line => {
  //     const match = line.match(/^list\s+(\w+)\s*=\s*\[(.*?)\]$/);
  //     if (match) {
  //       const [, , values] = match;
  //       const list = values.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v));
  //       setListData(list);
  //     }
  //   });

  //   setLogs((prev) => [...prev, ...result]);
  // };

  const handleCompile = (code) => {
    const result = runCompiler(code, actions, setListData);
    setLogs((prev) => [...prev, ...result]);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🧠 linked0flow - Memory Simulator</h1>
      <ControlPanel allocate={actions.allocate} deallocate={actions.deallocate} />
      <CompilerConsole onCompile={handleCompile} logs={logs} />
      <MemoryVisualizer memory={memory} />
      <h2 className="text-xl font-semibold mt-6 mb-2">🔗 Linked List 3D Visualizer</h2>
      <LinkedListVisualizer listData={listData} />
    </div>
  );
}

export default App;
