// Definir las categorías con los elementos
const categories = {
    pokemon: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew', 'Pidgey', 'Ditto'],
    comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos'],
    equipos: ['Barcelona', 'Real Madrid', 'Manchester United', 'Liverpool'],
    rupaulUSA: ['Akashia', 'BeBe Zahara Benet', 'Jade Sotomayor', 'Nina Flowers', 'Ongina', 'Rebecca Glasscock', 'Shannel', 'Tammie Brown', 'Victoria "Porkchop" Parker', 'Jujubee', 'Pandora Boxx', 'Raven', 'Sahara Davenport', 'Sonique', 'Tatianna', 'Tyra Sanchez', 'Morgan McMichaels', 'Jessica Wild', 'Mystique Summers Madison', 'Nicole Paige Brooks', 'Shangela', 'Alexis Mateo', 'Carmen Carrera', 'Delta Work', 'India Ferrah', 'Manila Luzon', 'Mariah', 'Mimi Imfurst', 'Phoenix', 'Raja', 'Stacy Layne Matthews', 'Venus D-Lite', 'Yara Sofia', 'Chad Michaels', 'Dida Ritz', 'Jiggly Caliente', 'Kenya Michaels', 'Latrice Royale', 'Madame LaQueer', 'Milan', 'Phi Phi O'Hara', 'Sharon Needles', 'The Princess', 'Willam', 'Alisa Summers', 'Lashauwn Beyond', 'Alaska', 'Alyssa Edwards', 'Coco Montrese', 'Detox', 'Honey Mahogany', 'Ivy Winters', 'Jade Jolie', 'Jinkx Monsoon', 'Lineysha Sparx', 'Monica Beverly Hillz', 'Penny Tration', 'Roxxxy Andrews', 'Serena ChaCha', 'Vivienne Pinay', 'Adore Delano', 'April Carrión', 'BenDeLaCreme', 'Bianca Del Rio', 'Courtney Act', 'Darienne Lake', 'Gia Gunn', 'Joslyn Fox', 'Kelly Mantle', 'Laganja Estranja', 'Magnolia Crawford', 'Milk', 'Trinity K. Bonet', 'Vivacious', 'Ginger Minj', 'Jasmine Masters', 'Jaidynn Diore Fierce', 'Kandy Ho', 'Katya', 'Kennedy Davenport', 'Max', 'Miss Fame', 'Mrs. Kasha Davis', 'Pearl', 'Sasha Belle', 'Tempest DuJour', 'Trixie Mattel', 'Violet Chachki', 'Bob the Drag Queen', 'Chi Chi DeVayne', 'Cynthia Lee Fontaine', 'Derrick Barry', 'Kim Chi', 'Laila McQueen', 'Naomi Smalls', 'Naysha Lopez', 'Robbie Turner', 'Thorgy Thor', 'Acid Betty', 'Dax ExclamationPoint', 'Aja', 'Alexis Michelle', 'Charlie Hides', 'Farrah Moan', 'Jaymes Mansfield', 'Nina Bo\'nina Brown', 'Peppermint', 'Sasha Velour', 'Shea Couleé', 'Trinity The Tuck', 'Kimora Blac', 'Valentina', 'Aquaria', 'Asia O\'Hara', 'Blair St. Clair', 'Dusty Ray Bottoms', 'Eureka O\'Hara', 'Kalorie Karbdashian-Williams', 'Kameron Michaels', 'Mayhem Miller', 'Miz Cracker', 'Monét X Change', 'Monique Heart', 'The Vixen', 'Vanessa Vanjie Mateo', 'Yuhua Hamasaki', 'A\'keria C. Davenport', 'Ariel Versace', 'Brooke Lynn Hytes', 'Honey Davenport', 'Kahanna Montrese', 'Mercedes Iman Diamond', 'Nina West', 'Plastique Tiara', 'Ra\'Jah O\'Hara', 'Scarlet Envy', 'Shuga Cain', 'Silky Nutmeg Ganache', 'Soju', 'Vanessa Vanjie Mateo', 'Yvie Oddly', 'Aiden Zhane', 'Brita', 'Crystal Methyd', 'Dahlia Sin', 'Gigi Goode', 'Heidi N Closet', 'Jackie Cox', 'Jaida Essence Hall', 'Jan', 'Nicky Doll', 'Rock M. Sakura', 'Sherry Pie (Descalificada)', 'Widow Von\'Du', 'Denali', 'Elliott with 2 Ts', 'Gottmik', 'Joey Jay', 'Kahmora Hall', 'Kandy Muse', 'LaLa Ri', 'Olivia Lux', 'Rosé', 'Symone', 'Tamisha Iman', 'Tina Burner', 'Utica Queen', 'Alyssa Hunter', 'Angeria Paris VanMichaels', 'Bosco', 'Daya Betty', 'DeJa Skye', 'Jasmine Kennedie', 'Jorgeous', 'June Jambalaya', 'Kerri Colby', 'Kornbread Jeté (Abandona)', 'Lady Camden', 'Maddie Morphosis', 'Orion Story', 'Willow Pill', 'Amethyst', 'Anetra', 'Aura Mayari', 'Irene Dubois', 'Jax', 'Loosey LaDuca', 'Luxx Noir London', 'Malaysia Babydoll Foxx', 'Marcia Marcia Marcia', 'Mistress Isabelle Brooks', 'Princess Poppy', 'Robin Fierce', 'Salina EsTitties', 'Sasha Colby', 'Spice', 'Sugar', 'Amanda Tori Meating', 'Geneva Karr', 'Hershii LiqCour-Jeté', 'Megami', 'Mirage', 'Mhi\'ya Iman Le\'Paige', 'Morphine Love Dion', 'Plane Jane', 'Plasma', 'Sapphira Cristál', 'Xunami Muse', 'Q', 'Dawn', 'Nymphia Wind'],
    rupaulUK: ['Baga Chipz', 'Blu Hydrangea', 'Cheryl Hole', 'Crystal', 'Divina De Campo',
  'Gothy Kendoll', 'Scaredy Kat', 'Sum Ting Wong', 'Vinegar Strokes', 'The Vivienne',
  'A\'Whora', 'Asttina Mandella', 'Bimini Bon-Boulash', 'Cherry Valentine',
  'Ellie Diamond', 'Ginny Lemon', 'Joe Black', 'Lawrence Chaney (Ganadora)',
  'Sister Sister', 'Tayce', 'Tia Kofi', 'Anubis', 'Charity Kase', 'Choriza May',
  'Elektra Fence', 'Ella Vaday', 'Krystal Versace (Ganadora)', 'Kitty Scott-Claus',
  'River Medway', 'Scarlett Harlett', 'Vanity Milan', 'Victoria Scone', 'Baby',
  'Black Peppa', 'Cheddar Gorgeous', 'Copper Topp', 'Dakota Schiffer',
  'Danny Beard (Ganadora)', 'Jonbers Blonde', 'Just May', 'Le Fil', 'Pixie Polite',
  'Sminty Drop', 'Starlet', 'Alexis Saint-Pete', 'Banksie', 'Cara Melle',
  'DeDeLicious', 'Ginger Johnson', 'Kate Butch', 'Michael Marouli',
  'Miss Naomi Carter', 'Tomara Thomas', 'Vicki Vivacious', 'Rileasa Slaves',
  'Kiki Snatch', 'Kyran Thrax', 'Actavia', 'Charra Tea', 'Chanel O\'Conor',
  'La Voix', 'Marmalade', 'Lill', 'Zahirah Zapanta', 'Dita Garbo', 'Saki Yew'],
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

    // Eliminar el elemento no seleccionado y pasarlo al final para permitir competencia
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
