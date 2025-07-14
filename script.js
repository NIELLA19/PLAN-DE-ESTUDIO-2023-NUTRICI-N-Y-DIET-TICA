document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
  const aprobadas = new Set(JSON.parse(localStorage.getItem("aprobadas") || "[]"));

  // Inicializa estado
  ramos.forEach(ramo => {
    const code = ramo.dataset.code;
    const prereqs = ramo.dataset.prereqs;

    if (aprobadas.has(code)) {
      ramo.classList.add("aprobada");
    } else if (!prereqs) {
      ramo.classList.add("desbloqueada");
    } else {
      ramo.classList.add("gris");
    }
  });

  actualizarEstado();

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      const code = ramo.dataset.code;
      const prereqs = ramo.dataset.prereqs;
      const yaAprobado = ramo.classList.contains("aprobada");

      if (yaAprobado) {
        aprobadas.delete(code);
        ramo.classList.remove("aprobada");
        if (!prereqs) {
          ramo.classList.add("desbloqueada");
        } else {
          ramo.classList.add("gris");
        }
      } else {
        if (!prereqs || prereqs.split(",").every(p => aprobadas.has(p.trim()))) {
          aprobadas.add(code);
          ramo.classList.remove("gris", "desbloqueada");
          ramo.classList.add("aprobada");
        } else {
          alert("Debes aprobar los prerrequisitos: " + prereqs);
        }
      }

      guardarEstado();
      actualizarEstado();
    });
  });

  function actualizarEstado() {
    ramos.forEach(ramo => {
      const code = ramo.dataset.code;
      const prereqs = ramo.dataset.prereqs;
      const aprobado = aprobadas.has(code);

      ramo.classList.remove("desbloqueada", "gris");

      if (!aprobado && prereqs) {
        const listo = prereqs.split(",").every(p => aprobadas.has(p.trim()));
        if (listo) {
          ramo.classList.add("desbloqueada");
        } else {
          ramo.classList.add("gris");
        }
      } else if (!prereqs && !aprobado) {
        ramo.classList.add("desbloqueada");
      } else if (!aprobado) {
        ramo.classList.add("gris");
      }
    });
  }

  function guardarEstado() {
    localStorage.setItem("aprobadas", JSON.stringify(Array.from(aprobadas)));
  }

  // Botón para reiniciar
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Restablecer Malla";
  resetBtn.classList.add("reset-button");
  document.body.insertBefore(resetBtn, document.querySelector(".grid-semestres"));

  resetBtn.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que deseas reiniciar la malla?")) {
      localStorage.removeItem("aprobadas");
      location.reload();
    }
  });
});
