document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("inactivo")) return;

      ramo.classList.toggle("completado");
      updateRamos();
    });
  });

  updateRamos();
});

function updateRamos() {
  const allRamos = document.querySelectorAll(".ramo");

  allRamos.forEach(ramo => {
    const prereqs = ramo.dataset.prereqs;

    if (!prereqs) {
      // Materias SIN prerrequisitos → se marcan como iniciales (morado claro)
      ramo.classList.remove("bloqueado");
      ramo.classList.remove("inactivo");
      ramo.classList.add("inicial");
      ramo.style.pointerEvents = "auto";
    } else {
      // Materias CON prerrequisitos → verificar si se cumplen
      const codes = prereqs.split(",");
      const requisitosCumplidos = codes.every(code =>
        document.querySelector(`.ramo[data-code="${code}"]`)?.classList.contains("completado")
      );

      if (requisitosCumplidos) {
        ramo.classList.remove("bloqueado");
        ramo.classList.remove("inactivo");
        ramo.classList.remove("inicial");
        ramo.style.pointerEvents = "auto";
      } else {
        ramo.classList.remove("inicial");
        ramo.classList.add("bloqueado");
        ramo.classList.add("inactivo");
        ramo.style.pointerEvents = "none";
      }
    }
  });
}

function resetMalla() {
  const allRamos = document.querySelectorAll(".ramo");
  allRamos.forEach(ramo => {
    ramo.classList.remove("completado");
  });
  updateRamos();
}
