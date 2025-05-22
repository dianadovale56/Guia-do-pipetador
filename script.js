const container = document.getElementById("poços-container");
const letras = ["A","B","C","D","E","F","G","H"];
const somClick = document.getElementById("somClick");
const somResetar = document.getElementById("somResetar");

function salvarEstado(marcados) {
  localStorage.setItem("poçosMarcados", JSON.stringify(marcados));
}

function carregarEstado() {
  const marcados = JSON.parse(localStorage.getItem("poçosMarcados")) || [];
  marcados.forEach(id => {
    const poço = document.getElementById(id);
    if (poço) poço.classList.add("marcado");
  });
  return marcados;
}

function criarPoços() {
  const marcados = carregarEstado();
  for (let l = 0; l < letras.length; l++) {
    for (let n = 1; n <= 12; n++) {
      const id = `${letras[l]}${n}`;
      const div = document.createElement("div");
      div.classList.add("poço");
      div.id = id;
      div.innerText = id;
      if (marcados.includes(id)) {
        div.classList.add("marcado");
      }
      div.addEventListener("click", () => {
        div.classList.toggle("marcado");
        somClick.currentTime = 0;
        somClick.play();
        const novosMarcados = Array.from(document.querySelectorAll(".poço.marcado")).map(el => el.id);
        salvarEstado(novosMarcados);
      });
      container.appendChild(div);
    }
  }
}

document.getElementById("resetar").addEventListener("click", () => {
  somResetar.currentTime = 0;
  somResetar.play();
  document.querySelectorAll(".poço").forEach(poço => poço.classList.remove("marcado"));
  salvarEstado([]);
});

criarPoços();
