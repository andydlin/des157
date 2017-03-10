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
    var mouseX, mouseY, elemX, elemY, elemTotal = 0;
    var elem;
    var isElem = false;

    elemTotal = document.getElementsByClassName('box').length;

    // mousedown on the page
    document.body.addEventListener('mousedown', function(event) {
        elem = event.target; // detect targeted element
        if(elem.className == 'box') {
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

            // if distance moved is greater than 200px, animate text to fade away
            if(delta > 100) {
                var newX = elemX + distX;
                var newY = elemY + distY;
                elem.style.left = newX + 'px';
                elem.style.top = newY + 'px';
                setTimeout(function(){
                    elem.style.opacity = 0;
                }, 300);
                isElem = false;
            }
        }
    });

    // pythagorean theorem to determine mouse distance moved
    function pythagorean(a, b) {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b,2));
    }
});
