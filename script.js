const papers = document.querySelectorAll('.book');
const overlay = document.getElementById('overlay');
const openContent = document.getElementById('open-paper-content');
const closeBtn = document.getElementById('close-btn');

function typewrite(el, html, speed = 14) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  el.innerHTML = '';

  function processNode(node, parent, done) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (!text.trim()) { parent.appendChild(document.createTextNode(text)); done(); return; }
      let j = 0;
      const tn = document.createTextNode('');
      parent.appendChild(tn);
      const t = setInterval(() => {
        tn.textContent += text[j++];
        if (j >= text.length) { clearInterval(t); done(); }
      }, speed);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = document.createElement(node.tagName);
      Array.from(node.attributes).forEach(a => clone.setAttribute(a.name, a.value));
      parent.appendChild(clone);
      const children = Array.from(node.childNodes);
      let ci = 0;
      function next() {
        if (ci < children.length) processNode(children[ci++], clone, next);
        else done();
      }
      next();
    } else {
      done();
    }
  }

  const nodes = Array.from(temp.childNodes);
  let i = 0;
  function nextNode() {
    if (i < nodes.length) processNode(nodes[i++], el, nextNode);
  }
  nextNode();
}

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, dots = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

for (let i = 0; i < 55; i++) {
  dots.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.2 + 0.3,
    dx: (Math.random() - 0.5) * 0.18,
    dy: -Math.random() * 0.2 - 0.04,
    o: Math.random() * 0.35 + 0.05
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  dots.forEach(d => {
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(160,130,90,${d.o})`;
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

const twLines = [
  "dying is an art...",
  "i am, i am, i am.",
  "out of the ash\ni rise...",
  "i have done it again.",
  "love set you going\nlike a fat gold watch.",
];
let twIndex = 0;
const twEl = document.getElementById('tw-typed');

function typeLine(line, cb) {
  twEl.textContent = '';
  let i = 0;
  const t = setInterval(() => {
    twEl.textContent += line[i++];
    if (i >= line.length) { clearInterval(t); setTimeout(cb, 1800); }
  }, 60);
}

function cycleTypewriter() {
  typeLine(twLines[twIndex % twLines.length], () => {
    twIndex++;
    cycleTypewriter();
  });
}
cycleTypewriter();

papers.forEach(paper => {
  paper.addEventListener('click', () => {
    const full = paper.querySelector('.book-full');
    if (!full) return;
    openContent.innerHTML = '';
    overlay.classList.remove('hidden');
    typewrite(openContent, full.innerHTML);
  });
});

closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));
overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.add('hidden'); });

const candle = document.getElementById('candle');
const candleGlow = candle.querySelector('.candle-glow');
document.addEventListener('mousemove', e => {
  const rect = candle.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
  const intensity = Math.max(0, 1 - dist / 300);
  candleGlow.style.opacity = 0.6 + intensity * 0.8;
  candleGlow.style.transform = `translateX(-50%) scale(${1 + intensity * 0.6})`;
});