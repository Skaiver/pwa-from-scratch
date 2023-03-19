import StorageHelper from "./helper/StorageHelper.js";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/sw.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}

const container = document.querySelector(".container")
const coffees = [
    {name: "Perspiciatis", image: "img/coffee1.webp"},
    {name: "Voluptatem", image: "img/coffee2.webp"},
    {name: "Explicabo", image: "img/coffee2.webp"},
    {name: "Rchitecto", image: "img/coffee1.webp"},
    {name: "Beatae", image: "img/coffee2.webp"},
    {name: "Vitae", image: "img/coffee2.webp"},
    {name: "Inventore", image: "img/coffee1.webp"},
    {name: "Veritatis", image: "img/coffee1.webp"},
    {name: "Accusantium", image: "img/coffee1.webp"},
]

const showCoffees = () => {
    let output = ""
    coffees.forEach(
        ({name, image}) =>
            (output += `
              <div class="card">
                <img class="card--avatar" src=${image}  alt=""/>
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="#">Taste</a>
              </div>
              `)
    )
    container.innerHTML = output
}

const showEntryForm = () => {
    let output = "";
    output += `
        <div class="create-entry-form">
            <form>
                <label for="entry-content">Inhalte hier hin:</label>
                <textarea name="entry-content" id="entry-content" cols="30" rows="10"></textarea>
            </form>
        </div>
    `;
    container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCoffees)

document.querySelector("nav li[data-app-action='home']").addEventListener("click", showCoffees)
document.querySelector("nav li[data-app-action='new-entry']").addEventListener("click", showEntryForm)

const storageHelper = new StorageHelper();
storageHelper.getReports();
storageHelper.saveReport({date: "2023-03-20", "content": "a"});
storageHelper.getReports();
