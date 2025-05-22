document.addEventListener("DOMContentLoaded", () => {
  const letras = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const grid = document.getElementById("grid-pocos");
  const resetBtn = document.getElementById("reset-btn");
  const clickSound = document.getElementById("click-sound");
  const resetSound = document.getElementById("reset-sound");

  const estadosSalvos = JSON.parse(localStorage.getItem("poçosMarcados")) || {};

  for (let linha = 0; linha < letras.length; linha++) {
    for (let coluna = 1; coluna <= 12; coluna++) {
      const id = `${letras[linha]}${coluna}`;
      const div = document.createElement("div");
      div.className = "poco";
      div.textContent = id;
      div.dataset.id = id;

      if (estadosSalvos[id]) {
        div.classList.add("marcado");
        div.style.color = "white";
      }

      div.addEventListener("click", () => {
        div.classList.toggle("marcado");
        clickSound.currentTime = 0;
        clickSound.play();

        const marcado = div.classList.contains("marcado");
        div.style.color = marcado ? "white" : "transparent";
        estadosSalvos[id] = marcado;
        localStorage.setItem("poçosMarcados", JSON.stringify(estadosSalvos));
      });

      grid.appendChild(div);
    }
  }

  resetBtn.addEventListener("click", () => {
    document.querySelectorAll(".poco").forEach((p) => {
      p.classList.remove("marcado");
      p.style.color = "transparent";
    });

    localStorage.removeItem("poçosMarcados");
    resetSound.currentTime = 0;
    resetSound.play();
  });
});
