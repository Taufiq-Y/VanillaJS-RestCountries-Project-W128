const x = 0;
const y = 0;

async function fetchAPI() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const jsonformat = await res.json();

    //for loop
    for (var i = 0; i < jsonformat.length; i++) {
      const CountryName = jsonformat[i].name.common;
      const CountryCapital = jsonformat[i].capital;
      const CountryFlagImage = jsonformat[i].flags.png;
      const CountryRegion = jsonformat[i].region;
      const CountryCode = jsonformat[i].cca3;
      const latitude = jsonformat[i].latlng[x];
      const longitude = jsonformat[i].latlng[y];

      if (latitude == undefined || longitude == undefined) {
        throw new Error(`Invalid or Unable to get data`);
      }

      div_row.innerHTML += `
<div class="col-lg-4">
<div class="card-group">
<div class="card" class="card border-dark mb-3" style="width: 18rem;">
<div class="card-header card-title">${CountryName}</div>
<img src="${CountryFlagImage}" id="flag-img" class="card-img-top" alt="CountryName:,${CountryName}" />
<div class="card-body">
  <h5 class="card-title content">CAPITAL : ${CountryCapital}</h5>
  <h5 class="card-title content">REGION : ${CountryRegion}</h5>
  <h5 class="card-title content">CODE : ${CountryCode}</h5>
  <button type="button" id="temp-btn" class="btn btn-primary" onclick=openWeather(${latitude},${longitude})>Click for weather</button>

</div>
</div>
</div>
</div>
</div>
</div>
`;
    }
  } catch (error) {
    console.log("err message", error);
  }
}

async function openWeather(latitude, longitude) {
    try {
        const data = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fc86ed4e782b122dda697f738bf9aea5`)
        const result = await data.json()
        const ans = result.main.temp
        const ans2 = document.getElementById("footer")
        ans2.innerHTML = ""
        ans2.innerHTML = `Country Weather ${ans}`
    } catch (error) {
        console.log("weathererr", error)
    }
}

fetchAPI();

const div_container = document.createElement("div")
div_container.setAttribute("class", "container")

const div_head = document.createElement("div")
div_head.setAttribute("class", "heading")
div_head.innerHTML="COUNTRY-WEATHER"

const div_row = document.createElement("div");
div_row.setAttribute("class", "row")

document.body.append(div_container)
div_container.append(div_row)
