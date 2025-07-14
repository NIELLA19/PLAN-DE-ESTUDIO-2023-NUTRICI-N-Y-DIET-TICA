document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach((ramo) => {
    ramo.addEventListener("click", () => {
      toggleRamo(ramo);
      updateAllRamos();
    });
  });

  loadState();
  updateAllRamos();
});

function toggleRamo(ramo) {
  ramo.classList.toggle("completado");
  saveState();
}

function updateAllRamos() {
  const allRamos = document.querySelectorAll(".ramo");

  allRamos.forEach((ramo) => {
    const prereqs = ramo.dataset.prereqs;
    if (prereqs) {
      const codes = prereqs.split(",");
      const allMet = codes.every((code) =>
        document.querySelector(`.ramo[data-code="${code}"]`)?.classList.contains("completado")
      );
      ramo.style.opacity = allMet ? "1" : "0.4";
      ramo.style.pointerEvents = allMet ? "auto" : "none";
    } else {
      ramo.style.opacity = "1";
      ramo.style.pointerEvents = "auto";
    }
  });
}

function saveState() {
  const estado = {};
  document.querySelectorAll(".ramo").forEach((ramo) => {
    const code = ramo.dataset.code;
    estado[code] = ramo.classList.contains("completado");
  });
  localStorage.setItem("estadoRamos", JSON.stringify(estado));
}

function loadState() {
  const estado = JSON.parse(localStorage.getItem("estadoRamos") || "{}");
  document.querySelectorAll(".ramo").forEach((ramo) => {
    const code = ramo.dataset.code;
    if (estado[code]) {
      ramo.classList.add("completado");
    }
  });
}

function resetMalla() {
  localStorage.removeItem("estadoRamos");
  document.querySelectorAll(".ramo").forEach((ramo) => {
    ramo.classList.remove("completado");
  });
  updateAllRamos();
}
