// File: src/components/CompilerConsole.jsx
import React, { useState } from "react";

const CompilerConsole = ({ onCompile, logs }) => {
  const [code, setCode] = useState("");

  return (
    <div className="mt-6">
      <textarea
        className="w-full p-2 border rounded h-32"
        placeholder="Type your pseudo code here...\nExample:\nvar a = 3\nvar b = 2"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-purple-600 text-white rounded"
        onClick={() => onCompile(code)}
      >
        Run Compiler
      </button>

      <div className="mt-4 bg-white p-2 border rounded h-40 overflow-auto text-sm">
        <strong>Compiler Output:</strong>
        <pre>{logs.join("\n")}</pre>
      </div>
    </div>
  );
};

export default CompilerConsole;
