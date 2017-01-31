var values = [];
var images = [];
var completed = 0; // count completed inputs
var html =
    '<p>"I can tell everything about a girl with her v1. I think I could find a girl that I could marry within 10 seconds just by looking at her v1." - Tanner</p>' +
    '<p>"I mean, that just sounds terrible. I would literally rather be, like, v2 in pee than trying to plan my wedding with her." - Bentley</p>' +
    '<p>"All I can do is be myself, be patient, and hope that Chantal gets attacked by v3. Or v4." - Michelle</p>' +
    '<p>"Your v5 is like a huge, huge v5." - Juan Pablo</p>' +
    '<p>"My lesson from this is don\'t ever expect anything from humans. Gonna start adopting v6 now." - Jami</p>' +
    '<p>"I\'m at an unfair advantage because I\'ve stalked you online for the last v7 months." - Lauren</p>' +
    '<p>"I never thought I\'d put myself in this situation, telling two v8 that I love them. But I have." - Ben</p>' +
    '<p>"To know that Ben could possibly be in love with two v8 is really disturbing to me." - Ben\'s Mom</p>' +
    '<p>"Nick held my v9 today. He held my v9. OK? Nobody has ever held my v9 like that. And nobody ever will." - Corinne</p>'; // html to be inserted after form is submitted

window.speechSynthesis.cancel(); // cancel all web speech calls
document.f.onsubmit = processForm; // attach onsubmit event to form
getGiphy("http://api.giphy.com/v1/gifs/search?q=90s&limit=50&api_key=dc6zaTOxFJmzC"); // call giphy API to bring up random gifs about the 90s

// process the form on submit
function processForm(e) {
    e.preventDefault(); // prevent form submit
    images.length = 0; // reset images array
    document.getElementById('images').innerHTML = ""; // clear giphy images
    var inputs = document.getElementsByTagName('input');
    completed = 0; // reset completed count

    for(var i = 0; i < inputs.length; i++) { // loop through all inputs
        if(inputs[i].value.length > 0) { // checking if input has a value
            values[i] = inputs[i].value; // store value into array
            completed += 1; // count to keep track of completed inputs
        }
    }

    if(completed == 9) { // if all inputs are filled up
        for(var i = 0; i < inputs.length; i++) {
            // replace placeholders with values, RegExp replaces all instances of [string] wheresas .replace only replaces first instance
            html = html.replace(new RegExp('v' + (i+1), 'g'), '<span>' + values[i] + '</span>');
            getGiphy("http://api.giphy.com/v1/gifs/search?q=" + values[i] + "&limit=10&api_key=dc6zaTOxFJmzC"); // call giphy API with user inputs
        }
        document.getElementsByClassName('wrapper')[0].className += ' animate';
        document.getElementsByClassName('form')[0].className += ' hidden';
        document.getElementById('quotes').className += ' visible';
        document.getElementById('quotes').innerHTML = html; // set HTML

        setTimeout(function() {
            document.getElementsByClassName('form')[0].className += ' stable';
            document.getElementById('quotes').className += ' stable';
        }, 500); // wait 0.5 seconds before adding classes

        setTimeout(function() {
            speak(document.getElementById('quotes').innerText); // .innerText removes all HTML tags
        }, 2000); // wait 2 seconds before excuting speech
    } else {
        alert('Please fill in all fields.');
    }
}

// process giphy api
function getGiphy(url) {
    var xmlHttp = new XMLHttpRequest(); // new HTTP request
    xmlHttp.onreadystatechange = function() { // detect readystate change
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) { // wait till readystate is 4, means the request is done
            processGiphy(xmlHttp.responseText); // process json when done
        }
    }
    xmlHttp.open("GET", url, true); // true for async
    xmlHttp.send(); // send http request
}

// process json
function processGiphy(json) {
    var objects = JSON.parse(json); // giphy api returns json string, parse into json array
    var size = Object.keys(objects['data']).length; // get length of array of images returned
    var image, imageLink;
    for(var i = 0; i < size; i++) { // loop through returned images
        imageLink = objects['data'][i]['images']['fixed_height']['url']; // grab url of fixed_height images
        image = document.createElement('img');
        image.setAttribute('src', imageLink);
        images.push(image);

        if(i == size-1) {
            displayImages(); // call displayImages() after loop is done
        }
    }
}

// displays rand om images
function displayImages() {
    for(var i = 0; i < images.length; i++) {
        var index = Math.floor((Math.random() * images.length-1) + 1); // randomize images
        document.getElementById('images').appendChild(images[index]); // append to #images element
    }
    setTimeout(function() { // randomize images every 5 seconds
        displayImages();
    }, 5000);
}

function speak(text, callback) {
    var s = new SpeechSynthesisUtterance(); // web speech API
    s.text = text; // set text
    s.lang = 'en-US'; // set language

    window.speechSynthesis.speak(s); // call speak function
}
