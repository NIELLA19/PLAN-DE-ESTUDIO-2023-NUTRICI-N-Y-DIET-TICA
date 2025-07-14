document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
  const aprobadas = new Set(JSON.parse(localStorage.getItem("aprobadas") || "[]"));

  function guardarEstado() {
    localStorage.setItem("aprobadas", JSON.stringify(Array.from(aprobadas)));
  }

  function actualizarEstado() {
    ramos.forEach(ramo => {
      const code = ramo.dataset.code;
      const prereqs = ramo.dataset.prereqs?.split(",").map(p => p.trim()).filter(p => p);

      ramo.classList.remove("aprobada", "desbloqueada", "gris");

      if (aprobadas.has(code)) {
        ramo.classList.add("aprobada");
      } else if (!prereqs || prereqs.length === 0) {
        ramo.classList.add("desbloqueada");
      } else if (prereqs.every(p => aprobadas.has(p))) {
        ramo.classList.add("desbloqueada");
      } else {
        ramo.classList.add("gris");
      }
    });
  }

  ramos.forEach(ramo => {
    const code = ramo.dataset.code;

    ramo.addEventListener("click", () => {
      const prereqs = ramo.dataset.prereqs?.split(",").map(p => p.trim()).filter(p => p);
      const aprobado = aprobadas.has(code);

      if (aprobado) {
        aprobadas.delete(code);
      } else {
        if (!prereqs || prereqs.every(p => aprobadas.has(p))) {
          aprobadas.add(code);
        } else {
          alert("Debes aprobar los prerrequisitos: " + prereqs.join(", "));
          return;
        }
      }

      guardarEstado();
      actualizarEstado();
    });
  });

  // Botón de reinicio
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Restablecer Malla";
  resetBtn.className = "reset-button";
  document.body.insertBefore(resetBtn, document.querySelector(".grid-semestres"));

  resetBtn.addEventListener("click", () => {
    if (confirm("¿Deseas reiniciar la malla?")) {
      localStorage.removeItem("aprobadas");
      location.reload();
    }
  });

  actualizarEstado();
});
