// Definimos las variables globales
let categories = ["Categoría 1", "Categoría 2", "Categoría 3"];
let currentRound = [];
let nextRound = [];
let voteCounts = {};
let roundNumber = 1;
let selectedCategory = "";
let previousSelections = [];

// Guardar y recuperar estado del juego desde localStorage
function saveGameState() {
    localStorage.setItem("gameState", JSON.stringify({
        categories,
        currentRound,
        nextRound,
        voteCounts,
        roundNumber,
        selectedCategory,
        previousSelections
    }));
}

function loadGameState() {
    const savedState = JSON.parse(localStorage.getItem("gameState"));
    if (savedState) {
        ({ categories, currentRound, nextRound, voteCounts, roundNumber, selectedCategory, previousSelections } = savedState);
    }
}

// Función para iniciar el juego con la selección de categoría
function selectCategory(category) {
    selectedCategory = category;
    resetGame();
}

// Función para iniciar una nueva ronda
function startNextRound() {
    if (nextRound.length < 2) {
        declareWinner();
        return;
    }
    currentRound = [...nextRound];
    nextRound = [];
    roundNumber++;
    displayNextPair();
}

// Función para mostrar el siguiente par
function displayNextPair() {
    if (currentRound.length < 2) {
        startNextRound();
        return;
    }

    let option1, option2;
    do {
        option1 = currentRound.splice(Math.floor(Math.random() * currentRound.length), 1)[0];
        option2 = currentRound.splice(Math.floor(Math.random() * currentRound.length), 1)[0];
    } while (option1 === option2);

    document.getElementById("option1").textContent = option1;
    document.getElementById("option2").textContent = option2;
    saveGameState();
}

// Función de votación para el usuario
function vote(option) {
    if (!voteCounts[option]) voteCounts[option] = 0;
    voteCounts[option]++;
    nextRound.push(option);
    previousSelections.push(option);
    displayNextPair();
}

// Declaración del ganador
function declareWinner() {
    let winner = nextRound[0];
    alert(`¡El ganador es ${winner}!`);
    saveGameState();
}

// Función para reiniciar el juego
function resetGame() {
    currentRound = categories.slice();
    nextRound = [];
    voteCounts = {};
    roundNumber = 1;
    previousSelections = [];
    displayNextPair();
}

// Alternar todas las categorías para mejorar la usabilidad
function toggleAllCategories() {
    const toggleIcon = document.getElementById("toggleAllCategories");
    if (toggleIcon.classList.contains("expanded")) {
        toggleIcon.classList.remove("expanded");
        toggleIcon.textContent = "▼"; 
    } else {
        toggleIcon.classList.add("expanded");
        toggleIcon.textContent = "🔍";
    }
}

// Interfaz de usuario y animaciones de retroalimentación visual
function setupUIEffects() {
    document.getElementById("option1").addEventListener("click", () => {
        document.getElementById("option1").classList.add("selected");
        setTimeout(() => document.getElementById("option1").classList.remove("selected"), 300);
    });
    document.getElementById("option2").addEventListener("click", () => {
        document.getElementById("option2").classList.add("selected");
        setTimeout(() => document.getElementById("option2").classList.remove("selected"), 300);
    });
}

// Barra de progreso en la interfaz
function updateProgress() {
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = `${(nextRound.length / categories.length) * 100}%`;
    progressBar.textContent = `Ronda ${roundNumber}`;
}

// Modo rápido sin animaciones
function enableQuickMode() {
    document.body.classList.add("quick-mode");
}

// Cargar el estado del juego al iniciar la aplicación
loadGameState();
document.addEventListener("DOMContentLoaded", () => {
    displayNextPair();
    setupUIEffects();
});
