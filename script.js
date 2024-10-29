const categories = {
    pokemonprimera: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew', 'Pidgey', 'Ditto', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Wartortle', 'Blastoise', 'Caterpie'],
    colores: ['Rojo', 'Azul', 'Verde', 'Amarillo', 'Naranja', 'Violeta', 'Rosa', 'Negro', 'Blanco', 'Gris', 'Turquesa', 'Beige', 'Fucsia', 'Marrón', 'Cian', 'Ocre'],
    animales: ['Perro', 'Gato', 'Caballo', 'Elefante', 'Tigre', 'Oso', 'Conejo', 'Delfín', 'Zorro', 'Águila', 'Panda', 'Jirafa', 'León', 'Cebra', 'Camello'],
};

let selectedCategory = [];
let remainingOptions = [];
let top10Mode = false;
let round = 0;
let totalRounds;
let selectedCount = 0;

function filterCategories() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    Object.keys(categories).forEach((category) => {
        if (category.includes(searchTerm)) {
            const option = document.createElement('div');
            option.textContent = category;
            option.onclick = () => selectCategory(category);
            searchResults.appendChild(option);
        }
    });

    searchResults.style.display = searchTerm ? 'block' : 'none';
}

function selectCategory(category) {
    selectedCategory = categories[category];
    remainingOptions = [...selectedCategory];
    localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));
    document.getElementById('start-btn').disabled = false;
}

function startGame() {
    if (remainingOptions.length === 0) return;
    document.getElementById('category-selector').style.display = 'none';
    document.getElementById('game-area').style.display = 'flex';
    totalRounds = remainingOptions.length - 1;
    document.getElementById('round-indicator').style.display = 'block';
    updateProgressBar();
    displayOptions();
}

function displayOptions() {
    const randomOptions = remainingOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
    document.getElementById('option1').textContent = randomOptions[0];
    document.getElementById('option2').textContent = randomOptions[1];
}

function selectOption(selectedId) {
    const selectedOption = document.getElementById(selectedId).textContent;
    remainingOptions = remainingOptions.filter(option => option !== selectedOption);
    localStorage.setItem('remainingOptions', JSON.stringify(remainingOptions));
    
    if (remainingOptions.length <= 10) {
        top10Mode = true;
        showTop10();
    } else {
        round++;
        selectedCount++;
        updateProgressBar();
        displayOptions();
    }
}

function showTop10() {
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('top10').style.display = 'block';
    const rankings = document.getElementById('rankings');
    rankings.innerHTML = '';

    remainingOptions.forEach((option, index) => {
        const rankDiv = document.createElement('div');
        rankDiv.textContent = `${index + 1}. ${option}`;
        rankings.appendChild(rankDiv);
    });
}

function updateProgressBar() {
    const progress = (selectedCount / totalRounds) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('round-indicator').textContent = `Ronda ${round} de ${totalRounds}`;
}

function resetGame() {
    localStorage.clear();
    location.reload();
}

window.addEventListener('load', () => {
    if (localStorage.getItem('remainingOptions')) {
        remainingOptions = JSON.parse(localStorage.getItem('remainingOptions'));
        selectedCategory = JSON.parse(localStorage.getItem('selectedCategory'));
        totalRounds = selectedCategory.length - 1;
        round = totalRounds - remainingOptions.length + 1;
        selectedCount = totalRounds - remainingOptions.length;
        document.getElementById('category-selector').style.display = 'none';
        document.getElementById('game-area').style.display = 'flex';
        updateProgressBar();
        displayOptions();
    }
});
