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
let originalCategoryList = [];

function enableStartButton() {
    const category = document.getElementById('categories').value;
    const startBtn = document.getElementById('start-btn');
    selectedCategory = normalizeCategory(category);
    startBtn.disabled = !categories[selectedCategory];
}

function normalizeCategory(category) {
    return category.toLowerCase().replace(/\s+/g, '');
}

function filterCategories() {
    const input = document.getElementById('categories').value.toLowerCase();
    const options = document.querySelectorAll("#category-list option");
    options.forEach(option => {
        option.style.display = option.value.toLowerCase().includes(input) ? "" : "none";
    });
}

function startGame() {
    if (selectedCategory && categories[selectedCategory]) {
        originalCategoryList = [...categories[selectedCategory]];
        currentRound = [...originalCategoryList];
        document.getElementById('game-area').style.display = 'flex';
        document.getElementById('category-selector').style.display = 'none';
        startNextMatch();
    } else {
        console.error("Categoría no seleccionada o no válida");
    }
}

function selectOption(selectedOption) {
    const selectedText = document.getElementById(selectedOption).innerHTML;
    const otherOption = selectedOption === 'option1' ? document.getElementById('option2').innerHTML : document.getElementById('option1').innerHTML;
    nextRound.push(selectedText);
    eliminated.push(otherOption);
    voteCounts[selectedText] = (voteCounts[selectedText] || 0) + 1;

    // Deshabilitar temporalmente las cartas
    document.getElementById('option1').style.pointerEvents = 'none';
    document.getElementById('option2').style.pointerEvents = 'none';

    setTimeout(() => {
        document.getElementById('option1').style.pointerEvents = 'auto';
        document.getElementById('option2').style.pointerEvents = 'auto';
        startNextMatch();
    }, 300);
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
    option1.classList.add('card-enter');
    option2.classList.add('card-enter');
    option1.innerHTML = currentRound.pop();
    option2.innerHTML = currentRound.pop();

    // Contador de rondas
    document.getElementById('round-counter').innerText = `Rondas restantes: ${Math.ceil(currentRound.length / 2)}`;
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
    rankings.innerHTML = '';

    const top10 = Object.entries(voteCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(entry => entry[0]);

    top10.forEach((name, index) => {
        const div = document.createElement('div');
        div.innerHTML = `${index + 1}. ${name}`;
        rankings.appendChild(div);
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
