// script.js

document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
  const aprobadas = new Set();

  // Inicializa todos los ramos como grises
  ramos.forEach(ramo => {
    ramo.classList.add("gris");
  });

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      const code = ramo.dataset.code;
      const prereqs = ramo.dataset.prereqs;
      const yaAprobado = ramo.classList.contains("aprobada");

      if (yaAprobado) {
        // Si ya está aprobado, se desmarca
        aprobadas.delete(code);
        ramo.classList.remove("aprobada");
        ramo.classList.add("gris");
        actualizarEstado();
        return;
      }

      // Verifica si tiene prerrequisitos y están aprobados
      if (!prereqs || prereqs.split(",").every(p => aprobadas.has(p.trim()))) {
        aprobadas.add(code);
        ramo.classList.remove("gris", "desbloqueada");
        ramo.classList.add("aprobada");
        actualizarEstado();
      } else {
        alert("Debes aprobar los prerrequisitos: " + prereqs);
      }
    });
  });

  function actualizarEstado() {
    ramos.forEach(ramo => {
      const code = ramo.dataset.code;
      const prereqs = ramo.dataset.prereqs;
      const aprobado = aprobadas.has(code);

      ramo.classList.remove("desbloqueada");

      if (!aprobado && prereqs) {
        const listo = prereqs.split(",").every(p => aprobadas.has(p.trim()));
        if (listo) {
          ramo.classList.remove("gris");
          ramo.classList.add("desbloqueada");
        } else {
          ramo.classList.remove("desbloqueada");
          ramo.classList.add("gris");
        }
      }

      if (!prereqs && !aprobado) {
        ramo.classList.add("gris");
      }
    });
  }
});
