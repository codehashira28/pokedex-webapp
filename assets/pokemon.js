import { getEvolutionCycle, getEvolutionImages } from "./utilities/getEvolutionInfo.js";
import { generateHistory } from "./utilities/generateHistory.js";

const displayTypes = (types) => {
    const typesContainer = document.getElementById("types");
    for(const type of types) {
        const span = document.createElement('span');
        span.textContent = `${type[0].toUpperCase()}${type.slice(1)}`;
        span.classList.add('me-2', 'rounded-pill', 'px-3', 'pb-1')
        span.style.backgroundColor = "rgb(255, 255, 255, 0.3)";
        typesContainer.insertAdjacentElement("beforeend", span);
    }
}

const displayStats = (stats) => {
    const statsListItems = new Array(...document.getElementsByClassName('stat'));
    statsListItems.forEach((li, index) => {
        li.insertAdjacentText("beforeend", stats[index].toUpperCase());
    })
}

const displayEvolutionCycle = async (pokemon) => {
    const cycle = await getEvolutionCycle(pokemon);
    const imageUrls = await getEvolutionImages(cycle);
    const evolutionCycleContainer = document.getElementById("evolution-cycle");
    cycle.forEach((pokemon, index) => {
        if(cycle.length == 1) {
            document.getElementById('condition').textContent = "This pokemon does not evolve.";
        }
        const pokemonContainer = `<div class="text-center lead mt-3">
                                    <div class="mx-auto border border-dark border-4 rounded-circle p-3 image-container" style="width: 60%;">
                                        <img src=${imageUrls[index]} alt=${pokemon} class="img-fluid" loading="lazy">
                                    </div>
                                    <p class="mt-3 fs-3">${pokemon[0].toUpperCase() + pokemon.slice(1)}</p>
                                  </div>`
        
        evolutionCycleContainer.insertAdjacentHTML("beforeend", pokemonContainer);

        const nextContainer = `<div style="width: 10%;">
                                    <img src="../assets/images/chevron.png" class="img-fluid next" loading="lazy">
                               </div>`

        if(index != cycle.length - 1) evolutionCycleContainer.insertAdjacentHTML("beforeend", nextContainer)
    })

    document.querySelector('.loading-wheel').style.display = "none";

}

const addBackground = (pokemonObj) => {
    const type = pokemonObj.types[0];
    switch(type) {
        case 'ground':
            document.body.style.backgroundColor = '#f7de3f';
            break;

        case 'dragon':
            document.body.style.backgroundColor = '#53a4cf';
            break;

        case 'flying':
            document.body.style.backgroundColor = '#3dc7ef';
            break;

        default:
            document.body.classList.add(type);
    }
}

const pokemon = JSON.parse(localStorage.getItem("pokemon"));
document.querySelector('title').textContent = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`;
document.getElementById("pokemon-name").textContent = pokemon.name.toUpperCase();
document.querySelector('img').src = pokemon.image;
document.querySelector('img').alt = pokemon.name;

addBackground(pokemon);
displayTypes(pokemon.types);
displayStats(pokemon.stats);
displayEvolutionCycle(pokemon.name);
generateHistory(pokemon.name);