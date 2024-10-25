const categories = {
   pokemonprimera: ['Pikachu', 'Charizard', 'Eevee', 'Bulbasaur', 'Squirtle', 'Mew', 'Pidgey', 'Ditto', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran♀', 'Nidorina', 'Nidoqueen', 'Nidoran♂', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 'Magnemite', 'Magneton', 'Farfetch’d', 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo'],
            comidas: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos', 'Sushi', 'Pollo asado', 'Sopa', 'Burrito', 'Hot dog', 'Ramen', 'Falafel', 'Goulash', 'Fish and chips', 'Pad Thai', 'Chili', 'Ceviche', 'Steak', 'Paella', 'Macarrones con queso', 'Nachos', 'Lasagna', 'Crepes', 'Fajitas', 'Carne asada', 'Donas', 'Pollo al curry', 'Espagueti', 'Tortilla', 'Costillas', 'Muffins', 'Cazuela', 'Croissant', 'Galletas', 'Panqueques', 'Tarta de manzana', 'Cheesecake', 'Mousse de chocolate', 'Sándwich', 'Arroz frito', 'Cereal', 'Batido', 'Pudding', 'Churros', 'Waffles', 'Aros de cebolla'],
            equipos: ['Barcelona', 'Real Madrid', 'Manchester United', 'Liverpool', 'Bayern Múnich', 'Chelsea', 'Juventus', 'Paris Saint-Germain', 'Manchester City', 'Inter de Milán', 'AC Milan', 'Atlético de Madrid', 'Borussia Dortmund', 'Ajax', 'FC Porto', 'Benfica', 'Tottenham Hotspur', 'Arsenal', 'Lyon', 'Sevilla', 'Valencia', 'Boca Juniors', 'River Plate', 'San Lorenzo', 'Estudiantes', 'Gimnasia', 'Racing Club', 'Bayer Leverkusen', 'Roma', 'Napoli', 'West Ham United', 'Villarreal', 'Olympique de Marsella', 'Flamengo', 'Palmeiras', 'Santos', 'Tigres UANL', 'Club América', 'Chivas Guadalajara', 'Atlético Nacional', 'Peñarol', 'Nacional', 'Al Ahly', 'Zamalek', 'Sydney FC', 'Melbourne Victory', 'Los Angeles Galaxy', 'New York City FC', 'Seattle Sounders', 'Toronto FC', 'Shanghai SIPG', 'Guangzhou Evergrande'],
            rupaulUSA: ['Akashia', 'BeBe Zahara Benet', 'Jade Sotomayor', 'Nina Flowers', 'Ongina', 'Rebecca Glasscock', 'Shannel', 'Tammie Brown', 'Victoria "Porkchop" Parker', 'Jujubee', 'Pandora Boxx', 'Raven', 'Sahara Davenport', 'Sonique', 'Tatianna', 'Tyra Sanchez', 'Morgan McMichaels', 'Jessica Wild', 'Mystique Summers Madison', 'Nicole Paige Brooks', 'Shangela', 'Alexis Mateo', 'Carmen Carrera', 'Delta Work', 'India Ferrah', 'Manila Luzon', 'Mariah', 'Mimi Imfurst', 'Phoenix', 'Raja', 'Stacy Layne Matthews', 'Venus D-Lite', 'Yara Sofia', 'Chad Michaels', 'Dida Ritz', 'Jiggly Caliente', 'Kenya Michaels', 'Latrice Royale', 'Madame LaQueer', 'Milan', 'Phi Phi O\'Hara', 'Sharon Needles', 'The Princess', 'Willam', 'Alisa Summers', 'Lashauwn Beyond', 'Alaska', 'Alyssa Edwards', 'Coco Montrese', 'Detox', 'Honey Mahogany', 'Ivy Winters', 'Jade Jolie', 'Jinkx Monsoon', 'Lineysha Sparx', 'Monica Beverly Hillz', 'Penny Tration', 'Roxxxy Andrews', 'Serena ChaCha', 'Vivienne Pinay', 'Adore Delano', 'April Carrión', 'BenDeLaCreme', 'Bianca Del Rio', 'Courtney Act', 'Darienne Lake', 'Gia Gunn', 'Joslyn Fox', 'Kelly Mantle', 'Laganja Estranja', 'Magnolia Crawford', 'Milk', 'Trinity K. Bonet', 'Vivacious', 'Ginger Minj', 'Jasmine Masters', 'Jaidynn Diore Fierce', 'Kandy Ho', 'Katya', 'Kennedy Davenport', 'Max', 'Miss Fame', 'Mrs. Kasha Davis', 'Pearl', 'Sasha Belle', 'Tempest DuJour', 'Trixie Mattel', 'Violet Chachki', 'Bob the Drag Queen', 'Chi Chi DeVayne', 'Cynthia Lee Fontaine', 'Derrick Barry', 'Kim Chi', 'Laila McQueen', 'Naomi Smalls', 'Naysha Lopez', 'Robbie Turner', 'Thorgy Thor', 'Acid Betty', 'Dax ExclamationPoint', 'Aja', 'Alexis Michelle', 'Charlie Hides', 'Farrah Moan', 'Jaymes Mansfield', 'Nina Bo\'nina Brown', 'Peppermint', 'Sasha Velour', 'Shea Couleé', 'Trinity The Tuck', 'Kimora Blac', 'Valentina', 'Aquaria', 'Asia O\'Hara', 'Blair St. Clair', 'Dusty Ray Bottoms', 'Eureka O\'Hara', 'Kalorie Karbdashian-Williams', 'Kameron Michaels', 'Mayhem Miller', 'Miz Cracker', 'Monét X Change', 'Monique Heart', 'The Vixen', 'Vanessa Vanjie Mateo', 'Yuhua Hamasaki', 'A\'keria C. Davenport', 'Ariel Versace', 'Brooke Lynn Hytes', 'Honey Davenport', 'Kahanna Montrese', 'Mercedes Iman Diamond', 'Nina West', 'Plastique Tiara', 'Ra\'Jah O\'Hara', 'Scarlet Envy', 'Shuga Cain', 'Silky Nutmeg Ganache', 'Soju', 'Vanessa Vanjie Mateo', 'Yvie Oddly', 'Aiden Zhane', 'Brita', 'Crystal Methyd', 'Dahlia Sin', 'Gigi Goode', 'Heidi N Closet', 'Jackie Cox', 'Jaida Essence Hall', 'Jan', 'Nicky Doll', 'Rock M. Sakura', 'Sherry Pie', 'Widow Von\'Du', 'Denali', 'Elliott with 2 Ts', 'Gottmik', 'Joey Jay', 'Kahmora Hall', 'Kandy Muse', 'LaLa Ri', 'Olivia Lux', 'Rosé', 'Symone', 'Tamisha Iman', 'Tina Burner', 'Utica Queen', 'Alyssa Hunter', 'Angeria Paris VanMichaels', 'Bosco', 'Daya Betty', 'DeJa Skye', 'Jasmine Kennedie', 'Jorgeous', 'June Jambalaya', 'Kerri Colby', 'Kornbread Jeté', 'Lady Camden', 'Maddie Morphosis', 'Orion Story', 'Willow Pill', 'Amethyst', 'Anetra', 'Aura Mayari', 'Irene Dubois', 'Jax', 'Loosey LaDuca', 'Luxx Noir London', 'Malaysia Babydoll Foxx', 'Marcia Marcia Marcia', 'Mistress Isabelle Brooks', 'Princess Poppy', 'Robin Fierce', 'Salina EsTitties', 'Sasha Colby', 'Spice', 'Sugar'],
            rupaulUK: ['Baga Chipz', 'Blu Hydrangea', 'Cheryl Hole', 'Crystal', 'Divina De Campo', 'Gothy Kendoll', 'Scaredy Kat', 'Sum Ting Wong', 'Vinegar Strokes', 'The Vivienne', 'A\'Whora', 'Asttina Mandella', 'Bimini Bon-Boulash', 'Cherry Valentine', 'Ellie Diamond', 'Ginny Lemon', 'Joe Black', 'Lawrence Chaney', 'Sister Sister', 'Tayce', 'Tia Kofi', 'Anubis', 'Charity Kase', 'Choriza May', 'Elektra Fence', 'Ella Vaday', 'Krystal Versace', 'Kitty Scott-Claus', 'River Medway', 'Scarlett Harlett', 'Vanity Milan', 'Victoria Scone', 'Baby', 'Black Peppa', 'Cheddar Gorgeous', 'Copper Topp', 'Dakota Schiffer', 'Danny Beard', 'Jonbers Blonde', 'Just May', 'Le Fil', 'Pixie Polite', 'Sminty Drop', 'Starlet', 'Tamara Thomas', 'Banksie', 'Cara Melle', 'DeDeLicious', 'Ginger Johnson', 'Kate Butch', 'Michael Marouli', 'Tomara Thomas', 'Vicki Vivacious'],
            rupaulDownUnder: ['Anita Wigl\'it', 'Art Simone', 'Coco Jumbo', 'Electra Shock', 'Etcetera Etcetera', 'Jojo Zaho', 'Karen From Finance', 'Kita Mean', 'Maxi Shield', 'Scarlet Adams', 'Yvonne Lamay', 'Aubrey Haive', 'Beverly Kills', 'Hannah Conda', 'Kween Kong', 'Minnie Cooper', 'Molly Poppinz', 'Pomara Fifth', 'Spankie Jackzon'],
            rupaulHolland: ['ChelseaBoy', 'Envy Peru', 'Janey Jacké', 'Madame Madness', 'Ma\'MaQueen', 'Megan Schoonbrood', 'Patty Pam-Pam', 'Roem', 'Sederginne', 'Abby OMG', 'Juicy Kutoure', 'Ivy-Elyse', 'Love Masisi', 'My Little Puny', 'Reggy B', 'Tabitha', 'The Countess', 'Vanessa van Cartier', 'Vivaldi'],
            rupaulEspana: ['Arantxa Castilla-La Mancha', 'Carmen Farala', 'Dovima Nurmi', 'Drag Vulcano', 'Hugáceo Crujiente', 'Inti', 'Killer Queen', 'Pupi Poisson', 'Sagittaria', 'The Macarena', 'Ariel Rec', 'Estrella Xtravaganza', 'Jota Carajota', 'Marina', 'Onyx', 'Samantha Ballentines', 'Sharonne', 'Venedita Von Däsh', 'Vulcano', 'Chanel Anorex', 'Clover Bish', 'Drag Chuchi', 'Hornella Góngora', 'Kelly Roller', 'María Edilia', 'Paquita', 'Pitita', 'Pink Chadora', 'Vania Vainilla']
};

