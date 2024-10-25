const categories = {
    pokemonprimera: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew'],
    comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos', 'Sushi', 'Pollo asado', 'Sopa'],
    rupaulDownUnder: ['Anita Wigl\'it', 'Art Simone', 'Coco Jumbo', 'Electra Shock', 'Etcetera Etcetera', 'Jojo Zaho', 'Karen From Finance', 'Kita Mean', 'Maxi Shield', 'Scarlet Adams', 'Yvonne Lamay', 'Aubrey Haive', 'Beverly Kills', 'Hannah Conda', 'Kween Kong', 'Minnie Cooper', 'Molly Poppinz', 'Pomara Fifth', 'Spankie Jackzon']
};

const categoryNames = {
    pokemonprimera: 'Pokemon Primera Generación',
    comidas: 'Comidas',
    rupaulDownUnder: 'RuPaul Drag Race Down Under'
};

let currentRound = [];
let nextRound = [];
let voteCounts = {};
let selectedCategory = null;
let roundNumber = 1;

// Inicializa el juego mostrando las categorías en la lista
function initializeCategories() {
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";
    for (let key in categoryNames) {
        const div = document.createElement("div");
        div.textContent = categoryNames[key];
        div.onclick = () => selectCategory(key);
        searchResults.appendChild(div);
    }
}

function filterCategories() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";
    for (let key in categoryNames) {
        if (categoryNames[key].toLowerCase().includes(query)) {
            const div = document.createElement("div");
            div.textContent = categoryNames[key];
            div.onclick = () => selectCategory(key);
            searchResults.appendChild(div);
        }
    }
    searchResults.style.display = query ? "block" : "none";
}

// Alterna la visibilidad de todas las categorías
function toggleAllCategories() {
    const searchResults = document.getElementById("search-results");
    searchResults.style.display = searchResults.style.display === "block" ? "none" : "block";
}

// Selecciona una categoría y permite comenzar el juego
function selectCategory(category) {
    selectedCategory = category;
    document.getElementById("search-bar").value = categoryNames[category];
    document.getElementById("search-results").style.display = "none";
    document.getElementById("start-btn").disabled = false;
}

// Comienza el juego con la categoría seleccionada
function startGame() {
    if (!selectedCategory) return;

    // Asigna opciones para la ronda inicial
    currentRound = [...categories[selectedCategory]];
    voteCounts = {};
    currentRound.forEach(option => {
        voteCounts[option] = 0;
    });

    document.getElementById("category-selector").style.display = "none";
    document.getElementById("game-area").style.display = "flex";
    document.getElementById("top10").style.display = "none";
    roundNumber = 1;
    startRound();
}

// Muestra el indicador de ronda actual y asigna opciones
function startRound() {
    document.getElementById("round-indicator").innerText = `Ronda ${roundNumber}`;

    if (currentRound.length >= 2) {
        const [option1, option2] = currentRound.splice(0, 2);
        document.getElementById("option1").innerHTML = option1;
        document.getElementById("option2").innerHTML = option2;
    } else if (nextRound.length === 1) {
        showWinner();
    } else {
        currentRound = nextRound;
        nextRound = [];
        document.getElementById("round-message").style.display = "block";
        roundNumber++;
        setTimeout(() => {
            document.getElementById("round-message").style.display = "none";
            startRound();
        }, 800);
    }
}

// Registra la opción seleccionada y continúa la ronda
function selectOption(option) {
    const chosenElement = document.getElementById(option);
    chosenElement.classList.add('selected');
    setTimeout(() => chosenElement.classList.remove('selected'), 150);

    const chosen = chosenElement.innerText;
    voteCounts[chosen]++;
    nextRound.push(chosen);

    startRound();
}

// Muestra el ganador al final del juego
function showWinner() {
    const sortedOptions = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);
    const top10Container = document.getElementById("rankings");
    top10Container.innerHTML = "";

    sortedOptions.slice(0, 10).forEach(([option, votes], index) => {
        const div = document.createElement("div");
        div.textContent = `${index + 1}. ${option} (${votes} votos)`;
        if (index === 0) {
            div.style.fontWeight = "bold";
            div.style.color = "#FFD700"; // Oro
        } else if (index === 1) {
            div.style.backgroundColor = "silver"; // Plata
        } else if (index === 2) {
            div.style.backgroundColor = "#cd7f32"; // Bronce
        }
        top10Container.appendChild(div);
    });

    document.getElementById("game-area").style.display = "none";
    document.getElementById("top10").style.display = "block";
}

// Reinicia el juego para volver a la selección de categoría
function resetGame() {
    selectedCategory = null;
    document.getElementById("search-bar").value = "";
    document.getElementById("category-selector").style.display = "block";
    document.getElementById("start-btn").disabled = true;
    document.getElementById("game-area").style.display = "none";
    document.getElementById("top10").style.display = "none";
    initializeCategories();
}

// Llama a la inicialización de categorías al cargar la página
window.onload = initializeCategories;
