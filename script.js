document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  // Restaurar materias seleccionadas desde localStorage
  const guardadas = JSON.parse(localStorage.getItem("materiasCompletadas") || "[]");
  guardadas.forEach(code => {
    const ramo = document.querySelector(`.ramo[data-code="${code}"]`);
    if (ramo) ramo.classList.add("completado");
  });

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;

      ramo.classList.toggle("completado");
      guardarMaterias();
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

function guardarMaterias() {
  const completadas = Array.from(document.querySelectorAll(".ramo.completado"))
    .map(ramo => ramo.dataset.code);
  localStorage.setItem("materiasCompletadas", JSON.stringify(completadas));
}

function resetMalla() {
  const allRamos = document.querySelectorAll(".ramo");
  allRamos.forEach(ramo => {
    ramo.classList.remove("completado");
  });
  localStorage.removeItem("materiasCompletadas");
  updateRamos();
}
