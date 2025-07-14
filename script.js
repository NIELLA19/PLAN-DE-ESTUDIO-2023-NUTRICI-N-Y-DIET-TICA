document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  function actualizarEstados() {
    ramos.forEach(ramo => {
      // No cambiar si ya está aprobada
      if (ramo.classList.contains("aprobada")) return;

      const prereqs = ramo.dataset.prereqs;

      // Si no tiene requisitos
      if (!prereqs) {
        ramo.classList.add("desbloqueada");
        return;
      }

      // Caso especial: ALL = todas las anteriores deben estar aprobadas
      if (prereqs === "ALL") {
        const index = Array.from(ramos).indexOf(ramo);
        const prevRamos = Array.from(ramos).slice(0, index);
        const allApproved = prevRamos.every(r => r.classList.contains("aprobada"));
        if (allApproved) ramo.classList.add("desbloqueada");
        return;
      }

      // Caso especial: SEM8 = todas las del semestre 8 deben estar aprobadas
      if (prereqs === "SEM8") {
        const sem8Ramos = document.querySelectorAll('[data-code="COLECTIVOS"], [data-code="CLINICA"]');
        const allSem8Approved = Array.from(sem8Ramos).every(r => r.classList.contains("aprobada"));
        if (allSem8Approved) ramo.classList.add("desbloqueada");
        return;
      }

      // Evaluar los requisitos normales
      const codes = prereqs.split(',');
      const aprobados = codes.every(code => {
        const req = document.querySelector(`[data-code="${code}"]`);
        return req && req.classList.contains("aprobada");
      });
      if (aprobados) ramo.classList.add("desbloqueada");
    });
  }

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      // Solo permitir si está desbloqueada o ya aprobada
      if (!ramo.classList.contains("desbloqueada") && !ramo.classList.contains("aprobada")) return;

      // Cambiar estado
      ramo.classList.toggle("aprobada");
      ramo.classList.remove("desbloqueada");

      // Limpiar y volver a verificar desbloqueos
      ramos.forEach(r => r.classList.remove("desbloqueada"));
      actualizarEstados();
    });
  });

  // Primera carga
  actualizarEstados();
});
