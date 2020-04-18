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
    var x= Object.keys(data.timelineitems[0]);
    var value =[];
    for (let index = 0; index < (Object.keys(data.timelineitems[0]).length)-1; index++) {
        value.push(data.timelineitems[0][x[index]].total_cases);
    }
    console.log(value);
    
    showChart(JSON.stringify(Object.keys(data.timelineitems[0])), value)
})

//chart display
function showChart(val, res){
    console.log(JSON.parse(val));
    console.log(res);
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: JSON.parse(val),
            datasets: [{
                label: 'Bangladesh COVID-19 case',
                borderColor: 'rgb(0, 0, 0)',
                data: res
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