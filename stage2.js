const dialogues = [
  { speaker: "Human", text: " How long has it been? I can't seem to remember where it started.", img: "asset/human.PNG" },
  { speaker: "Human", text: " I have everything now. I've done everything I wanted to do.  I went to every place I dreamed of.", img: "asset/human.PNG" },
  { speaker: "Death", text: "Then what?", img: "asset/death.PNG" },
  { speaker: "Human", text: "…I don't know.", img: "asset/human.PNG" },
  { speaker: "Human", text: "I don't know what to do next.", img: "asset/human.PNG" },
  { speaker: "Human", text: "Everything changes from time to time… but I'm still here.", img: "asset/human.PNG" },
  { speaker: "Human", text: "Same places. Same habits. Same routine.", img: "asset/human.PNG" },
  { speaker: "Death", text: "And how do you feel about it?", img: "asset/death.PNG" },
  { speaker: "Human", text: "...", img: "asset/human.PNG" },
  { speaker: "Human", text: "A little… bored.", img: "asset/human.PNG" }
];

let picClickCount = 0;

window.addEventListener('DOMContentLoaded', () => {
  const heading2 = document.querySelector('.heading2');
  const game3 = document.querySelector('.game3');
  const skip = document.getElementById('skip');
  const pic1 = document.querySelector('.pic1');
  const pic2 = document.querySelector('.pic2');
  const pic3 = document.querySelector('.pic3');
  const dialogueBox = document.getElementById('dialogue-box');

  // Ẩn game3, pics, dialogue lúc đầu
  if (game3) {
    game3.style.display = 'none';
    game3.style.opacity = '0';
  }
  if (pic1) pic1.style.display = 'block';
  if (pic2) pic2.style.display = 'none';
  if (pic3) pic3.style.display = 'none';
  if (dialogueBox) dialogueBox.style.display = 'none';

  // Tạo custom cursor
  const cursor = document.createElement('img');
  cursor.src = './asset/x-mark.PNG';
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  // Di chuyển custom cursor theo chuột
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Heading2 fade out → hiện game3
  if (heading2 && game3) {
    heading2.addEventListener('animationend', () => {
      heading2.style.display = 'none';
      game3.style.display = 'flex';
      game3.style.opacity = '1';
      if (skip) {
        skip.style.display = 'block';
      }
    });
  }

  // Click để stamp và đổi pic
  document.addEventListener('click', (e) => {
    if (picClickCount >= 8) return;
    if (e.target === cursor) return;

    // Stamp x-mark
    const stamp = document.createElement('img');
    stamp.src = './asset/x-mark.PNG';
    stamp.className = 'custom-cursor';
    stamp.style.pointerEvents = 'none';
    stamp.style.left = e.clientX + 'px';
    stamp.style.top = e.clientY + 'px';
    stamp.style.position = 'fixed';
    stamp.style.transform = 'translate(-50%, -50%)';
    stamp.style.zIndex = 5;
    document.body.appendChild(stamp);

    // Tăng counter
    picClickCount++;

    // Đổi pic theo số lần click
    if (picClickCount === 4) {
      if (pic1) pic1.style.display = 'none';
      if (pic2) pic2.style.display = 'block';
    }
    if (picClickCount === 8) {
      if (pic2) pic2.style.display = 'none';
      if (pic3) pic3.style.display = 'block';

      // Ẩn custom cursor và trả lại con chuột bình thường
      cursor.style.display = 'none';
      document.body.style.cursor = 'default';

      // Hiện dialogue và bắt đầu chạy chữ
      if (dialogueBox) {
        dialogueBox.style.display = 'flex';
        startDialogue();
      }
    }
  });
});

// Hàm bắt đầu dialogue
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
      // Hết dialogue → fade out và chuyển stage
      clearInterval(intervalId);
      
      const dialogueBox = document.getElementById('dialogue-box');
      if (dialogueBox) dialogueBox.style.display = 'none';
      
      const game3 = document.querySelector('.game3');
      if (game3) {
        game3.style.transition = 'opacity 2s ease-in-out';
        game3.style.opacity = '0';
      }
      
      // Fade out toàn body
      document.body.style.transition = 'opacity 2s ease-in-out';
      document.body.style.opacity = '0';
      
      // Chuyển sang stage3.html sau 2 giây
      setTimeout(() => {
        window.location.href = 'stage3.html';
      }, 2000);
    }
  }

  loadDialogue();
  document.addEventListener("click", nextDialogue);
  document.addEventListener("keydown", (e) => {
    if (e.key === "z" || e.key === "Z") nextDialogue();
  });
}