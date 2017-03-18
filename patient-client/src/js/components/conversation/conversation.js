angular.module('rainbowPortalClient').component('conversation', {
    bindings: {
         name: '@'
    },
    controller : function conversationController (rainbowSDK, $rootScope, $scope,$http) {
        var ctrl = $scope;
        var control = this;
        var container = angular.element(".conversationCmp-messages");

        var onConnectionStateChangeEvent = function onConnectionStateChangeEvent(event, status) {
            $scope.state = rainbowSDK.connection.getState();
            if($scope.state == "connected"){
                $scope.isReady = true;
                console.log("CONNECTED ----------------------------------");
                var conversations = rainbowSDK.conversations.getAllConversations();
                $scope.conversations = conversations;
                console.log("Conversation length----------------------------------" + conversations.length);

                for(i=0; i<conversations.length;i++){
                        console.log("Conversation ----------------------------------" , conversations[i].filterName);
                    if(conversations[i].filterName == "bot hackathon"){
                        console.log("Conversation ----------------------------------", conversations[i]);
                        $scope.conversation = conversations[i];
                        break;
                    }
                }

            rainbowSDK.im.getMessagesFromConversation($scope.conversation, 15).then(function(messages) {
                console.log("DEMO :: messages")
                $scope.messages = $scope.conversation.messages;
            });

            }
        };

        var onConversationChangeEvent = function onConversationChangeEvent(event, conversationId) {
            console.log("Conversation CHANGED------------", conversationId);
            setTimeout(scrollDown, 1000);
        };

        //$rootScope.$on(rainbowSDK.connection.RAINBOW_ONREADY, onConnectionStateChangeEvent);
        $rootScope.$on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, onConnectionStateChangeEvent)
        $rootScope.$on(rainbowSDK.conversations.RAINBOW_ONCONVERSATIONCHANGED, onConversationChangeEvent);

        var scrollDown = function scrollDown() {
            container[0].scrollTop = container[0].scrollHeight;
        };


        container.on('scroll', function(event) {
            if(container.scrollTop() <=0) {
                //Load older messages
                rainbowSDK.im.getMessagesFromConversation($scope.conversation, 30).then(function() {
                    console.log("DEMO2 :: messages")
                }).catch(function() {
                });
            }
        });

        $scope.onSend = function() {
            console.log("ON SEND = "+$scope.message);

            rainbowSDK.im.sendMessageToConversation($scope.conversation, $scope.message);
            $scope.message = "";
        };
    },
    templateUrl: './src/js/components/conversation/conversationCmp.template.html'
});
