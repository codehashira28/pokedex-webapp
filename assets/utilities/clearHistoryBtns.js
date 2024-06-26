export const createClearHistoryBtn = (lists) => {
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