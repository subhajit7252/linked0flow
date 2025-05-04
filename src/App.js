// File: src/App.jsx
import './App.css'; // or App.css depending on naming
import React, { useState } from "react";
import MemoryVisualizer from "./components/MemoryVisualizer";
import ControlPanel from "./components/ControlPanel";
import CompilerConsole from "./components/CompilerConsole";
import { useMemoryManager } from "./core/memoryManager";
import { runCompiler } from "./core/compiler";

function App() {
  const [memory, actions] = useMemoryManager(64); // 64 blocks
  const [logs, setLogs] = useState([]);

  const handleCompile = (code) => {
    const result = runCompiler(code, actions);
    setLogs((prev) => [...prev, ...result]);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🧠 linked0flow - Memory Simulator</h1>
      <ControlPanel allocate={actions.allocate} deallocate={actions.deallocate} />
      <CompilerConsole onCompile={handleCompile} logs={logs} />
      <MemoryVisualizer memory={memory} />
    </div>
  );
}

export default App;