const categories = {
    "Pokemon Primera Generación": ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew', 'Pidgey', 'Ditto', 'Ivysaur', 'Venusaur', 'Charmander', 'Gengar'],
    "Comida": ['Pizza', 'Hamburguesa', 'Tacos', 'Pasta', 'Sushi', 'Helado', 'Chocolate', 'Ensalada'],
};

let selectedCategory = '';
let currentRound = 0;
let remainingOptions = [];
let selectedOptions = [];
let inTop10Mode = false;

document.addEventListener("DOMContentLoaded", () => {
    loadGameState(); // Recuperar el estado al cargar la página
});

// Función para empezar el juego
function startGame() {
    const category = document.querySelector("#search-results div.selected");
    if (category) {
        selectedCategory = category.textContent;
        remainingOptions = [...categories[selectedCategory]]; // Clonar el array
        currentRound = 0;
        selectedOptions = [];
        inTop10Mode = false;
        saveGameState();
        showNextRound();
    }
}

// Mostrar la siguiente ronda
function showNextRound() {
    if (remainingOptions.length <= 10 && !inTop10Mode) {
        startTop10Mode();
        return;
    }

    currentRound++;
    const options = selectTwoRandomOptions();
    document.getElementById("option1").textContent = options[0];
    document.getElementById("option2").textContent = options[1];

    document.getElementById("game-area").classList.remove("hidden");
    document.getElementById("game-area").classList.add("visible");

    updateProgressBar();
    saveGameState();
}

// Seleccionar dos opciones al azar
function selectTwoRandomOptions() {
    const option1Index = Math.floor(Math.random() * remainingOptions.length);
    const option1 = remainingOptions.splice(option1Index, 1)[0];

    const option2Index = Math.floor(Math.random() * remainingOptions.length);
    const option2 = remainingOptions.splice(option2Index, 1)[0];

    return [option1, option2];
}

// Función al seleccionar una opción
function selectOption(optionId) {
    const selectedOption = document.getElementById(optionId).textContent;
    selectedOptions.push(selectedOption);
    remainingOptions.push(selectedOption); // La opción ganadora sigue en juego

    document.getElementById(optionId).classList.add("selected");
    setTimeout(() => {
        document.getElementById(optionId).classList.remove("selected");
        showNextRound();
    }, 500);
}

// Comienza el modo Top 10
function startTop10Mode() {
    inTop10Mode = true;
    document.getElementById("game-area").classList.add("hidden");
    document.getElementById("round-message").classList.remove("hidden");
    setTimeout(() => {
        document.getElementById("round-message").classList.add("hidden");
        document.getElementById("top10").classList.remove("hidden");
        showTop10();
    }, 2000);  // Delay para mostrar el mensaje de ronda antes del top 10

    saveGameState();
}

// Mostrar el Top 10
function showTop10() {
    const rankings = document.getElementById("rankings");
    rankings.innerHTML = '';

    remainingOptions.forEach((option, index) => {
        const rankingDiv = document.createElement("div");
        rankingDiv.textContent = `${index + 1}. ${option}`;
        rankings.appendChild(rankingDiv);
    });

    document.getElementById("top-winner").textContent = remainingOptions[0]; // Ganador destacado
}

// Actualizar barra de progreso
function updateProgressBar() {
    const progress = (selectedOptions.length / (selectedOptions.length + remainingOptions.length)) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
}

// Filtrar categorías en tiempo real
function filterCategories() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = ''; // Limpiar resultados anteriores
    for (const category in categories) {
        if (category.toLowerCase().includes(searchTerm)) {
            const resultDiv = document.createElement("div");
            resultDiv.textContent = category;
            resultDiv.onclick = () => selectCategory(resultDiv);
            resultsContainer.appendChild(resultDiv);
        }
    }
    resultsContainer.style.display = searchTerm ? 'block' : 'none';
}

// Seleccionar una categoría
function selectCategory(div) {
    const allResults = document.querySelectorAll("#search-results div");
    allResults.forEach(div => div.classList.remove("selected"));
    div.classList.add("selected");
    document.getElementById("start-btn").disabled = false;
}

// Alternar vista de categorías
function toggleAllCategories() {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.style.display = resultsContainer.style.display === 'block' ? 'none' : 'block';
}

// Resetear el juego
function resetGame() {
    selectedCategory = '';
    currentRound = 0;
    remainingOptions = [];
    selectedOptions = [];
    inTop10Mode = false;

    document.getElementById("game-area").classList.add("hidden");
    document.getElementById("round-message").style.display = 'none';
    document.getElementById("top10").classList.add("hidden");
    document.getElementById("progress-bar").style.width = '0%';

    localStorage.removeItem("gameState");
}

// Guardar estado en localStorage
function saveGameState() {
    const gameState = {
        remainingOptions,
        currentRound,
        selectedOptions,
        inTop10Mode
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
}

// Cargar estado desde localStorage
function loadGameState() {
    const savedState = JSON.parse(localStorage.getItem("gameState"));
    if (savedState) {
        remainingOptions = savedState.remainingOptions;
        currentRound = savedState.currentRound;
        selectedOptions = savedState.selectedOptions;
        inTop10Mode = savedState.inTop10Mode;
        
        if (inTop10Mode) {
            startTop10Mode();
        } else {
            showNextRound();
        }
    }
}
