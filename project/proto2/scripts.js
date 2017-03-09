/*
1. Detect object drag
    a. Track mouse position
    b. Determine distance
2. Determine direction
3. Animate object in direction
*/

document.addEventListener(DOMReadyEvent, function() {
    var image = document.getElementById('image');
    image.addEventListener('dragstart',dragStart,false);
    document.body.addEventListener('dragover', dragOver, false);
    document.body.addEventListener('drop', drop, false);

    function dragStart(e) {
        var currStyle = window.getComputedStyle(event.target, null); // get style for targeted element
    }

    function drop(e) {
        e.preventDefault();
    }

    function dragOver(e) {
        e.preventDefault();
        var x = event.clientX;
        var y = event.clientY;
        var id = e.dataTransfer.getData('id');
        e.target.appendChild(document.getElementById(id));
    }
});
