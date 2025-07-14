document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  function actualizarEstados() {
    ramos.forEach(ramo => {
      if (ramo.classList.contains("aprobada")) return;

      const prereqs = ramo.dataset.prereqs;

      if (!prereqs) {
        ramo.classList.add("desbloqueada");
        return;
      }

      if (prereqs === "ALL") {
        const index = Array.from(ramos).indexOf(ramo);
        const anteriores = Array.from(ramos).slice(0, index);
        const allApproved = anteriores.every(r => r.classList.contains("aprobada"));
        if (allApproved) ramo.classList.add("desbloqueada");
        return;
      }

      if (prereqs === "SEM8") {
        const sem8 = document.querySelectorAll('[data-code="COLECTIVOS"], [data-code="CLINICA"]');
        const allSem8 = Array.from(sem8).every(r => r.classList.contains("aprobada"));
        if (allSem8) ramo.classList.add("desbloqueada");
        return;
      }

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
      if (!ramo.classList.contains("desbloqueada") && !ramo.classList.contains("aprobada")) return;

      ramo.classList.toggle("aprobada");
      ramo.classList.remove("desbloqueada");

      ramos.forEach(r => r.classList.remove("desbloqueada"));
      actualizarEstados();
    });
  });

  actualizarEstados();
});
