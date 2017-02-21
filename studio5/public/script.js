// initialize angular module
var app = angular.module('giphies', ['firebase']); // 'giphies' is the np-app on <html> and tells angularjs where to be active on the page, 'firebase' is to tell it's a firebase reference

// firebase config
var config = {
    apiKey: "AIzaSyCoXMXmtQowtL9q8GhDPhAg5S6J9pKemUg",
    authDomain: "giphies-ea5f0.firebaseapp.com",
    databaseURL: "https://giphies-ea5f0.firebaseio.com",
    storageBucket: "giphies-ea5f0.appspot.com",
    messagingSenderId: "585639859411"
};
firebase.initializeApp(config); // initialize firebase app
var ref = firebase.database().ref(); // store reference to database

// demonstrate firebase object
app.controller('ObjectController', function($scope, $firebaseObject) {
    var syncObject = $firebaseObject(ref); // get firebase object
    syncObject.$bindTo($scope, "data"); // synchronize javascript, DOM, and firebase database
});

// demonstrate firebase array
app.controller('ArrayController', function($scope, $firebaseArray) {
    var messages = ref.child('messages'); // get 'messages' array
    $scope.messages = $firebaseArray(messages); // synchronized array

    // add message function
    $scope.addMessage = function() {
        var message = $scope.newMessageText;
        $scope.messages.$add({
            text: message
        });
        document.getElementById('message').value = '';
    };
});
