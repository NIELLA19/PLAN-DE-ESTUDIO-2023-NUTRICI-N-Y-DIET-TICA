document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    // Inicialmente, todos los ramos están deshabilitados visualmente
    ramo.classList.add("deshabilitado");

    const prereqs = ramo.dataset.prereqs;
    if (!prereqs) {
      // Si no tiene requisitos, se marca como habilitado (color morado)
      ramo.classList.remove("deshabilitado");
      ramo.classList.add("habilitado");
    }

    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("aprobado")) return;

      const prereqs = ramo.dataset.prereqs;
      if (prereqs) {
        const codes = prereqs.split(',');
        const aprobados = codes.every(code => {
          const req = document.querySelector(`[data-code="${code}"]`);
          return req && req.classList.contains("aprobado");
        });
        if (!aprobados) {
          alert("Debes aprobar los requisitos previos primero.");
          return;
        }
      }

      ramo.classList.remove("habilitado");
      ramo.classList.add("aprobado");

      // Después de aprobar, revisar si desbloquea otros
      ramos.forEach(r => {
        const requisitos = r.dataset.prereqs;
        if (!requisitos || r.classList.contains("aprobado")) return;

        const todosCumplidos = requisitos.split(',').every(code => {
          const req = document.querySelector(`[data-code="${code}"]`);
          return req && req.classList.contains("aprobado");
        });

        if (todosCumplidos && r.classList.contains("deshabilitado")) {
          r.classList.remove("deshabilitado");
          r.classList.add("habilitado");
        }
      });
    });
  });
});
