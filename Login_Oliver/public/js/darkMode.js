// SELECCIÓN DE ELEMENTOS HTML
const toggleDarkModeBtn = document.getElementById('darkmode-toggle');
const body = document.body;
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');


// CARGA DE LA PREFERENCIA DEL USUARIO
loadDarkModePreference();

//EVENTO DE CLIC EN EL BOTÓN DE ALTERNANCIA
toggleDarkModeBtn.addEventListener('click', () => {
  toggleDarkMode();
  saveDarkModePreference();
});

//FUNCIÓN PARA ALTERNAR EL MODO OSCURO
function toggleDarkMode() {
  body.classList.toggle('dark-mode');
}

//FUNCIÓN PARA CARGAR LA PREFERENCIA DEL USUARIO
function loadDarkModePreference() {
  const isDarkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
  if (isDarkModeEnabled) {
    body.classList.add('dark-mode');
  }
}

//FUNCIÓN PARA GUARDAR LA PREFERENCIA DEL USUARIO
function saveDarkModePreference() {
  const isDarkModeEnabled = body.classList.contains('dark-mode');
  localStorage.setItem('darkModeEnabled', isDarkModeEnabled);
}