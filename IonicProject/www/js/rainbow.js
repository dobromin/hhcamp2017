var login = "patient.hackathon@al-enterprise.com";
var password = "Hackathon@16";

console.log("[DEMO] :: Rainbow Audio Video Application");

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

        connectToRainbow();
    }).catch(function() {
        console.log("[DEMO] :: Something went wrong with the SDK...");
    });
};

/* Listen to the SDK event RAINBOW_ONREADY */
$(document).on(rainbowSDK.RAINBOW_ONREADY, onReady);

/* Listen to the SDK event RAINBOW_ONLOADED */
$(document).on(rainbowSDK.RAINBOW_ONLOADED, onLoaded);

rainbowSDK.load();

//Object.prototype.each = $.each;

function connectToRainbow() {
    console.log(rainbowSDK);

    rainbowSDK.connection.signin(login, password).then(function(account) {
        console.log("done!");
    }).catch(function(err) {
        console.log("Err", err);
    }); 
    // console.log("Connection ----------------------------------IN");
    //     $scope.version = rainbowSDK.version();

    //         $scope.isConnected = false;
    //         $scope.isLoading = true;

    //         $scope.user = {name: login, password: password};
    //         $scope.state = rainbowSDK.connection.getState();
            
    //         rainbowSDK.connection.signin($scope.user.name, $scope.user.password).then(function(account) {
    //             $scope.isLoading = false;
    //             $scope.isConnected = true;

    //         }).catch(function(err) {
    //             console.log("Err", err);
    //             $scope.isLoading = false;
    //             $scope.isConnected = false;
    //         }); 

    //     var onConnectionStateChangeEvent = function onConnectionStateChangeEvent(event, status) {
    //         $scope.state = rainbowSDK.connection.getState();
    //     };

    //     // Subscribe to XMPP connection change
    //     $scope.$on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, onConnectionStateChangeEvent);

    $(document).on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, onConnectionStateChangeEvent);
};

function onConnectionStateChangeEvent(event, status) {
    console.log("coucou !!!");
    console.log(rainbowSDK.connection.getState());
};
