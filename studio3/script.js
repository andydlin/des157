var wrapper, collection, collectionImages, image, box, alt, character, fullFigure, boxLid; // initialize global variables

var characters = ['arrow', 'deadpool', 'flash', 'groot', 'ironman']; // array of different characters

// preload images for all the characters
window.addEventListener('load', function() {
    for(var j = 0; j < characters.length; j++) {
        for(var i = 1; i < 25; i++) {
            var src = 'images/' + characters[j] + '/' + characters[j] + '-' + i + '.jpg';
            var img = document.createElement('img');
            img.src = src;
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // assign DOM elements to variables
    wrapper = document.getElementById('figureWrapper');
    boxWrapper = document.getElementById('boxWrapper');
    collection = document.getElementById('collection');
    collectionImages = collection.getElementsByTagName('img');
    image = document.getElementById('image');
    box = document.getElementById('box');
    fullFigureWrapper = document.getElementById('fullFigureWrapper');
    fullFigure = document.getElementById('fullFigure');
    boxLid = document.getElementById('boxLid');

    var isMouseDown = false;
    var initX = 0;
    var src, po, current, next;
    var min = 20;

    setTimeout(function() {
        document.getElementsByTagName('main')[0].setAttribute('class','visible');
    }, 200);

    setTimeout(function() {
        collection.setAttribute('class', 'delayed visible');
    }, 1000);

    setTimeout(function() {
        collection.setAttribute('class', 'visible');
    }, 2000);

    calcWidth();

    wrapper.addEventListener('mousedown', function(event) {
        isMouseDown = true;
        initX = event.clientX; // store initial X coord of mouse on click
        current = image.getAttribute('data-current');
    });

    document.addEventListener('mouseup', function() {
        isMouseDown = false;
    });

    document.addEventListener('mousemove', function(event) {
        if(isMouseDown) {
            var mouseX = event.clientX;
            if((mouseX - initX) > min || (mouseX - initX) < (min*-1)) {
                src = image.getAttribute('src');
                pos = src.indexOf('-');
                src = src.substring(0, pos);
                if((mouseX - initX) > min) {
                    if(current == 23) {
                        next = 1;
                        current = 1;
                    } else {
                        next = current++;
                    }
                } else if((mouseX - initX) < (min*-1)) {
                    if(current == 1) {
                        next = 23;
                        current = 23;
                    } else {
                        next = current--;
                    }
                }
                initX = mouseX;
                src += '-' + next + '.jpg';
                document.getElementById('image').setAttribute('src', src);
                document.getElementById('image').setAttribute('data-current', next);
            }
        }
    });

    fullFigureWrapper.addEventListener('click', function() {
        this.setAttribute('class', 'visible open');
        var imgLink = 'images/' + character + '/' + character + '-1.jpg';
        image.setAttribute('alt', alt);
        image.setAttribute('src', imgLink);
        image.setAttribute('data-character', character);
        wrapper.setAttribute('class', 'visible');
        setTimeout(function() {
            image.setAttribute('class', 'visible');
        }, 800);
    });

    for(var i = 0; i < collectionImages.length; i++) {
        collectionImages[i].addEventListener('click', function() {
            character = this.getAttribute('data-character');
            var activeC = image.getAttribute('data-character');
            var isFigureActive = wrapper.getAttribute('class');
            var isBoxActive = boxWrapper.getAttribute('class');

            alt = this.getAttribute('alt');
            var boxLink = 'images/' + character + '/box-' + character + '.png';
            var figureLink = 'images/' + character + '/full-' + character + '.png';
            var lidLink = 'images/' + character + '/lid-' + character + '.jpg';

            resetClasses();
            collection.setAttribute('class', 'visible active');
            this.setAttribute('class', 'active');

            if(isFigureActive == 'visible') {
                if(activeC != character) {
                    fullFigureWrapper.setAttribute('class', 'visible');
                    image.setAttribute('class', '');
                    setTimeout(function() {
                        wrapper.setAttribute('class', '');

                        hideShowBox(alt, boxLink, figureLink, lidLink, character);
                    }, 800);
                }
            } else {
                document.getElementsByTagName('main')[0].setAttribute('class', 'hidden');
                if(isBoxActive) {
                    var activeBox = fullFigureWrapper.getAttribute('data-character');
                    if(activeBox != character) {
                        hideShowBox(alt, boxLink, figureLink, lidLink, character);
                    }
                } else {
                    animateBox(alt, boxLink, figureLink, lidLink, character)
                    setTimeout(function() {
                        box.setAttribute('class', 'visible');
                        fullFigureWrapper.setAttribute('class', 'visible');
                    }, 600);
                }
            }
        });
    }
});

// animate box into screen
function animateBox(alt, boxLink, figureLink, lidLink, character) {
    box.setAttribute('alt', alt);
    box.setAttribute('src', boxLink);
    fullFigure.setAttribute('alt', alt);
    fullFigure.setAttribute('src', figureLink);
    boxLid.setAttribute('alt', alt);
    boxLid.setAttribute('src', lidLink);
    boxWrapper.setAttribute('class', 'visible');
    fullFigureWrapper.setAttribute('data-character', character);
}

function hideShowBox(alt, boxLink, figureLink, lidLink, character) {
    setTimeout(function() {
        fullFigureWrapper.setAttribute('class', '');
    }, 100);

    setTimeout(function() {
        boxWrapper.setAttribute('class', '');
    }, 300);

    setTimeout(function() {
        animateBox(alt, boxLink, figureLink, lidLink, character)
        setTimeout(function() {
            box.setAttribute('class', 'visible');
            fullFigureWrapper.setAttribute('class', 'visible');
        }, 300);
    }, 300);
}

function resetClasses() {
    for(var i = 0; i < collectionImages.length; i++) {
        collectionImages[i].setAttribute('class', '');
    }
}

function calcWidth() {
    var totalWidth = 0;
    var images = collection.getElementsByTagName('img');
    for(var i = 0; i < images.length; i++) {
        totalWidth += images[i].offsetWidth;
    }
    collection.getElementsByTagName('div')[0].style.width = totalWidth + "px";
}
