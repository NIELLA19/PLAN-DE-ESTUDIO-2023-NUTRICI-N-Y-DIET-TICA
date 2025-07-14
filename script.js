document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;

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
      // SIN prerrequisitos = materia activa desde el inicio (morado claro)
      ramo.classList.remove("bloqueado");
      ramo.classList.add("inicial");
      ramo.style.pointerEvents = "auto";
    } else {
      const codes = prereqs.split(",");
      const requisitosCumplidos = codes.every(code =>
        document.querySelector(`.ramo[data-code="${code}"]`)?.classList.contains("completado")
      );

      if (requisitosCumplidos) {
        ramo.classList.remove("bloqueado");
        ramo.classList.remove("inicial");
        ramo.style.pointerEvents = "auto";
      } else {
        ramo.classList.add("bloqueado");
        ramo.classList.remove("inicial");
        ramo.classList.remove("completado");
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
