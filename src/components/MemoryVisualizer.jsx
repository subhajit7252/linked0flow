// File: src/components/MemoryVisualizer.jsx
import React from "react";

const MemoryVisualizer = ({ memory }) => {

   // console.table(memory)

  return (
    <div className="grid grid-cols-8 gap-2 mt-6">
      {memory.map((block, index) => (
        <div
          key={index}
          className={`w-16 h-16 flex flex-col items-center justify-center border rounded text-xs transition-all duration-500 ${
            block.used
              ? block.flash
                ? "bg-yellow-400 text-black"
                : "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          <div>{block.label || index}</div>
          {block.used && <div className="text-[10px]">{block.value}</div>}
        </div>
      ))}
    </div>
  );
};

export default MemoryVisualizer;
