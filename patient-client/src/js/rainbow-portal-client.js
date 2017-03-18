var login = "patient.hackathon@al-enterprise.com";
var password = "Hackathon@16";

var sample = angular.module('rainbowPortalClient', ['sdk', 'datefilter','reversefilter','hitecfilter']);

sample.controller("rainbowPortalClientController", [
    "rainbowSDK",
    "$rootScope",
    "$scope",
    "$http",
    function(rainbowSDK,$rootScope,$scope,$http) {

        this.initialize = function() {
            console.log("DEMO :: Rainbow Demo Application");

            // Get SDK version
            console.log("DEMO :: SDK", rainbowSDK.version());
            $scope.version = rainbowSDK.version();
        };
       this.initialize();

        return true;
    }
]);
