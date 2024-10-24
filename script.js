// Definir las categorías con los elementos
const categories = {
    pokemon: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew', 'Pidgey', 'Ditto'],
    comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos'],
    equipos: ['Barcelona', 'Real Madrid', 'Manchester United', 'Liverpool'],
    rupaulUSA: ['Akashia', 'BeBe Zahara Benet', 'Jade Sotomayor', 'Nina Flowers', 'Ongina', /*... más queens */],
    rupaulUK: ['Baga Chipz', 'Blu Hydrangea', 'Cheryl Hole', 'Crystal', 'Divina De Campo', /*... más queens */],
    rupaulDownUnder: ['Queen1 Down Under', 'Queen2 Down Under', 'Queen3 Down Under', 'Queen4 Down Under'],
    rupaulHolland: ['Queen1 Holland', 'Queen2 Holland', 'Queen3 Holland', 'Queen4 Holland'],
    rupaulEspana: ['Queen1 España', 'Queen2 España', 'Queen3 España', 'Queen4 España'],
    rupaulAll: ['Queen1', 'Queen2', 'Queen3', 'Queen4', 'Queen5', 'Queen6'] // Todas las Queens
};

// Variables globales
let currentCategory = [];
let round = [];
let selectedItems = [];
let scoreMap = {};
let roundWinners = [];

// Función para iniciar el juego con la categoría seleccionada
function startGame() {
    const categorySelect = document.getElementById('categories');
    const selectedCategory = categorySelect.value;

    // Verificar si se seleccionó una categoría
    if (!selectedCategory) {
        alert('Por favor, selecciona una categoría antes de comenzar el juego.');
        return;
    }

    // Cargar la categoría seleccionada
    currentCategory = [...categories[selectedCategory]];
    selectedItems = [];

    // Inicializar el mapa de puntuaciones
    scoreMap = {};
    currentCategory.forEach(item => scoreMap[item] = 0);

    // Ocultar el selector de categoría y mostrar el área de juego
    document.getElementById('category-selector').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';

    // Iniciar la primera ronda
    showNextRound();
}

// Función para mostrar dos opciones al azar, asegurando que no se repitan inmediatamente
function showNextRound() {
    if (currentCategory.length < 2) {
        finishGame();
        return;
    }

    // Seleccionar dos elementos al azar asegurando que no se repitan en la ronda
    let index1 = Math.floor(Math.random() * currentCategory.length);
    let index2;
    do {
        index2 = Math.floor(Math.random() * currentCategory.length);
    } while (index1 === index2);

    // Guardar la ronda actual
    round = [currentCategory[index1], currentCategory[index2]];

    // Mostrar los dos elementos en las tarjetas
    document.getElementById('option1').innerText = round[0];
    document.getElementById('option2').innerText = round[1];

    // Asignar funciones de clic
    document.getElementById('option1').onclick = () => chooseOption(0);
    document.getElementById('option2').onclick = () => chooseOption(1);
}

// Función para manejar la elección
function chooseOption(choice) {
    const chosenItem = round[choice];
    const eliminatedItem = round[choice === 0 ? 1 : 0];

    // Incrementar la puntuación del elemento elegido
    scoreMap[chosenItem] += 1;
    selectedItems.push(chosenItem);

    // Eliminar el elemento no seleccionado
    currentCategory = currentCategory.filter(item => item !== eliminatedItem);
    if (currentCategory.length < 3) {
        roundWinners = [...selectedItems];
    }

    // Mostrar la siguiente ronda o terminar el juego si ya no hay suficientes elementos
    showNextRound();
}

// Función para finalizar el juego y mostrar el top 3
function finishGame() {
    // Ordenar los elementos seleccionados por su cantidad de elecciones
    const sortedItems = Object.keys(scoreMap).sort((a, b) => scoreMap[b] - scoreMap[a]);

    // Mostrar los tres primeros como el "Top 3"
    const top3Div = document.getElementById('top3');
    top3Div.innerHTML = `
        <h2>Este es tu Top 3:</h2>
        <p>1. ${sortedItems[0]}</p>
        <p>2. ${sortedItems[1]}</p>
        <p>3. ${sortedItems[2]}</p>
        <button onclick="restartGame()">Reiniciar Juego</button>
    `;
    top3Div.style.display = 'block';

    // Ocultar el área de juego
    document.getElementById('game-area').style.display = 'none';
}

// Función para reiniciar el juego
function restartGame() {
    document.getElementById('category-selector').style.display = 'block';
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('top3').style.display = 'none';
}

