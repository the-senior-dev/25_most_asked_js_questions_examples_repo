// global.gc();

function makeFunc() {
  // as long as the function is referenced, the big array cannot be garbage collected
  const big = Array.from({ length: 1_000_000 }, () => "x".repeat(1000));
  return () => "" + "big not referenced";
}

// function is referenced
let f = makeFunc();

// Heap before garbage collection
const before = process.memoryUsage().heapUsed; // keep as number

// Removes reference to the function, allowing the big array to be garbage collected
// f = null;

// Force garbage collection
global.gc();
global.gc();

// Heap after garbage collection
const after = process.memoryUsage().heapUsed;

console.log("Heap before (MB):", (before / 1024 / 1024).toFixed(2));
console.log("Heap after  (MB):", (after / 1024 / 1024).toFixed(2));
console.log("Freed       (MB):", ((before - after) / 1024 / 1024).toFixed(2));
