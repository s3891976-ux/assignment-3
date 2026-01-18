let particles = [];
let zoff = 0;

let holdStartTime = null;
let griefTriggered = false;

let fadeAlpha = 0;
let uiFaded = false; // tránh gọi fade nhiều lần

let homeButton;
let tryAgainButton;

function setup() {
  let c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style("z-index", "1");

  colorMode(HSB, 360, 100, 100, 100);
  background(225);

  textAlign(CENTER, CENTER);
  textSize(74);
  textFont('Mountains of Christmas');

  for (let i = 0; i < 100; i++) {
    particles.push(new FlowParticle(width / 2, height / 2));
  }

  // Tạo button HOME
  homeButton = createButton('HOME');
  homeButton.position(width / 2 - 75, height / 2 + 100);
  homeButton.size(150, 50);
  homeButton.style('font-family', 'Mountains of Christmas');
  homeButton.style('font-size', '24px');
  homeButton.style('background-color', '#000000');
  homeButton.style('color', '#ffffff');
  homeButton.style('border-radius', '50px');
  homeButton.style('border', '3px solid #ffffff');
  homeButton.style('cursor', 'pointer');
  homeButton.style('display', 'none');
  homeButton.style('z-index', '10');
  homeButton.mousePressed(() => {
    window.location.href = 'index.html';
  });

  // Tạo button TRY AGAIN
  tryAgainButton = createButton('Do you want to try again?');
  tryAgainButton.position(width / 2 - 150, height / 2 + 170);
  tryAgainButton.size(300, 50);
  tryAgainButton.style('font-family', 'Mountains of Christmas');
  tryAgainButton.style('font-size', '20px');
  tryAgainButton.style('background-color', '#000000');
  tryAgainButton.style('color', '#ffffff');
  tryAgainButton.style('border-radius', '50px');
  tryAgainButton.style('border', '3px solid #ffffff');
  tryAgainButton.style('cursor', 'pointer');
  tryAgainButton.style('display', 'none');
  tryAgainButton.style('z-index', '10');
  tryAgainButton.mousePressed(() => {
    window.location.href = 'stage3.html';
  });
}

function draw() {

  // ===== HOLD TIMER =====
  if (isHolding && !griefTriggered) {
    if (holdStartTime === null) {
      holdStartTime = millis();
    }

    if (millis() - holdStartTime > 6000) {
      griefTriggered = true;
    }
  }

  if (!isHolding) {
    holdStartTime = null;
  }

  // ===== FLOW =====
  if (isHolding && !griefTriggered) {
    for (let i = 0; i < 12; i++) {
      updateFlow();
    }
  }

  // ===== GRIEF STATE =====
  if (griefTriggered) {

    // 🔥 fade UI + image chỉ 1 lần
    if (!uiFaded) {
      fadeUI(); // gọi từ ending1.js
      uiFaded = true;
    }

    // fade toàn bộ canvas
    fadeAlpha = lerp(fadeAlpha, 100, 0.03);
    noStroke();
    fill(0, 0, 0, fadeAlpha);
    rect(0, 0, width, height);

    // TEXT (ở trên cùng)
    fill(0, 0, 100, fadeAlpha);
    text("Grief takes over you", width / 2, height / 2);

    // Hiển thị buttons khi fade hoàn tất
    if (fadeAlpha > 90) {
      homeButton.style('display', 'block');
      tryAgainButton.style('display', 'block');
    }
  }
}

function updateFlow() {
  for (let p of particles) {
    p.follow();
    p.update();
    p.show();
  }
  zoff += 0.001;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  homeButton.position(width / 2 - 75, height / 2 + 100);
  tryAgainButton.position(width / 2 - 150, height / 2 + 170);
}

//////////////////////////////////////////////////

class FlowParticle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.prev = this.pos.copy();
    this.speed = random(1.5, 3.5);
  }

  follow() {
    let angle =
      noise(
        this.pos.x * 0.002,
        this.pos.y * 0.002,
        zoff
      ) * TWO_PI * 4;

    let force = p5.Vector.fromAngle(angle);
    force.mult(1.2);
    this.vel.add(force);
    this.vel.limit(this.speed);
  }

  update() {
    this.prev = this.pos.copy();
    this.pos.add(this.vel);

    if (
      this.pos.x < 0 ||
      this.pos.y < 0 ||
      this.pos.x > width ||
      this.pos.y > height
    ) {
      this.pos.set(width / 2, height / 2);
      this.prev = this.pos.copy();
    }
  }

  show() {
    stroke(0);
    strokeWeight(1);
    line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
  }
}