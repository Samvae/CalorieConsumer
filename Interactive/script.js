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
        wireframes: false,
        background: "#EEF4EE"
    }
});

// add mouse control
let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
});

const stomachBottom = {
    body: Bodies.rectangle(window.innerWidth/2, window.innerHeight - 100, 400, 10, {
        isStatic: true,
    }),
    name: "stomachBottom"
};

const stomachLeft = {
    body: Bodies.rectangle(window.innerWidth/2 - 200, window.innerHeight - 145, 10, 100, {
        isStatic: true
    }),
    name: "stomachLeft"
};

const stomachRight = {
    body: Bodies.rectangle(window.innerWidth/2 + 200, window.innerHeight - 145, 10, 100, {
        isStatic: true
    }),
    name: "stomachRight"
};

const banana = document.getElementById("banana");
banana.addEventListener("click", function() {
    var bananaBody = Bodies.circle(700, 200, 15, {
        render: {
            sprite: {
                // texture: "/banana1.png"
            }
        },
        value: 105  // Calories of banana
    });
    Composite.add(engine.world, [bananaBody]);
});

const strawberry = document.getElementById("strawberry");
strawberry.addEventListener("click", function() {
    var strawberryBody = Bodies.circle(700, 200, 10, {
        render: {
            sprite: {
                // texture: ""
            }
        },
        value: 7  // Calories of banana
    });
    Composite.add(engine.world, [strawberryBody]);
});


// Update the calories count display
const calories = document.getElementById("calories");
function updateCalories() {
    const kcal = countCalories();
    calories.textContent = `Calories: ${kcal}`;
}

// Count the number of calories inside the box
function countCalories() {
    const allBodies = Composite.allBodies(engine.world);

    let totalCalories = 0;
    allBodies.forEach(body => {
        if (body.label === "Circle Body" && checkCalories(body)) {
            totalCalories += body.value || 0; // Add the 'value' property to total
        }
    });

    return totalCalories;
}

// Function to check if food is inside the box
function checkCalories(food) {
    if (food.position.x > stomachLeft.body.bounds.min.x && 
        food.position.x < stomachRight.body.bounds.min.x &&
        food.position.y > stomachLeft.body.bounds.min.y &&
        food.position.y < stomachBottom.body.bounds.max.y
        ) {
        return true;
    } else {
        return false;
    }
}

var walls = [
    // Ground
    {
        body: Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 100, {
            isStatic: true,
            render: {
                fillStyle: "#007B16"
            }
        }),
        name: "ground"
    },
    // Left Wall
    {
        body: Bodies.rectangle(0, window.innerHeight, 5, window.innerHeight * 2, {
            isStatic: true
        }),
        name: "Lwall"
    },
    // Right Wall
    {
        body: Bodies.rectangle(window.innerWidth, window.innerHeight, 5, window.innerHeight * 2, {
            isStatic: true
        }),
        name: "Rwall"
    },
];

// Combine all bodies into a single array
var bodiesToAdd = walls.map(wall => wall.body)
    .concat(stomachBottom.body)   
    .concat(stomachLeft.body)
    .concat(stomachRight.body)
    .concat(mouseConstraint);

// Add all bodies to the world
Composite.add(engine.world, bodiesToAdd);

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

// Update the calories count display continuously
Events.on(engine, 'beforeUpdate', updateCalories);
