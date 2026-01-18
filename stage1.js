const dialogues = [
  { speaker: "Human", text: "So that's it? No more fear", img: "asset/human-scared.PNG" },
  { speaker: "Death", text: "Fear needs an ending. You no longer have one", img: "asset/death.PNG" },
  { speaker: "Human", text: "I can finally enjoy what I earned", img: "asset/human-happy.PNG" }
];

let index = 0;
let charIndex = 0;
let typing = true;
let intervalId = null;

const speakerEl = document.getElementById("speaker");
const textEl = document.getElementById("text");
const portraitEl = document.getElementById("portrait");
const continueEl = document.getElementById("continue");
const dialogueBox = document.getElementById("dialogue-box");
const typeSound = document.getElementById('typeSound');

function typeWriter() {
  if (!typing) return;

  const fullText = dialogues[index].text;

  if (charIndex < fullText.length) {
    const char = fullText.charAt(charIndex);
    textEl.textContent += char;
    
    // Phát âm thanh cho mỗi ký tự (trừ khoảng trắng)
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

function loadDialogue() {
  charIndex = 0;
  typing = true;
  textEl.textContent = "";
  continueEl.style.opacity = 0.5;
  speakerEl.textContent = dialogues[index].speaker.toUpperCase();
  portraitEl.src = dialogues[index].img;
  
  // Xóa interval cũ và tạo mới
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(typeWriter, 30);
}

function fadeOutDialogueAndHeading() {
  dialogueBox.style.transition = 'opacity 0.7s';
  dialogueBox.style.opacity = '0';
  const heading = document.querySelector('.heading1');
  if (heading) {
    heading.style.transition = 'opacity 0.7s';
    heading.style.opacity = '0';
  }
  setTimeout(() => {
    dialogueBox.style.display = 'none';
    if (heading) heading.style.display = 'none';
  }, 700);
}

function showYesButtonImg() {
  const yesImg = document.querySelector('.yes-button');
  if (yesImg) {
    yesImg.style.display = 'block';
    yesImg.style.opacity = '1';
    yesImg.addEventListener('click', handleYesClick);
  }
}

function slideInWine() {
  const wine = document.querySelector('.wine');
  if (wine) wine.classList.add('slide-in');
}

function slideInPaper() {
  const paper = document.querySelector('.paper');
  if (paper) paper.classList.add('slide-in');
}

function slideInCake() {
  const cake = document.querySelector('.cake');
  if (cake) cake.classList.add('slide-in');
}

function showGame2() {
  const game1 = document.querySelector('.game1');
  const game2 = document.querySelector('.game2');
  if (game1) {
    game1.style.transition = 'opacity 1s';
    game1.style.opacity = '0';
    setTimeout(() => {
      game1.style.display = 'none';
      if (game2) {
        game2.style.display = 'block';
        game2.style.opacity = '1';
        isGame2Active = true;
      }
    }, 2000);
  }
}

let yesClickCount = 0;

function handleYesClick() {
  playYesVideoOnce();
  yesClickCount++;

  if (yesClickCount === 1) {
    document.querySelector('.wine').classList.remove('slide-in');
    document.querySelector('.wine').classList.add('slide-out');
    setTimeout(() => {
      slideInPaper();
    }, 1000);
  }

  if (yesClickCount === 2) {
    document.querySelector('.paper').classList.remove('slide-in');
    document.querySelector('.paper').classList.add('slide-out');
    setTimeout(() => {
      slideInCake();
    }, 1000);
  }

  if (yesClickCount === 3) {
    showGame2();
  }
}

function nextDialogue() {
  // Nếu đang type → hiện full câu
  if (typing) {
    textEl.textContent = dialogues[index].text;
    typing = false;
    continueEl.style.opacity = 1;
    if (intervalId) {
      clearInterval(intervalId);
    }
    return;
  }

  index++;

  // HẾT DIALOGUE
  if (index >= dialogues.length) {
    if (intervalId) {
      clearInterval(intervalId);
    }
    
    fadeOutDialogueAndHeading();

    setTimeout(() => {
      slideInWine();
      showYesButtonImg();
    }, 1000);

    return;
  }

  // DIALOGUE TIẾP
  loadDialogue();
}

document.addEventListener("click", nextDialogue);
document.addEventListener("keydown", e => {
  if (e.key === "z" || e.key === "Z") nextDialogue();
});

window.addEventListener('DOMContentLoaded', () => {
  const game1 = document.querySelector('.game1');
  const game2 = document.querySelector('.game2');
  const heading1 = document.querySelector('.heading1');
  
  if (game1) {
    game1.style.display = 'none';
    game1.style.opacity = '0';
  }
  if (game2) {
    game2.style.display = 'none';
    game2.style.opacity = '0';
  }
  
  if (heading1) {
    heading1.style.opacity = '0';
  }
  
  dialogueBox.style.display = 'none';
  const yesImg = document.querySelector('.yes-button');
  if (yesImg) {
    yesImg.style.display = 'none';
    yesImg.style.opacity = '0';
  }
  document.querySelectorAll('.wine, .paper, .cake').forEach(img => {
    img.classList.remove('slide-in');
    img.classList.remove('slide-out');
  });
  
  setTimeout(() => {
    if (heading1) {
      heading1.style.opacity = '1';
    }
  }, 100);
  
  setTimeout(() => {
    if (heading1) {
      heading1.style.opacity = '0';
    }
    
    setTimeout(() => {
      if (heading1) {
        heading1.style.display = 'none';
      }
      document.body.style.backgroundColor = "#ffffff";
      if (game1) {
        game1.style.display = 'flex';
        game1.style.opacity = '1';
      }
      
      dialogueBox.style.display = 'flex';
      loadDialogue();
    }, 700);
  }, 2000); 
});

const yesVideo = document.querySelector('.yes-video');
if (yesVideo) {
  yesVideo.pause();
  yesVideo.currentTime = 0;
}

function playYesVideoOnce() {
  if (!yesVideo) return;

  yesVideo.pause();
  yesVideo.currentTime = 0;
  yesVideo.play();

  setTimeout(() => {
    yesVideo.pause();
  }, 1000);
}

let humanMoneyPosition = 50;
let isGame2Active = false;

document.addEventListener('mousemove', (e) => {
  const humanMoney = document.querySelector('.human-money');
  const game2 = document.querySelector('.game2');
  
  if (!humanMoney || !game2) return;
  if (game2.style.display === 'none' || game2.style.opacity === '0') return;
  
  const imgWidth = humanMoney.offsetWidth;
  const viewportWidth = window.innerWidth;
  const mouseX = e.clientX;
  
  let newLeft = mouseX - (imgWidth / 2);
  const minLeft = 0;
  const maxLeft = viewportWidth - imgWidth;
  
  if (newLeft < minLeft) newLeft = minLeft;
  if (newLeft > maxLeft) newLeft = maxLeft;
  
  humanMoneyPosition = ((newLeft + imgWidth / 2) / viewportWidth) * 100;
  humanMoney.style.left = humanMoneyPosition + '%';
});

let coinClickCount = 0;
const coinImages = [
  './asset/coin.PNG',
  './asset/coin2.PNG',
  './asset/coin3.PNG',
  './asset/coin4.PNG'
];
let droppedCoins = [];

document.addEventListener('click', (e) => {
  const game2 = document.querySelector('.game2');
  
  if (!isGame2Active) return;
  if (!game2 || game2.style.display === 'none' || game2.style.opacity === '0') return;
  
  coinClickCount++;
  
  if (coinClickCount >= 80) {
    transitionToStage2();
    return;
  }
  
  createCoin(e.clientX, e.clientY);
});

function createCoin(clickX, clickY) {
  const game2 = document.querySelector('.game2');
  const randomCoinImg = coinImages[Math.floor(Math.random() * coinImages.length)];
  
  const coin = document.createElement('img');
  coin.src = randomCoinImg;
  coin.className = 'falling-coin';
  
  const randomOffsetX = (Math.random() - 0.5) * 40;
  const finalX = clickX + randomOffsetX;
  coin.style.left = finalX + 'px';
  coin.style.top = clickY + 'px';
  
  const randomRotation = (Math.random() - 0.5) * 60;
  coin.style.transform = `rotate(${randomRotation}deg)`;
  
  game2.appendChild(coin);
  
  const coinWidth = 80;
  const coinHeight = 80;
  const bottomPosition = calculateBottomPosition(finalX, coinWidth, coinHeight);
  
  setTimeout(() => {
    coin.style.top = `calc(100vh - ${bottomPosition}px)`;
  }, 10);
  
  setTimeout(() => {
    droppedCoins.push({
      x: finalX,
      y: bottomPosition,
      width: coinWidth,
      height: coinHeight
    });
  }, 700);
}

function calculateBottomPosition(x, coinWidth, coinHeight) {
  let maxHeight = coinHeight;
  const stackOffset = Math.random() * 15 - 5;
  
  for (let coin of droppedCoins) {
    const distance = Math.abs(coin.x - x);
    if (distance < coinWidth * 0.4) {
      const newHeight = coin.y + coinHeight + stackOffset;
      if (newHeight > maxHeight) {
        maxHeight = newHeight;
      }
    }
  }
  
  return maxHeight;
}

function transitionToStage2() {
  document.body.style.transition = 'opacity 2s ease-in-out';
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    window.location.href = 'stage2.html';
  }, 2000);
}