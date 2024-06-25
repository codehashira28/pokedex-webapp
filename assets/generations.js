import { pokemonObjects, getPokemonInfo } from "./utilities/getPokemonInfo.js";

// function to create the pokemon cards that will be displayed on the generation listing page

const createPokemonTag = ({ name, image, types}) => {
    let spans = "";
    types.forEach(type => {
        spans += `<span class="${name} py-1 px-2 mx-1 border rounded text-center text-light fw-bold fs-6 ${type}">${type}</span>`;
    })
    return `<div class="${name} card border-0 col">
                <a href="./pokemon.html" class="${name} border rounded shadow-sm poke-card bg-light">
                    <img src="${image}" alt="${name}" class="card-img-top" loading="lazy">
                    <div class="${name} text-center mt-3">
                        <h4 class="mb-4">${name.replace(name[0], name[0].toUpperCase())}</h4>
                        <p class="${name} lead d-flex flex-column align-items-center d-sm-block">
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

// function that saves the pokemon's information that was clicked

const savePokeInfo = (event) => {
    const target = event.target;
    let pokemonName;
    switch(target.tagName) {
        case 'IMG': 
            pokemonName = target.alt;
            break;
        
        case 'H4': 
            pokemonName = target.textContent.toLowerCase();
            break;
        
        default: {
            pokemonName = target.classList[0];
        }
    }
    const pokeObj = pokemonObjects[pokemonName]
    if(pokeObj) localStorage.setItem('pokemon', JSON.stringify(pokeObj));
}

const heading = document.getElementById('generation-heading');
const generationNumber = localStorage.getItem('generation');
heading.textContent = `Generation ${localStorage.getItem('generation')}`
document.querySelector('#pokemon-list').addEventListener("click", savePokeInfo)
printGeneration(generationNumber);