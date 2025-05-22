document.addEventListener('DOMContentLoaded', function () {
  const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const grid = document.getElementById('grid-pocos');
  const resetBtn = document.getElementById('reset-btn');
  const audioClick = document.getElementById('audio-click');
  const audioReset = document.getElementById('audio-reset');

  const inicioX = 7.9;
  const inicioY = 27.6;
  const espacamentoX = 7.18;
  const espacamentoY = 3.7;

  // Função para restaurar estado salvo
  const estadoSalvo = JSON.parse(localStorage.getItem('estadoPocos')) || {};

  for (let linha = 1; linha <= 12; linha++) {
    for (let coluna = 0; coluna < 8; coluna++) {
      const pos = `${letras[coluna]}${linha}`;
      const poco = document.createElement('div');
      poco.className = 'poco';
      poco.dataset.posicao = pos;

      // Posição absoluta baseada na imagem (ajustada)
      poco.style.left = `${inicioX + coluna * espacamentoX}%`;
      poco.style.top = `${inicioY + (linha - 1) * espacamentoY}%`;

      // Estado salvo
      if (estadoSalvo[pos]) {
        poco.classList.add('marcado');
      }

      poco.addEventListener('click', function () {
        this.classList.toggle('marcado');
        audioClick.currentTime = 0;
        audioClick.play();

        estadoSalvo[pos] = this.classList.contains('marcado');
        localStorage.setItem('estadoPocos', JSON.stringify(estadoSalvo));
      });

      grid.appendChild(poco);
    }
  }

  resetBtn.addEventListener('click', function () {
    document.querySelectorAll('.poco').forEach(p => p.classList.remove('marcado'));
    localStorage.removeItem('estadoPocos');
    audioReset.currentTime = 0;
    audioReset.play();
  });
});
