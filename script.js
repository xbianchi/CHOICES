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
let voteCounts = {};
let selectedCategory = null;
let roundNumber = 1;
let finalRound = false;
let top10Finalists = [];
let totalRounds = 0;
let completedRounds = 0;

// Inicialización del selector de categorías
function filterCategories() {
    const searchBar = document.getElementById('search-bar').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    for (let category in categoryNames) {
        if (categoryNames[category].toLowerCase().includes(searchBar)) {
            const categoryDiv = document.createElement('div');
            categoryDiv.textContent = categoryNames[category];
            categoryDiv.onclick = () => selectCategory(category);
            resultsContainer.appendChild(categoryDiv);
        }
    }

    resultsContainer.style.display = searchBar ? 'block' : 'none';
}

function selectCategory(category) {
    selectedCategory = category;
    document.getElementById('start-btn').disabled = false;
}

function startGame() {
    if (!selectedCategory) return;

    currentRound = shuffle([...categories[selectedCategory]]);
    totalRounds = currentRound.length * (currentRound.length - 1) / 2;  // Total de enfrentamientos
    voteCounts = {};
    completedRounds = 0;

    document.getElementById('category-selector').style.display = 'none';
    document.getElementById('game-area').style.display = 'flex';
    document.getElementById('round-indicator').style.display = 'block';
    document.getElementById('progress-container').style.display = 'block';

    displayNextPair();
}

function displayNextPair() {
    if (currentRound.length < 2) {
        handleFinalRound();
        return;
    }

    const option1 = currentRound.shift();
    const option2 = currentRound.shift();

    document.getElementById('option1').textContent = option1;
    document.getElementById('option2').textContent = option2;
    document.getElementById('option1').classList.remove('selected');
    document.getElementById('option2').classList.remove('selected');

    document.getElementById('round-indicator').textContent = `Ronda ${roundNumber}`;
    updateProgress();
}

function selectOption(optionId) {
    const selectedOption = document.getElementById(optionId).textContent;
    document.getElementById(option1).classList.add('selected');
    document.getElementById(option2).classList.add('selected');

    voteCounts[selectedOption] = (voteCounts[selectedOption] || 0) + 1;
    nextRound.push(selectedOption);

    completedRounds++;
    updateProgress();

    setTimeout(() => {
        if (currentRound.length > 0) {
            displayNextPair();
        } else if (nextRound.length > 1) {
            startNewRound();
        } else {
            handleFinalRound();
        }
    }, 500);
}

function startNewRound() {
    currentRound = shuffle(nextRound);
    nextRound = [];
    roundNumber++;
    displayNextPair();
}

function handleFinalRound() {
    if (!finalRound) {
        finalRound = true;
        currentRound = Object.keys(voteCounts)
            .sort((a, b) => voteCounts[b] - voteCounts[a])
            .slice(0, 10);
        totalRounds = currentRound.length * (currentRound.length - 1) / 2;
        completedRounds = 0;
        nextRound = [];
        document.getElementById('round-message').style.display = 'block';
    }

    if (currentRound.length < 2) {
        showTop10();
        return;
    }

    const option1 = currentRound.shift();
    const option2 = currentRound.shift();

    document.getElementById('option1').textContent = option1;
    document.getElementById('option2').textContent = option2;
    document.getElementById('option1').classList.remove('selected');
    document.getElementById('option2').classList.remove('selected');
    document.getElementById('round-indicator').textContent = `Ronda Final`;

    updateProgress();
}

function showTop10() {
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('round-message').style.display = 'none';
    document.getElementById('top10').style.display = 'block';

    const sortedOptions = Object.keys(voteCounts).sort((a, b) => voteCounts[b] - voteCounts[a]);
    document.getElementById('top-winner').textContent = `Ganador: ${sortedOptions[0]}`;

    const rankings = document.getElementById('rankings');
    rankings.innerHTML = '';

    sortedOptions.slice(0, 10).forEach((option, index) => {
        const div = document.createElement('div');
        div.textContent = `${index + 1}. ${option}`;
        rankings.appendChild(div);
    });
}

function updateProgress() {
    const progressPercentage = Math.floor((completedRounds / totalRounds) * 100);
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('progress-text').textContent = `${progressPercentage}%`;
}

function resetGame() {
    selectedCategory = null;
    currentRound = [];
    nextRound = [];
    voteCounts = {};
    roundNumber = 1;
    finalRound = false;
    totalRounds = 0;
    completedRounds = 0;

    document.getElementById('category-selector').style.display = 'block';
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('top10').style.display = 'none';
    document.getElementById('progress-container').style.display = 'none';
    document.getElementById('round-indicator').style.display = 'none';
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
