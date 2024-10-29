const categories = {
    pokemonprimera: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew', 'Pidgey', 'Ditto', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgeotto', 'Pidgeot', 'Rattata'],
    comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos', 'Sushi', 'Pollo asado', 'Sopa', 'Burrito', 'Hot dog', 'Ramen', 'Falafel', 'Goulash', 'Fish and chips', 'Pad Thai', 'Chili', 'Ceviche'],
    equipos: ['Barcelona', 'Real Madrid', 'Manchester United', 'Liverpool', 'Bayern Múnich', 'Chelsea', 'Juventus', 'Paris Saint-Germain', 'Manchester City', 'Inter de Milán', 'AC']
};

const categoryNames = {
    pokemonprimera: 'Pokemon Primera Generación',
    comidas: 'Comidas',
    equipos: 'Equipos'
};

let currentRound = [];
let nextRound = [];
let voteCounts = JSON.parse(localStorage.getItem("voteCounts")) || {};
let selectedCategory = null;
let roundNumber = localStorage.getItem("roundNumber") || 1;
let finalRound = false;
let top10Finalists = JSON.parse(localStorage.getItem("top10Finalists")) || [];
let isTop10Round = localStorage.getItem("isTop10Round") === "true";
let progressBar = document.getElementById("progress-bar");

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

function selectCategory(key) {
    selectedCategory = key;
    currentRound = shuffleArray([...categories[key]]);
    nextRound = [];
    document.getElementById("start-btn").disabled = false;
    document.getElementById("search-bar").value = categoryNames[key];
    document.getElementById("search-results").style.display = "none";
    localStorage.setItem("selectedCategory", key);
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
    document.getElementById("round-indicator").textContent = `Ronda ${roundNumber}`;
    displayNextPair();
    localStorage.setItem("roundNumber", roundNumber);
}

function displayNextPair() {
    if (finalRound) {
        handleFinalRound();
        return;
    }
    if (currentRound.length < 2) {
        if (nextRound.length === 1 && !isTop10Round) {
            if (nextRound.length + Object.keys(voteCounts).length === 10) {
                top10Finalists = [...nextRound, ...Object.keys(voteCounts)];
                finalRound = true;
                startFinalRound();
                return;
            }
            declareWinner(nextRound[0]);
            return;
        }
        currentRound = nextRound;
        nextRound = [];
        roundNumber++;
        document.getElementById("round-indicator").textContent = `Ronda ${roundNumber}`;
    }

    const [option1, option2] = [currentRound.pop(), currentRound.pop()];
    document.getElementById("option1").textContent = option1;
    document.getElementById("option2").textContent = option2;
    updateProgressBar();
}

function selectOption(optionId) {
    const selectedOption = document.getElementById(optionId).textContent;
    voteCounts[selectedOption] = (voteCounts[selectedOption] || 0) + 1;
    nextRound.push(selectedOption);
    animateSelection(optionId);
    setTimeout(displayNextPair, 500);
    localStorage.setItem("voteCounts", JSON.stringify(voteCounts));
}

function startFinalRound() {
    document.getElementById("round-indicator").textContent = "Ronda Final: Top 10";
    currentRound = [...top10Finalists];
    nextRound = [];
    voteCounts = {};
    displayNextPair();
    localStorage.setItem("isTop10Round", true);
}

function declareWinner(winner) {
    document.getElementById("game-area").style.display = "none";
    document.getElementById("top10").style.display = "block";
    document.getElementById("top-winner").innerHTML = `¡Tu Top N°1: <span class="highlight">${winner}</span>!`;
    const rankings = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);
    const rankingsContainer = document.getElementById("rankings");
    rankingsContainer.innerHTML = "";
    rankings.slice(0, 10).forEach(([option], index) => {
        const div = document.createElement("div");
        div.textContent = `${index + 1}. ${option}`;
        rankingsContainer.appendChild(div);
    });
}

function handleFinalRound() {
    if (currentRound.length < 2) {
        declareWinnerInTop10();
        return;
    }

    const [option1, option2] = [currentRound.pop(), currentRound.pop()];
    document.getElementById("option1").textContent = option1;
    document.getElementById("option2").textContent = option2;
}

function declareWinnerInTop10() {
    document.getElementById("game-area").style.display = "none";
    document.getElementById("top10").style.display = "block";
    const rankings = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);
    const rankingsContainer = document.getElementById("rankings");
    rankingsContainer.innerHTML = "";
    rankings.slice(0, 10).forEach(([option], index) => {
        const div = document.createElement("div");
        div.textContent = `${index + 1}. ${option}`;
        rankingsContainer.appendChild(div);
    });
}

function updateProgressBar() {
    const progress = ((roundNumber - 1) / totalRounds) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${Math.floor(progress)}% completado`;
}

function animateSelection(optionId) {
    document.getElementById(optionId).classList.add("selected");
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    document.body.appendChild(confetti);
    setTimeout(() => {
        document.getElementById(optionId).classList.remove("selected");
        confetti.remove();
    }, 1000);
}

function resetGame() {
    document.getElementById("top10").style.display = "none";
    document.getElementById("category-selector").style.display = "block";
    document.getElementById("start-btn").disabled = true;
    document.getElementById("round-indicator").style.display = "none";
    document.getElementById("game-area").style.display = "none";
    document.getElementById("rankings").innerHTML = "";
    document.getElementById("search-bar").value = "";
    voteCounts = {};
    currentRound = [];
    nextRound = [];
    top10Finalists = [];
    roundNumber = 1;
    localStorage.clear();
    initializeCategories();
}

initializeCategories();
