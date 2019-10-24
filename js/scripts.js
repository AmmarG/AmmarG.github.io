"use strict";

var slider = document.querySelector('.slider');
var li = slider.querySelectorAll('ul li');
var leftBtn = slider.querySelector('button.left');
var rightBtn = slider.querySelector('button.right');
var score = 0;

slider.firstElementChild.style.width = li.length * 900 + 50 + 'px';

function scroll() {

  if (this.classList[1] == 'right') {
    if (li[score].nextElementSibling.nextElementSibling.nextElementSibling == null) return;
    li[score].style.display = 'none';
    score++;
  };

  if (this.classList[1] == 'left') {
    if (score == 0) return;
    li[score - 1].style.display = 'inline-block';
    score--;
  };

};

rightBtn.addEventListener('click', scroll);
leftBtn.addEventListener('click', scroll);