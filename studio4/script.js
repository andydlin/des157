document.addEventListener('DOMContentLoaded', function() {
    var endDate = new Date('03/10/2017 10:00 AM');
    var sec = 1000;
    var min = sec * 60;
    var hr = min * 60;
    var day = hr * 24;
    var tipTimer;
    var inPlace = false; // indicates when character is loaded into place
    var waving = false;
    var jumping = false;
    var isFacingLeft = false;
    var greetings = ['Hey there!', 'Hi!', 'What\'s up?', 'How\'s it going?', 'What\'s new?', 'How\'s life?', 'Nice to meet you!', 'Yo!', 'Waddup.', 'Hello!'];

    showRemaining();

    var hasTip = document.getElementsByClassName('hasTip');
    document.getElementById('tracker').style.left = '-4px';
    setTimeout(function() {
        document.getElementById('week1').style.top = '0px';

        setTimeout(function() {
            document.getElementById('week1').style.top = '-350px';

            setTimeout(function() {
                document.getElementById('leftArm').setAttribute('class', 'arm left hover wave');
                showSpeechBubble('Just got my haircut!', 500);

                setTimeout(function() {
                    document.getElementById('leftArm').setAttribute('class', 'arm left hover');
                }, 1000); // wait 1s before removing .wave class

                setTimeout(function() {
                    document.getElementById('controls').style.opacity = 1;
                }, 5000);
            }, 1000); // wait 1s before adding .wave class
        }, 3000); // wait 3s before animating week1 back to the top
    }, 1000);

    for(var i = 0; i < hasTip.length; i++) {
        var tip = hasTip[i].getAttribute('data-tip');
        addToolTip(hasTip[i], i, tip);
        hasTip[i].addEventListener('mouseover', function() {
            var e = this;
            tipTimer = setTimeout(function() {
                e.setAttribute('class', 'hasTip show');
            }, 500);
        });
        hasTip[i].addEventListener('mouseout', function() {
            clearTimeout(tipTimer);
            this.setAttribute('class', 'hasTip');
        });
    }

    var points = document.getElementsByClassName('point');

    for(var i = 0; i < points.length; i++) {
        points[i].addEventListener('click', function() {
            if(inPlace) {
                var point = this.getAttribute('data-point');
                var left = parseInt(document.getElementById('tracker').style.left);
                var index = parseInt(this.getAttribute('data-index'));
                var currIndex = parseInt(document.getElementById('tracker').getAttribute('data-index'));
                var dif = Math.abs(index - currIndex) + 1;

                if(left > point) {
                    document.getElementById('character').setAttribute('class', 'left');
                }
                document.getElementsByClassName('character')[0].setAttribute('class', 'character moving');
                document.getElementById('tracker').style.transition = 'left ' + dif + 's';
                document.getElementById('tracker').style.left = point + 'px';
                inPlace = false;

                setTimeout(function() {
                    document.getElementById('week' + index).style.top = '0px';

                    setTimeout(function() {
                        document.getElementsByClassName('hair')[0].setAttribute('src', 'images/hair' + index + '.png');
                    }, 1500);

                    setTimeout(function() {
                        document.getElementById('week' + index).style.top = '-350px';
                    }, 3000);
                    if(index == 1) {
                        showSpeechBubble('Just got my haircut!', 4000);
                    }
                    if(index == 2) {
                        showSpeechBubble('Hair length just right :D', 4000);
                    }
                    if(index == 3) {
                        showSpeechBubble('Alright, haircut time.', 4000);
                    }
                    if(index == 4) {
                        showSpeechBubble('Omg please I need a haircut :(', 4000);
                    }
                }, 1000);

                setTimeout(function() {
                    document.getElementsByClassName('character')[0].setAttribute('class', 'character');
                    document.getElementById('character').setAttribute('class', '');
                    document.getElementById('tracker').style.transition = '';
                    inPlace = true;
                }, dif * 1000);

                document.getElementById('tracker').setAttribute('data-index', index);
            }
        });
    }

    setTimeout(function() {
        document.getElementById('character').setAttribute('class', '');
        document.getElementsByClassName('character')[0].setAttribute('class', 'character moving');

        setTimeout(function() {
            document.getElementById('character').setAttribute('class', '');
            document.getElementsByClassName('character')[0].setAttribute('class', 'character');
            inPlace = true;
        }, 3500);
    }, 500);

    document.addEventListener('keydown', function(e) {
        if(inPlace) {
            // right arrow key
            if(e.keyCode == 39) {
                e.preventDefault();
                document.getElementsByClassName('character')[0].setAttribute('class', 'character moving');
                var left = parseInt(document.getElementById('tracker').style.left);
                if(left < 596) {
                    left += 10;
                    document.getElementById('tracker').style.left = left + 'px';
                    checkPosition(left);
                }
            }
            // left arrow key
            if(e.keyCode == 37) {
                e.preventDefault();
                document.getElementsByClassName('character')[0].setAttribute('class', 'character moving');
                document.getElementById('character').setAttribute('class', 'left');
                var left = parseInt(document.getElementById('tracker').style.left);
                isFacingLeft = true;
                if(left > -4) {
                    left -= 10;
                    document.getElementById('tracker').style.left = left + 'px';
                    checkPosition(left);
                }
            }
            // "w" key
            if(e.keyCode == 87) {
                e.preventDefault();
                if(!waving) {
                    waving = true;
                    document.getElementById('leftArm').setAttribute('class', 'arm left hover wave');

                    showSpeechBubble(greetings[Math.floor(Math.random() * greetings.length)], 0, 1000);

                    setTimeout(function() {
                        document.getElementById('leftArm').setAttribute('class', 'arm left hover');
                    }, 1000);

                    setTimeout(function() {
                        waving = false;
                    }, 1250);
                }
            }
            // "spacebar" key
            if(e.keyCode == 32) {
                e.preventDefault();
                if(!jumping) {
                    jumping = true;
                    document.getElementById('character').setAttribute('class', 'jumping');

                    setTimeout(function() {
                        document.getElementById('character').setAttribute('class', '');
                    }, 700);

                    setTimeout(function() {
                        jumping = false;
                    }, 950);
                }
            }
        }
    });

    document.addEventListener('keyup', function(e) {
        if(inPlace) {
            document.getElementsByClassName('character')[0].setAttribute('class', 'character');
            if(isFacingLeft) {
                document.getElementById('character').setAttribute('class', '');
                isFacingLeft = false;
            }
        }
    });

    function checkPosition(left) {
        if(left == -4 || left == 196 || left == 396 || left == 596) {
            inPlace = false;
            var index = 0;
            var text;
            if(left == -4) {
                index = 1;
                text = 'Just got my haircut!';
            } else if(left == 196) {
                index = 2;
                text = 'Hair length just right :D';
            } else if(left == 396) {
                index = 3;
                text = 'Alright, haircut time.';
            } else if(left == 596) {
                index = 4;
                text = 'Omg please I need a haircut :(';
            }
            document.getElementsByClassName('character')[0].setAttribute('class', 'character');
            document.getElementById('character').setAttribute('class', '');
            setTimeout(function() {
                document.getElementById('week' + index).style.top = '0px';

                setTimeout(function() {
                    document.getElementsByClassName('hair')[0].setAttribute('src', 'images/hair' + index + '.png');
                }, 1000);

                setTimeout(function() {
                    document.getElementById('week' + index).style.top = '-350px';
                    inPlace = true;
                }, 2000);

                showSpeechBubble(text, 3000);
            }, 500);
        }
    }

    function showRemaining() {
        var nowDate = new Date();
        var remaining = nowDate - endDate;
        var days = Math.floor(remaining / day) * -1 + 'days ';
        var hours = Math.floor((remaining % day) / hr) * -1 + 'hr ';
        var minutes = Math.floor((remaining % hr) / min) * -1 + 'min ';
        var seconds = Math.floor((remaining % min) / sec) * -1 + 'sec';

        document.getElementById('countdown').innerHTML = days + hours + minutes + seconds;
        requestAnimationFrame(showRemaining);
    }

    function addToolTip(e, index, text) {
        var span = document.createElement('span');
        span.setAttribute('class', 'tooltip');
        span.setAttribute('data-index', index);
        var textNode = document.createTextNode(text);
        span.appendChild(textNode);
        setTimeout(function() {
            e.appendChild(span);
        }, 500);
    }

    function showSpeechBubble(text, delay, delay2) {
        var d = 2250;
        if(delay2) {
            d = delay2;
        }
        setTimeout(function() {
            document.getElementById('speechBubble').innerHTML = text;

            setTimeout(function() {
                document.getElementById('speechBubble').innerHTML = '';
            }, d);
        }, delay);
    }
});
