let stars = [];
let zoom = 1;
let zoomTarget = 1;
let bedImage;
let homeButton;
let tryAgainButton;

function preload() {
  bedImage = loadImage('bed.PNG');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('display', 'block');
  
  for (let i = 0; i < 800; i++) {
    stars.push(new Star());
  }
  textFont('Mountains of Christmas');
  textAlign(CENTER, CENTER);
  textSize(32);

  // Tạo button HOME
  homeButton = createButton('HOME');
  homeButton.position(width / 2 - 75, height / 2 + 150);
  homeButton.size(150, 50);
  homeButton.style('font-family', 'Mountains of Christmas');
  homeButton.style('font-size', '24px');
  homeButton.style('background-color', '#000000');
  homeButton.style('color', '#ffffff');
  homeButton.style('border-radius', '50px');
  homeButton.style('border', '3px solid #ffffff');
  homeButton.style('cursor', 'pointer');
  homeButton.style('display', 'none');
  homeButton.mousePressed(() => {
    window.location.href = 'index.html';
  });

  // Tạo button TRY AGAIN
  tryAgainButton = createButton('Do you want to try again?');
  tryAgainButton.position(width / 2 - 150, height / 2 + 220);
  tryAgainButton.size(300, 50);
  tryAgainButton.style('font-family', 'Mountains of Christmas');
  tryAgainButton.style('font-size', '20px');
  tryAgainButton.style('background-color', '#000000');
  tryAgainButton.style('color', '#ffffff');
  tryAgainButton.style('border-radius', '50px');
  tryAgainButton.style('border', '3px solid #ffffff');
  tryAgainButton.style('cursor', 'pointer');
  tryAgainButton.style('display', 'none');
  tryAgainButton.mousePressed(() => {
    window.location.href = 'stage3.html';
  });
}

function draw() {
  background(5, 5, 15);

  // smooth zoom
  zoom = lerp(zoom, zoomTarget, 0.05);

  // ===== VISUAL SPACE =====
  translate(width / 2, height / 2);
  scale(zoom);

  for (let s of stars) {
    s.update();
    s.show();
  }

  // VẼ ẢNH GIƯỜNG VỚI ZOOM
  if (bedImage) {
    imageMode(CENTER);
    let imgWidth = bedImage.width * 0.5;
    let imgHeight = bedImage.height * 0.5;
    image(bedImage, 0, 0, imgWidth, imgHeight);
    
    // VẼ TEXT "SCROLL YOUR MOUSE" BÊN DƯỚI GIƯỜNG
    fill(255, 200);
    textSize(40);
    text("Scroll your mouse", 0, imgHeight / 2 + 50);
  }

  // reset transform for UI / text
  resetMatrix();

  // ===== FADE OUT + TEXT =====
  let fadeStart = 0.4;
  let fadeEnd = 0.2;

  let fadeAlpha = map(zoom, fadeStart, fadeEnd, 0, 255, true);

  // black fade overlay
  fill(0, fadeAlpha);
  rect(0, 0, width, height);

  // text fade in
  let textAlpha = map(zoom, fadeStart, fadeEnd, 0, 200, true);
  fill(255, textAlpha);
  textSize(90);
  text("You forget everything,\nincluding yourself", width / 2, height / 2);

  // Hiển thị cả 2 button khi zoom out đủ
  if (zoom <= 0.3) {
    homeButton.style('display', 'block');
    tryAgainButton.style('display', 'block');
  } else {
    homeButton.style('display', 'none');
    tryAgainButton.style('display', 'none');
  }
}

function mouseWheel(event) {
  zoomTarget += event.delta * -0.001;
  zoomTarget = constrain(zoomTarget, 0.2, 5);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  homeButton.position(width / 2 - 75, height / 2 + 150);
  tryAgainButton.position(width / 2 - 150, height / 2 + 220);
}

// ⭐ Star class
class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(-2000, 2000);
    this.y = random(-2000, 2000);

    this.vx = random(-0.15, 0.15);
    this.vy = random(-0.15, 0.15);

    this.baseSize = random(1, 3);
    this.pulseSpeed = random(0.01, 0.03);
    this.phase = random(TWO_PI);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (abs(this.x) > 3000 || abs(this.y) > 3000) {
      this.reset();
    }
  }

  show() {
    let pulse = sin(frameCount * this.pulseSpeed + this.phase);
    let glowSize = this.baseSize * 4 + pulse * 2;
    let alpha = map(pulse, -1, 1, 80, 200);

    noStroke();

    fill(255, alpha * 0.3);
    ellipse(this.x, this.y, glowSize, glowSize);

    fill(255, alpha);
    ellipse(this.x, this.y, this.baseSize, this.baseSize);
  }
}