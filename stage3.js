const dialogues = [
  { speaker: "Death", text: "What is this?", img: "asset/death.PNG" },
  { speaker: "Human", text: "Oh, it's just my family album.", img: "asset/human.PNG" },
  { speaker: "Human", text: "It has pictures of all my family members.", img: "asset/human.PNG" },
  { speaker: "Death", text: "Who is that?", img: "asset/death.PNG" },
  { speaker: "Human", text: "That's my beautiful wife.", img: "asset/human.PNG" },
  { speaker: "Death", text: "How is she?", img: "asset/death.PNG" },
  { speaker: "Human", text: "…She passed away fifteen years ago.", img: "asset/human.PNG" },
  { speaker: "Death", text: "…", img: "asset/death.PNG" },
  { speaker: "Human", text: "These are my sons… they also passed away four years ago.", img: "asset/human.PNG" },
  { speaker: "Human", text: "And my grandchildren… and my great-grandchildren…", img: "asset/human.PNG" },
  { speaker: "Human", text: "They've all moved on. I'm alone now.", img: "asset/human.PNG" }
];


window.addEventListener('DOMContentLoaded', () => {
  const heading3 = document.querySelector('.heading3');
  const albumClose = document.querySelector('.album-close');
  const albumOpen = document.querySelector('.album-open');
  const albumCloseImg = document.querySelector('.album-close-img');
  const dialogueBox = document.getElementById('dialogue-box');
  const skip2 = document.getElementById('skip2');
  const family = document.querySelector('.family');

  // Ẩn tất cả trừ heading3 lúc đầu
  if (albumClose) albumClose.style.display = 'none';
  if (albumOpen) albumOpen.style.display = 'none';
  if (dialogueBox) dialogueBox.style.display = 'none';
  if (skip2) skip2.style.display = 'none';

  // Heading3 fade out
  if (heading3) {
    setTimeout(() => {
      heading3.style.transition = 'opacity 1s ease-in-out';
      heading3.style.opacity = '0';

      setTimeout(() => {
        heading3.style.display = 'none';
        
        // Hiện album-close
        if (albumClose) {
          albumClose.style.display = 'flex';
          albumClose.style.opacity = '1';
        }
        if (skip2) {
          skip2.style.display = 'block';
        }
      }, 1000);
    }, 2000);
  }

  // Click vào album-close → hiện album-open
  if (albumCloseImg) {
    albumCloseImg.addEventListener('click', () => {
      if (albumClose) {
        albumClose.style.transition = 'opacity 0.5s ease-in-out';
        albumClose.style.opacity = '0';

        if (skip2) {
          skip2.style.display = 'none';
        }
        
        setTimeout(() => {
          albumClose.style.display = 'none';
          
          if (albumOpen) {
            albumOpen.style.display = 'flex';
            albumOpen.style.opacity = '1';
          }

          if (family) {
            family.style.display = 'flex';
            family.style.opacity = '1';
          }
          if (dialogueBox) {
            dialogueBox.style.display = 'flex';
            startDialogue();
          }
        }, 500);
      }
    });
  }
});

function fadeOutAndRedirect(targetPage) {
  // Ẩn popup
  const popup = document.querySelector('.popup');
  if (popup) popup.style.display = 'none';

  // Tạo overlay fade out
  const fadeOverlay = document.createElement('div');
  fadeOverlay.style.position = 'fixed';
  fadeOverlay.style.top = '0';
  fadeOverlay.style.left = '0';
  fadeOverlay.style.width = '100vw';
  fadeOverlay.style.height = '100vh';
  fadeOverlay.style.backgroundColor = 'black';
  fadeOverlay.style.opacity = '0';
  fadeOverlay.style.zIndex = '9999';
  fadeOverlay.style.transition = 'opacity 1.5s ease-in-out';
  fadeOverlay.style.pointerEvents = 'none';
  document.body.appendChild(fadeOverlay);

  // Trigger fade
  setTimeout(() => {
    fadeOverlay.style.opacity = '1';
  }, 10);

  // Chuyển trang sau khi fade xong
  setTimeout(() => {
    window.location.href = targetPage;
  }, 1500);
}

function startDialogue() {
  let index = 0;
  let charIndex = 0;
  let typing = true;
  let intervalId = null;

  const speakerEl = document.getElementById("speaker");
  const textEl = document.getElementById("text");
  const portraitEl = document.getElementById("portrait");
  const continueEl = document.getElementById("continue");
  const typeSound = document.getElementById('typeSound');

  function loadDialogue() {
    if (!dialogues[index]) return;
    speakerEl.textContent = dialogues[index].speaker;
    textEl.textContent = "";
    portraitEl.src = dialogues[index].img;
    charIndex = 0;
    typing = true;
    continueEl.style.opacity = 0.5;
    
    // Xóa interval cũ và tạo mới
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(typeWriter, 30);
  }

  function typeWriter() {
    if (!typing) return;
    
    const text = dialogues[index].text;
    
    if (charIndex < text.length) {
      const char = text.charAt(charIndex);
      textEl.textContent += char;
      
      // Phát âm thanh cho mỗi ký tự (trừ khoảng trắng)
      if (char !== ' ' && typeSound) {
        typeSound.currentTime = 0;
        typeSound.play().catch(err => console.log('Audio play failed:', err));
      }
      
      charIndex++;
    } else {
      typing = false;
      continueEl.style.opacity = 1;
      clearInterval(intervalId);
    }
  }

  function nextDialogue() {
    if (typing) {
      textEl.textContent = dialogues[index].text;
      typing = false;
      continueEl.style.opacity = 1;
      clearInterval(intervalId);
      return;
    }
    
    index++;
    
    if (index < dialogues.length) {
      loadDialogue();
    } else {
      // Hết dialogue
      clearInterval(intervalId);
      
      const dialogueBox = document.getElementById('dialogue-box');
      const draw = document.querySelector('.draw');
      if (dialogueBox) dialogueBox.style.display = 'none';
      if (draw) {
        draw.style.display = 'block';
      }
      if (typeof setup === 'function') {
        if (typeof startSketch === 'function') {
          startSketch(); // Gọi hàm startSketch() từ sketch2.js
        }
      }
     
      setTimeout(() => {
        // window.location.href = 'stage4.html'; // Uncomment nếu có stage4
      }, 2000);
    }
  }

  loadDialogue();
  document.addEventListener("click", nextDialogue);
  document.addEventListener("keydown", (e) => {
    if (e.key === "z" || e.key === "Z") nextDialogue();
  });
}