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

function enableStartButton() {
    const category = document.getElementById('categories').value;
    const startBtn = document.getElementById('start-btn');
    startBtn.disabled = !category;
    selectedCategory = category;
}

function startGame() {
    if (selectedCategory && categories[selectedCategory]) {
        currentRound = [...categories[selectedCategory]];
        document.getElementById('game-area').style.display = 'flex';
        document.getElementById('category-selector').style.display = 'none';
        startNextMatch();
    }
}

function selectOption(selectedOption) {
    const selectedText = document.getElementById(selectedOption).innerHTML;
    const otherOption = selectedOption === 'option1' ? document.getElementById('option2').innerHTML : document.getElementById('option1').innerHTML;
    nextRound.push(selectedText);
    eliminated.push(otherOption);
    voteCounts[selectedText] = (voteCounts[selectedText] || 0) + 1;
    startNextMatch();
}

function startNextMatch() {
    if (currentRound.length < 2) {
        if (nextRound.length === 1) {
            showWinner(nextRound[0]);
            return;
        } else if (nextRound.length > 1) {
            currentRound = [...nextRound];
            nextRound = [];
            document.getElementById('round-message').style.display = 'block';
            setTimeout(() => {
                document.getElementById('round-message').style.display = 'none';
                startNextMatch();
            }, 1000);
            return;
        }
    }
    const option1 = document.getElementById('option1');
    const option2 = document.getElementById('option2');
    option1.innerHTML = currentRound.pop();
    option2.innerHTML = currentRound.pop();
}

function showWinner(winner) {
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('winner-screen').style.display = 'block';
    document.getElementById('winner-name').innerHTML = winner;
    displayTop10();
}

function displayTop10() {
    const top10Container = document.getElementById('top10');
    const rankings = document.getElementById('rankings');
    const players = document.getElementById('players');
    rankings.innerHTML = '';
    players.innerHTML = '';
    const top10 = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
    top10.forEach((entry, index) => {
        const rank = document.createElement('div');
        const player = document.createElement('div');
        rank.textContent = `#${index + 1} - ${entry[1]} votos`;
        player.textContent = entry[0];
        rankings.appendChild(rank);
        players.appendChild(player);
    });
    top10Container.style.display = 'block';
}

function resetGame() {
    currentRound = [];
    nextRound = [];
    eliminated = [];
    voteCounts = {};
    selectedCategory = null;
    document.getElementById('categories').value = '';
    document.getElementById('category-selector').style.display = 'block';
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('winner-screen').style.display = 'none';
    document.getElementById('top10').style.display = 'none';
}
