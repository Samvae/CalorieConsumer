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

//PLATE
const plateBottom = {
    body: Matter.Bodies.rectangle(window.innerWidth/4, window.innerHeight/2, 450, 10, {
      isStatic: true,
      render: {
        sprite: {
          texture: '/images/plate.png', // Image for the plate
          xScale: 0.5, // Adjust scale if needed
          yScale: 0.5
        }
      }
    }),
    name: "plateBottom",
  };

  const plateLeft = {
    body: Bodies.rectangle(window.innerWidth/4 - 230, window.innerHeight/2 - 10, 10, 20, {
        isStatic: true,
        render: {
            opacity: 0, // Make the rectangle invisible
          }
    }),
    name: "plateLeft"
};

const plateRight = {
    body: Bodies.rectangle(window.innerWidth/4 + 230, window.innerHeight/2 - 10, 10, 20, {
        isStatic: true,
        render: {
            opacity: 0, // Make the rectangle invisible
          }
    }),
    name: "plateRight"
};




//STOMACH
const stomachBottom = {
    body: Bodies.rectangle(window.innerWidth/2, window.innerHeight - 100, 400, 10, {
        isStatic: true,
    }),
    name: "stomachBottom",
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

const Foods = [
    { 
        id: "banana",
        texture: "/images/banana.png",
        calories: 105,
        size: 15
    },
    { 
        id: "strawberry",
        texture: "",
        calories: 6,
        size: 10,
    },
    { 
        id: "carrot",
        texture: "",
        calories: 25,
        size: 10
    },
    { 
        id: "egg",
        texture: "",
        calories: 90,
        size: 10
    },
    { 
        id: "salmon",
        texture: "",
        calories: 175,
        size: 15
    },
    { 
        id: "apple",
        texture: "",
        calories: 80,
        size: 10
    },
    { 
        id: "walnut",
        texture: "",
        calories: 26,
        size: 10
    },
    { 
        id: "bacon",
        texture: "",
        calories: 43,
        size: 12
    },
    { 
        id: "hamburger",
        texture: "",
        calories: 254,
        size: 12
    },
    { 
        id: "pizza",
        texture: "",
        calories: 285,
        size: 15
    },
    { 
        id: "chickenbreast",
        texture: "",
        calories: 165,
        size: 15
    },
    { 
        id: "chickenthigh",
        texture: "",
        calories: 179,
        size: 15
    },
    { 
        id: "chickenwing",
        texture: "",
        calories: 203,
        size: 15
    },
    { 
        id: "chickendrumstick",
        texture: "",
        calories: 155,
        size: 15
    },
];

function createFood(texture, calories, size) {
    return function() {
        var FoodBody = Bodies.circle(window.innerWidth/4, 200, size, {
            render: {
                sprite: {
                    texture: texture
                }
            },
            value: calories
        });
        Composite.add(engine.world, [FoodBody]);
    };
}

function attachEventListeners() {
    Foods.forEach(Food => {
        const FoodButton = document.getElementById(Food.id);
        FoodButton.addEventListener("click", createFood(Food.texture, Food.calories, Food.size));
    });
}

attachEventListeners();

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
                fillStyle: "#000"
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
    .concat(plateBottom.body)
    .concat(plateLeft.body)
    .concat(plateRight.body)
    .concat(mouseConstraint);

// Add all bodies to the world
Composite.add(engine.world, bodiesToAdd);

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

// Update the calories count display continuously
Events.on(engine, 'beforeUpdate', updateCalories);
