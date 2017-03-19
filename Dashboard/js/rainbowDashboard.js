// TODO: Change account
var login = "surgeon.hackathon@al-enterprise.com";
var password = "Hackathon@16";


/* Bootstrap the SDK */
angular.bootstrap(document.getElementById("test"), ["sdk"]).get("rainbowSDK");

/* Callback for handling the event 'RAINBOW_ONREADY' */
var onReady = function onReady() {
    console.log("[DEMO] :: On SDK Ready !");
};


/* Callback for handling the event 'RAINBOW_ONCONNECTIONSTATECHANGED' */
var onLoaded = function onLoaded() {
    console.log("[DEMO] :: On SDK Loaded !");

    rainbowSDK.initialize().then(function() {
        console.log("[DEMO] :: Rainbow SDK is initialized!");
        // You can log-in to Rainbow
        rainbowSDK.connection.signin(login, password).then(function(account) {
        console.log("done!");
    })
    }).catch(function() {
        console.log("[DEMO] :: Something went wrong with the SDK...");
    });
};

var onConnectionStateChanged = function onConnectionStateChanged(event, status) {
    
    switch(status) {
            case rainbowSDK.connection.RAINBOW_CONNECTIONCONNECTED:
                // The state of the connection has changed to "connected" which means that your application is now connected to Rainbow
                console.log("[DEMO] :: On SDK RAINBOW_CONNECTIONCONNECTED ! ");
                waitForMessage();
            case rainbowSDK.connection.RAINBOW_CONNECTIONINPROGRESS:
                // The state of the connection is now in progress which means that your application try to connect to Rainbow
                console.log("[DEMO] :: On SDK RAINBOW_CONNECTIONINPROGRESS ! ");
                break;
            case rainbowSDK.connection.RAINBOW_CONNECTIONDISCONNECTED:
                // The state of the connection changed to "disconnected" which means that your application is no more connected to Rainbow
                console.log("[DEMO] :: On SDK RAINBOW_CONNECTIONDISCONNECTED ! ");
                break;
            default:
                break;
        };
}

var waitForMessage = function waitForMessage() {
    console.log("[DEMO] :: waitForMessage .. ");

    var onConversationChangeEvent = function onConversationChangeEvent(event, conversationId) {

            conversation = rainbowSDK.conversations.getConversationById("19679302d537427395ed6b5c52e32e36@sandbox-all-in-one-prod-1.opentouch.cloud");
            messages = conversation.messages;
            console.log(messages);
            resultat = [];
            xhr.open(method, url, true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.send();
            createGraph(); // redraw the graph
        };


        $(document).on(rainbowSDK.conversations.RAINBOW_ONCONVERSATIONCHANGED, onConversationChangeEvent);    

} 

/* Listen to the SDK event RAINBOW_ONREADY */
$(document).on(rainbowSDK.RAINBOW_ONREADY, onReady);

/* Listen to the SDK event RAINBOW_ONLOADED */
$(document).on(rainbowSDK.RAINBOW_ONLOADED, onLoaded);

$(document).on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, onConnectionStateChanged)


/* Manually load the SDK */
rainbowSDK.load();

