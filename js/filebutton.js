'use strict'; 
const fileOpen = document.querySelector(".fileopen");
const fileUpload = document.querySelector(".fileupload");
const fileSave = document.querySelector(".save");
const newFile = document.querySelector(".newfile");
const fileClose = document.querySelector(".close");

const alertsaveButton = document.querySelector(".alertsave");
const alertnewfileButton = document.querySelector(".alertnewfile");
const alertcloseButton = document.querySelector(".alertclose");
const alertbox = document.querySelector(".alertbox");
const alertbg= document.querySelector(".alertbg");


function fileUploaDing(files){
    const file = files[0];		
	const reader = new FileReader();

	reader.onload = function(event){
		const img = new Image();
		img.onload = function(){
			ctx.drawImage(img,0,0,canvas.width,canvas.height);
		}
		img.src = event.target.result;
	}
	reader.readAsDataURL(file);
}


function fileOpenClick(){
    fileUpload.click(); //링크를 대신 클릭
}

function fileSaveClick(){
    const image = canvas.toDataURL(); //canvas의 png 이미지 URL생성, image/jpeg는 jpg
    const link = document.createElement("a");//링크생성
    link.href=image; //링크를 canvas의 이미지 URL를 가리킴
    link.download=image.png;
    link.click(); //링크를 대신 클릭
}

function newFileClick(){
    if(traces){
        alert();
        menuClear();
    } 
}

function fileCloseClick(){
    window.open('about:blank','_self').self.close();
}

function alert(){
    alertbg.style.display="block";
    alertbox.classList.add("alert");
    alertbox.style.zIndex=2;
}

function alertsaveButtonClick(){
    fileSaveClick();
    alertbox.classList.remove("alert");
    alertbg.style.display="none";
    ctx.clearRect(0,0, canvas .width, canvas .height);
    ctx.beginPath();
}

function alertnewfileButtonClick(){
    alertbox.classList.remove("alert");
    alertbg.style.display="none";
    ctx.clearRect(0,0, canvas .width, canvas .height);
    ctx.beginPath();
}

function alertcloseButtonClick(){
    alertbox.classList.remove("alert");
    alertbg.style.display="none";
}


function init(){
    fileOpen.addEventListener("click",fileOpenClick);
    fileSave.addEventListener("click",fileSaveClick);
    newFile.addEventListener("click",newFileClick);
    fileClose.addEventListener("click",fileCloseClick)

    alertsaveButton.addEventListener("click",alertsaveButtonClick);
    alertnewfileButton.addEventListener("click",alertnewfileButtonClick);
    alertcloseButton.addEventListener("click",alertcloseButtonClick);
}

init();