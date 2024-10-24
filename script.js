// Definir las categorías con los elementos
const categories = {
    pokemon: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur'],
    comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos']
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
        alert('Juego terminado. ¡Gracias por jugar!');
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
