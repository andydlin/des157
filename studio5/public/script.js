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

// greeting controller
app.controller('GreetingController', function($scope, $firebaseObject) {
    $scope.greeting = 'Hello there!!';
});

app.controller('MessageController', function($scope, $firebaseObject) {
    var syncObject = $firebaseObject(ref);
    syncObject.$bindTo($scope, "data");
});
