// Variables de juego
let opciones = []; // Asume que esta variable se llena con opciones
let seleccionadas = [];
let top10Mode = false;
let progreso = 0;

// Inicializar el juego
function startGame() {
    seleccionadas = [];
    progreso = 0;
    top10Mode = false;
    document.getElementById("round-indicator").style.display = "block";
    document.getElementById("game-area").style.display = "flex";
    document.getElementById("intro").style.display = "none";
    document.getElementById("category-selector").style.display = "none";
    actualizarBarraProgreso();
    mostrarOpciones();
}

// Función para mostrar el progreso
function actualizarBarraProgreso() {
    const progressBar = document.getElementById("progress-bar");
    let porcentaje = Math.min((seleccionadas.length / opciones.length) * 100, 100);
    progressBar.style.width = `${porcentaje}%`;
    progressBar.textContent = `${Math.round(porcentaje)}%`;
}

// Despliega opciones y muestra la ronda de Top 10 cuando queden 10 opciones
function mostrarOpciones() {
    if (opciones.length <= 10 && !top10Mode) {
        activarRondaTop10();
    } else {
        let [opcion1, opcion2] = opciones.slice(0, 2);
        document.getElementById("option1").textContent = opcion1;
        document.getElementById("option2").textContent = opcion2;
    }
}

// Activa la ronda especial Top 10
function activarRondaTop10() {
    top10Mode = true;
    document.getElementById("round-message").style.display = "block";
    document.getElementById("round-message").textContent = "¡Comienza la ronda del Top 10!";
    // Agregar efecto visual de entrada para el Top 10
    document.getElementById("round-message").classList.add("visible");
    setTimeout(() => {
        document.getElementById("round-message").classList.remove("visible");
    }, 2000);
    mostrarTop10();
}

// Filtrar categorías
function filterCategories() {
    const searchInput = document.getElementById("search-bar").value.toLowerCase();
    const resultsContainer = document.getElementById("search-results");
    const resultadosFiltrados = opciones.filter(opcion => opcion.toLowerCase().includes(searchInput));
    
    resultsContainer.innerHTML = "";
    resultadosFiltrados.forEach((opcion) => {
        const div = document.createElement("div");
        div.textContent = opcion;
        div.onclick = () => seleccionarCategoria(opcion);
        resultsContainer.appendChild(div);
    });
    resultsContainer.style.display = "block";
}

// Mostrar o esconder todas las categorías
function toggleAllCategories() {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.style.display = resultsContainer.style.display === "none" ? "block" : "none";
}

// Selecciona una opción y avanza la ronda
function selectOption(selectedId) {
    const selectedOption = document.getElementById(selectedId).textContent;
    seleccionadas.push(selectedOption);
    opciones = opciones.filter(opcion => opcion !== selectedOption);
    actualizarBarraProgreso();
    if (opciones.length > 1) {
        mostrarOpciones();
    } else {
        mostrarResultados();
    }
}

// Muestra los resultados del Top 10 al final del juego
function mostrarResultados() {
    document.getElementById("game-area").style.display = "none";
    document.getElementById("top10").style.display = "block";
    const rankings = document.getElementById("rankings");
    rankings.innerHTML = "";
    seleccionadas.slice(0, 10).forEach((opcion, index) => {
        const div = document.createElement("div");
        div.textContent = `${index + 1}. ${opcion}`;
        if (index === 0) div.classList.add("highlighted-winner");
        rankings.appendChild(div);
    });
}

// Almacenar el estado del juego en localStorage
function guardarEstadoJuego() {
    const estado = {
        opciones,
        seleccionadas,
        top10Mode,
        progreso
    };
    localStorage.setItem("estadoJuego", JSON.stringify(estado));
}

// Recuperar el estado del juego de localStorage
function recuperarEstadoJuego() {
    const estadoGuardado = JSON.parse(localStorage.getItem("estadoJuego"));
    if (estadoGuardado) {
        opciones = estadoGuardado.opciones;
        seleccionadas = estadoGuardado.seleccionadas;
        top10Mode = estadoGuardado.top10Mode;
        progreso = estadoGuardado.progreso;
        actualizarBarraProgreso();
        mostrarOpciones();
    }
}

// Resetea el juego y limpia el estado guardado
function resetGame() {
    localStorage.removeItem("estadoJuego");
    opciones = []; // Aquí debes cargar de nuevo las opciones iniciales
    seleccionadas = [];
    progreso = 0;
    top10Mode = false;
    startGame();
}

// Ejecutar al cargar la página
window.onload = function() {
    recuperarEstadoJuego();
    // Configura la barra de progreso inicial
    actualizarBarraProgreso();
};
