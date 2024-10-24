// Definir las categorías con los elementos
const categories = {
    pokemon: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur'],
    comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos'],
    equipos_futbol: ['Real Madrid', 'Barcelona', 'Manchester United', 'Bayern Munich', 'River Plate', 'Boca Juniors', 'Juventus', 'Paris Saint-Germain'],
    rupaul_usa: ['Bianca Del Rio', 'Sharon Needles', 'Jinkx Monsoon', 'Violet Chachki', 'Sasha Velour', 'Aquaria', 'Symone'],
    rupaul_uk: ['The Vivienne', 'Lawrence Chaney', 'Bimini Bon-Boulash', 'Tayce', 'Ella Vaday'],
    rupaul_downunder: ['Art Simone', 'Kita Mean', 'Anita Wigl\'it', 'Etcetera Etcetera'],
    rupaul_holanda: ['Envy Peru', 'Janey Jacké', 'Sederginne', 'ChelseaBoy'],
    rupaul_españa: ['Carmen Farala', 'Killer Queen', 'Hugáceo Crujiente', 'Sagittaria', 'Poopy Poison'],
    rupaul_todas: [
        'Bianca Del Rio', 'Sharon Needles', 'Jinkx Monsoon', 'Violet Chachki', 'Sasha Velour', 'Aquaria', 'Symone',
        'The Vivienne', 'Lawrence Chaney', 'Bimini Bon-Boulash', 'Tayce', 'Ella Vaday',
        'Art Simone', 'Kita Mean', 'Anita Wigl\'it', 'Etcetera Etcetera',
        'Envy Peru', 'Janey Jacké', 'Sederginne', 'ChelseaBoy',
        'Carmen Farala', 'Killer Queen', 'Hugáceo Crujiente', 'Sagittaria', 'Poopy Poison'
    ]
};

// Variables globales para manejar el estado del juego
let currentCategory = [];
let round = [];

// Función para iniciar el juego con la categoría seleccionada
function startGame() {
    const categorySelect = document.getElementById('categories');
    const selectedCategory = categorySelect.value;

    // Cargar la categoría seleccionada
    currentCategory = [...categories[selectedCategory]];

    // Ocultar el selector de categoría y mostrar el área de juego
    document.getElementById('category-selector').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';

    // Iniciar la primera ronda
    showNextRound();
}

// Función para mostrar dos opciones al azar
function showNextRound() {
    if (currentCategory.length < 2) {
        endGame();  // Llamar a la función para finalizar el juego
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
    const eliminatedIndex = choice === 0 ? 1 : 0;
    const eliminatedItem = round[eliminatedIndex];

    // Eliminar el elemento no seleccionado
    currentCategory = currentCategory.filter(item => item !== eliminatedItem);

    // Mostrar la siguiente ronda
    showNextRound();
}

// Función para manejar el fin del juego
function endGame() {
    document.getElementById('option1').style.display = 'none';
    document.getElementById('option2').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('result1').innerText = "¡Juego terminado!";
    document.getElementById('result2').innerText = "Gracias por jugar. Puedes reiniciar el juego.";
}

// Función para reiniciar el juego
function restartGame() {
    document.getElementById('category-selector').style.display = 'block';
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('option1').style.display = 'inline-block';
    document.getElementById('option2').style.display = 'inline-block';
    document.getElementById('results').style.display = 'none';
}

