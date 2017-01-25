getGiphy("http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC");

function getGiphy(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            processGiphy(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", url, true); // true for async
    xmlHttp.send();
}

function processGiphy(json) {
    var objects = JSON.parse(json);
    
    // for(var i = 0; i < objects.length; i++) {
    //
    // }
}
