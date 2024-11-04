const categories = {
    pokemonprimera: [
        { name: 'Pikachu', image: '/Imágenes/Pokémon Primera generación/Pikachu.jpg' },
        { name: 'Charizard', image: '/Imágenes/Pokémon Primera generación/Charizard.jpg' },
        { name: 'Eevee', image: '/Imágenes/Pokémon Primera generación/Eevee.jpg' },
        { name: 'Bulbasaur', image: '/Imágenes/Pokémon Primera generación/Bulbasaur.jpg' },
        { name: 'Squirtle', image: '/Imágenes/Pokémon Primera generación/Squirtle.jpg' },
        { name: 'Mew', image: '/Imágenes/Pokémon Primera generación/Mew.jpg' },
        { name: 'Pidgey', image: '/Imágenes/Pokémon Primera generación/Pidgey.jpg' },
        { name: 'Ditto', image: '/Imágenes/Pokémon Primera generación/Ditto.jpg' },
        { name: 'Ivysaur', image: '/Imágenes/Pokémon Primera generación/Ivysaur.jpg' },
        { name: 'Venusaur', image: '/Imágenes/Pokémon Primera generación/Venusaur.jpg' },
        { name: 'Charmander', image: '/Imágenes/Pokémon Primera generación/Charmander.jpg' },
        { name: 'Charmeleon', image: '/Imágenes/Pokémon Primera generación/Charmeleon.jpg' },
        { name: 'Wartortle', image: '/Imágenes/Pokémon Primera generación/Wartortle.jpg' },
        { name: 'Blastoise', image: '/Imágenes/Pokémon Primera generación/Blastoise.jpg' },
        { name: 'Caterpie', image: '/Imágenes/Pokémon Primera generación/Caterpie.jpg' },
        { name: 'Metapod', image: '/Imágenes/Pokémon Primera generación/Metapod.jpg' },
        { name: 'Butterfree', image: '/Imágenes/Pokémon Primera generación/Butterfree.jpg' },
        { name: 'Weedle', image: '/Imágenes/Pokémon Primera generación/Weedle.jpg' },
        { name: 'Kakuna', image: '/Imágenes/Pokémon Primera generación/Kakuna.jpg' },
        { name: 'Beedrill', image: '/Imágenes/Pokémon Primera generación/Beedrill.jpg' },
        // Continúa con el resto de las opciones
    ],
    comidas: [
        { name: 'Pizza', image: 'Imágenes/Comidas/pizza' },
        { name: 'Hamburguesa', image: 'Imágenes/Comidas/hamburguesa' },
        // Añade las demás opciones
    ],
    equipos: [
        { name: 'Barcelona', image: 'Imágenes/Equipos/barcelona' },
        { name: 'Real Madrid', image: 'Imágenes/Equipos/realmadrid' },
        // Agrega los equipos restantes
    ]
};

const categoryNames = {
    pokemonprimera: 'Pokemon Primera Generación',
    comidas: 'Comidas',
    equipos: 'Equipos'
};

let currentRound = [];
let nextRound = [];
let voteCounts = {};
let selectedCategory = null;
let roundNumber = 1;
let finalRound = false;
let top10Finalists = [];
let allPairs = [];
let remainingMatches = 0;

function initializeCategories() {
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";
    for (let key in categoryNames) {
        const div = document.createElement("div");
        div.textContent = categoryNames[key];
        div.onclick = () => selectCategory(key);
        searchResults.appendChild(div);
    }
    searchResults.style.display = "block";
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
    searchResults.style.display = "block";
}

function selectCategory(key) {
    selectedCategory = key;
    currentRound = shuffleArray([...categories[key]]);
    document.getElementById("start-btn").disabled = false;
    document.getElementById("search-bar").value = categoryNames[key];
    document.getElementById("search-results").style.display = "none";
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    document.getElementById("category-selector").style.display = "none";
    document.getElementById("intro-message").style.display = "none";
    document.getElementById("game-area").style.display = "flex";
    voteCounts = {};
    roundNumber = 1;
    finalRound = false;
    remainingMatches = Math.ceil(currentRound.length / 2);
    updateRoundIndicator();
    displayNextPair();
}

function updateRoundIndicator() {
    document.getElementById("round-indicator").innerHTML = `<span>Ronda ${roundNumber}</span><br><small>Enfrentamientos pendientes: ${remainingMatches}</small>`;
}

