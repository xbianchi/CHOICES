// Definir las categorías con los elementos
const categories = {
    pokemon: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur'],
    comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos'],
    // Agregar nuevas categorías aquí
    equipos: ['Real Madrid', 'Barcelona', 'Manchester United', 'Chelsea'],
    rupaulUSA: ['Bianca Del Rio', 'Alaska', 'Trixie Mattel', 'Bob The Drag Queen'],
    rupaulUK: ['The Vivienne', 'Bimini Bon-Boulash', 'Tayce', 'Lawrence Chaney'],
    rupaulDownUnder: ['Anita Wigl’it', 'Art Simone', 'Etcetera Etcetera', 'Karen From Finance'],
    rupaulHolland: ['Envy Peru', 'Janey Jacké', 'Mama Queen', 'Miss Abby OMG'],
    rupaulEspana: ['Carmen Farala', 'Sagittaria', 'Pupi Poisson', 'Killer Queen'],
    rupaulAll: ['Shangela', 'Jinkx Monsoon', 'Monet X Change', 'Shea Couleé', 'Raja']
};

// Variables globales para manejar el estado del juego
let currentCategory = [];
let round = [];
let selections = {};

// Función para iniciar el juego con la categoría seleccionada
function startGame() {
    const categorySelect = document.getElementById('categories');
    const selectedCategory = categorySelect.value;

    // Cargar la categoría seleccionada
    currentCategory = [...categories[selectedCategory]];

    // Inicializar contador de selecciones
    selections = {};

    // Ocultar el selector de categoría y mostrar el área de juego
    document.getElementById('category-selector').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';

    // Iniciar la primera ronda
    showNextRound();
}

// Función para mostrar dos opciones al azar
function showNextRound() {
    if (currentCategory.length < 2) {
        endGame();
        return;
    }

    // Seleccionar dos elementos al azar asegurando que no sean el mismo
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
    const selectedItem = round[choice];

    // Aumentar el contador de selecciones
    if (!selections[selectedItem]) {
        selections[selectedItem] = 0;
    }
    selections[selectedItem]++;

    // Eliminar el elemento no seleccionado
    currentCategory = currentCategory.filter(item => item !== round[choice === 0 ? 1 : 0]);

    // Mostrar la siguiente ronda
    showNextRound();
}

// Función para finalizar el juego y mostrar el Top 3
function endGame() {
    // Ocultar el área de juego
    document.getElementById('game-area').style.display = 'none';

    // Ordenar las selecciones por más elegidas
    const sortedSelections = Object.keys(selections).sort((a, b) => selections[b] - selections[a]);

    // Mostrar el Top 3
    const top3 = sortedSelections.slice(0, 3);
    document.getElementById('top3').innerHTML = `
        <h2>Este es tu Top 3:</h2>
        <p>1. ${top3[0] || 'N/A'}</p>
        <p>2. ${top3[1] || 'N/A'}</p>
        <p>3. ${top3[2] || 'N/A'}</p>
        <button onclick="restartGame()">Reiniciar Juego</button>
    `;

    document.getElementById('top3').style.display = 'block';
}

// Función para reiniciar el juego
function restartGame() {
    document.getElementById('top3').style.display = 'none';
    document.getElementById('category-selector').style.display = 'block';
}

