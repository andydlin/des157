/*
1. Detect object drag
    a. Track mouse position
    b. Determine mouse distance moved
    c. If distance is further than X, move object
2. Determine direction
3. Animate object in direction
*/

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementsByClassName('scenes')[0].style.opacity = "1";
    }, 500);

    if(document.getElementById('snooze')) {
        document.getElementById('snooze').addEventListener('click', function(e) {
            e.preventDefault();
            var message = this.getAttribute('data-message');
            document.getElementById('dialogue-message').innerHTML = message;
        });
    }

    if(document.body.id == 'scene-4') {
        document.getElementById('bus').addEventListener('click', function() {
            var v = this.getAttribute('data-value');
            var message = "";
            if(v == 0) {
                message = 'The bus has so many people, what if I bump into someone I know?';
                this.setAttribute('data-value', 1);
            } else if(v == 1) {
                message = 'Just relax, you don\'t have to talk to anyone, plus you\'ll get there faster. It\'s just a pasta run, don\'t make this a day long endeavor.';
                document.getElementById('busBtn').style.display = "inline-block";
                this.setAttribute('data-value', 2);
            }
            document.getElementById('dialogue-message').innerHTML = message;
        });
        document.getElementById('walk').addEventListener('click', function() {
            var v = this.getAttribute('data-value');
            var message = "";
            if(v == 0) {
                message = 'Hm, but walking takes so long.';
                this.setAttribute('data-value', 1);
            } else if(v == 1) {
                message = 'What if I\'m sweating by the time I get there? That\'s an ugly look, people will think I\'m gross.';
                this.setAttribute('data-value', 2);
            } else if(v == 2) {
                message = 'Maybe I should just take the bus.';
            }
            document.getElementById('dialogue-message').innerHTML = message;
        });
    }

    if(document.body.id == 'scene-5') {
        var audio = new Audio('heart-beat.wav');

        // preload images for all the characters
        window.addEventListener('load', function() {
            for(var i = 1; i < 5; i++) {
                var src = 'images/scaryFillas' + i +  '.png';
                var img = document.createElement('img');
                img.src = src;
            }
        });

        setTimeout(function() {
            document.getElementsByClassName('dialogue')[0].style.opacity = '0';
            document.getElementById('game').style.opacity = '1';
            audio.play(0, 20, 0);
        }, 3000);

        // global variables within this scope
        var mouseX, mouseY, elemX, elemY, elemTotal, currElem = 0;
        var elem;
        var elems = [];
        var isElem = false;
        var delay = 500;
        var removed = 0;

        elems = document.getElementsByClassName('box');
        elemTotal = elems.length;

        for(var i = 0; i < elemTotal; i++) {
            var x = Math.random() * (1000);
            var y = Math.random() * (800);
            elems[i].style.left = x + 'px';
            elems[i].style.top = y + 'px';
        }

        setTimeout(function() {
            showBoxes();
            timer();
        }, 5000);

        function showBoxes() {
            elems[currElem].style.opacity = 1;
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

        function timer() {
            // 10,000 mili for 10 sec
            // 10,000 = 100%
            var bar = document.getElementById('bar');
            var width = 10000;
            var interv = setInterval(move, 10);
            function move() {
                if(removed == elemTotal) {
                    clearInterval(interv);
                    document.getElementById('dialogue-message').innerHTML = 'Okay, I made it to the store.';
                    document.getElementById('actions').style.display = "block";
                    setTimeout(function() {
                        document.getElementsByClassName('dialogue')[0].style.opacity = '1';
                        document.getElementById('game').style.opacity = '0';
                    }, 500);
                    setTimeout(function() {
                        document.getElementById('game').style.display = "none";
                    }, 1000);
                }
                if(width < 0) {
                    if(removed == elemTotal) {
                        clearInterval(interv);
                        audio.stop();
                    }
                } else {
                    width = width - 5;
                    var perct = width / 100;
                    bar.style.width = perct + '%';
                    if(perct < 75) {
                        document.getElementById('scaryfillas').style.backgroundImage = 'url("images/scaryFillas2.png")';
                    }
                    if(perct < 50) {
                        document.getElementById('scaryfillas').style.backgroundImage = 'url("images/scaryFillas3.png")';
                    }
                    if(perct < 25) {
                        document.getElementById('scaryfillas').style.backgroundImage = 'url("images/scaryFillas4.png")';
                    }
                }
            }
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
                isElem = false;
                // calculate mouse distance moved
                var distX = event.clientX - mouseX;
                var distY = event.clientY - mouseY;
                var delta = pythagorean(distX, distY);

                // if distance moved is greater than X, animate text to fade away
                var newX = elemX + distX;
                var newY = elemY + distY;
                if(delta > 100) {
                    elem.style.left = newX + 'px';
                    elem.style.top = newY + 'px';
                    setTimeout(function(){
                        elem.style.opacity = 0;
                    }, 300);
                    setTimeout(function(){
                        elem.style.display = "none";
                    }, 500);
                    removed++;
                } else {
                    elem.style.left = newX + 'px';
                    elem.style.top = newY + 'px';
                }
            }
        });

        // pythagorean theorem to determine mouse distance moved
        function pythagorean(a, b) {
            return Math.sqrt(Math.pow(a, 2) + Math.pow(b,2));
        }
    } // if scene 5

    if(document.body.id == 'scene-6') {
        setTimeout(function() {
            document.getElementsByClassName('prototype-message')[0].style.opacity = '1';
        }, 1500);
    }
});
