window.addEventListener('keydown', function(e) {
  if (e.code === 'Space') {
    const img = document.querySelector('.character');
    const text = document.querySelector('.start');
    const canvas = document.querySelector('canvas');
    if (img) {
      img.style.transition = 'opacity 1s';
      img.style.opacity = '0';
    }
    if (text) {
      text.style.transition = 'opacity 1s';
      text.style.opacity = '0';
    }
    if (canvas) {
      canvas.style.transition = 'opacity 1s';
      canvas.style.opacity = '0';
    }
    setTimeout(function() {
      window.location.href = 'opening.html';
    }, 1000);
  }
});
