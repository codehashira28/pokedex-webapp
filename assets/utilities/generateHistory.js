export const generateHistory = (pokemon) => {
    if(!localStorage.getItem('history')) {
        const history = [];
        history.push(pokemon);
        localStorage.setItem('history', JSON.stringify(history));
    } else {
        const history = JSON.parse(localStorage.getItem('history'));
        if(!history.includes(pokemon)) history.push(pokemon);
        localStorage.setItem('history', JSON.stringify(history));
    }
}