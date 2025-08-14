let color = "red"; // global scope

function changeColor(color) {
    color = "blue"; // only changes the local copy
    return color;
}

// change by reference
console.log(changeColor(color));
console.log(color)


