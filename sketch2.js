let canvasCreated = false;
let points = [];
let myCanvas;
let drawClickCount = 0; 

function setup() {
  noLoop();
}

function draw() {
  if (!canvasCreated) return;
  
  clear();
  stroke(0);
  strokeWeight(3);

  for (let p of points) {
    push();
    translate(p.x, p.y);
    rotate(p.rot + sin(frameCount * 0.02) * 0.05);

    ellipse(
      random(-5, 5),
      random(-5, 5),
      p.w + random(-10, 10),
      p.h + random(-10, 10)
    );

    pop();
  }

  if (mouseIsPressed) {
    points.push({
      x: mouseX,
      y: mouseY,
      w: random(50, 200),
      h: random(10, 40),
      rot: random(TWO_PI)
    });
  }
}

function mousePressed() {
  if (!canvasCreated) return;
  
  drawClickCount++;
  console.log('Draw click count:', drawClickCount);
  
 
  if (drawClickCount === 6) {
    showPopup();
  }
}

function showPopup() {
  const popup = document.querySelector('.popup');
  const draw = document.querySelector('.draw');
  
 
  if (draw) draw.style.display = 'none';
 
  if (popup) popup.style.display = 'block';
  
  const yesBtn = document.querySelector('.yes-btn');
  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      console.log('User chose: Yes');
      fadeOutAndRedirect('ending1.html');
    });
  }

  // Xử lý nút No
  const noBtn = document.querySelector('.no-btn');
  if (noBtn) {
    noBtn.addEventListener('click', () => {
      console.log('User chose: No');
      fadeOutAndRedirect('ending2.html');
    });
  }
}

function startSketch() {
  if (canvasCreated) return;
  
  canvasCreated = true;
  
  myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent(document.body);
  
  let canvasElement = myCanvas.elt;
  canvasElement.style.position = 'fixed';
  canvasElement.style.top = '0';
  canvasElement.style.left = '0';
  canvasElement.style.zIndex = '0';
  canvasElement.style.pointerEvents = 'auto';
  
  
  
  noFill();
  loop();
}