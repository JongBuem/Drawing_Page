'use strict'; 

const canvas = document.querySelector(".canvas");
const colors = document.getElementsByClassName("color_menu_color");
const range = document.querySelector(".range");
const brush = document.querySelector(".brush");
const fill = document.querySelector(".fill");
const size = document.querySelector(".size");
const sizeImg = document.getElementsByClassName("size_button");
const color = document.querySelector(".color");
const sizeMenu = document.querySelector(".size_menu");
const colorMenu = document.querySelector(".colors")
const fileButton = document.querySelector(".fa-bars");
const fileMenu = document.querySelector(".files");
const save = document.querySelector(".save");
const ctx = canvas.getContext("2d");

let drawing = false;//그릴 수 없다
let filling = false;//초기 mode는 fill
const SIZE = 1000;

canvas.width = SIZE;//픽셀을 다루기위해 width지정 (pixel modifier 사이즈 지정)
canvas.height = SIZE;//픽셀을 다루기위해 height지정 (pixel modifier 사이즈 지정)
canvas.style.cursor="url(img/brush.png),auto";

ctx.fillStyle ="white"; //초기 배경 색상
ctx.fillRect(0, 0, SIZE, SIZE);//배경 크기의 사각형 생성
ctx.strokeStyle ="#2c2c2c";//초기 선의 색상
ctx.lineWidth = 3;//초기 선의 굵기
ctx.fillStyle="#2c2c2c";

function startDrawing(){
    drawing = true;//그릴 수 있다
    menuClear();
}

function stopDrawing(){
    drawing = false;//그릴 수 없다
}

function onMouseMove(event){ //마우스가 움직 이는 모든 순간에
    const x= event.offsetX;
    const y= event.offsetY;
    if(!drawing){ //클릭하지 않고 마우스를 움직일때
        ctx.beginPath();//Path는 선이며, 새로운 경로를 생성
        ctx.moveTo(x,y);//마우스의 x,y좌표로 Path를 옮긴다
    } else{//클릭 하였을때
        ctx.lineTo(x,y);//Path의 위치에서 지금 위치까지 직선생성
        ctx.stroke();//윤곽선, 획을 긋는다  
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
    filling = false;
    canvas.style.cursor="url(img/brush.png),auto";
    menuClear();
}

function fillClick(){
    filling = true;
    canvas.style.cursor="url(img/fill.png),auto";
    menuClear();
}

function canvasClick(){
    if(filling){//mode가 Paint일때
        ctx.fillRect(0, 0, SIZE, SIZE); //전체 페이지크기의 사각형 생성
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

function fileButtonClick(){
    colorMenu.classList.remove("color_menu");
    sizeMenu.classList.remove("range_menu");
    fileMenu.classList.toggle("file_menu");
}

function saveClick(){
    const image = canvas.toDataURL(); //canvas의 png 이미지 URL생성, image/jpeg는 jpg
    const link = document.createElement("a");//링크생성
    link.href=image; //링크를 canvas의 이미지 URL를 가리킴
    link.download=image.png;
    link.click(); //링크를 대신 클릭
}

function handleCM(event){
    event.preventDefault();//메뉴를 보이지 않게함
}

function menuClear(){
    fileMenu.classList.remove("file_menu");
    sizeMenu.classList.remove("range_menu");
    colorMenu.classList.remove("color_menu");
}


if(save){
    save.addEventListener("click",saveClick)
}


function init(){
    brush.addEventListener("click",brushClick);
    fill.addEventListener("click",fillClick);
    size.addEventListener("mousedown",sizeClick);
    range.addEventListener("input",changeRange);
    color.addEventListener("mousedown",colorClick);
    fileButton.addEventListener("mousedown",fileButtonClick);
    Array.from(colors).forEach(color => color.addEventListener("click",changeColor));//colors를 배열로 만들고 해당 값 클릭시
    Array.from(sizeImg).forEach(sizeimg => sizeimg.addEventListener("click",changeRange));//colors를 배열로 만들고 해당 값 클릭시

    canvas.addEventListener("mousemove",onMouseMove); //마우스가 움직일때
    canvas.addEventListener("mousedown",startDrawing); //마우스를 클릭 할 때
    canvas.addEventListener("mouseup",stopDrawing); //마우스를 클리하고 올릴 때
    canvas.addEventListener("mouseleave",stopDrawing); //마우스가 canvasd 에서 나갔을 때
    canvas.addEventListener("click", canvasClick);//canvas를 마우스로 클릭 할 때
    canvas.addEventListener("contextmenu", handleCM);//마우스 우클릭시
}

init();