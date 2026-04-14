const overlay = document.getElementById('overlay');
const openContent = document.getElementById('open-paper-content');
const closeBtn = document.getElementById('close-btn');

function openModal(html) {
  openContent.innerHTML = html;
  overlay.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));
overlay.addEventListener('click', function(e) {
  if (e.target === overlay) overlay.classList.add('hidden');
});

document.querySelectorAll('.book').forEach(function(book) {
  var tip = book.getAttribute('data-tip');
  if (tip) {
    var tt = document.createElement('div');
    tt.className = 'book-tooltip';
    tt.textContent = tip;
    book.appendChild(tt);
  }
  book.addEventListener('click', function() {
    var full = book.querySelector('.book-full');
    if (!full) return;
    openModal(full.innerHTML);
  });
});

var poemOverlay = document.getElementById('poem-overlay');
var poemClose = document.getElementById('poem-close');
var poemPaper = document.getElementById('poem-paper');

poemPaper.style.cursor = 'pointer';
poemPaper.addEventListener('click', function() {
  poemOverlay.classList.remove('hidden');
});
poemClose.addEventListener('click', function() {
  poemOverlay.classList.add('hidden');
});
poemOverlay.addEventListener('click', function(e) {
  if (e.target === poemOverlay) poemOverlay.classList.add('hidden');
});

var canvas = document.getElementById('particles');
var ctx = canvas.getContext('2d');
var W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

var dots = [];
for (var i = 0; i < 55; i++) {
  dots.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.2 + 0.3,
    dx: (Math.random() - 0.5) * 0.18,
    dy: -Math.random() * 0.15 - 0.04,
    o: Math.random() * 0.3 + 0.05
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  dots.forEach(function(d) {
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(160,130,90,' + d.o + ')';
    ctx.fill();
    d.x += d.dx;
    d.y += d.dy;
    if (d.y < -4) d.y = H + 4;
    if (d.x < -4) d.x = W + 4;
    if (d.x > W + 4) d.x = -4;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

var twLines = [
  '"Dying is an art, like everything else.\nI do it exceptionally well."',
  '"I am, I am, I am."',
  '"Out of the ash\nI rise with my red hair\nand I eat men like air."',
  '"I have done it again.\nOne year in every ten\nI manage it."',
  '"The worst enemy to creativity\nis self-doubt."',
  '"I desire the things\nthat will destroy me\nin the end."',
  '"Everything in life is writable\nif you have the guts to do it."'
];
var twIndex = 0;
var twEl = document.getElementById('tw-typed');

function typeLine(line, cb) {
  twEl.textContent = '';
  var i = 0;
  var t = setInterval(function() {
    twEl.textContent = line.slice(0, ++i) + '|';
    if (i >= line.length) {
      clearInterval(t);
      setTimeout(function() {
        twEl.textContent = line;
        setTimeout(cb, 400);
      }, 1800);
    }
  }, 60);
}
function cycleTypewriter() {
  typeLine(twLines[twIndex % twLines.length], function() {
    twIndex++;
    cycleTypewriter();
  });
}
cycleTypewriter();

var tutSteps = [
  { text: "Welcome to Sylvia's desk.", hint: "Look around -- things are not always what they seem." },
  { text: "See the bookshelf on the right?", hint: "Hover a book to peek at it. Click to open it." },
  { text: "The paper on the typewriter is a poem.", hint: "Click it to read Lady Lazarus." }
];

var currentStep = 0;
var tutorial = document.getElementById('tutorial');
var tutBox = document.getElementById('tutorial-box');
var tutNext = document.getElementById('tut-next');
var tutText = document.getElementById('tut-text');
var tutHint = document.getElementById('tut-hint');
var tutCounter = document.getElementById('tut-counter');

function showStep(n) {
  tutText.textContent = tutSteps[n].text;
  tutHint.textContent = tutSteps[n].hint;
  tutCounter.textContent = (n + 1) + ' / ' + tutSteps.length;
  tutNext.textContent = n === tutSteps.length - 1 ? 'Got it' : 'Next';
  tutBox.classList.remove('tut-pop');
  void tutBox.offsetWidth;
  tutBox.classList.add('tut-pop');
}

setTimeout(function() { showStep(0); }, 100);

tutNext.addEventListener('click', function() {
  currentStep++;
  if (currentStep >= tutSteps.length) {
    tutorial.classList.add('hidden');
    return;
  }
  showStep(currentStep);
});

var candle = document.getElementById('candle');
var candleGlow = candle.querySelector('.candle-glow');
document.addEventListener('mousemove', function(e) {
  var rect = candle.getBoundingClientRect();
  var dist = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
  var intensity = Math.max(0, 1 - dist / 300);
  candleGlow.style.opacity = 0.6 + intensity * 0.8;
  candleGlow.style.transform = 'translateX(-50%) scale(' + (1 + intensity * 0.6) + ')';
});
