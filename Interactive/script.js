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

var boxWidth = 200;
var boxHeight = 100;

var sensors = [
    // Sensor at the bottom
    {
      body: Bodies.rectangle(700, 200 + boxHeight / 2 + 5, boxWidth, 10, {
        isStatic: true
      }),
      name: "sensorBottom"
    },
    // Sensor on the left
    {
      body: Bodies.rectangle(700 - boxWidth / 2 - 5, 200, 10, boxHeight, {
        isStatic: true
      }),
      name: "sensorLeft"
    },
    // Sensor on the right
    {
      body: Bodies.rectangle(700 + boxWidth / 2 + 5, 200, 10, boxHeight, {
        isStatic: true
      }),
      name: "sensorRight"
    }
  ];
  

const bananaButton = document.getElementById("bananaButton");
bananaButton.addEventListener("click", function() {
    var banana = Bodies.circle(700,200,15   , {
        render: {
            sprite: {
                texture: "/banana1.png"
            }
        }
    });
    Composite.add(engine.world, [banana]);
});

// Update the calories count display
const calories = document.getElementById("calories");
function updateCalories() {
    const kcal = countCalories();
    calories.textContent = `Calories: ${kcal}`;
}

// Count the number of caloriess inside the box
function countCalories() {
    const allBodies = Composite.allBodies(engine.world);

    let calories = 0;
    allBodies.forEach(body => {
        if (body.label === "Circle Body" && checkCalories(body)) {
            calories++;
        }
    });

    return calories;
}

// Function to check if a calories is inside the box
function checkCalories(calories) {
    const boxWidth = 200;
    const boxHeight = 100;
    const boxX = 700;
    const boxY = 200;

    const caloriesX = calories.position.x;
    const caloriesY = calories.position.y;

    const boxTop = boxY - boxHeight / 2;
    const boxBottom = boxY + boxHeight / 2;
    const boxLeft = boxX - boxWidth / 2;
    const boxRight = boxX + boxWidth / 2;

    if (caloriesX > boxLeft && caloriesX < boxRight && caloriesY > boxTop && caloriesY < boxBottom) {
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
                    .concat(sensors.map(sensor => sensor.body))
                    .concat(mouseConstraint);

// Add all bodies to the world
Composite.add(engine.world, bodiesToAdd);

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);



// Update the calories count display continuously
Events.on(engine, 'beforeUpdate', updateCalories);
