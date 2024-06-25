export const getEvolutionCycle = async (pokemon) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`);
        const data = await response.json();
        const evolutionResponse = await fetch(data.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        const evolutionCycle = [];
        evolutionCycle.push(evolutionData.chain.species.name);
        let evolutionChain = evolutionData.chain.evolves_to;
        while(evolutionChain.length != 0) {
            for(let i = 0; i < evolutionChain.length; ++i) {
                evolutionCycle.push(evolutionChain[i].species.name);
            }
            evolutionChain = evolutionChain[0].evolves_to;
        }
        return evolutionCycle;
    } catch(err) {
        console.error(err);
    }
    
}

export const getEvolutionImages = async (cycle) => {
    const evolutionImages = [];

    try {
        for(const pokemon of cycle) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
            const data = await response.json();
            const imageType = 'official-artwork';
            const pokeImageUrl = data.sprites.other[imageType].front_default;
            evolutionImages.push(pokeImageUrl);
        }
    
        return evolutionImages;
    } catch(err) {
        document.querySelector('.loading-wheel').style.display = "none";
        document.getElementById('condition').textContent = "Error: Cannot Display Evolution Cycle!";
        document.getElementById('condition').classList.add('fs-1', 'text-danger', 'mt-5')
    }
    
}