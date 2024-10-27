const categories = {
    pokemonprimera: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew', 'Pidgey', 'Ditto', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgeotto', 'Pidgeot', 'Rattata'],
    comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos', 'Sushi', 'Pollo asado', 'Sopa', 'Burrito', 'Hot dog', 'Ramen', 'Falafel', 'Goulash', 'Fish and chips', 'Pad Thai', 'Chili', 'Ceviche', 'Steak', 'Paella', 'Macarrones con queso', 'Nachos', 'Lasagna', 'Crepes', 'Fajitas', 'Carne asada', 'Donas', 'Pollo al curry', 'Espagueti', 'Tortilla', 'Costillas', 'Muffins', 'Cazuela', 'Croissant', 'Galletas', 'Panqueques', 'Tarta de manzana', 'Cheesecake', 'Mousse de chocolate', 'Sándwich', 'Arroz frito', 'Cereal', 'Batido', 'Pudding', 'Churros', 'Waffles', 'Aros de cebolla'],
    equipos: ['Barcelona', 'Real Madrid', 'Manchester United', 'Liverpool', 'Bayern Múnich', 'Chelsea', 'Juventus', 'Paris Saint-Germain', 'Manchester City', 'Inter de Milán', 'AC Milan', 'Atlético de Madrid', 'Borussia Dortmund', 'Ajax', 'FC Porto', 'Benfica', 'Tottenham Hotspur', 'Arsenal', 'Lyon', 'Sevilla', 'Valencia', 'Boca Juniors', 'River Plate', 'San Lorenzo', 'Estudiantes', 'Gimnasia', 'Racing Club', 'Bayer Leverkusen', 'Roma', 'Napoli', 'West Ham United', 'Villarreal', 'Olympique de Marsella', 'Flamengo', 'Palmeiras', 'Santos', 'Tigres UANL', 'Club América', 'Chivas Guadalajara', 'Atlético Nacional', 'Peñarol', 'Nacional', 'Al Ahly', 'Zamalek', 'Sydney FC', 'Melbourne Victory', 'Los Angeles Galaxy', 'New York City FC', 'Seattle Sounders', 'Toronto FC', 'Shanghai SIPG', 'Guangzhou Evergrande']
};

const categoryNames = {
    pokemonprimera: 'Pokemon Primera Generación',
    comidas: 'Comidas',
    equipos: 'Equipos'
};

let currentRound = [];
let nextRound = [];
let voteCounts = {};
let selectedCategory = null;
let roundNumber = 1;

// Inicializar categorías en el selector
function initializeCategories() {
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";
    for (let key in categoryNames) {
        const div = document.createElement("div");
        div.textContent = categoryNames[key];
        div.onclick = () => selectCategory(key);
        searchResults.appendChild(div);
    }
}

function filterCategories() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";
    for (let key in categoryNames) {
        if (categoryNames[key].toLowerCase().includes(query)) {
            const div = document.createElement("div");
            div.textContent = categoryNames[key];
            div.onclick = () => selectCategory(key);
            searchResults.appendChild(div);
        }
    }
    searchResults.style.display = query ? "block" : "none";
}

function toggleAllCategories() {
    const searchResults = document.getElementById("search-results");
    searchResults.style.display = searchResults.style.display === "block" ? "none" : "block";
}

function selectCategory(key) {
    selectedCategory = key;
    currentRound = shuffleArray([...categories[key]]);  // Mezclar al iniciar
    nextRound = [];
    document.getElementById("start-btn").disabled = false;
    document.getElementById("search-bar").value = categoryNames[key];
    document.getElementById("search-results").style.display = "none";
}

function startGame() {
    document.getElementById("category-selector").style.display = "none";
    document.getElementById("round-indicator").style.display = "block";
    document.getElementById("game-area").style.display = "flex";
    voteCounts = {};
    roundNumber = 1;
    document.getElementById("round-indicator").textContent = `Ronda ${roundNumber}`;
    displayNextPair();
}

function displayNextPair() {
    if (currentRound.length < 2) {
        if (nextRound.length === 1) {
            declareTop10();
            return;
        }
        currentRound = nextRound;
        nextRound = [];
        roundNumber++;
        document.getElementById("round-indicator").textContent = `Ronda ${roundNumber}`;
    }

    const [option1, option2] = [currentRound.pop(), currentRound.pop()];
    document.getElementById("option1").textContent = option1;
    document.getElementById("option2").textContent = option2;
    document.getElementById("option1").classList.remove("selected");
    document.getElementById("option2").classList.remove("selected");
    document.getElementById("round-message").style.display = "none";
}

function selectOption(optionId) {
    const selectedOption = document.getElementById(optionId).textContent;
    voteCounts[selectedOption] = (voteCounts[selectedOption] || 0) + 1;
    nextRound.push(selectedOption);
    document.getElementById(optionId).classList.add("selected");
    setTimeout(displayNextPair, 500);
}

function declareTop10() {
    document.getElementById("game-area").style.display = "none";
    document.getElementById("top10").style.display = "block";

    // Ordenar por votos para el Top 10
    const rankings = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);
    const rankingsContainer = document.getElementById("rankings");
    rankingsContainer.innerHTML = "";

    // Crear una ronda especial para distribuir puestos 1-10 de manera justa
    const top10 = rankings.slice(0, 10).map(([option]) => option);
    const finalRankings = conductFinalRound(top10);

    // Mostrar el Top 10 con medallas
    finalRankings.forEach((option, index) => {
        const div = document.createElement("div");
        let medal = "";
        if (index === 0) medal = "🥇 ";
        else if (index === 1) medal = "🥈 ";
        else if (index === 2) medal = "🥉 ";
        div.textContent = `${medal}${index + 1}. ${option}`;
        rankingsContainer.appendChild(div);
    });
}

function conductFinalRound(top10) {
    // Ronda especial para definir puestos entre las 10 mejores opciones
    let finalRankings = [...top10];
    for (let i = 0; i < top10.length; i++) {
        for (let j = i + 1; j < top10.length; j++) {
            const optionA = top10[i];
            const optionB = top10[j];
            if ((voteCounts[optionA] || 0) < (voteCounts[optionB] || 0)) {
                [finalRankings[i], finalRankings[j]] = [finalRankings[j], finalRankings[i]];
            }
        }
    }
    return finalRankings;
}

function resetGame() {
    document.getElementById("top10").style.display = "none";
    document.getElementById("category-selector").style.display = "block";
    document.getElementById("round-indicator").style.display = "none";
    document.getElementById("start-btn").disabled = true;
    document.getElementById("search-bar").value = "";
    initializeCategories();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Inicializar las categorías al cargar la página
initializeCategories();
