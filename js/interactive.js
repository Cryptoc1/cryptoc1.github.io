var pX, pY, quadrant, rotation;
var width = window.innerWidth,
    height = window.innerHeight;

// Just to piss off the JavaScript nuts
var elem = document.getElementById('drawingArea');
var two = new Two({
    width: width,
    height: height * .5
}).appendTo(elem);

var circle = two.makeCircle(0, 0, two.height / 4);
var dot = two.makeCircle(60, 0, two.height / 30);
circle.fill = '#F44336';
circle.stroke = "rgba(136, 136, 136, .5)";
circle.linewidth = 5;
dot.fill = "#424242";
dot.stroke = "rgba(100, 100, 100, .65)";
dot.strokewidth = 5;

var group = two.makeGroup(circle, dot);
group.translation.set(two.width / 2, two.height / 2);
group.scale = 1;

two.update();

window.addEventListener('mousemove', mouseMoved, false);
//window.addEventListener('resize', onResize, false);

function mouseMoved(e) {
    pX = e.clientX
    pY = e.clientY
    var x = pX - (width / 2),
        y = pY - (height / 2);
    if ((pX > width / 2 && pY < width) && (pY > 0 && pY < height / 2)) {
        quadrant = 1;
    }
    if ((pX > 0 && pX < width / 2) && (pY > 0 && pY < height / 2)) {
        quadrant = 2;
    }
    if ((pX > 0 && pX < width / 2) && (pY > height / 2 && pY < height)) {
        quadrant = 3;
    }
    if ((pX > width / 2 && pX < width) && (pY > height / 2 && pY < height)) {
        quadrant = 4;
    }
    if (quadrant == 1) {
        x = -x;
        opposite = (height / 2) - y;
        adjacent = (width / 2) - x;
        group.rotation = -Math.tan(opposite / adjacent);
        two.update();
    }
    if (quadrant == 2) {
        opposite = (height / 2) - y;
        adjacent = (width / 2) - x;
        group.rotation = Math.tan(opposite / adjacent) - Math.PI;
        two.update();
    }
    if (quadrant == 3) {
        //x = -x;
        y = -y;
        opposite = (height / 2) - y;
        adjacent = (width / 2) - x;
        group.rotation = Math.tan(adjacent / opposite);
        two.update();
    }
    if (quadrant == 4) {
        //        x = -x;
        //        y = -y;
        opposite = (height / 2) + y;
        adjacent = (width / 2) + x;
        group.rotation = -Math.tan(opposite / adjacent) + Math.PI;
        two.update();
    }
}

function onResize(e) {

}