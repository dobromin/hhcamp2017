// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var exampleApp = angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

exampleApp.controller("ExampleController", function($scope, $timeout, $cordovaBarcodeScanner) {

    $scope.scanBarcode = function() {
      //confirm("pressed ");
        $scope.scanning = true;
        // $("#left").animate({"left":"-110%"}, "slow"); 
        // $("#question1").animate({"left":"0"}, "slow");
        // rainbowSDK.im.sendMessageToConversation(conversation, "GO");
        $scope.test = $timeout(function() {
            console.log("setTimeout");
            if ($scope.scanning) {
                console.log("should change");
                $scope.scanning = false;
                rainbowSDK.im.sendMessageToConversation(conversation, "GO");
            }
        }, 5000);
        // $scope.test = window.setTimeout(function() {
            
        // }, 5000);

        $cordovaBarcodeScanner.scan().then(function(imageData) {
            // alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);

            if ($scope.scanning) {
                $scope.scanning = false;
                rainbowSDK.im.sendMessageToConversation(conversation, "GO");

                //window.clearTimeout($scope.test);
            }
            // $("#left").animate({"left":"-110%"}, "slow"); 
            // $("#right").animate({"left":"0"}, "slow");

            // rainbowSDK.im.sendMessageToConversation(conversation, "GO");
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };

    // $scope.onButtonClick = function() {
    //     $("#question1").animate({"left":"-110%"}, "slow"); 
    //     $("#question2").animate({"left":"0"}, "slow");
    // };

    // $scope.onButtonClick2 = function() {
    //     $("#question2").animate({"left":"-110%"}, "slow"); 
    //     $("#question3").animate({"left":"0"}, "slow");
    // };
});

angular.bootstrap(document.getElementById('test'), ['starter']);
// angular.bootstrap(document, ['starter']);