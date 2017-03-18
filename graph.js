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
    }
}

xhr.open(method, url, true);

xhr.setRequestHeader('Accept', 'application/json');

xhr.send();


