class Pokemon {
    constructor(name, image, types, stats) {
        this.name = name;
        this.image = image;
        this.types = types;
        this.stats = stats;
    }
}

// function to get a pokemon's image, types, and stats and returns them in a pokemon object

const getPokemonInfo = async (pokemonName) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
        const data = await response.json();

            // get pokemon image url
        const imageType = 'official-artwork';
        const pokeImageUrl = data.sprites.other[imageType].front_default;

            // get pokemon types
        const types = data.types.map(typeObj => {
            return typeObj.type.name;
        })

            // get pokemon stats
        const stats = data.stats.map(statObj => {
            return `${statObj.stat.name}: ${statObj.base_stat}`;
        })
        
        const pokemon = new Pokemon(pokemonName, pokeImageUrl, types, stats);
        return pokemon;
    } catch (err) {
        console.error("Error: ", err.message)
    }
}

// function to create the pokemon card that will be listed on the generation listing page

const createPokemonTag = ({ name, image, types}) => {
    let spans = "";
    types.forEach(type => {
        spans += `<span class="py-1 px-2 mx-1 border rounded text-center text-light fw-bold fs-6 ${type}">${type}</span>`;
    })
    return `<div class="card border-0 col"><a href="./pokemon.html" class="border rounded shadow-sm poke-card bg-light">
                    <img src="${image}" alt="${name}" class="card-img-top">
                    <div class="text-center mt-3">
                        <h4 class="mb-4">${name.replace(name[0], name[0].toUpperCase())}</h4>
                        <p class="lead d-flex flex-column align-items-center d-sm-block">
                            ${spans}
                        </p>
                    </div>
                </a>
            </div>`
}

const loadingWheel = () => {
    return `<div class="spinner-container d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                </div>
            </div>`
}

// function that prints the entire generation list

const printGeneration = async (generationNumber) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/generation/${generationNumber}/`);
        const data = await response.json();
        const pokemonArr = data.pokemon_species;
        const pokemonlist = document.getElementById('pokemon-list');

        for(let i = 0; i < pokemonArr.length; ++i) {
            const pokemonName = pokemonArr[i].name;
            pokemonlist.insertAdjacentHTML("beforeend", loadingWheel());
            const pokeData = await getPokemonInfo(pokemonName);
            if(pokeData) {
                const pokemonTag = createPokemonTag(pokeData);
                pokemonlist.insertAdjacentHTML("beforeend", pokemonTag);
                
            }
            document.querySelector('.spinner-container').remove();
            
        }
    } catch (err) {
        console.error(err)
    }
    
}

const heading = document.getElementById('generation-heading');
heading.textContent = `Generation ${localStorage.getItem('generation')}`
const generationNumber = localStorage.getItem('generation');
printGeneration(generationNumber)