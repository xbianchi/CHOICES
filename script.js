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

const searchResultsContainer = document.getElementById('search-results');
const startBtn = document.getElementById('start-btn');
const searchBar = document.getElementById('search-bar');

function filterCategories() {
    const searchValue = searchBar.value.toLowerCase();
    searchResultsContainer.innerHTML = '';
    searchResultsContainer.style.display = 'none';

    for (let key in categoryNames) {
        if (categoryNames[key].toLowerCase().includes(searchValue)) {
            const categoryDiv = document.createElement('div');
            categoryDiv.innerText = categoryNames[key];
            categoryDiv.onclick = () => selectCategory(key);
            searchResultsContainer.appendChild(categoryDiv);
            searchResultsContainer.style.display = 'block';
        }
    }
}

function selectCategory(category) {
    selectedCategory = category;
    searchBar.value = categoryNames[category];
    startBtn.disabled = false;
    searchResultsContainer.style.display = 'none';
}

function toggleAllCategories() {
    if (searchResultsContainer.style.display === 'block') {
        searchResultsContainer.style.display = 'none';
    } else {
        searchResultsContainer.innerHTML = '';
        for (let key in categoryNames) {
            const categoryDiv = document.createElement('div');
            categoryDiv.innerText = categoryNames[key];
            categoryDiv.onclick = () => selectCategory(key);
            searchResultsContainer.appendChild(categoryDiv);
        }
        searchResultsContainer.style.display = 'block';
    }
}

function startGame() {
    if (selectedCategory) {
        const items = categories[selectedCategory];
        currentRound = [...items];
        nextRound = [];
        voteCounts = items.reduce((acc, item) => ({ ...acc, [item]: 0 }), {});

        document.getElementById('category-selector').style.display = 'none';
        document.getElementById('game-area').style.display = 'flex';

        startRound();
    }
}

function startRound() {
    if (currentRound.length >= 2) {
        const [option1, option2] = currentRound.splice(0, 2);
        document.getElementById('option1').innerHTML = option1;
        document.getElementById('option2').innerHTML = option2;
    } else if (nextRound.length === 1) {
        showWinner();
    } else {
        currentRound = nextRound;
        nextRound = [];
        document.getElementById('round-message').style.display = 'block';
        setTimeout(() => document.getElementById('round-message').style.display = 'none', 800);
        startRound();
    }
}

function selectOption(option) {
    const chosenElement = document.getElementById(option);
    chosenElement.classList.add('selected');
    setTimeout(() => chosenElement.classList.remove('selected'), 150);

    const chosen = chosenElement.innerText;
    voteCounts[chosen]++;
    nextRound.push(chosen);

    startRound();
}

function showWinner() {
    const winner = nextRound[0];
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('winner-screen').style.display = 'block';
    document.getElementById('winner-name').innerText = winner;

    showTop10();
}

function showTop10() {
    const sortedVotes = Object.keys(voteCounts).sort((a, b) => voteCounts[b] - voteCounts[a]);
    const rankings = sortedVotes.slice(0, 10);
    const rankingsContainer = document.getElementById('rankings');
    rankingsContainer.innerHTML = '';
    rankings.forEach((name, i) => {
        const rankDiv = document.createElement('div');
        rankDiv.innerText = `${i + 1}. ${name}`;
        rankingsContainer.appendChild(rankDiv);
    });
    document.getElementById('top10').style.display = 'block';
}

function resetGame() {
    document.getElementById('winner-screen').style.display = 'none';
    document.getElementById('category-selector').style.display = 'block';
    document.getElementById('top10').style.display = 'none';
}
