// Create a button element
const button = document.createElement("button");
button.innerText = "Return";
button.classList.add("custom-button");

// Add an event listener to the button for redirection
button.addEventListener("click", function() {
    window.location.href = "/index.html";
});
document.body.appendChild(button);

////////////////////////////////////////////////////////////////
// Create a button element
const Foodbutton = document.createElement("button");
Foodbutton.innerText = "Food";
Foodbutton.classList.add("food-button");
document.body.appendChild(Foodbutton);

// Add a div to display the ball count
const ballCountDisplay = document.createElement("div");
ballCountDisplay.id = "ballCountDisplay";
ballCountDisplay.textContent = "Balls in Box: 0";
ballCountDisplay.classList.add("ball-count-display");
document.body.appendChild(ballCountDisplay);

////////////////////////////////////////////////////////////////
// module aliases
var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Bodies = Matter.Bodies,
Composite = Matter.Composite,
Events = Matter.Events;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false
    }
});

render.canvas.width = window.innerWidth;
render.canvas.height = window.innerHeight;

// add mouse control
let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
});

var boxWidth = 200;
var boxHeight = 100;

var sensorBottom = Bodies.rectangle(
    700, 200 + boxHeight / 2 + 5, boxWidth, 10,
    {
        isStatic: true
    }
);

var sensorLeft = Bodies.rectangle(
    700 - boxWidth / 2 - 5, 200, 10, boxHeight,
    {
        isStatic: true
    }
);

var sensorRight = Bodies.rectangle(
    700 + boxWidth / 2 + 5, 200, 10, boxHeight,
    {
        isStatic: true
    }
);

Foodbutton.addEventListener("click", function() {
    var box = Bodies.circle(700, 200, 15);
    Composite.add(engine.world, [box]);
});

// Update the ball count display
function updateBallCountDisplay() {
    const ballCount = countBallsInBox();
    ballCountDisplay.textContent = `Balls: ${ballCount}`;
}

// Count the number of balls inside the box
function countBallsInBox() {
    const allBodies = Composite.allBodies(engine.world);

    let ballCount = 0;
    allBodies.forEach(body => {
        if (body.label === "Circle Body" && checkBallInBox(body)) {
            ballCount++;
        }
    });

    return ballCount;
}

// Function to check if a ball is inside the box
function checkBallInBox(ball) {
    const boxWidth = 200;
    const boxHeight = 100;
    const boxX = 700;
    const boxY = 200;

    const ballX = ball.position.x;
    const ballY = ball.position.y;

    const boxTop = boxY - boxHeight / 2;
    const boxBottom = boxY + boxHeight / 2;
    const boxLeft = boxX - boxWidth / 2;
    const boxRight = boxX + boxWidth / 2;

    if (ballX > boxLeft && ballX < boxRight && ballY > boxTop && ballY < boxBottom) {
        return true;
    } else {
        return false;
    }
}

// World
var ground = Bodies.rectangle(window.innerWidth/2, window.innerHeight,window.innerWidth,100,{ isStatic: true });
var Lwall = Bodies.rectangle(0, window.innerHeight,10,window.innerHeight*2,{ isStatic: true });
var Rwall = Bodies.rectangle(window.innerWidth, window.innerHeight,10,window.innerHeight*2,{ isStatic: true });
var topWall = Bodies.rectangle(window.innerWidth/2, 0,window.innerWidth,10,{ isStatic: true });

Composite.add(engine.world, [sensorBottom, sensorLeft, sensorRight, ground, Lwall, Rwall, topWall, mouseConstraint]);
Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

// Update the ball count display continuously
Events.on(engine, 'beforeUpdate', updateBallCountDisplay);
