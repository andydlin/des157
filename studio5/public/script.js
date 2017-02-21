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
    var gifs = ref.child('gifs'); // get 'messages' array
    $scope.gifs = $firebaseArray(gifs); // synchronized array

    // add gif function
    $scope.addGiphy = function() {
        var term = $scope.term;

        var xmlHttp = new XMLHttpRequest(); // new HTTP request
        xmlHttp.onreadystatechange = function() { // detect readystate change
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200) { // wait till readystate is 4, means the request is done
                var objects = JSON.parse(xmlHttp.responseText); // giphy api returns json string, parse into json array
                var size = Object.keys(objects['data']).length; // get length of array of images returned
                var index = Math.floor((Math.random() * size-1) + 1);
                var imageLink = objects['data'][index]['images']['fixed_height']['url'];

                $scope.gifs.$add({
                    text: imageLink
                });
                document.getElementById('term').value = '';
                console.log(term);
            }
        }
        xmlHttp.open("GET", "http://api.giphy.com/v1/gifs/search?q=" + term + "&limit=10&api_key=dc6zaTOxFJmzC", true); // true for async
        xmlHttp.send(); // send http request
    };
});

app.controller('AuthController', function($scope, $firebaseAuth) {
    $scope.user = {};
    var firebaseAuth = firebase.auth()

    $scope.login = function() {
        var email = $scope.username;
        var password = $scope.password;

        firebaseAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if(errorCode === 'auth/user-not-found') {
                alert('User not found.');
            } else if(errorCode === 'auth/wrong-password') {
                alert('Password is incorrect.');
            } else {
                $scope.user = { };
            }
            firebaseConnection.user = user;
            $scope.$apply();
        });
    }
});
