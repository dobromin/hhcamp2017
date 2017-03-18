var method = 'POST';
 
var url = 'https://blueoceanlabs.win/hh/v1.0/data';

var xhr = new XMLHttpRequest();

var user = {"xmppPatient": "lea@client.com", "xmppDoctor": "doc@client.com", "period": "before", "type": "question"};

xhr.open(method, url, true);

xhr.setRequestHeader('Accept', 'application/json');
xhr.setRequestHeader('Content-type', 'application/json');

xhr.send(JSON.stringify(user));
