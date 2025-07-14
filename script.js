// script.js
document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
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
      ramo.classList.add("aprobado");
    });
  });
});
