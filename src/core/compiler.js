// File: src/core/compiler.js
let persistentListState = {};

export function runCompiler(code, actions, updateListData) {
  const lines = code.split("\n");
  const logs = [];
  const memoryState = {};
  const listState = persistentListState;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    const varMatch = line.match(/^var\s+(\w+)\s*=\s*(\d+)$/);
    const exprMatch = line.match(/^var\s+(\w+)\s*=\s*(\w+)\s*([+\-*/])\s*(\w+)$/);
    const printMatch = line.match(/^print\s+(\w+)$/);
    const freeMatch = line.match(/^free\s+(\w+)$/);
    const listMatch = line.match(/^list\s+(\w+)\s*=\s*\[(.*?)\]$/);
    const pushMatch = line.match(/^push\s+(\w+)\s*=\s*(\d+)$/);
    const popMatch = line.match(/^pop\s+(\w+)$/);
    const insertMatch = line.match(/^insert\s+(\w+)\s+@(\d+)\s*=\s*(\d+)$/);

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
    } else if (printMatch) {
      const [, name] = printMatch;
      const val = memoryState[name] ?? listState[name];
      if (val !== undefined) {
        logs.push(`Value of '${name}' is ${Array.isArray(val) ? "[" + val.join(", ") + "]" : val}`);
        setTimeout(() => actions.highlight(`${name}`), 50);
        if (Array.isArray(val)) {
          for (let i = 1; i < val.length; i++) {
            setTimeout(() => actions.highlight(`${name}_${i}`), 50);
          }
        }
      } else {
        logs.push(`Error: Variable '${name}' not found`);
      }
    } else if (freeMatch) {
      const [, name] = freeMatch;
      actions.deallocate(name);
      delete memoryState[name];
      delete listState[name];
      logs.push(`Freed memory of '${name}'`);
    } else if (listMatch) {
      const [, name, values] = listMatch;
      const arr = values.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v));
      listState[name] = arr;
      updateListData(arr);

      // Allocate each element in memory with label and value
      arr.forEach((val, idx) => {
        const label = idx === 0 ? name : `${name}_${idx}`;
        actions.allocate(label, 1, val);
      });

      actions.allocate(name, arr.length, arr[0]);
      for (let i = arr.length -1 ; i > 0; i--) {
        actions.allocate(`${name}_${i}`, i, arr[i]);            
      }

      logs.push(`Created list '${name}' with values [${arr.join(", ")}]`);
    } else if (pushMatch) {
      const [, name, value] = pushMatch;
      if (!Array.isArray(listState[name])) {
        logs.push(`Error: Cannot push to non-list variable '${name}'`);
        continue;
      }
      
      listState[name].push(Number(value));
      updateListData([...listState[name]]);
      const idx = listState[name].length - 1;
      const label = idx === 0 ? name : `${name}_${idx}`;

      actions.allocate(name, listState[name].length, listState[name][0]);
      for (let i = listState[name].length -1 ; i > 0; i--) {
        actions.allocate(`${name}_${i}`, i, listState[name][i]);            
      }
     
      logs.push(`Pushed value ${value} to list '${name}'`);


    } else if (popMatch) {
      const [, name] = popMatch;
      if (!Array.isArray(listState[name]) || listState[name].length === 0) {
        logs.push(`Error: Cannot pop from empty or non-list '${name}'`);
        continue;
      }
      const removed = listState[name].pop();
      const idx = listState[name].length;
      const label = idx === 0 ? name : `${name}_${idx}`;
      actions.deallocate(label);
      updateListData([...listState[name]]);
      logs.push(`Popped value ${removed} from list '${name}'`);
    } else if (insertMatch) {
      const [, name, index, value] = insertMatch;
      const idx = parseInt(index);
      const val = parseInt(value);
      if (!Array.isArray(listState[name])) {
        logs.push(`Error: Cannot insert into non-list variable '${name}'`);
        continue;
      }
      if (idx < 0 || idx > listState[name].length) {
        logs.push(`Error: Invalid index ${idx} for insert in '${name}'`);
        continue;
      }
      listState[name].splice(idx, 0, val);
      updateListData([...listState[name]]);
      // Reallocate all to re-sync memory
      listState[name].forEach((v, i) => {
        const label = i === 0 ? name : `${name}_${i}`;
        actions.allocate(label, 1, v);
      });
      logs.push(`Inserted ${val} at index ${idx} in list '${name}'`);
    } else {
      logs.push(`Unrecognized syntax: "${line}"`);
    }
  }

  return logs;
}
