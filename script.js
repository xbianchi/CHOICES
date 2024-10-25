const categories = {
    pokemonprimera: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew'],
    comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos', 'Sushi', 'Pollo asado', 'Sopa'],
    rupaulDownUnder: ['Anita Wigl\'it', 'Art Simone', 'Coco Jumbo', 'Electra Shock', 'Etcetera Etcetera', 'Jojo Zaho', 'Karen From Finance', 'Kita Mean', 'Maxi Shield', 'Scarlet Adams', 'Yvonne Lamay', 'Aubrey Haive', 'Beverly Kills', 'Hannah Conda', 'Kween Kong', 'Minnie Cooper', 'Molly Poppinz', 'Pomara Fifth', 'Spankie Jackzon'],
    // Más categorías...
};

let currentRound = [];
let nextRound = [];
let eliminated = [];
let isGameOver = false;
let voteCounts = {}; // Para contar las veces que una opción ha sido seleccionada
let selectedCategory = null;

// Función para habilitar el botón cuando se seleccione una categoría
function enableStartButton() {
    const category = document.getElementById('categories').value;
    const startBtn = document.getElementById('start-btn');
    if (category) {
        startBtn.disabled = false;
        selectedCategory = category; // Almacenar la categoría seleccionada
    }
}

// Función para iniciar el juego
function startGame() {
    if (selectedCategory && categories[selectedCategory]) {
        currentRound = [...categories[selectedCategory]];
        document.getElementById('game-area').style.display = 'flex';
        document.getElementById('category-selector').style.display = 'none';
        startNextMatch(); // Arranca el primer match
    }
}

// Selección de una opción
function selectOption(selectedOption) {
    const selectedText = document.getElementById(selectedOption).innerHTML;
    const otherOption = selectedOption === 'option1' ? document.getElementById('option2').innerHTML : document.getElementById('option1').innerHTML;

    nextRound.push(selectedText);
    eliminated.push(otherOption);

    // Contabilizar votos
    voteCounts[selectedText] = (voteCounts[selectedText] || 0) + 1;

    startNextMatch();
}

// Iniciar el siguiente enfrentamiento
function startNextMatch() {
    if (currentRound.length === 0) {
        if (nextRound.length === 1) {
            showWinner(nextRound[0]); // Mostrar el ganador
            return;
        }

        // Pasar a la siguiente ronda
        currentRound = [...nextRound];
        nextRound = [];
        document.getElementById('round-message').style.display = 'block';
        setTimeout(() => {
            document.getElementById('round-message').style.display = 'none';
            startNextMatch();
        }, 1000);
        return;
    }

    // Mostrar las siguientes dos opciones
    const option1 = document.getElementById('option1');
    const option2 = document.getElementById('option2');
    option1.innerHTML = currentRound.pop();
    option2.innerHTML = currentRound.pop();
}

// Mostrar el ganador
function showWinner(winner) {
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('winner-screen').style.display = 'block';
    document.getElementById('winner-name').innerHTML = winner;

    // Mostrar el Top 10
    displayTop10();
}

// Mostrar el Top 10 de opciones más votadas
function displayTop10() {
    const top10Container = document.getElementById('top10');
    const rankings = document.getElementById('rankings');
    const players = document.getElementById('players');

    // Limpiar los contenedores
    rankings.innerHTML = '';
    players.innerHTML = '';

    // Ordenar y limitar el Top 10
    const top10 = Object.entries(voteCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

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

// Reiniciar el juego
function resetGame() {
    currentRound = [];
    nextRound = [];
    eliminated = [];
    voteCounts = {};
    selectedCategory = null;
    document.getElementById('categories').selectedIndex = 0;
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('winner-screen').style.display = 'none';
    document.getElementById('top10').style.display = 'none';
    document.getElementById('category-selector').style.display = 'block';
    document.getElementById('start-btn').disabled = true;
}

