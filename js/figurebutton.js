'use strict'; 

let downX = 0;
let downY = 0;
let upX=0;
let upY=0;
let figureclick= false;
let convasclick= false;

function figuredown(event){
    downX= event.offsetX;
    downY= event.offsetY;
    convasclick=true;
}

function figureup(event){
    upX= event.offsetX;
    upY= event.offsetY;

    if(figureclick&&convasclick){
        ctx.strokeRect(upX,upY,downX-upX,downY-upY);
    }
    convasclick=false;
}

function figureClick(){
    figureclick=true;
    canvas.style.cursor="url(img/cross.png),auto";//커서 이미지 변경
}

