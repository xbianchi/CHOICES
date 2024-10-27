const categories = {
    pokemonprimera: { displayName: 'Pokémon Primera Generación', items: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew', 'Pidgey'] },
    comidas: { displayName: 'Comidas', items: ['Pizza', 'Hamburguesa', 'Sushi', 'Tacos', 'Pasta', 'Helado'] }
};

let currentCategory = null;
let currentRound = 0;
let options = [];
let winnerOptions = [];

function filterCategories() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
    resultsContainer.style.display = 'block';

    Object.keys(categories).forEach(key => {
        const category = categories[key].displayName;
        if (category.toLowerCase().includes(query)) {
            const div = document.createElement('div');
            div.textContent = category;
            div.onclick = () => selectCategory(key);
            resultsContainer.appendChild(div);
        }
    });
}

function selectCategory(categoryKey) {
    currentCategory = categories[categoryKey];
    document.getElementById('search-bar').value = currentCategory.displayName;
    document.getElementById('start-btn').disabled = false;
    document.getElementById('search-results').style.display = 'none';
}

function toggleAllCategories() {
    const resultsContainer = document.getElementById('search-results');
    const toggleButton = document.getElementById('toggle-btn');
    const isExpanded = resultsContainer.style.display === 'block';

    resultsContainer.style.display = isExpanded ? 'none' : 'block';
    toggleButton.setAttribute('aria-expanded', !isExpanded);
}

function startGame() {
    if (!currentCategory) return;
    
    currentRound = 0;
    winnerOptions = [];
    options = [...currentCategory.items];
    
    document.getElementById('intro').style.display = 'none';
    document.getElementById('game-area').style.display = 'flex';
    document.getElementById('category-selector').style.display = 'none';
    document.getElementById('round-indicator').style.display = 'block';

    displayRound();
}

function displayRound() {
    if (options.length < 2) {
        if (winnerOptions.length > 1) {
            options = winnerOptions;
            winnerOptions = [];
            displayRoundMessage("¡Comienza la nueva ronda de ganadores!");
            return;
        }
        displayResults();
        return;
    }

    const [option1, option2] = options.splice(0, 2);

    document.getElementById('option1').textContent = option1;
    document.getElementById('option2').textContent = option2;
    document.getElementById('round-indicator').textContent = `Ronda ${++currentRound}`;
}

function selectOption(selected) {
    const chosenOption = document.getElementById(selected).textContent;
    winnerOptions.push(chosenOption);

    document.getElementById(selected).classList.add('selected');
    setTimeout(() => {
        document.getElementById(selected).classList.remove('selected');
        displayRound();
    }, 400);
}

function displayResults() {
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('round-indicator').style.display = 'none';
    document.getElementById('top10').style.display = 'block';

    const topWinner = winnerOptions[0];
    const rankingsDiv = document.getElementById('rankings');
    rankingsDiv.innerHTML = '';

    document.getElementById('top-winner').textContent = `🥇 ${topWinner} - ¡Tu favorito!`;

    winnerOptions.slice(1, 10).forEach((winner, index) => {
        const div = document.createElement('div');
        div.textContent = `#${index + 2} - ${winner}`;
        rankingsDiv.appendChild(div);
    });
}

function displayRoundMessage(message) {
    const messageElement = document.getElementById('round-message');
    messageElement.textContent = message;
    messageElement.style.display = 'block';

    setTimeout(() => messageElement.style.display = 'none', 1500);
    setTimeout(displayRound, 1500);
}

function resetGame() {
    document.getElementById('intro').style.display = 'block';
    document.getElementById('category-selector').style.display = 'block';
    document.getElementById('top10').style.display = 'none';
    document.getElementById('start-btn').disabled = true;
    document.getElementById('search-bar').value = '';
}
