const generationCards = document.querySelectorAll('.generation-card');

generationCards.forEach(generationCard => {
    generationCard.addEventListener("click", () => {
        const genNumber = generationCard.id.slice(-1);
        localStorage.setItem('generation', genNumber);
    })
})