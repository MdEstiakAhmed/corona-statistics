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
})


fetch('https://api.thevirustracker.com/free-api?countryTimeline=BD')
.then(res => res.json())
.then(data => {
    var allDate= Object.keys(data.timelineitems[0]);
    var value_total_cases =[];
    var value_total_death =[];
    for (let index = 0; index < ((allDate).length)-1; index++) {
        value_total_cases.push(data.timelineitems[0][allDate[index]].new_daily_cases);
        value_total_death.push(data.timelineitems[0][allDate[index]].new_daily_deaths);
    }
    
    showChart(JSON.stringify(allDate), value_total_cases);
    showChartOfTotalDeath(JSON.stringify(allDate), value_total_death);
})

//chart display of total cases
function showChart(val, res){
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: JSON.parse(val),
            datasets: [{
                label: 'Bangladesh COVID-19 case',
                borderColor: 'rgb(55, 61, 240)',
                backgroundColor: 'rgba(255,255, 255, 0.1)',
                data: res
            }]
        },
        options: {}
    });
}

//chart display of total death
function showChartOfTotalDeath(date, count){
    var ctx = document.getElementById('deathCountChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: JSON.parse(date),
            datasets: [{
                label: 'Bangladesh COVID-19 death count',
                borderColor: 'rgb(184, 40, 40)',
                backgroundColor: 'rgba(255,255, 255, 0.1)',
                data: count
            }]
        },
        options: {}
    });
}


//set text value
function setText(data){
    total_cases.innerHTML = data.total_cases;
    total_death.innerHTML = data.total_deaths;
    total_recovered.innerHTML = data.total_recovered;

    today_cases.innerHTML = data.total_new_cases_today;
    today_death.innerHTML = data.total_new_deaths_today;
}