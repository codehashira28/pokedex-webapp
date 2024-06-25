import { getPokemonInfo } from "./utilities/getPokemonInfo.js";

const createClearHistoryBtn = (lists) => {
    const clearHistoryBtn = document.createElement('button');
    clearHistoryBtn.textContent = "Clear History";
    clearHistoryBtn.classList.add('mt-1', 'btn')
    clearHistoryBtn.addEventListener("click", () => {
        localStorage.setItem('history', []);
        lists[0].textContent = "";
        lists[1].textContent = "";
        document.querySelector('#view-history .card-body').classList.add('d-none');
    })
    return clearHistoryBtn;
}

const displayHistory = (lists) => {
    const history = JSON.parse(localStorage.getItem('history'));
    if(history) document.querySelector('#view-history .card-body').classList.remove('d-none');
    let i = 0;
    lists.forEach(list => {
        if(history) {
            const clearHistoryBtn = createClearHistoryBtn(lists);
            if(i == 0) clearHistoryBtn.classList.add('btn-outline-light')
            if(i == 1) clearHistoryBtn.classList.add('btn-outline-dark');
            ++i;
            list.insertAdjacentElement("beforeend", clearHistoryBtn);
        }
    })
    
    history.forEach(pokemon => {
        
        lists.forEach((list, i) => {
            const tag = document.createElement('a');
            tag.addEventListener("click", async () => {
                const info = await getPokemonInfo(tag.textContent.toLowerCase());
                localStorage.setItem("pokemon", JSON.stringify(info));
                window.location = './pages/pokemon.html';
            })
            const listItem = document.createElement('li');
            listItem.classList.add('lead', 'mb-1', 'p-1');
            if(i % 2 == 0) listItem.classList.add('text-light')
            listItem.textContent = pokemon[0].toUpperCase() + pokemon.slice(1);
            tag.insertAdjacentElement("beforeend", listItem)
            list.insertAdjacentElement("afterbegin", tag);
        })
    })
}



const generationNav = document.querySelector('#generation-nav');
const lists = document.querySelectorAll('.history-list');

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

displayHistory(lists);