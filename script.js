// script.js

document.addEventListener("DOMContentLoaded", () => { const ramos = document.querySelectorAll(".ramo"); const aprobadas = new Set();

// Inicializa todos los ramos como grises ramos.forEach(ramo => { ramo.classList.add("gris"); });

// Agrega evento de clic ramos.forEach(ramo => { ramo.addEventListener("click", () => { const code = ramo.dataset.code; const prereqs = ramo.dataset.prereqs; const yaAprobado = aprobadas.has(code);

// Si ya fue aprobado, lo quitamos
  if (yaAprobado) {
    aprobadas.delete(code);
    ramo.classList.remove("aprobada", "desbloqueada");
    ramo.classList.add("gris");
    actualizarEstado();
    return;
  }

  // Si no tiene prerequisitos o ya están todos aprobados
  if (!prereqs || prereqs.split(',').every(p => aprobadas.has(p.trim()))) {
    aprobadas.add(code);
    ramo.classList.remove("gris", "desbloqueada");
    ramo.classList.add("aprobada");
    actualizarEstado();
  } else {
    alert("Debes aprobar los prerrequisitos primero: " + prereqs);
  }
});

});

function actualizarEstado() { ramos.forEach(ramo => { const code = ramo.dataset.code; const prereqs = ramo.dataset.prereqs; const yaAprobado = aprobadas.has(code);

ramo.classList.remove("desbloqueada");

  if (!yaAprobado && prereqs) {
    const listo = prereqs.split(',').every(p => aprobadas.has(p.trim()));
    if (listo) {
      ramo.classList.remove("gris");
      ramo.classList.add("desbloqueada");
    } else {
      ramo.classList.remove("desbloqueada");
      ramo.classList.add("gris");
    }
  }

  if (!prereqs && !yaAprobado) {
    ramo.classList.add("gris");
  }
});

} });

