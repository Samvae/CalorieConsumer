// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events;
    Body = Matter.Body;
    Svg = Matter.Svg;
    Vector = Matter.Vector;
    Vertices = Matter.Vertices; 

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
        background: "navajowhite"
    }
});

// Variable to store the start time
var startTime;

// add mouse control
let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
});

// MAN
const Man = {
    body: Matter.Bodies.rectangle(window.innerWidth/2 + 400, window.innerHeight/2 + 50, .0000001, .000001, {
      isStatic: true,
      render: {
        sprite: {
          texture: './images/man.png', // Image for the plate
          xScale: .6, // Adjust scale if needed
          yScale: .6,
          sensor: true,
        }
      }
    }),
    name: "Man",
  };


//PLATE
const plateBottom = {
    body: Matter.Bodies.rectangle(window.innerWidth/2 + 200, window.innerHeight/2 - 175, 480, 10, {
      isStatic: true,
      angle: ( 15 * Math.PI) / 180,
      render: {
        sprite: {
          texture: './images/plate.png', // Image for the plate
          xScale: 0.5, // Adjust scale if needed
          yScale: 0.5,
        }
      }
    }),
    name: "plateBottom",
  };

//Face
const Face = {
    body: Bodies.rectangle(window.innerWidth/2 + 515, window.innerHeight/2 - 90, 50, 8, {
        isStatic: true,
        angle: ( 90 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "Face",
};


//Tongue
  const Tongue = {
    body: Bodies.rectangle(window.innerWidth/2 + 465, window.innerHeight/2 - 40, 80, 8, {
        isStatic: true,
        angle: ( 20 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "Tongue",
};

const ThroatL = {
    body: Bodies.rectangle(window.innerWidth/2 + 450, window.innerHeight/2 + 50, 170, 8, {
        isStatic: true,
        angle: ( 125 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "ThroatL",
};

const ThroatR = {
    body: Bodies.rectangle(window.innerWidth/2 + 500, window.innerHeight/2 + 40, 170, 8, {
        isStatic: true,
        angle: ( 125 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "ThroatR",
};

const Throat = {
    body: Bodies.rectangle(window.innerWidth/2 + 540, window.innerHeight/2 - 45, 50, 8, {
        isStatic: true,
        angle: ( 40 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "Throat",
};

const Throat1 = {
    body: Bodies.rectangle(window.innerWidth/2 + 480, window.innerHeight/2 + 120, 50, 8, {
        isStatic: true,
        angle: ( 40 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "Throat1",
};

//STOMACH
const stomachTop = {
    body: Bodies.rectangle(window.innerWidth/2 + 340, window.innerHeight/2 + 150, 150, 10, {
        isStatic: true,
        angle: ( -25 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "stomachTop",
};

const stomachBottom = {
    body: Bodies.rectangle(window.innerWidth/2 + 380, window.innerHeight - 60, 150, 10, {
        isStatic: true,
        angle: ( -3 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "stomachBottom",
};

const stomachLeft = {
    body: Bodies.rectangle(window.innerWidth/2 + 290, window.innerHeight - 120, 10, 120, {
        isStatic: true,
        angle: ( -12 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "stomachLeft"
};

const stomachRight = {
    body: Bodies.rectangle(window.innerWidth/2 + 480, window.innerHeight - 150, 10, 170, {
        isStatic: true,
        angle: (20 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "stomachRight"
};

const Foods = [
    { 
        id: "banana",
        texture: "./images/banana.png",
        calories: 105,
        size: 13,
    },
    { 
        id: "strawberry",
        texture: "./images/strawberry.png",
        calories: 6,
        size: 10,
    },
    { 
        id: "carrot",
        texture: "./images/carrot.png",
        calories: 25,
        size: 11,
    },
    { 
        id: "egg",
        texture: "./images/egg.png",
        calories: 90,
        size: 12,
    },
    { 
        id: "salmon",
        texture: "./images/salmon.png",
        calories: 175,
        size: 14,
    },
    { 
        id: "apple",
        texture: "./images/apple.png",
        calories: 95,
        size: 12,
    },
    { 
        id: "walnut",
        texture: "./images/walnut.png",
        calories: 185,
        size: 12,
    },
    { 
        id: "bacon",
        texture: "./images/bacon.png",
        calories: 43,
        size: 12,
    },
    { 
        id: "hamburger",
        texture: "./images/hamburger.png",
        calories: 350,
        size: 13,
    },
    { 
        id: "pizza",
        texture: "./images/pizza.png",
        calories: 285,
        size: 13,
    },
    { 
        id: "chicken",
        texture: "./images/chicken.png",
        calories: 240,
        size: 13,
    },
    { 
        id: "watermelon",
        texture: "./images/watermelon.png",
        calories: 85,
        size: 11,
    },
    { 
        id: "chip",
        texture: "./images/chip.png",
        calories: 12,
        size: 5,
    },
    { 
        id: "waffles",
        texture: "./images/waffle.png",
        calories: 218,
        size: 13,
    },
    { 
        id: "hotdog",
        texture: "./images/hotdog.png",
        calories: 151,
        size: 12,
    },
    { 
        id: "steak",
        texture: "./images/steak.png",
        calories: 679,
        size: 14,
    },
    { 
        id: "rice",
        texture: "./images/rice.png",
        calories: 206,
        size: 10,
    },
    { 
        id: "icecream",
        texture: "./images/icecream.png",
        calories: 121,
        size: 11,
    },
    { 
        id: "cake",
        texture: "./images/cake.png",
        calories: 352,
        size: 13,
    },
    { 
        id: "pie",
        texture: "./images/pie.png",
        calories: 323,
        size: 13,
    },
];

function createFood(texture, calories, size) {
    return function() {
        var FoodBody = Bodies.circle(window.innerWidth/2 + 200, 0, size, {
            restitution: 0.6,
            friction: 0.1,
            gravity: 1,
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
        food.position.y > stomachTop.body.bounds.min.y &&
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
        body: Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 20, {
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
    .concat(Man.body)
    .concat(stomachBottom.body)   
    .concat(stomachLeft.body)
    .concat(stomachTop.body)
    .concat(Tongue.body)
    .concat(Throat.body)
    .concat(Throat1.body)
    .concat(ThroatR.body)
    .concat(ThroatL.body)
    .concat(stomachRight.body)
    .concat(plateBottom.body)
    .concat(Face.body)
    .concat(mouseConstraint);

// Add all bodies to the world
Composite.add(engine.world, bodiesToAdd);

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);


// Update the count display continuously
const time = document.getElementById("time");
Events.on(engine, 'beforeUpdate', function(event) {
    updateCalories();
    checkFinishMessage();
    // Timer
    if (!startTime) {
        startTime = event.timestamp;
    }
    const elapsedTime = Math.floor((event.timestamp - startTime) / 1000); // in seconds
    time.textContent = `Time: ${elapsedTime}`;
});


// Create a reference to the finish message element
const finishMessage = document.getElementById("finishMessage");
const goal = document.getElementById("goal");
const score = document.getElementById("score");
const threshold = Math.floor(Math.random() * (3000 - 1500 + 1)) + 1500;
let finishTime = null;
// Function to check and display finish message
function checkFinishMessage() {
  const kcal = countCalories();
  goal.textContent = `Goal: ${threshold}`;
  if (kcal >= threshold && finishTime === null) {
    finishTime = Math.floor((performance.now() - startTime) / 1000); // Save the time
    finishMessage.style.display = "block";
    score.textContent = `You ate more than ${threshold} calories in ${finishTime} seconds`;
    // Keep showing finish message even after threshold is reached
    if (finishTime !== null) {
        finishMessage.style.display = "block";
    }
  }
}


