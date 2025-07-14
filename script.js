// Función para manejar los clics en materias
document.querySelectorAll('.ramo').forEach(ramo => {
  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('activa')) return;

    const prereqs = ramo.dataset.prereqs;
    if (prereqs) {
      const prereqList = prereqs.split(',');
      const allApproved = prereqList.every(code =>
        document.querySelector(`.ramo[data-code="${code}"]`)?.classList.contains('activa')
      );
      if (!allApproved) {
        alert('Debes aprobar todos los prerrequisitos para seleccionar esta materia.');
        return;
      }
    }

    ramo.classList.add('activa');
    saveState();
  });
});

// Guardar materias seleccionadas en localStorage
function saveState() {
  const selected = [...document.querySelectorAll('.ramo.activa')].map(r => r.dataset.code);
  localStorage.setItem('materiasActivas', JSON.stringify(selected));
}

// Cargar materias guardadas
function loadState() {
  const stored = JSON.parse(localStorage.getItem('materiasActivas') || '[]');
  stored.forEach(code => {
    const ramo = document.querySelector(`.ramo[data-code="${code}"]`);
    if (ramo) {
      ramo.classList.add('activa');
    }
  });
}

// Reiniciar la malla
function resetMalla() {
  document.querySelectorAll('.ramo').forEach(r => r.classList.remove('activa'));
  localStorage.removeItem('materiasActivas');
}

// Cargar el estado al iniciar
document.addEventListener('DOMContentLoaded', loadState);
