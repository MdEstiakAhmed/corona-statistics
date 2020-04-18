//variables
const total_cases = document.getElementById("total-cases");
const total_death = document.getElementById("total-death");
const total_recovered = document.getElementById("total-recovered");

const today_cases = document.getElementById("today-cases");
const today_death = document.getElementById("today-death");

//fetch data
fetch('https://api.thevirustracker.com/free-api?countryTotal=BD')
.then(res => res.json())
.then(data => {
    setText(data.countrydata[0]);
    console.log(data.countrydata[0].total_cases);
})

//set text value
function setText(data){
    total_cases.innerHTML = data.total_cases;
    total_death.innerHTML = data.total_deaths;
    total_recovered.innerHTML = data.total_recovered;

    today_cases.innerHTML = data.total_new_cases_today;
    today_death.innerHTML = data.total_new_deaths_today;
}