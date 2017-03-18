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

var conversation;
var messages;
var currentQuestion = 0;

function onConnectionStateChangeEvent(event) {
    console.log("coucou !!!");
    var status = rainbowSDK.connection.getState();
    console.log(rainbowSDK.connection.getState());

    if(status == "connected") {
        console.log("CONNECTED ----------------------------------");
        var conversations = rainbowSDK.conversations.getAllConversations();
        console.log("Conversation length----------------------------------" + conversations.length);

        conversation = rainbowSDK.conversations.getConversationById("c265c07a3cfc484489d5716f1161bec9@sandbox-all-in-one-prod-1.opentouch.cloud");

        console.log(conversation);

        rainbowSDK.im.removeAllMessagesFromConversation(conversation)
        .then(function() {

            
        });

        var onConversationChangeEvent = function onConversationChangeEvent(event, conversationId) {
            console.log("Conversation CHANGED------------", conversationId);
            conversation = rainbowSDK.conversations.getConversationById("c265c07a3cfc484489d5716f1161bec9@sandbox-all-in-one-prod-1.opentouch.cloud");
            messages = conversation.messages;

            console.log(messages);

            var last = messages.pop();
            if (last.side === "R") {
                last = messages.pop();
            }

            if (last) {
                console.log(last);

                createQuestion(last);
            }
        };

        //$rootScope.$on(rainbowSDK.connection.RAINBOW_ONREADY, onConnectionStateChangeEvent);
        $(document).on(rainbowSDK.conversations.RAINBOW_ONCONVERSATIONCHANGED, onConversationChangeEvent);
    }
};

function sendAnswer(event) {
    rainbowSDK.im.sendMessageToConversation(conversation, event.innerHTML);
};

function createQuestion(msg) {
    
    $("#question" + currentQuestion).animate({"left":"-200%"}, "slow"); 
    currentQuestion++;
    $("#question" + currentQuestion).animate({"left":"0"}, "slow");

    if (currentQuestion >=3) {
        var data = JSON.parse(msg.data);
        $("#question" + currentQuestion).children()[0].innerHTML = data.question;
    } else {
        var data = JSON.parse(msg.data);
        console.log(data);

        $("#question" + currentQuestion).children()[0].innerHTML = data.question;

        var rep = data.responses;
        console.log(rep);

        $("#question" + currentQuestion).children()[1].children[0].innerHTML = rep[0].response1;
        $("#question" + currentQuestion).children()[1].children[1].innerHTML = rep[1].response2;
    }
};