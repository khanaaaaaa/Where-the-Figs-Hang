const papers = document.querySelectorAll('.paper');
const overlay = document.getElementById('overlay');
const openContent = document.getElementById('open-paper-content');
const closeBtn = document.getElementById('close-btn');

papers.forEach(paper => {
  paper.addEventListener('click', () => {
    openContent.innerHTML = paper.querySelector('.paper-content').innerHTML;
    overlay.classList.remove('hidden');
  });
});

closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));
overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.add('hidden'); });
