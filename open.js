const dialogues = [
  
  {
    speaker: "Human",
    text: "Another year has passed… I'm getting older.",
    img: "asset/human.PNG"
  },
  {
    speaker: "Human",
    text: "I don't want to die.",
    img: "asset/human.PNG"
  },
  {
    speaker: "Human",
    text: "I'm terrified of dying, of all the things I haven't done, all the money I haven't spent.",
    img: "asset/human.PNG"
  },
  {
    speaker: "Human",
    text: "Where will it all go when I'm gone?",
    img: "asset/human.PNG",
    triggerScene: true  
  },

  
  {
    speaker: "Death",
    text: "....",
    img: "asset/death.PNG"
  },
  {
    speaker: "Human",
    text: "Oh no… did you come here to find me… so soon?",
    img: "asset/human-scared.PNG"
  },
  {
    speaker: "Death",
    text: "Do you wish to live forever?",
    img: "asset/death.PNG"
  },
  {
    speaker: "Human",
    text: "Excuse me?",
    img: "asset/human-scared.PNG"
  },
  {
    speaker: "Death",
    text: "Being immortal, I can take death away forever… if you can bear the consequences.",
    img: "asset/death.PNG"
  },
  {
    speaker: "Human",
    text: "YES. Please talk death away.",
    img: "asset/human-scared.PNG"
  },
  {
    speaker: "Death",
    text: "Then I shall grant you your wish.",
    img: "asset/death.PNG"
  }
];

let index = 0;
let charIndex = 0;
let typing = true;

const speakerEl = document.getElementById("speaker");
const textEl = document.getElementById("text");
const portraitEl = document.getElementById("portrait");
const continueEl = document.getElementById("continue");
const open2 = document.querySelector(".open2");
const open3 = document.querySelector(".open3");
const typeSound = document.getElementById('typeSound');

function loadDialogue() {
  charIndex = 0;
  typing = true;
  textEl.textContent = "";
  continueEl.style.opacity = 0.5;

  speakerEl.textContent = dialogues[index].speaker.toUpperCase();
  portraitEl.src = dialogues[index].img;
}

function typeWriter() {
  if (!typing) return;

  const fullText = dialogues[index].text;

  if (charIndex < fullText.length) {
    const char = fullText.charAt(charIndex);
    textEl.textContent += char;
    
   
    if (char !== ' ') {
      typeSound.currentTime = 0;
      typeSound.play().catch(err => console.log('Audio play failed:', err));
    }
    
    charIndex++;
  } else {
    typing = false;
    continueEl.style.opacity = 1;
  }
}

function nextDialogue() {
  if (typing) {
    textEl.textContent = dialogues[index].text;
    typing = false;
    continueEl.style.opacity = 1;
    return;
  }

  if (dialogues[index].triggerScene) {
    open2.classList.add("show");
    open3.classList.add("show");
  }

  if (index === dialogues.length - 1) {
    document.body.style.transition = "opacity 1s";
    document.body.style.opacity = "0";
    setTimeout(function() {
      window.location.href = "stage1.html";
    }, 1000);
    return;
  }

  index++;
  if (index >= dialogues.length) {
    document.getElementById("dialogue-box").style.display = "none";
    return;
  }

  loadDialogue();
}


document.addEventListener("click", nextDialogue);
document.addEventListener("keydown", e => {
  if (e.key === "z" || e.key === "Z") nextDialogue();
});


document.addEventListener('DOMContentLoaded', () => {

  setTimeout(() => {
    loadDialogue();
    setInterval(typeWriter, 80);
  }, 1000);
});