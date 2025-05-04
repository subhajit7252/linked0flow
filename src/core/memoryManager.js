// File: src/core/memoryManager.js
import { useState } from "react";

export function useMemoryManager(size) {
  const [memory, setMemory] = useState(
    Array.from({ length: size }, () => ({ used: false, label: null, value: null, flash: false }))
  );

  const allocate = (label, blockSize, value = null) => {

    console.log("label", label, value, blockSize)

    const index = findFreeBlock(blockSize);
    if (index === -1) {
      alert("No sufficient free memory block found.");
      return;
    }

    console.log("index", blockSize)


    setMemory((prev) => {
      const newMemory = [...prev];
      for (let i = index; i < index + blockSize; i++) {
        newMemory[i] = { used: true, label, value, flash: false };
      }
      console.log("newMemory", newMemory)
      return newMemory;
    });
  };

  const deallocate = (label) => {
    setMemory((prev) =>
      prev.map((block) =>
        block.label === label ? { used: false, label: null, value: null, flash: false } : block
      )
    );
  };

  const highlight = (label) => {

    console.log("hello",label )

    setMemory((prev) =>
      prev.map((block) =>
        block.label === label ? { ...block, flash: true } : { ...block, flash: false }
      )
    );
    setTimeout(() => {
      setMemory((prev) => prev.map((block) => ({ ...block, flash: false })));
    }, 800);
  };

  const findFreeBlock = (blockSize) => {
    let count = 0;
    for (let i = 0; i < memory.length; i++) {
      if (!memory[i].used) count++;
      else count = 0;
      if (count === blockSize) return i - blockSize + 1;
    }
    return -1;
  };

  return [memory, { allocate, deallocate, highlight }];
}
