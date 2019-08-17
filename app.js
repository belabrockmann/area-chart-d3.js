document.addEventListener("DOMContentLoaded", () => {
    const render = dataset => {


    }
    fetch("http://api.worldbank.org/countries/USA/indicators/SP.POP.TOTL?per_page=5000&format=json")
        .then(response => response.json())
        .then(response => render(response));
})