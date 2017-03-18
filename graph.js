var method = 'GET';
var url = 'https://blueoceanlabs.win/hh/v1.0/data?xmpppatient=pat@client.com&xmppdoctor=doc@client.com';

var xhr = new XMLHttpRequest();

var resultat = [];

var map = {
    0 : "Jan",
    1 : "Feb",
    2 : "Mar",
    3 : "Apr",
    4 : "May",
    5 : "Jun",
    6 : "Jul",
    7 : "Aug",
    8 : "Sep",
    9 : "Oct",
    10 : "Nov",
    11 : "Dec"
};

xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        
        var data = JSON.parse(xhr.responseText).data;
        console.log("brut data :");
        console.log(data);

        for(var i = 0; i < data.length; i++) {
            var temp = {};
            temp.score = data[i].score;
            var date = new Date(data[i].ts);
            var day = date.getDate() + i;
            var month = map[date.getMonth()];
            temp.date = day + " " + month;
            resultat.push(temp);
        }

        console.log("parsed data :");
        console.log(resultat);

        createGraph();

        window.setTimeout(function() {
            var temp = {
                date : "16 Jun",
                score: 4
            };

            resultat.push(temp);
            createGraph();
        }, 2000);
    }
}

xhr.open(method, url, true);

xhr.setRequestHeader('Accept', 'application/json');

xhr.send();

var ctx = document.getElementById("myChart");

function createGraph() {
    var lab = [];
    var data = [];
    for (var i = 0; i < resultat.length; i++) {
        lab.push(resultat[i].date);
        data.push(resultat[i].score);
    }

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: lab,
            datasets: [
                {
                    label: "Functional Capacity",
                    fill: false,
                    lineTension: 0.2,
                    borderWidth: 6,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 4,
                    pointHoverRadius: 14,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 8,
                    pointStyle: 'radius',
                    pointHitRadius: 10,
                    data: data,
                    spanGaps: false,
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        max: 10,
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}