// window.scroll(0, 0);

const hero = document.querySelector(".hero")
const input = document.querySelector("input")
const btn = document.querySelector("button")
const region = document.querySelector(".region")
const area = document.querySelector(".area")

let all = null;
// https://restcountries.com/v3.1/all
// https://restcountries.com/v3.1/name/{name}

function getAPI(API) {
    axios(`https://restcountries.com/v3.1/${API}`).then((res) => {
        all = res.data
        console.log(res.data)
        view(all)

    });
}
getAPI("all");

function view(data) {
    window.scroll(0, 0);

    hero.innerHTML = "";
    data.slice(0, 10).map((el) => {
        hero.innerHTML += `<div  class="box">
        <img src="${el.flags.svg}" width="100"  alt="img">
        <h1 class="name" >${el.name.common}</h1>
        <h2 class="area">${el.continents}
        <h2 class="area">${el.area} KB<sup>2</sup></h2>
        <h2 class="population">${el.population}</h2>
        <h4 class="capital">${el.capital}</h4>
        <a  href="${el.maps.googleMaps}" target="_blank" class="map"></a>

        </div>`;
    });
}

btn.addEventListener("click", () => {
    getAPI(`name/${input.value}`);
});

input.addEventListener("input", (e) => {
    getAPI(`name/${e.target.value}`);
});

area.addEventListener("change", (e) => {
    let target = e.target.value;

    if (target === "area") {
        const res = all.sort((a, b) => b.area - a.area)
        view(res)
    } else if (target === "population") {
        const res = all.sort((a, b) => b.population - a.population)
        view(res)
    } else if (target === "A-Z") {
        const res = all.sort((a, b) => a.name.common.localeCompare(b.name.common))
        view(res)
    } else if (target === "Z-A") {
        const res = all.sort((a, b) => b.name.common.localeCompare(a.name.common))
        view(res)
    }
})


region.addEventListener("change", (e) => {
    let target = e.target.value
    if (target === "africa") {
        const res = all.filter((el) => el.region === "Africa")
        view(res)
    } else if (target === "europe") {
        const res = all.filter((el) => el.region === "Europe")
        view(res)
    } else if (target === "asia") {
        const res = all.filter((el) => el.region === "Asia")
        view(res)
    }
})

