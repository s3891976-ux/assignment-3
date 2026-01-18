let isHolding = false;

const holdBtn = document.getElementById("holdBtn");

holdBtn.addEventListener("mousedown", () => {
  isHolding = true;
});

holdBtn.addEventListener("mouseup", () => {
  isHolding = false;
});

holdBtn.addEventListener("mouseleave", () => {
  isHolding = false;
});

function fadeUI() {
  holdBtn.style.opacity = "0";
  sorrow.style.opacity = "0";
  holdBtn.style.pointerEvents = "none";
}