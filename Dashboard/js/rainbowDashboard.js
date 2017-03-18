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


/* Listen to the SDK event RAINBOW_ONREADY */
$(document).on(rainbowSDK.RAINBOW_ONREADY, onReady);

/* Listen to the SDK event RAINBOW_ONLOADED */
$(document).on(rainbowSDK.RAINBOW_ONLOADED, onLoaded);


/* Manually load the SDK */
rainbowSDK.load();
