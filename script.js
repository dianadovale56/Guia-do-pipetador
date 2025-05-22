const container = document.getElementById("pocos-container");
const clickAudio = document.getElementById("click-audio");
const resetAudio = document.getElementById("reset-audio");
const resetBtn = document.getElementById("resetar-btn");

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const cols = 12;

// Cria os poços
rows.forEach(row => {
  for (let i = 1; i <= cols; i++) {
    const id = `${row}${i}`;
    const div = document.createElement("div");
    div.classList.add("poco");
    div.textContent = id;
    div.dataset.id = id;
    div.addEventListener("click", () => togglePoco(div));
    container.appendChild(div);
  }
});

// Alternar marcação de poço
function togglePoco(div) {
  div.classList.toggle("ativo");
  clickAudio.currentTime = 0;
  clickAudio.play();
  saveState();
}

// Botão RESETAR
resetBtn.addEventListener("click", () => {
  document.querySelectorAll(".poco").forEach(div => div.classList.remove("ativo"));
  resetAudio.currentTime = 0;
  resetAudio.play();
  saveState();
});

// Salvamento no localStorage
function saveState() {
  const state = {};
  document.querySelectorAll(".poco").forEach(div => {
    state[div.dataset.id] = div.classList.contains("ativo");
  });
  localStorage.setItem("pocosState", JSON.stringify(state));
}

// Carregamento do localStorage
function loadState() {
  const state = JSON.parse(localStorage.getItem("pocosState"));
  if (!state) return;
  document.querySelectorAll(".poco").forEach(div => {
    if (state[div.dataset.id]) {
      div.classList.add("ativo");
    } else {
      div.classList.remove("ativo");
    }
  });
}

loadState();
