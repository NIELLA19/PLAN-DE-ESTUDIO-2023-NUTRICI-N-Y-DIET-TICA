document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;

      ramo.classList.toggle("completado");
      updateAllRamos();
    });
  });

  updateAllRamos(); // Inicializa estados al cargar
});

// Esta función actualiza el estado visual de todos los ramos según si sus prerrequisitos han sido completados
function updateAllRamos() {
  const allRamos = document.querySelectorAll(".ramo");

  allRamos.forEach(ramo => {
    const prereqs = ramo.dataset.prereqs;
    if (prereqs) {
      const codes = prereqs.split(",");
      const met = codes.every(code =>
        document.querySelector(`.ramo[data-code="${code}"]`)?.classList.contains("completado")
      );
      if (met) {
        ramo.classList.remove("bloqueado");
        ramo.style.pointerEvents = "auto";
      } else {
        ramo.classList.add("bloqueado");
        ramo.style.pointerEvents = "none";
      }
    } else {
      ramo.classList.remove("bloqueado");
      ramo.style.pointerEvents = "auto";
    }
  });
}

// Reinicia la malla (quita todas las materias seleccionadas)
function resetMalla() {
  const allRamos = document.querySelectorAll(".ramo");
  allRamos.forEach(ramo => {
    ramo.classList.remove("completado");
  });
  updateAllRamos();
}
