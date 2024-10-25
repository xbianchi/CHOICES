const categories = {
    pokemonprimera: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew'],
    comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos', 'Sushi', 'Pollo asado', 'Sopa'],
    rupaulDownUnder: ['Anita Wigl\'it', 'Art Simone', 'Coco Jumbo', 'Electra Shock', 'Etcetera Etcetera', 'Jojo Zaho', 'Karen From Finance', 'Kita Mean', 'Maxi Shield', 'Scarlet Adams', 'Yvonne Lamay', 'Aubrey Haive', 'Beverly Kills', 'Hannah Conda', 'Kween Kong', 'Minnie Cooper', 'Molly Poppinz', 'Pomara Fifth', 'Spankie Jackzon']
};

let currentRound = [];
let nextRound = [];
let eliminated = [];
let voteCounts = {};
let selectedCategory = null;

const searchResultsContainer = document.getElementById('search-results');
const startBtn = document.getElementById('start-btn');
const searchBar = document.getElementById('search-bar');

function filterCategories() {
    const searchValue = searchBar.value.toLowerCase();
    searchResultsContainer.innerHTML = '';
    searchResultsContainer.style.display = 'none';

    for (let key in categories) {
        const categoryName = key.toLowerCase();
        if (categoryName.includes(searchValue)) {
            const categoryDiv = document.createElement('div');
            categoryDiv.innerText = key;
            categoryDiv.onclick = () => selectCategory(key);
            searchResultsContainer.appendChild(categoryDiv);
            searchResultsContainer.style.display = 'block';
        }
    }
}

function selectCategory(category) {
    selectedCategory = category;
    searchBar.value = category;
    startBtn.disabled = false;
    searchResultsContainer.style.display = 'none';
}

function startGame() {
    document.getElementById('category-selector').style.display = 'none';
    document.getElementById('game-area').style.display = 'flex';
    currentRound = categories[selectedCategory].slice();
    voteCounts = {};
    nextRound = [];
    eliminated = [];
    shuffleArray(currentRound);
    startNextMatch();
}

function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
}

function selectOption(selected) {
    const selectedText = document.getElementById(selected).innerHTML;
    const otherOption = selected === 'option1' ? 'option2' : 'option1';
    const otherText = document.getElementById(otherOption).innerHTML;

    if (!voteCounts[selectedText]) voteCounts[selectedText] = 0;
    voteCounts[selectedText]++;
    nextRound.push(selectedText);
    eliminated.push(otherText);
    setTimeout(() => startNextMatch(), 500);
}

function startNextMatch() {
    if (currentRound.length < 2 && nextRound.length > 1) {
        currentRound = [...nextRound];
        nextRound = [];
        document.getElementById('round-message').style.display = 'block';
        setTimeout(() => document.getElementById('round-message').style.display = 'none', 1000);
    }

    if (currentRound.length >= 2) {
        const [option1, option2] = currentRound.splice(0, 2);
        document.getElementById('option1').innerHTML = option1;
        document.getElementById('option2').innerHTML = option2;
    } else if (nextRound.length === 1) {
        showWinner();
    }
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
