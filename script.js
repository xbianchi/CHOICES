const categories = {
    pokemonprimera: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew', 'Pidgey', 'Ditto', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill'],
    comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos', 'Sushi', 'Pollo asado', 'Sopa', 'Burrito', 'Hot dog', 'Ramen', 'Falafel', 'Goulash', 'Fish and chips'],
    equipos: ['Barcelona', 'Real Madrid', 'Manchester United', 'Liverpool', 'Bayern Múnich', 'Chelsea', 'Juventus', 'Paris Saint-Germain']
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
    searchResults.style.display = "block"; // Always show all categories on toggle
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

function toggleAllCategories() {
    const searchResults = document.getElementById("search-results");
    searchResults.style.display = searchResults.style.display === "block" ? "none" : "block";
}

function selectCategory(key) {
    selectedCategory = key;
    currentRound = shuffleArray([...categories[key]]);
    nextRound = [];
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
    document.getElementById("round-indicator").style.display = "block";
    document.getElementById("game-area").style.display = "flex";
    voteCounts = {};
    roundNumber = 1;
    finalRound = false;
    remainingMatches = Math.ceil(currentRound.length / 2);
    document.getElementById("round-indicator").textContent = `Ronda ${roundNumber}`;
    document.getElementById("remaining-matches").style.display = "block";
    document.getElementById("remaining-matches").textContent = `Enfrentamientos pendientes: ${remainingMatches}`;
    displayNextPair();
}

function displayNextPair() {
    if (finalRound) {
        handleTop10Round();
        return;
    }
    if (currentRound.length < 2) {
        if (nextRound.length === 10) {
            top10Finalists = [...nextRound];
            finalRound = true;
            startTop10Round();
            return;
        }
        declareWinner(nextRound[0]);
        return;
    }
    remainingMatches--;
    document.getElementById("remaining-matches").textContent = `Enfrentamientos pendientes: ${remainingMatches}`;
    const [option1, option2] = [currentRound.pop(), currentRound.pop()];
    document.getElementById("option1").textContent = option1;
    document.getElementById("option2").textContent = option2;
    document.getElementById("option1").classList.remove("selected");
    document.getElementById("option2").classList.remove("selected");
}

function selectOption(optionId) {
    const selectedOption = document.getElementById(optionId).textContent;
    voteCounts[selectedOption] = (voteCounts[selectedOption] || 0) + 1;
    if (finalRound) {
        document.getElementById(optionId).classList.add("selected");
        setTimeout(displayNextTop10Pair, 500);
    } else {
        nextRound.push(selectedOption);
        document.getElementById(optionId).classList.add("selected");
        setTimeout(displayNextPair, 500);
    }
}

function declareWinner(winner) {
    document.getElementById("game-area").style.display = "none";
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
            if (!voteCounts[top10Finalists[i]] || !voteCounts[top10Finalists[j]] || 
                !isTransitive(top10Finalists[i], top10Finalists[j])) {
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
    document.getElementById("remaining-matches").textContent = `Enfrentamientos pendientes: ${remainingMatches}`;
    document.getElementById("option1").textContent = option1;
    document.getElementById("option2").textContent = option2;
    document.getElementById("option1").classList.remove("selected");
    document.getElementById("option2").classList.remove("selected");
}

function declareWinnerInTop10() {
    document.getElementById("game-area").style.display = "none";
    document.getElementById("intro").style.display = "none";  // Hide intro message
    document.getElementById("final-message").textContent = "¡Gracias por jugar! Aquí está tu Top 10:";
    displayRankings();
}

function displayRankings() {
    const rankings = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);
    const rankingsContainer = document.getElementById("rankings");
    rankingsContainer.innerHTML = "";  // Clear previous content

    const rankingTable = document.createElement("div");
    rankingTable.classList.add("ranking-table");

    rankings.slice(0, 10).forEach(([option], index) => {
        const div = document.createElement("div");
        div.classList.add("ranking-entry");
        div.textContent = `${index + 1}. ${option}`;
        rankingTable.appendChild(div);
    });

    rankingsContainer.appendChild(rankingTable);  // Add the table to the container

    // Display the top winner inside the pink box
    document.getElementById("top-winner").textContent = rankings[0][0];
}

function resetGame() {
    document.getElementById("top10").style.display = "none";
    document.getElementById("category-selector").style.display = "block";
    document.getElementById("start-btn").disabled = true;
    document.getElementById("round-indicator").style.display = "none";
    document.getElementById("game-area").style.display = "none";
    document.getElementById("rankings").innerHTML = "";
    document.getElementById("final-message").textContent = "";  // Clear final message
    document.getElementById("search-bar").value = "";
    initializeCategories();
}
