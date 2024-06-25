export const pokemonObjects = {};

export class Pokemon {
    constructor(name, image, types, stats) {
        this.name = name;
        this.image = image;
        this.types = types;
        this.stats = stats;
    }
}

// function to get a pokemon's image, types, and stats and returns them in a pokemon object

export const getPokemonInfo = async (pokemonName) => {
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
        pokemonObjects[pokemonName] = pokemon;
        return pokemon;
    } catch (err) {
        console.error("Error: ", err.message)
    }
}