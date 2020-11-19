const reel = document.querySelector('.tab_reel');
const tab1 = document.querySelector('.tab1');
const tab2 = document.querySelector('.tab2');
const tab3 = document.querySelector('.tab3');
const panel1 = document.querySelector('.tab_panel1');
const panel2 = document.querySelector('.tab_panel2');
const panel3 = document.querySelector('.tab_panel3');

function slideLeft(e) {
    tab1.classList.remove('active');
    tab2.classList.remove('active');
    tab3.classList.remove('active');
    this.classList.add('active');
    reel.style.transform = "translateX(0%)";
}

function slideMid(e) {
    tab1.classList.remove('active');
    tab2.classList.remove('active');
    tab3.classList.remove('active');
    this.classList.add('active');
    reel.style.transform = "translateX(-33%)";
}

function slideRight(e) {
    tab1.classList.remove('active');
    tab2.classList.remove('active');
    tab3.classList.remove('active');
    this.classList.add('active');
    reel.style.transform = "translateX(-66%)";
}


tab1.addEventListener('click', slideLeft);
tab2.addEventListener('click', slideMid);
tab3.addEventListener('click', slideRight);