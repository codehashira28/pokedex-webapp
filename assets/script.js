import { displayHistory } from "./utilities/displayHistory.js";
import { getPokemonInfo } from "./utilities/getPokemonInfo.js";


const generationNav = document.querySelector('#generation-nav');
const lists = document.querySelectorAll('.history-list');
const form = document.getElementById("search-container");

generationNav.addEventListener("click", (event) => {
    const target = event.target;
    if(target.tagName == "IMG" || target.tagName == "H5") {
        const genNumber = target.parentNode.id.slice(-1);
        localStorage.setItem('generation', genNumber);
    } else if(target.id.startsWith("card-gen")) {
        const genNumber = target.id.slice(-1);
        localStorage.setItem('generation', genNumber);
    }
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
})

document.querySelector('#search-btn').addEventListener("click", async () => {
    document.querySelector('.error-msg').textContent = "";
    const pokemon = document.querySelector('input').value.trim().toLocaleLowerCase();
    if(pokemon == "") return;
    document.querySelector('.loading-wheel').classList.remove('d-none');
    try {
        const info =  await getPokemonInfo(pokemon);
        if(info) {
            localStorage.setItem("pokemon", JSON.stringify(info));
            form.submit();
        } else {
            document.querySelector('.error-msg').textContent = "Please enter a valid pokemon";
            document.querySelector('.loading-wheel').classList.add('d-none')
        }
    } catch(err) {
        console.error(err);
    }
})

displayHistory(lists);