const generationNav = document.querySelector('#generation-nav');

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