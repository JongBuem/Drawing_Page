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


const menu = {//상단메뉴
    fileClick(){//파일메뉴 클릭
        colorMenu.classList.remove("color_menu");//컬러메뉴 닫기
        sizeMenu.classList.remove("range_menu");//사이즈메뉴 닫기
        fileMenu.classList.toggle("file_menu");//파일메뉴 추가 및 닫기
    },
    brushClick(){//브러시메뉴 클릭
        filling = false;//채우기 불가
        figureclick = false;//도형그리기 불가
        menu.clear();//모든메뉴 닫기
        canvas.style.cursor="url(img/brush.png),auto";//커서 이미지 변경
    },
    fillClick(){//채우기메뉴 클릭
        filling = true;//채우기 가능
        menu.clear();//모든메뉴 닫기
        canvas.style.cursor="url(img/fill.png),auto";//커서 이미지 변경
    },
    sizeClick(){//사이즈메뉴 클릭
        colorMenu.classList.remove("color_menu");//컬러메뉴 닫기
        fileMenu.classList.remove("file_menu");//파일메뉴 닫기
        sizeMenu.classList.toggle("range_menu");//사이즈메뉴 추가 및 닫기
    },
    colorClick(){//컬러메뉴 클릭
        sizeMenu.classList.remove("range_menu");//사이즈메뉴 닫기
        fileMenu.classList.remove("file_menu");//파일메뉴 닫기
        colorMenu.classList.toggle("color_menu");//컬러메뉴 추가 및 닫기
    },
    eraserClick(){//지우개메뉴 클릭
        filling = false;//채우기 불가
        figureclick = false;//도형그리기 불가
        ctx.strokeStyle = "white";//지우개 색상
        ctx.lineWidth=10;//지우개 굵기
        menu.clear();//모든메뉴 닫기
        canvas.style.cursor="url(img/eraser.png),auto";//커서 이미지 변경
    },
    figureClick(){//도형메뉴 클릭
        figureclick=true;//도형그리기 가능
        canvas.style.cursor="url(img/cross.png),auto";//커서 이미지 변경
    },
    clear(){//모든메뉴 닫기
        sizeMenu.classList.remove("range_menu");//클릭메뉴 닫기
        colorMenu.classList.remove("color_menu");//컬러메뉴 닫기
        fileMenu.classList.remove("file_menu");//파일메뉴 닫기
    }
};



function init(){
    file.addEventListener("mousedown",menu.fileClick);//파일메뉴 클릭하면
    brush.addEventListener("click",menu.brushClick);//브러시메뉴 클릭하면
    fill.addEventListener("click",menu.fillClick);//채우기메뉴 클릭하면
    size.addEventListener("click",menu.sizeClick);//사이즈메뉴 클리기하면
    color.addEventListener("click",menu.colorClick);//컬러메뉴 클릭하면
    eraser.addEventListener("click",menu.eraserClick);//지우개메뉴 클릭하면
    figure.addEventListener("click",menu.figureClick);//도형메뉴 클릭하면
}
init();

