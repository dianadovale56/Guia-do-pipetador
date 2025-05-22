document.addEventListener('DOMContentLoaded', function () {
    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const grid = document.getElementById('grid-pocos');
    const resetBtn = document.getElementById('reset-btn');
    const clickSound = document.getElementById('som-click');
    const resetSound = document.getElementById('som-reset');

    const inicioX = 8.5;
    const inicioY = 28;
    const espacamentoX = 7.2;
    const espacamentoY = 3.8;

    const marcados = JSON.parse(localStorage.getItem('poçosMarcados')) || {};

    for (let linha = 1; linha <= 12; linha++) {
        for (let coluna = 0; coluna < 8; coluna++) {
            const posicao = `${letras[coluna]}${linha}`;
            const poco = document.createElement('div');
            poco.className = 'poco';
            poco.dataset.posicao = posicao;

            poco.style.left = `${inicioX + coluna * espacamentoX}%`;
            poco.style.top = `${inicioY + (linha - 1) * espacamentoY}%`;
            poco.textContent = posicao;

            if (marcados[posicao]) {
                poco.classList.add('marcado');
            }

            poco.addEventListener('click', function () {
                this.classList.toggle('marcado');
                marcados[posicao] = this.classList.contains('marcado');
                localStorage.setItem('poçosMarcados', JSON.stringify(marcados));
                clickSound.currentTime = 0;
                clickSound.play();
            });

            grid.appendChild(poco);
        }
    }

    resetBtn.addEventListener('click', function () {
        document.querySelectorAll('.poco').forEach(p => {
            p.classList.remove('marcado');
        });
        localStorage.removeItem('poçosMarcados');
        resetSound.currentTime = 0;
        resetSound.play();
    });
});
