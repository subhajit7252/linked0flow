// File: src/components/ControlPanel.jsx
import React, { useState } from "react";

const ControlPanel = ({ allocate, deallocate }) => {
  const [name, setName] = useState("");
  const [size, setSize] = useState(1);

  return (
    <div className="flex gap-4 items-center">
      <input
        className="p-2 border rounded"
        placeholder="Variable Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        className="p-2 border rounded w-24"
        placeholder="Size"
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
      />
      <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => allocate(name, size)}>
        Allocate
      </button>
      <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => deallocate(name)}>
        Free
      </button>
    </div>
  );
};

export default ControlPanel;