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


// MAN
const Man = {
    body: Matter.Bodies.rectangle(window.innerWidth/2 + 200, window.innerHeight/2 + 50, .0000001, .000001, {
      isStatic: true,
      render: {
        sprite: {
          texture: 'man.png', // Image for the plate
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
    body: Matter.Bodies.rectangle(window.innerWidth/2, window.innerHeight/2 - 175, 480, 10, {
      isStatic: true,
      angle: ( 15 * Math.PI) / 180,
      render: {
        sprite: {
          texture: 'plate.png', // Image for the plate
          xScale: 0.5, // Adjust scale if needed
          yScale: 0.5,
        }
      }
    }),
    name: "plateBottom",
  };

//Face
const Face = {
    body: Bodies.rectangle(window.innerWidth/2 + 315, window.innerHeight/2 - 90, 50, 8, {
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
    body: Bodies.rectangle(window.innerWidth/2 + 270, window.innerHeight/2 - 50, 70, 8, {
        isStatic: true,
        angle: ( 20 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "Tongue",
};

const Throat = {
    body: Bodies.rectangle(window.innerWidth/2 + 290, window.innerHeight/2, 70, 8, {
        isStatic: true,
        angle: ( 90 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "Throat",
};

const Throat2 = {
    body: Bodies.rectangle(window.innerWidth/2 + 340, window.innerHeight/2 - 50, 60, 8, {
        isStatic: true,
        angle: ( 40 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "Throat2",
};


//STOMACH
const stomachTop = {
    body: Bodies.rectangle(window.innerWidth/2 + 150, window.innerHeight/2 + 110, 320, 10, {
        isStatic: true,
        angle: ( -25 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "stomachTop",
};

const stomachBottom = {
    body: Bodies.rectangle(window.innerWidth/2 + 100, window.innerHeight - 40, 300, 10, {
        isStatic: true,
        angle: ( -3 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "stomachBottom",
};

const stomachLeft = {
    body: Bodies.rectangle(window.innerWidth/2 - 20, window.innerHeight - 100, 10, 150, {
        isStatic: true,
        angle: ( 20 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "stomachLeft"
};

const stomachRight = {
    body: Bodies.rectangle(window.innerWidth/2 + 310, window.innerHeight - 220, 10, 350, {
        isStatic: true,
        angle: (17 * Math.PI) / 180,
        render: {
            visible: false,
        }
    }),
    name: "stomachRight"
};

const Foods = [
    { 
        id: "banana",
        texture: "banana.png",
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
    { 
        id: "watermelon",
        texture: "",
        calories: 85,
        size: 10
    },
    
];

function createFood(texture, calories, size) {
    return function() {
        var FoodBody = Bodies.circle(window.innerWidth/2, 0, size, {
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
    .concat(stomachBottom.body)   
    .concat(stomachLeft.body)
    .concat(stomachTop.body)
    .concat(Tongue.body)
    .concat(Throat.body)
    .concat(Throat2.body)
    .concat(stomachRight.body)
    .concat(plateBottom.body)
    .concat(Man.body)
    .concat(Face.body)
    .concat(mouseConstraint);

// Add all bodies to the world
Composite.add(engine.world, bodiesToAdd);

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

// Update the calories count display continuously
Events.on(engine, 'beforeUpdate', updateCalories);
