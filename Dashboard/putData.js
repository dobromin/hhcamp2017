var name = "test3@client.com";

for (var i = 0; i < 3; i++) {
    var method = 'POST';
 
    var url = 'https://blueoceanlabs.win/hh/v1.0/data';

    var xhr = new XMLHttpRequest();

    var date = new Date("2017-02-0" + (i + 1)).toISOString();

    var user = {"xmppPatient": name, "xmppDoctor": "doc@client.com", "period": "before", "type": "question", "ts_utc": date};

    xhr.open(method, url, true);

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.send(JSON.stringify(user));
}

console.log("done !");

