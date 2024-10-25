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

document.getElementById('search-bar').addEventListener('input', filterCategories);

function filterCategories() {
    const searchValue = document.getElementById('search-bar').value.toLowerCase();
    const categoriesDropdown = document.getElementById('categories');
    Array.from(categoriesDropdown.options).forEach(option => {
        option.style.display = option.value && option.textContent.toLowerCase().includes(searchValue) ? 'block' : 'none';
    });
}

function enableStartButton() {
    const category = document.getElementById('categories').value;
    const startBtn = document.getElementById('start-btn');
    startBtn.disabled = !category;
    selectedCategory = category;
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