function displayNextPair() {
    if (finalRound) {
        handleTop10Round();
        return;
    }
    if (currentRound.length < 2) {
        if (nextRound.length >= 10) {
            top10Finalists = nextRound.slice(0, 10);
            finalRound = true;
            startTop10Round();
            return;
        } else {
            declareWinner(nextRound[0].name);
            return;
        }
    }

    remainingMatches--;
    updateRoundIndicator();

    const [option1Data, option2Data] = [currentRound.pop(), currentRound.pop()];

    document.getElementById("option1").innerHTML = `<img src="${option1Data.image}.jpg" alt="${option1Data.name}"><p>${option1Data.name}</p>`;
    document.getElementById("option2").innerHTML = `<img src="${option2Data.image}.jpg" alt="${option2Data.name}"><p>${option2Data.name}</p>`;
    
    document.getElementById("option1").classList.remove("selected");
    document.getElementById("option2").classList.remove("selected");
}

function selectOption(optionId) {
    const selectedOption = document.getElementById(optionId).querySelector("p").textContent;
    voteCounts[selectedOption] = (voteCounts[selectedOption] || 0) + 1;
    nextRound.push(currentRound.find(option => option.name === selectedOption));
    document.getElementById(optionId).classList.add("selected");
    setTimeout(displayNextPair, 500);
}

function declareWinner(winner) {
    document.getElementById("game-area").style.display = "none";
    document.getElementById("round-indicator").style.display = "none";
    document.getElementById("top10").style.display = "block";
    document.getElementById("top-winner").innerHTML = `¡Tu Top N°1: <span class="highlight">${winner}</span>!`;
    displayRankings();
}

function startTop10Round() {
    document.getElementById("round-indicator").textContent = "¡Ronda del Top 10!";
    document.getElementById("round-indicator").classList.add("top10");
    currentRound = [...top10Finalists];
    nextRound = [];
    voteCounts = {};
    generateAllPairs();
    displayNextTop10Pair();
}

function generateAllPairs() {
    allPairs = [];
    for (let i = 0; i < top10Finalists.length; i++) {
        for (let j = i + 1; j < top10Finalists.length; j++) {
            if (!voteCounts[top10Finalists[i]] || !voteCounts[top10Finalists[j]] || !isTransitive(top10Finalists[i], top10Finalists[j])) {
                allPairs.push([top10Finalists[i], top10Finalists[j]]);
            }
        }
    }
    shuffleArray(allPairs);
    remainingMatches = allPairs.length;
}

function isTransitive(option1, option2) {
    return voteCounts[option1] && voteCounts[option1] > voteCounts[option2];
}

function displayNextTop10Pair() {
    if (allPairs.length === 0) {
        declareWinnerInTop10();
        return;
    }
    const [option1, option2] = allPairs.pop();
    remainingMatches--;
    updateRoundIndicator();
    document.getElementById("option1").textContent = option1;
    document.getElementById("option2").textContent = option2;
    document.getElementById("option1").classList.remove("selected");
    document.getElementById("option2").classList.remove("selected");
}

function declareWinnerInTop10() {
    document.getElementById("game-area").style.display = "none";
    document.getElementById("round-indicator").style.display = "none"; // Ocultar el indicador de ronda
    document.getElementById("top10").style.display = "block";
    displayRankings();
}

function displayRankings() {
    const rankings = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);
    const rankingsContainer = document.getElementById("rankings");
    rankingsContainer.innerHTML = "";

    const rankingTable = document.createElement("div");
    rankingTable.classList.add("ranking-table");

    rankings.slice(0, 10).forEach(([option], index) => {
        const div = document.createElement("div");
        div.classList.add("ranking-entry");
        div.textContent = `${index + 1}. ${option}`;
        rankingTable.appendChild(div);
    });

    rankingsContainer.appendChild(rankingTable);
}

function resetGame() {
    document.getElementById("top10").style.display = "none";
    document.getElementById("category-selector").style.display = "block";
    document.getElementById("intro-message").style.display = "block"; // Volver a mostrar mensaje introductorio
    document.getElementById("start-btn").disabled = true;
    document.getElementById("round-indicator").style.display = "none";
    document.getElementById("game-area").style.display = "none";
    document.getElementById("rankings").innerHTML = "";
    document.getElementById("search-bar").value = "";
    initializeCategories();
}
