let tiles = [];
let tileImgs = [];
let tileCount = 44;

let scaleFactor = 0.1; // adjust tile size

function preload() {
  tileImgs.push(loadImage("tile1.png"));
}

function setup() {
  createCanvas(800, 500);
  imageMode(CENTER);
  noStroke();

  for (let i = 0; i < tileCount; i++) {
    let img = random(tileImgs);
    let w = img.width * scaleFactor;
    let h = img.height * scaleFactor;

    tiles.push({
      x: random(w, width - w),
      y: random(h, height - h),
      dx: random([-1, 1]),
      dy: random([-1, 1]),
      w: w,
      h: h,
      img: img
    });
  }
}

function draw() {
  background(10, 100, 40);

  // Move + wall bounce
  for (let t of tiles) {
    t.x += t.dx;
    t.y += t.dy;

    if (t.x <= t.w/2) { t.x = t.w/2; t.dx *= -1; }
    if (t.x >= width - t.w/2) { t.x = width - t.w/2; t.dx *= -1; }

    if (t.y <= t.h/2) { t.y = t.h/2; t.dy *= -1; }
    if (t.y >= height - t.h/2) { t.y = height - t.h/2; t.dy *= -1; }
  }

  // Stable rectangle collisions
  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      let a = tiles[i];
      let b = tiles[j];

      let dx = a.x - b.x;
      let overlapX = (a.w/2 + b.w/2) - abs(dx);

      let dy = a.y - b.y;
      let overlapY = (a.h/2 + b.h/2) - abs(dy);

      // Actual collision
      if (overlapX > 0 && overlapY > 0) {

        if (overlapX < overlapY) {
          // Horizontal collision
          if (dx > 0) {
            a.x += overlapX / 2;
            b.x -= overlapX / 2;
          } else {
            a.x -= overlapX / 2;
            b.x += overlapX / 2;
          }
          // swap horizontal velocity
          [a.dx, b.dx] = [b.dx, a.dx];

        } else {
          // Vertical collision
          if (dy > 0) {
            a.y += overlapY / 2;
            b.y -= overlapY / 2;
          } else {
            a.y -= overlapY / 2;
            b.y += overlapY / 2;
          }
          // swap vertical velocity
          [a.dy, b.dy] = [b.dy, a.dy];
        }
      }
    }
  }

  // Draw tiles
  for (let t of tiles) {
    image(t.img, t.x, t.y, t.w, t.h);
  }
}