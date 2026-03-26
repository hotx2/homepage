const { Engine, Render, Runner, Bodies, World, Events, Mouse, MouseConstraint } = Matter;

// engine setup: creates the gravity engine
const engine = Engine.create();
const { world } = engine;

// canvas
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent"
    }
});

// runs the engine
Render.run(render);
Runner.run(Runner.create(), engine);

const tacks = document.querySelectorAll(".tack");

// syncs tack to matter.js to apply physics 
const bodies = Array.from(tacks).map((el, i) => {
  

    const body = Bodies.rectangle(
        100 + i * 150, // initial x
        100,           // initial y
        50, 50,        // width, height of tack
        {
        restitution: 0.5, 
        friction: 0.5,
        render: { visible: false }
        }
    );
  World.add(world, body);
  return { el, body };
});

// tracks cursor position for dragging
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: { visible: false }
  }
});
World.add(world, mouseConstraint);
render.mouse = mouse;

//floor of the canvas so the tacks don't fall off the screen
const floor = Bodies.rectangle(
  window.innerWidth / 2,
  window.innerHeight - 25,
  window.innerWidth,
  50,
  { isStatic: true }
);
World.add(world, floor);

// Sync CSS divs with Matter.js
Events.on(engine, "afterUpdate", () => {
  bodies.forEach(({ el, body }) => {
    el.style.left = body.position.x + "px";
    el.style.top = body.position.y + "px";
    el.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;

  });
});

window.addEventListener("resize", () => {
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: window.innerWidth, y: window.innerHeight }
  });
});