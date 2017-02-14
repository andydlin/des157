document.addEventListener('DOMContentLoaded', function() {
    var endDate = new Date('03/10/2017 10:00 AM');
    var sec = 1000;
    var min = sec * 60;
    var hr = min * 60;
    var day = hr * 24;
    var tipTimer;
    var inPlace = false; // indicates when character is loaded into place

    showRemaining();

    var hasTip = document.getElementsByClassName('hasTip');
    document.getElementById('tracker').style.left = '-4px';
    setTimeout(function() {
        document.getElementById('week1').style.top = '0px';

        setTimeout(function() {
            document.getElementById('week1').style.top = '-350px';
        }, 3000);
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
            if(e.keyCode == 39) {
                e.preventDefault();
                document.getElementsByClassName('character')[0].setAttribute('class', 'character moving');
                var left = parseInt(document.getElementById('tracker').style.left);
                if(left < 596) {
                    left += 10;
                    document.getElementById('tracker').style.left = left + 'px';
                }
            }
            if(e.keyCode == 37) {
                e.preventDefault();
                document.getElementsByClassName('character')[0].setAttribute('class', 'character moving');
                document.getElementById('character').setAttribute('class', 'left');
                var left = parseInt(document.getElementById('tracker').style.left);
                if(left > -4) {
                    left -= 10;
                    document.getElementById('tracker').style.left = left + 'px';
                }
            }
        }
    });

    document.addEventListener('keyup', function(e) {
        if(inPlace) {
            document.getElementsByClassName('character')[0].setAttribute('class', 'character');
            document.getElementById('character').setAttribute('class', '');
        }
    });

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
});
