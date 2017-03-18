angular.module('rainbowPortalClient').component('connectionState', {
    bindings: {
         name: '@'
    },
    controller : function connectionController (rainbowSDK, $rootScope, $scope) {
        console.log("Connection ----------------------------------IN");
        $scope.version = rainbowSDK.version();

            $scope.isConnected = false;
            $scope.isLoading = true;

            $scope.user = {name: login, password: password};
            $scope.state = rainbowSDK.connection.getState();
            
            rainbowSDK.connection.signin($scope.user.name, $scope.user.password).then(function(account) {
                $scope.isLoading = false;
                $scope.isConnected = true;

            }).catch(function(err) {
                console.log("Err", err);
                $scope.isLoading = false;
                $scope.isConnected = false;
            }); 

        var onConnectionStateChangeEvent = function onConnectionStateChangeEvent(event, status) {
            $scope.state = rainbowSDK.connection.getState();
        };

        // Subscribe to XMPP connection change
        $scope.$on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, onConnectionStateChangeEvent);
    },
    templateUrl: './src/js/components/connection/connection.template.html' 
});