const initialMemory = process.memoryUsage();

const calculate = require("./calculate_clean");
const heavyCalculation = require("./calculate");

console.log(calculate(2));

const memoryConsumedByFunction = process.memoryUsage().heapUsed - initialMemory.heapUsed;
console.log('Memory consumed by myFunction:', memoryConsumedByFunction / (1024 * 1024), 'MB');
