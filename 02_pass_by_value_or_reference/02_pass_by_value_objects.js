const obj = { color: "red" };

function changeObject(inputObj) {
    inputObj.color = "blue";
    return inputObj;
}

console.log(changeObject(obj).color);
console.log(obj.color);