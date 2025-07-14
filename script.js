document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");
  const estadoGuardado = JSON.parse(localStorage.getItem("estadoRamos")) || {};

  function guardarEstado() {
    const estadoActual = {};
    ramos.forEach((ramo) => {
      estadoActual[ramo.dataset.code] = ramo.classList.contains("aprobada");
    });
    localStorage.setItem("estadoRamos", JSON.stringify(estadoActual));
  }

  function actualizarEstado() {
    ramos.forEach((ramo) => {
      const code = ramo.dataset.code;
      const requisitos = ramo.dataset.prereqs ? ramo.dataset.prereqs.split(",") : [];

      if (estadoGuardado[code]) {
        ramo.classList.add("aprobada");
        ramo.classList.remove("gris", "desbloqueada");
        return;
      }

      if (requisitos.length === 0) {
        ramo.classList.add("desbloqueada");
        ramo.classList.remove("gris", "aprobada");
      } else {
        const requisitosCumplidos = requisitos.every((reqCode) => {
          const reqRamo = document.querySelector(`.ramo[data-code="${reqCode}"]`);
          return reqRamo && reqRamo.classList.contains("aprobada");
        });
        if (requisitosCumplidos) {
          ramo.classList.add("desbloqueada");
          ramo.classList.remove("gris", "aprobada");
        } else {
          ramo.classList.add("gris");
          ramo.classList.remove("desbloqueada", "aprobada");
        }
      }
    });
  }

  ramos.forEach((ramo) => {
    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("gris")) {
        ramo.classList.toggle("aprobada");
        guardarEstado();
        actualizarEstado();
      }
    });
  });

  const botonReset = document.createElement("button");
  botonReset.textContent = "Reiniciar selección";
  botonReset.className = "reset-button";
  botonReset.addEventListener("click", () => {
    localStorage.removeItem("estadoRamos");
    ramos.forEach((r) => r.classList.remove("aprobada"));
    actualizarEstado();
  });

  document.body.appendChild(botonReset);
  actualizarEstado();
});
