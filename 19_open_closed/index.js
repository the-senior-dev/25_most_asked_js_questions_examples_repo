
// open closed principle

// closed for modification
// open for extension

class Shape {
    constructor() {
        
    }
    draw() {
        throw new Error("Method 'draw' must be implemented.");
    }
}

class Circle extends Shape {
    constructor() {
        super();
    }
    draw() {
        console.log("Drawing a circle");
    }
}

class Square extends Shape {
    constructor() {
        super();
    }
    draw() {
        console.log("Drawing a square");
    }
}
