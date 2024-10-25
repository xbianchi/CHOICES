let selectedCategory = [];
let currentRound = [];
let winners = [];
let roundCount = 0;
let categoryChosen = false;

function filterCategories() {
    const searchInput = document.getElementById("search-bar").value.toLowerCase();
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";

    for (const category in categories) {
        if (category.toLowerCase().includes(searchInput)) {
            const resultItem = document.createElement("div");
            resultItem.textContent = category;
            resultItem.onclick = () => {
                selectCategory(category);
            };
            searchResults.appendChild(resultItem);
        }
    }

    searchResults.style.display = searchInput ? "block" : "none";
}

function selectCategory(category) {
    selectedCategory = [...categories[category]];
    document.getElementById("start-btn").disabled = false;
    document.getElementById("search-bar").value = category;
    document.getElementById("search-results").style.display = "none";
}

function toggleAllCategories() {
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";

    for (const category in categories) {
        const resultItem = document.createElement("div");
        resultItem.textContent = category;
        resultItem.onclick = () => {
            selectCategory(category);
        };
        searchResults.appendChild(resultItem);
    }

    searchResults.style.display = searchResults.style.display === "none" ? "block" : "none";
}

function startGame() {
    winners = [];
    currentRound = [...selectedCategory];
    roundCount = 0;
    document.getElementById("category-selector").style.display = "none";
    document.getElementById("game-area").style.display = "flex";
    document.getElementById("round-indicator").style.display = "block";
    nextRound();
}

function nextRound() {
    roundCount++;
    document.getElementById("round-indicator").textContent = `Ronda ${roundCount}`;

    if (currentRound.length === 1) {
        winners.push(currentRound[0]);
        if (winners.length === 1) {
            showTop10();
        } else {
            currentRound = [...winners];
            winners = [];
            shuffleArray(currentRound);
            document.getElementById("round-message").style.display = "block";
            setTimeout(() => {
                document.getElementById("round-message").style.display = "none";
                nextRound();
            }, 1000);
        }
    } else {
        displayOptions();
    }
}

function displayOptions() {
    shuffleArray(currentRound);
    const [option1, option2] = currentRound.splice(0, 2);
    document.getElementById("option1").textContent = option1;
    document.getElementById("option2").textContent = option2;
    document.getElementById("option1").dataset.value = option1;
    document.getElementById("option2").dataset.value = option2;
}

function selectOption(optionId) {
    const selectedOption = document.getElementById(optionId).dataset.value;
    winners.push(selectedOption);
    nextRound();
}

function showTop10() {
    winners.sort();
    document.getElementById("game-area").style.display = "none";
    document.getElementById("top10").style.display = "block";
    document.getElementById("top-winner").textContent = `Tu favorito es: ${winners[0]}`;
    const rankings = document.getElementById("rankings");
    rankings.innerHTML = "";
    winners.slice(0, 10).forEach((item, index) => {
        const rankingItem = document.createElement("div");
        rankingItem.textContent = `${index + 1}. ${item}`;
        rankings.appendChild(rankingItem);
    });
}

function resetGame() {
    document.getElementById("category-selector").style.display = "block";
    document.getElementById("game-area").style.display = "none";
    document.getElementById("top10").style.display = "none";
    document.getElementById("round-indicator").style.display = "none";
    document.getElementById("search-bar").value = "";
    document.getElementById("start-btn").disabled = true;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
