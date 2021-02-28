'use strict'; 

const range = document.querySelector(".range");
const sizeImg = document.getElementsByClassName("size_button");
const colors = document.getElementsByClassName("color_menu_color");
const locationXY = document.querySelector(".location");
const locationRange = document.querySelector(".location_range");
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

let drawing = false;//그리기 불가
let filling = false;//채우기 불가
let traces = false;//그림을 그리지 않음
let height = 565;//세로 길이
let width =height*2.4;//가로 길이

let downX = 0;//마우스가 클릭한 x좌표
let downY = 0;//마우스가 클릭한 y좌표
let moveX = 0;//마우스가 움직인 x좌표
let moveY = 0;//마우스가 움직인 y좌표
let upX=0;//마우스가 눌렀다 올린 x좌표
let upY=0;//마우스가 눌렀다 올린 y좌표
let figureclick= false;//도형그리기 불가
let convasclick= false;//canvas 클릭 안함

canvas.height = height;//canvas 세로길이 지정
canvas.width = width;//canvas 가로길이 지정
canvas.style.cursor="url(img/brush.png),auto";//canvas기본 커서지정
ctx.fillStyle ="white"; //배경색상
ctx.fillRect(0, 0, width, height);//배경생성
ctx.strokeStyle ="#2c2c2c";//선의색상
ctx.lineWidth = 3;//선의굵기
ctx.fillStyle ="#2c2c2c";//채우기색상


function down(event){
    convasclick=true;//canvas 클릭함
    downX= event.offsetX;//마우스의 x좌표
    downY= event.offsetY;//마우스의 y좌표
    if(!figureclick){//도형그리기 불가 일때
        drawing = true;//그리기 가능
    }
    menu.clear();//모든 메뉴 닫기
}

function move(event){
    moveX= event.offsetX;//마우스의 x좌표
    moveY= event.offsetY;//마우스의 y좌표
    locationXY.innerText=`${moveX}, ${moveY} px`;//하위 마우스 좌표값
    if(!drawing){//그리기가 불가능 할때
        ctx.beginPath();//새로운 경로를 생성
        ctx.moveTo(moveX,moveY);//직선의 시작위치
    } else {//그리기가 가능 할때
        ctx.lineTo(moveX,moveY);//직선의 시작위치에서 해당 위치까지 연결
        ctx.stroke();//직선의 윤곽선을 생성
        ctx.lineJoin = "round";//두개의 직선이 만나는 모서리를 둥글게
        ctx.lineCap = "round";//직선의 끝을 둥글게
        traces = true;//그림을 그렸음
    }
}

function up(event){
    traces = true;//그림을 그렸음
    drawing = false;//그리기 불가
    upX= event.offsetX;//마우스의 x좌표
    upY= event.offsetY;//마우스의 y좌표
    if(figureclick&&convasclick){//도형그리기가 가능 하고 canvas클릭 할때
        ctx.strokeRect(downX+10,downY+10,upX-downX,upY-downY);//사각형 그리기
    }
}

const change ={//스타일 변경
    canvasSize(event){//canvas 크기변경
        const height = event.target.value;//input의 변경된 value 값
        canvas.height = height;//canvas 세로길이 변경
        canvas.width = height*2.4;//canvas 가로길이 변경
    },
    lineWidth(event){//직선의 굵기 변경
        const lineWidth = event.target.value;//input의 변경된 value 값 
        const lineWidthImg = event.target.style.zIndex;//직선 이미지의 굵기 값 
        ctx.lineWidth=lineWidth;//직선의 굵기 변경
        ctx.lineWidth=lineWidthImg;//직선의 굵기 변경
    },
    color(event){//색상 변경
        const color = event.target.style.backgroundColor;//선택한 색상의 배경색
        ctx.strokeStyle = color;//선의 색상 변경
        ctx.fillStyle = color;//채우기 색상 변경
    }
}

function init(){
    canvas.addEventListener("mousedown",down);//canvas에서 마우스를 누르면
    canvas.addEventListener("mousemove",move);//canvas에서 마우스를 움직이면
    canvas.addEventListener("mouseup",up);//canvas에서 마우스를 눌렀다 올리면
    canvas.addEventListener("click", ()=>{//canvas에서 마우스를 클릭하면 
        if(filling){//채우기가 가능 하면
            ctx.fillRect(0, 0, canvas.width, canvas.height); //전체 페이지크기로 채우기
        }
    });
    canvas.addEventListener("contextmenu", (event) => event.preventDefault());//canvas에서 마우스의 우측을 클릭하면 메뉴를 보이지 않게함
    canvas.addEventListener("mouseleave",() => locationXY.innerText="");//마우스가 canvas에서 벗어나면 마우스 좌표값 비우기
    locationRange.addEventListener("input",change.canvasSize);//하단 input 변경하면
    range.addEventListener("input",change.lineWidth);//사이즈메뉴의 input 변경하면
    Array.from(sizeImg).forEach(sizeimg => sizeimg.addEventListener("click",change.lineWidth));//선의 굵기 이미지를 배열로 만들고 해당 값 클릭하면
    Array.from(colors).forEach(color => color.addEventListener("click",change.color));//colors를 배열로 만들고 해당 값 클릭하면
}

init();

