const categories = {
    pokemonprimera: { displayName: 'Pokémon Primera Generación', items: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew', 'Pidgey'] },
    comidas: { displayName: 'Comidas', items: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos', 'Sushi', 'Pollo asado', 'Sopa'] },
    peliculas: { displayName: 'Películas', items: ['Titanic', 'Avatar', 'Matrix', 'Inception', 'Jurassic Park', 'El Padrino'] },
    canciones: { displayName: 'Canciones', items: ['Imagine', 'Bohemian Rhapsody', 'Smells Like Teen Spirit', 'Billie Jean', 'Hey Jude'] },
    colores: { displayName: 'Colores', items: ['Rojo', 'Azul', 'Verde', 'Amarillo', 'Rosa', 'Negro'] }
};

let selectedCategory = null;
let round = 1;
let currentOptions = [];
let selectedOptions = [];
let topSelections = [];

function filterCategories() {
    const searchValue = document.getElementById('search-bar').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
    
    const filteredCategories = Object.keys(categories).filter(category => 
        categories[category].displayName.toLowerCase().includes(searchValue)
    );

    if (filteredCategories.length > 0) {
        resultsContainer.style.display = 'block';
        filteredCategories.forEach(category => {
            const div = document.createElement('div');
            div.textContent = categories[category].displayName;
            div.onclick = () => selectCategory(category);
            resultsContainer.appendChild(div);
        });
    } else {
        resultsContainer.style.display = 'none';
    }
}

function toggleAllCategories() {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.style.display = resultsContainer.style.display === 'none' ? 'block' : 'none';
}

function selectCategory(category) {
    selectedCategory = category;
    document.getElementById('search-bar').value = categories[category].displayName;
    document.getElementById('start-btn').disabled = false;
    document.getElementById('search-results').style.display = 'none';
}

function startGame() {
    document.getElementById('round-indicator').style.display = 'block';
    document.getElementById('game-area').style.display = 'flex';
    document.getElementById('intro').style.display = 'none';
    document.getElementById('category-selector').style.display = 'none';
    updateRoundIndicator();
    showOptions();
}

function updateRoundIndicator() {
    document.getElementById('round-indicator').textContent = `Ronda ${round}`;
}

function showOptions() {
    const items = categories[selectedCategory].items;
    currentOptions = getRandomOptions(items);
    
    document.getElementById('option1').textContent = currentOptions[0];
    document.getElementById('option2').textContent = currentOptions[1];
}

function getRandomOptions(items) {
    let options = [];
    while (options.length < 2) {
        const option = items[Math.floor(Math.random() * items.length)];
        if (!options.includes(option)) options.push(option);
    }
    return options;
}

function selectOption(optionId) {
    const selectedOption = document.getElementById(optionId).textContent;
    selectedOptions.push(selectedOption);
    
    if (round < 5) {
        round++;
        updateRoundIndicator();
        showOptions();
    } else {
        displayTopSelections();
    }
}

function displayTopSelections() {
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('round-indicator').style.display = 'none';
    
    const top10Container = document.getElementById('top10');
    top10Container.style.display = 'block';

    selectedOptions.forEach((option, index) => {
        const div = document.createElement('div');
        div.textContent = `${index + 1}. ${option}`;
        document.getElementById('rankings').appendChild(div);
    });

    document.getElementById('top-winner').textContent = `Tu ganador: ${selectedOptions[0]}`;
}

function resetGame() {
    document.getElementById('top10').style.display = 'none';
    document.getElementById('intro').style.display = 'block';
    document.getElementById('category-selector').style.display = 'flex';
    document.getElementById('round-indicator').style.display = 'none';
    
    selectedCategory = null;
    round = 1;
    selectedOptions = [];
    document.getElementById('search-bar').value = '';
    document.getElementById('start-btn').disabled = true;
    document.getElementById('rankings').innerHTML = '';
}
