'use strict'; 

const file = document.querySelector(".fa-bars");
const brush = document.querySelector(".brush");
const fill = document.querySelector(".fill");
const size = document.querySelector(".size");
const color = document.querySelector(".color");
const eraser = document.querySelector(".eraser");
const figure = document.querySelector(".figure");

const fileMenu = document.querySelector(".files");
const sizeMenu = document.querySelector(".size_menu");
const colorMenu = document.querySelector(".colors");

const range = document.querySelector(".range");
const sizeImg = document.getElementsByClassName("size_button");
const colors = document.getElementsByClassName("color_menu_color");

const locationXY = document.querySelector(".location");
const locationRange = document.querySelector(".location_range");

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
let drawing = false;//그릴 수 없다
let filling = false;//초기 mode는 fill
let traces = false;//초기 그리기전
let height = 565;
let width =height*2.4;

canvas.width = width;//픽셀을 다루기위해 width지정 (pixel modifier 사이즈 지정)
canvas.height = height;//픽셀을 다루기위해 height지정 (pixel modifier 사이즈 지정)
canvas.style.cursor="url(img/brush.png),auto";

ctx.fillStyle ="white"; //초기 배경 색상
ctx.fillRect(0, 0, width, height);//배경 크기의 사각형 생성
ctx.strokeStyle ="#2c2c2c";//초기 선의 색상
ctx.lineWidth = 3;//초기 선의 굵기
ctx.fillStyle="#2c2c2c";

function startDrawing(){
    if(!figureclick){
    drawing = true;//그릴 수 있다
    }
    menuClear();
}

function stopDrawing(){
    drawing = false;//그릴 수 없다
}

function onMouseMove(event){ //마우스가 움직 이는 모든 순간에
    const x= event.offsetX;
    const y= event.offsetY;
    locationXY.innerText=`${x}, ${y} px`;
    if(!drawing){ //클릭하지 않고 마우스를 움직일때
        ctx.beginPath();//Path는 선이며, 새로운 경로를 생성
        ctx.moveTo(x,y);//마우스의 x,y좌표로 Path를 옮긴다
    } else {//클릭 하였을때
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineTo(x,y);//Path의 위치에서 지금 위치까지 직선생성
        ctx.stroke();//윤곽선, 획을 긋는다  
        traces = true;
    }
}



function changeColor(event){
    const color = event.target.style.backgroundColor;//현재 배경색상 
    ctx.strokeStyle = color;//선의 색상
    ctx.fillStyle = color;//배경 색상
}

function changeRange(event){
    const size = event.target.value;//선의 굵기 값
    const sizeimg = event.target.style.zIndex;
    ctx.lineWidth=size;//선의 굵기 변경
    ctx.lineWidth=sizeimg;//선의 굵기 변경
}

function brushClick(){
    figureclick = false;//도형그리기 제거
    filling = false;//채우기 제거
    canvas.style.cursor="url(img/brush.png),auto";//커서 이미지 변경
    menuClear();//모든메뉴 닫기
}

function fillClick(){
    filling = true;
    canvas.style.cursor="url(img/fill.png),auto";//커서 이미지 변경
    menuClear();//모든메뉴 닫기
}

function canvasClick(){
    if(filling){//mode가 Paint일때 
       ctx.fillRect(0, 0, canvas.width, canvas.height); //전체 페이지크기의 사각형 생성
    }
}

function sizeClick(){
    colorMenu.classList.remove("color_menu");
    fileMenu.classList.remove("file_menu");
    sizeMenu.classList.toggle("range_menu");
}

function colorClick(){
    sizeMenu.classList.remove("range_menu");
    fileMenu.classList.remove("file_menu");
    colorMenu.classList.toggle("color_menu");
}

function fileClick(){
    colorMenu.classList.remove("color_menu");
    sizeMenu.classList.remove("range_menu");
    fileMenu.classList.toggle("file_menu");
}



function handleCM(event){
    event.preventDefault();//메뉴를 보이지 않게함
}

function menuClear(){
    sizeMenu.classList.remove("range_menu");
    colorMenu.classList.remove("color_menu");
    fileMenu.classList.remove("file_menu");
}
 



function eraserClick(){
    filling = false;
    figureclick = false;//도형그리기 제거
    canvas.style.cursor="url(img/eraser.png),auto";
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";//배경 색상
    ctx.lineWidth=10;//선의 굵기 변경
    menuClear();
}

function changeLocationRange(event){
    const height = event.target.value;//선의 굵기 값
    canvas.height = height;//픽셀을 다루기위해 height지정 (pixel modifier 사이즈 지정)
    canvas.width = height*2.4;//픽셀을 다루기위해 width지정 (pixel modifier 사이즈 지정)
}


const locationleave = () => { locationXY.innerText="";}

function init(){
    file.addEventListener("mousedown",fileClick);
    brush.addEventListener("click",brushClick);
    fill.addEventListener("click",fillClick);
    size.addEventListener("click",sizeClick);
    range.addEventListener("input",changeRange);
    color.addEventListener("click",colorClick);
    eraser.addEventListener("click",eraserClick);
    figure.addEventListener("click",figureClick);
    locationRange.addEventListener("input",changeLocationRange);


    Array.from(colors).forEach(color => color.addEventListener("click",changeColor));//colors를 배열로 만들고 해당 값 클릭시
    Array.from(sizeImg).forEach(sizeimg => sizeimg.addEventListener("click",changeRange));//colors를 배열로 만들고 해당 값 클릭시
    canvas.addEventListener("mouseleave",locationleave);
    canvas.addEventListener("mousemove",onMouseMove); //마우스가 움직일때
    canvas.addEventListener("mousedown",startDrawing); //마우스를 클릭 할 때
    canvas.addEventListener("mouseup",stopDrawing); //마우스를 클리하고 올릴 때
    canvas.addEventListener("mouseleave",stopDrawing); //마우스가 canvasd 에서 나갔을 때
    canvas.addEventListener("click", canvasClick);//canvas를 마우스로 클릭 할 때
    canvas.addEventListener("contextmenu", handleCM);//마우스 우클릭시

    canvas.addEventListener("mousedown",figuredown);
    canvas.addEventListener("mouseup",figureup);
}

init();