const categoryNames = {
    pokemonprimera: 'Pokemon Primera Generación',
    comidas: 'Comidas',
    rupaulDownUnder: 'RuPaul\'s Drag Race Down Under',
    equipos: 'Equipos',
    rupaulUSA: 'RuPaul\'s Drag Race: USA', 
    rupaulUK: 'RuPaul\'s Drag Race: UK', 
    rupaulHolland: 'RuPaul\'s Drag Race: Holland', 
    rupaulEspana: 'RuPaul\'s Drag Race: España'
};

let currentRound = [];
let nextRound = [];
let voteCounts = {};
let selectedCategory = null;
let roundNumber = 1;

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
    currentRound = [...categories[key]];
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
            declareWinner(nextRound[0]);
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

function declareWinner(winner) {
    document.getElementById("game-area").style.display = "none";
    document.getElementById("top10").style.display = "block";
    document.getElementById("top-winner").innerHTML = `¡Tu Top N°1: <span class="highlight">${winner}</span>!`;

    const rankings = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);
    const rankingsContainer = document.getElementById("rankings");
    rankingsContainer.innerHTML = "";
    rankings.slice(0, 10).forEach(([option], index) => {
        const div = document.createElement("div");
        div.textContent = `${index + 1}. ${option}`;
        rankingsContainer.appendChild(div);
    });
}

function resetGame() {
    document.getElementById("top10").style.display = "none";
    document.getElementById("category-selector").style.display = "block";
    document.getElementById("round-indicator").style.display = "none";
    document.getElementById("start-btn").disabled = true;
    document.getElementById("search-bar").value = "";
    initializeCategories();
}

initializeCategories();

