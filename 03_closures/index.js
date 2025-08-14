const initialMemory = process.memoryUsage();

const calculate = require("./calculate");

global.gc(); // force garbage collection

console.log(calculate(2));
console.log(calculate(2));
console.log(calculate(2));
console.log(calculate(2));
console.log(calculate(2));

const memoryConsumedByFunction = process.memoryUsage().heapUsed - initialMemory.heapUsed;
console.log('Memory consumed by myFunction:', memoryConsumedByFunction / (1024 * 1024), 'MB');

