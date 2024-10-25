const categories = {
    pokemonprimera: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew'],
    comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos', 'Sushi', 'Pollo asado', 'Sopa'],
    equipos: ['River Plate', 'Boca Juniors', 'Real Madrid', 'Barcelona', 'Manchester United'],
    rupaulUSA: ['Bianca Del Rio', 'Bob The Drag Queen', 'Trixie Mattel', 'Sasha Velour', 'Alaska', 'Shangela'],
    rupaulUK: ['The Vivienne', 'Baga Chipz', 'Divina de Campo', 'Tayce', 'Lawrence Chaney', 'Bimini Bon Boulash'],
    rupaulDownUnder: ['Anita Wigl\'it', 'Art Simone', 'Coco Jumbo', 'Electra Shock', 'Etcetera Etcetera'],
    rupaulHolland: ['Envy Peru', 'Janey Jacké', 'Ma\'Ma Queen', 'ChelseaBoy', 'Miss Abby OMG'],
    rupaulEspana: ['Carmen Farala', 'Killer Queen', 'Sagittaria', 'Hugáceo Crujiente', 'Pupi Poisson'],
    rupaulAll: ['Bianca Del Rio', 'The Vivienne', 'Carmen Farala', 'Envy Peru', 'Lawrence Chaney']
};

let currentRound = [];
let nextRound = [];
let eliminated = [];
let voteCounts = {};
let selectedCategory = null;

function enableStartButton() {
    const startBtn = document.getElementById('start-btn');
    startBtn.disabled = !selectedCategory;
}

function filterCategories() {
    const input = document.getElementById('category-input').value.toLowerCase();
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';

    for (const [key, value] of Object.entries(categories)) {
        if (key.toLowerCase().includes(input)) {
            const item = document.createElement('div');
            item.textContent = key;
            item.onclick = () => selectCategory(key);
            categoryList.appendChild(item);
        }
    }
    categoryList.style.display = 'block';
}

function selectCategory(key) {
    selectedCategory = key;
    document.getElementById('category-input').value = key;
    document.getElementById('category-list').style.display = 'none';
    enableStartButton();
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
        } else {
            currentRound = [...nextRound];
            nextRound = [];
        }
    }

    const option1 = currentRound.pop();
    const option2 = currentRound.pop();

    document.getElementById('option1').innerHTML = option1;
    document.getElementById('option2').innerHTML = option2;
}

function showWinner(winner) {
    document.getElementById('winner-screen').style.display = 'block';
    document.getElementById('winner-name').innerText = winner;

    const sortedRankings = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);
    const rankingsContainer = document.getElementById('rankings');
    rankingsContainer.innerHTML = '';

    sortedRankings.slice(0, 10).forEach(([name, votes], index) => {
        const rankItem = document.createElement('div');
        rankItem.textContent = `${index + 1}. ${name}`;
        rankingsContainer.appendChild(rankItem);
    });

    document.getElementById('top10').style.display = 'block';
}

function resetGame() {
    currentRound = [];
    nextRound = [];
    eliminated = [];
    voteCounts = {};
    selectedCategory = null;

    document.getElementById('category-selector').style.display = 'block';
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('winner-screen').style.display = 'none';
    document.getElementById('top10').style.display = 'none';
    document.getElementById('category-input').value = '';
    document.getElementById('start-btn').disabled = true;
}
