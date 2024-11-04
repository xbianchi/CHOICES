const categories = {
    pokemonprimera: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew', 'Pidgey', 'Ditto', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill'],
    comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos', 'Sushi', 'Pollo asado', 'Sopa', 'Burrito', 'Hot dog', 'Ramen', 'Falafel', 'Goulash', 'Fish and chips'],
    equipos: ['Barcelona', 'Real Madrid', 'Manchester United', 'Liverpool', 'Bayern Múnich', 'Chelsea', 'Juventus', 'Paris Saint-Germain']
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
let finalRound = false;
let top10Finalists = [];
let allPairs = [];
let remainingMatches = 0;

function initializeCategories() { /* inicializar categorías */ }

function filterCategories() { /* lógica de filtro */ }

function toggleAllCategories() {
  const searchResults = document.getElementById("search-results");
  searchResults.style.display = searchResults.style.display === "block" ? "none" : "block";
}

function selectCategory(key) { /* seleccionar categoría */ }

function startGame() {
  document.getElementById("category-selector").style.display = "none";
  document.getElementById("round-indicator").style.display = "block";
  document.getElementById("game-area").style.display = "flex";
  voteCounts = {};
  roundNumber = 1;
  finalRound = false;
  document.getElementById("round-indicator").textContent = `Ronda ${roundNumber}`;
  remainingMatches = Math.floor(currentRound.length / 2);
  displayNextPair();
}

function displayNextPair() {
  if (finalRound) {
    handleTop10Round();
    return;
  }

  if (currentRound.length < 2) {
    if (nextRound.length === 10) {
      top10Finalists = [...nextRound];
      finalRound = true;
      startTop10Round();
      return;
    }
    declareWinner(nextRound[0]);
    return;
  }

  const [option1, option2] = [currentRound.pop(), currentRound.pop()];
  document.getElementById("option1").textContent = option1;
  document.getElementById("option2").textContent = option2;
  document.getElementById("option1").classList.remove("selected");
  document.getElementById("option2").classList.remove("selected");
}

function selectOption(optionId) {
  const selectedOption = document.getElementById(optionId).textContent;
  voteCounts[selectedOption] = (voteCounts[selectedOption] || 0) + 1;

  if (finalRound) {
    document.getElementById(optionId).classList.add("selected");
    setTimeout(displayNextTop10Pair, 500);
  } else {
    nextRound.push(selectedOption);
    document.getElementById(optionId).classList.add("selected");
    remainingMatches--;
    document.getElementById("round-indicator").textContent = `Ronda ${roundNumber} - Enfrentamientos restantes: ${remainingMatches}`;
    setTimeout(displayNextPair, 500);
  }
}

function declareWinner(winner) {
  document.getElementById("game-area").style.display = "none";
  document.getElementById("top10").style.display = "block";
  document.getElementById("top-winner").innerHTML = `¡Tu Top N°1: <span class="highlight">${winner}</span>!`;
  displayRankings();
}

function startTop10Round() {
  document.getElementById("round-indicator").textContent = "¡Ronda del Top 10!";
  document.getElementById("round-indicator").classList.add("top10");
  currentRound = [...top10Finalists];
  nextRound = [];
  voteCounts = {};
  generateAllPairs();
  remainingMatches = allPairs.length;
  displayNextTop10Pair();
}

function generateAllPairs() { /* genera todos los pares para el Top 10 */ }

function displayNextTop10Pair() {
  if (allPairs.length === 0) {
    declareWinnerInTop10();
    return;
  }

  const [option1, option2] = allPairs.pop();
  document.getElementById("option1").textContent = option1;
  document.getElementById("option2").textContent = option2;
  document.getElementById("option1").classList.remove("selected");
  document.getElementById("option2").classList.remove("selected");
}

function declareWinnerInTop10() { /* declaración del ganador en el Top 10 */ }

function displayRankings() { /* mostrar los rankings finales */ }

function resetGame() { /* reinicia el juego */ }
