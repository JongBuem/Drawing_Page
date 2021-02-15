'use strict'; 

const canvas = document.querySelector(".canvas");
const colors = document.getElementsByClassName("controls_color");
const range = document.querySelector(".range");
const mode = document.querySelector(".mode");
const save = document.querySelector(".save");
const ctx = canvas.getContext("2d");
let drawing = false;//그릴 수 없다
let filling = false;//초기 mode는 fill

canvas.width = 700;//픽셀을 다루기위해 width지정 (pixel modifier 사이즈 지정)
canvas.height = 700;//픽셀을 다루기위해 height지정 (pixel modifier 사이즈 지정)

ctx.fillStyle ="white"; //초기 배경 색상
ctx.fillRect(0, 0, 700, 700);//배경 크기의 사각형 생성
ctx.strokeStyle ="#2c2c2c";//초기 선의 색상
ctx.lineWidth = 2.5;//초기 선의 굵기
ctx.fillStyle="#2c2c2c";

function startDrawing(){
    drawing = true;//그릴 수 있다
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
  ctx.lineWidth=size;//선의 굵기 변경
}

function fillClick(){
    if(filling===true){//mode가 Paint일때
        filling=false;//Fill로 변경
        mode.innerHTML="Fill";
    } else{//mode가 Fill일때
        filling=true;//Paint로 변경
        mode.innerHTML="Paint";
    }
}

function canvasClick(){
    if(filling){//mode가 Paint일때
        ctx.fillRect(0, 0, 700, 700); //전체 페이지크기의 사각형 생성
    }
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

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove); //마우스가 움직일때
    canvas.addEventListener("mousedown",startDrawing); //마우스를 클릭 할 때
    canvas.addEventListener("mouseup",stopDrawing); //마우스를 클리하고 올릴 때
    canvas.addEventListener("mouseleave",stopDrawing); //마우스가 canvasd 에서 나갔을 때
    canvas.addEventListener("click", canvasClick);//canvas를 마우스로 클릭 할 때
    canvas.addEventListener("contextmenu", handleCM);//마우스 우클릭시
}

if(colors){
    Array.from(colors).forEach(color => color.addEventListener("click",changeColor));//colors를 배열로 만들고 해당 값 클릭시
}

if(range){
    range.addEventListener("input",changeRange);
}

if(mode){
    mode.addEventListener("click",fillClick);
}

if(save){
    save.addEventListener("click",saveClick)
}

