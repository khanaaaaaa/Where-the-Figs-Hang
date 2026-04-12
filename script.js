const figs = document.querySelectorAll('.fig');
const message = document.getElementById('message');
const quote = document.getElementById('quote');
let chosen = false;

const timer = setTimeout(() => {
  if (!chosen) {
    figs.forEach(f => f.classList.add('faded'));
    message.textContent = "I saw them all rotting. And one by one, they dropped to the ground.";
    message.classList.add('visible');
    quote.style.opacity = '0.3';
  }
}, 10000);

figs.forEach(fig => {
  fig.addEventListener('click', () => {
    if (chosen) return;
    chosen = true;
    clearTimeout(timer);
    figs.forEach(f => { if (f !== fig) f.classList.add('faded'); });
    quote.textContent = `"She chose ${fig.dataset.name.toLowerCase()} — and the other figs fell, one by one, into the dark."`;
    message.textContent = fig.dataset.msg;
    message.classList.add('visible');
  });
});
