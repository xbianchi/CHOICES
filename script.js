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
    if (selectedCategory && categories[selectedCategory]) {
        currentRound = [...categories[selectedCategory]];
        document.getElementById('game-area').style.display = 'flex';
        document.getElementById('category-selector').style.display = 'none';
        setTimeout(startNextMatch, 500);
    }
}

function selectOption(selectedOption) {
    const selectedText = document.getElementById(selectedOption).innerHTML;
    const otherOption = selectedOption === 'option1' ? document.getElementById('option2').innerHTML : document.getElementById('option1').innerHTML;
    nextRound.push(selectedText);
    eliminated.push(otherOption);
    startNextMatch();
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
    nextRound = [];
    currentRound = [];
}

function resetGame() {
    document.getElementById('winner-screen').style.display = 'none';
    document.getElementById('category-selector').style.display = 'block';
}
