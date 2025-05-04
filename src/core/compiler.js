export function runCompiler(code, actions) {
    const lines = code.split("\n");
    const logs = [];
    const memoryState = {};
    
    for (let line of lines) {
    line = line.trim();
    if (!line) continue;const varMatch = line.match(/^var\s+(\w+)\s*=\s*(\d+)$/);
    const exprMatch = line.match(/^var\s+(\w+)\s*=\s*(\w+)\s*([+\-*/])\s*(\w+)$/);
    const printMatch = line.match(/^print\s+(\w+)$/);
    const freeMatch = line.match(/^free\s+(\w+)$/);
    const listMatch = line.match(/^list\s+(\w+)\s*=\s*\[(.*?)\]$/);
    
    if (varMatch) {
      const [, name, value] = varMatch;
      const size = 1;
      actions.allocate(name, size, value);
      memoryState[name] = Number(value);
      logs.push(`Allocated '${name}' with value ${value}`);
    } else if (exprMatch) {
      const [, name, var1, op, var2] = exprMatch;
      const val1 = memoryState[var1];
      const val2 = memoryState[var2];
    
      if (val1 === undefined || val2 === undefined) {
        logs.push(`Error: Undefined variable(s) in expression '${var1} ${op} ${var2}'`);
        continue;
      }
    
      let result;
      switch (op) {
        case "+": result = val1 + val2; break;
        case "-": result = val1 - val2; break;
        case "*": result = val1 * val2; break;
        case "/": result = Math.floor(val1 / val2); break;
        default:
          logs.push(`Error: Invalid operator '${op}'`);
          continue;
      }
    
      actions.allocate(name, 1, result);
      memoryState[name] = result;
      logs.push(`Computed '${name}' = ${val1} ${op} ${val2} = ${result}`);
    } else if (listMatch) {
      const [, name, elements] = listMatch;
      const values = elements.split(",").map((v) => parseInt(v.trim())).filter((v) => !isNaN(v));
    
      if (!values.length) {
        logs.push(`Error: List '${name}' is empty or invalid.`);
        continue;
      }
      console.log("final values", values, name)    
      actions.allocate(name, values.length, values[0]);
          for (let i = values.length -1 ; i > 0; i--) {
            actions.allocate(`${name}_${i}`, i, values[i]);            
          }
    
      memoryState[name] = [...values];     

      logs.push(`Allocated linked list '${name}' = [${values.join(", ")}], length = ${values.length}`);
    } else if (printMatch) {
      const [, name] = printMatch;
      const val = memoryState[name];

      console.log("name", name, val)



      if (val !== undefined) {
        logs.push(`Value of '${name}' is ${Array.isArray(val) ? "[" + val.join(", ") + "]" : val}`);
        
        setTimeout(() => actions.highlight(`${name}`), 50); // Ensure memory is updated first
        if (Array.isArray(val)) {
            for (let i = 1; i < val.length; i++) {
              const label = `${name}_${i}`;
              console.log("val", label);
              setTimeout(() => {
                actions.highlight(label);
              }, i * 300); // Delay slightly more for cascading animation
            }
          }
      } else {
        logs.push(`Error: Variable '${name}' not found`);
      }
    } else if (freeMatch) {
      const [, name] = freeMatch;
      actions.deallocate(name);
      delete memoryState[name];
      logs.push(`Freed memory of '${name}'`);
    } else {
      logs.push(`Unrecognized syntax: "${line}"`);
    }}

    return logs;
    }