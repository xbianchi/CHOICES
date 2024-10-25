const categories = {
    pokemonprimera: ['Pikachu', 'Charizard', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew', 'Pidgey'],
    comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos', 'Sushi', 'Pollo asado', 'Sopa'],
    equipos: ['Barcelona', 'Real Madrid', 'Manchester United', 'Liverpool', 'Bayern'],
    rupaulUSA: ['Akashia', 'BeBe Zahara Benet', 'Jade Sotomayor', 'Nina Flowers'],
    rupaulUK: ['Baga Chipz', 'Blu Hydrangea', 'Cheryl Hole', 'Crystal', 'Divina De Campo'],
    rupaulDownUnder: ['Anita Wigl\'it', 'Art Simone', 'Coco Jumbo', 'Electra Shock'],
    rupaulHolland: ['ChelseaBoy', 'Envy Peru', 'Janey Jacké', 'Madame Madness']
};

const categoryNames = {
    pokemonprimera: 'Pokemon Primera Generación',
    comidas: 'Comidas',
    rupaulDownUnder: 'RuPaul\'s Drag Race Down Under',
    equipos: 'Equipos',
    rupaulUSA: 'RuPaul\'s Drag Race: USA', 
    rupaulUK: 'RuPaul\'s Drag Race: UK', 
    rupaulHolland: 'RuPaul\'s Drag Race: Holland', 
};

let currentRound = [];
let nextRound = [];
let voteCounts = {};
let selectedCategory = null;
let roundNumber = 1;
let top10Mode = false;

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

function startGame() {
    document.getElementById("category-selector").style.display = "none";
    document.getElementById("round-indicator").style.display = "block";
    document.getElementById("game-area").style.display = "flex";
    voteCounts = {};
    roundNumber = 1;
    document.getElementById("round-indicator").textContent = `Ronda ${roundNumber}`;
    displayNextPair();
}

function displayNextPair() {
    if (currentRound.length < 2) {
        if (nextRound.length <= 10 && nextRound.length > 0) {
            startTop10Ranking(nextRound);
            return;
        } else if (nextRound.length > 0) {
            currentRound = shuffleArray(nextRound);
            nextRound = [];
            roundNumber++;
            document.getElementById("round-indicator").textContent = `Ronda ${roundNumber}`;
        } else {
            declareWinner();
            return;
        }
    }

    let option1, option2;
    do {
        option1 = currentRound.pop();
        option2 = currentRound.pop();
    } while (option1 === option2 && currentRound.length > 0);

    if (!option1 || !option2) {
        declareWinner();
        return;
    }

    document.getElementById("option1").textContent = option1;
    document.getElementById("option2").textContent = option2;
    document.getElementById("option1").classList.remove("selected");
    document.getElementById("option2").classList.remove("selected");
    document.getElementById("round-message").style.display = "none";
}

function selectOption(optionId) {
    const selectedOption = document.getElementById(optionId).textContent;
    voteCounts[selectedOption] = (voteCounts[selectedOption] || 0) + 1;
    nextRound.push(selectedOption);
    document.getElementById(optionId).classList.add("selected");
    setTimeout(displayNextPair, 500);
}

function startTop10Ranking(finalists) {
    top10Mode = true;
    currentRound = [];
    nextRound = finalists;
    roundNumber++;
    document.getElementById("round-indicator").textContent = `Ronda Final: Top 10`;
    displayNextPair();
}

function declareWinner() {
    document.getElementById("game-area").style.display = "none";
    document.getElementById("top10").style.display = "block";

    const rankings = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);
    document.getElementById("top-winner").innerHTML = `¡Tu Top N°1: <span class="highlight">${rankings[0][0]}</span>!`;

    const rankingsContainer = document.getElementById("rankings");
    rankingsContainer.innerHTML = "";
    rankings.slice(0, 10).forEach(([option], index) => {
        const div = document.createElement("div");
        div.textContent = `${index + 1}. ${option}`;
        rankingsContainer.appendChild(div);
    });
}

function resetGame() {
    document.getElementById("top10").style.display = "none";
    document.getElementById("category-selector").style.display = "block";
    document.getElementById("round-indicator").style.display = "none";
    document.getElementById("start-btn").disabled = true;
    document.getElementById("search-bar").value = "";
    initializeCategories();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

initializeCategories();
