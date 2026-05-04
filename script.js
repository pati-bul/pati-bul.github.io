let current = 0;
const slides = document.querySelectorAll('.slide');
const total = slides.length;
const counter = document.getElementById('slide-counter');
const fill = document.getElementById('progress-fill');

function showSlide(i) {
  slides.forEach((s, idx) => {
    s.classList.remove('active', 'exit-left', 'exit-right', 'enter-left', 'enter-right');
    if (idx === i) {
      s.classList.add('active');
    }
  });
  counter.textContent = (i + 1) + ' / ' + total;
  fill.style.width = ((i + 1) / total * 100) + '%';
  document.getElementById('prev-btn').style.opacity = i === 0 ? '0.3' : '1';
  document.getElementById('next-btn').style.opacity = i === total - 1 ? '0.3' : '1';
}

function changeSlide(dir) {
  const next = current + dir;
  if (next < 0 || next >= total) return;
  current = next;
  showSlide(current);
}

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); changeSlide(1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); changeSlide(-1); }
});

// Touch/swipe support
let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
document.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 60) changeSlide(diff > 0 ? 1 : -1);
});

showSlide(0);
