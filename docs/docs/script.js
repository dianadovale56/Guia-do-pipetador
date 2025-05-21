const botoesContainer = document.getElementById('botoes-container');
const resetarBtn = document.getElementById('resetar');
const somClick = document.getElementById('som-click');
const somReset = document.getElementById('som-reset');

const totalPoços = 96;

function carregarEstado() {
  const estadoSalvo = JSON.parse(localStorage.getItem('estadoPocos'));
  if (!estadoSalvo) return;

  const botoes = document.querySelectorAll('.poco');
  estadoSalvo.forEach((preenchido, i) => {
    if (preenchido) botoes[i].classList.add('preenchido');
  });
}

function salvarEstado() {
  const estado = Array.from(document.querySelectorAll('.poco')).map(btn =>
    btn.classList.contains('preenchido')
  );
  localStorage.setItem('estadoPocos', JSON.stringify(estado));
}

function criarBotoes() {
  for (let i = 0; i < totalPoços; i++) {
    const btn = document.createElement('button');
    btn.className = 'poco';
    btn.addEventListener('click', () => {
      btn.classList.toggle('preenchido');
      somClick.currentTime = 0;
      somClick.play();
      salvarEstado();
    });
    botoesContainer.appendChild(btn);
  }
}

resetarBtn.addEventListener('click', () => {
  document.querySelectorAll('.poco').forEach(btn => btn.classList.remove('preenchido'));
  somReset.currentTime = 0;
  somReset.play();
  salvarEstado();
});

criarBotoes();
carregarEstado();
