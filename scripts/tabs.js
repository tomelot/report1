const reel = document.querySelector('.tab_reel');
const tab1 = document.querySelector('.tab1');
const tab2 = document.querySelector('.tab2');
const tab3 = document.querySelector('.tab3');
const panel1 = document.querySelector('.tab_panel1');
const panel2 = document.querySelector('.tab_panel2');
const panel3 = document.querySelector('.tab_panel3');

function slideLeft() {
    tab2.classList.remove('active');
    tab3.classList.remove('active');
    tab1.classList.add('active');
    reel.style.transform = "translateX(0%)";
}

function slideMid() {
    tab1.classList.remove('active');
    tab3.classList.remove('active');
    tab2.classList.add('active');
    reel.style.transform = "translateX(-33%)";
}

function slideRight() {
    tab1.classList.remove('active');
    tab2.classList.remove('active');
    tab3.classList.add('active');
    reel.style.transform = "translateX(-66%)";
}


var swipe = 0;

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches || // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/
        if (xDiff > 0) {
            if (swipe != 0) {
                swipe -= 1;
            }
        } else {
            if (swipe < 2) {
                swipe += 1;
            }
            /* right swipe */
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
    switch (swipe) {
        case 0:
            slideLeft();
            break;
        case 1:
            slideMid();
            break;
        case 2:
            slideRight();
            break;
    }
};

tab1.addEventListener('click', slideLeft);
tab2.addEventListener('click', slideMid);
tab3.addEventListener('click', slideRight);