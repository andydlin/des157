getGiphy("http://api.giphy.com/v1/gifs/search?q=burger+meme&limit=50&api_key=dc6zaTOxFJmzC");

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
    var size = Object.keys(objects['data']).length;
    var image, imageLink;
    console.log(objects['data']);
    for(var i = 0; i < size-1; i++) {
        // console.log(objects['data'][i]['images']['fixed_width_small']['url']);
        imageLink = objects['data'][i]['images']['fixed_width']['url'];
        image = document.createElement('img');
        image.setAttribute('src', imageLink);
        document.getElementById('images').appendChild(image);
    }
}
