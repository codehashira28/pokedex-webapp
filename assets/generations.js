class Pokemon {
    constructor(name, image, types, stats) {
        this.name = name;
        this.image = image;
        this.types = types;
        this.stats = stats;
    }
}

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
        console.error(err.message)
    }
}

const getGeneration = async (generation) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/generation/${generation}/`);
        const data = await response.json();
        const pokemonArr = data.pokemon_species;
        pokemonArr.forEach(async pokemon => {
            const pokemonName = pokemon.name;
            const pokeData = await getPokemonInfo(pokemonName);
            console.log(pokeData)
        })

    } catch (err) {
        console.error(err)
    }
    
}

const heading = document.getElementById('generation-heading');
heading.textContent = `Generation ${localStorage.getItem('generation')}`
const generationNumber = localStorage.getItem('generation');
getGeneration(generationNumber);