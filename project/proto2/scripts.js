/*
1. Detect object drag
    a. Track mouse position
    b. Determine mouse distance moved
    c. If distance is further than X, move object
2. Determine direction
3. Animate object in direction
*/

document.addEventListener('DOMContentLoaded', function() {
    // global variables within this scope
    var mouseX, mouseY, elemX, elemY, elemTotal, currElem = 0;
    var elem;
    var elems = [];
    var isElem = false;
    var delay = 500;
    var removed = 0;

    elems = document.getElementsByClassName('box');
    elemTotal = elems.length;

    setTimeout(function() {
        showBoxes();
    }, 5000);

    function showBoxes() {
        var x = Math.random() * (1000);
        var y = Math.random() * (800);
        elems[currElem].style.opacity = 1;
        elems[currElem].style.left = x + 'px';
        elems[currElem].style.top = y + 'px';
        elems[currElem].setAttribute('class', 'box active');
        currElem++;
        setTimeout(function() {
            if(currElem < elemTotal) {
                showBoxes();
                if(currElem == (elemTotal / 2)) {
                    delay = 250;
                }
            }
        }, delay);
    }

    // mousedown on the page
    document.body.addEventListener('mousedown', function(event) {
        elem = event.target; // detect targeted element
        if(elem.className == 'box active') {
            isElem = true; // set is correct element to true
            var rect = event.target.getBoundingClientRect(); // get element size and position relative to viewport

            // set current elem position and mouse position
            elemX = rect.left;
            elemY = rect.top;
            mouseX = event.clientX;
            mouseY = event.clientY;
        }
    });

    // mouseup on the page
    document.body.addEventListener('mouseup', function(event) {
        // if correct element
        if(isElem) {
            // calculate mouse distance moved
            var distX = event.clientX - mouseX;
            var distY = event.clientY - mouseY;
            var delta = pythagorean(distX, distY);

            // if distance moved is greater than X, animate text to fade away
            if(delta > 200) {
                var newX = elemX + distX;
                var newY = elemY + distY;
                elem.style.left = newX + 'px';
                elem.style.top = newY + 'px';
                setTimeout(function(){
                    elem.style.opacity = 0;
                }, 300);
            } else {
                var newX = elemX + distX;
                var newY = elemY + distY;
                console.log(elemX + ' | ' + distX + ' | ' + newX);
                console.log(elemY + ' | ' + distY + ' | ' + newY);
                elem.style.left = newX + 'px';
                elem.style.top = newY + 'px';
            }
            isElem = false;
        }
    });

    // pythagorean theorem to determine mouse distance moved
    function pythagorean(a, b) {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b,2));
    }
});
