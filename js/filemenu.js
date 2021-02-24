'use strict'; 

const fileOpen = document.querySelector(".fileopen");
const fileUpload = document.querySelector(".fileupload");
const fileSave = document.querySelector(".filesave");
const newFile = document.querySelector(".newfile");
const filePageInfo=document.querySelector(".pageinfo");
const pageInfoLink=document.querySelector(".pageinfolink");
const fileClose = document.querySelector(".pageclose");
const alertsaveButton = document.querySelector(".alertsave");
const alertnewfileButton = document.querySelector(".alertnewfile");
const alertcloseButton = document.querySelector(".alertclose");
const alertbox = document.querySelector(".alertbox");
const alertbg= document.querySelector(".alertbg");


const newfile = {//새로 만들기
    click(){//새로 만들기 클릭
        if(traces){//그린을 그렸을때
            newfile.alert();//경고창 생성
            menu.clear();//모든메뉴 닫기
        } 
    },
    alert(){//경고창
        alertbg.style.display="block";//경고창 보이게하기
        alertbox.classList.add("alert");//경고창 보이게하기
        alertbox.style.zIndex=2;//경고창 보이게하기
    },
    save(){//경고창 저장버튼
        fileSaveClick();//현재 canvas그림저장
        newfile.clear();//현재 canvas그림제거
        newfile.close();//경고창 닫기
    },
    new(){//경고창 저장 안함 버튼
        newfile.clear();//현재 canvas그림제거
        newfile.close();//경고창 닫기
    },
    close(){//경고창 닫기 버튼
        alertbox.classList.remove("alert");//경고창 가리기
        alertbg.style.display="none";//경고창 가리기
    },
    clear(){//canvas그림제거
        ctx.clearRect(0, 0, canvas.width, canvas.height);//canvas크기의 영역을 비움
    }
}
close
function fileUploaDing(files){//파일이 업로드 되면
    const file = files[0];//업로드된 파일	
	const reader = new FileReader();//파일을 읽어오는 역활
	reader.readAsDataURL(file);//파일을 URL형태로 읽어옴

	reader.onload = function(event){//파일URL 읽기를 성공하면
        const img = new Image();//img element를 생성
        img.src = event.target.result;//img element의 src를 파일URL로 지정
		img.onload = function(){//img element 읽기를 성공하면
			ctx.drawImage(img,0,0,canvas.width,canvas.height);//canvas크기에 파일이미지를 canvas크기로 불러옴
		}
	}
}

function fileSaveClick(){//현재 canvas그림을 이미지로 저장
    const image = canvas.toDataURL(); //canvas의 그림을 이미지와 데이터 URL로 생성, 이미지는 png 형식
    const link = document.createElement("a");//a element를 생성
    link.href=image; //a element의 주소를 이미지 데이터 URL로 지정
    link.download=image.png;//이미지를 저장하고 이미지의 이름 지정
    link.click(); //a element의 주소를 클릭
}

function init(){
    newFile.addEventListener("click",newfile.click);//file메뉴의 "새로 만들기"을 클릭하면
    alertsaveButton.addEventListener("click",newfile.save);//새로 만들기 경고창의 "저장"버튼을 클릭하면
    alertnewfileButton.addEventListener("click",newfile.new);//새로 만들기 경고창의 "저장 안함"버튼을 클릭하면
    alertcloseButton.addEventListener("click",newfile.close);//새로 만들기 경고창의 "취소"버튼을 클릭하면
    fileSave.addEventListener("click",fileSaveClick);//file메뉴의 "저장"을 클릭하면
    fileOpen.addEventListener("click",()=> fileUpload.click());//file메뉴의 "열기"을 클릭하면 input을 클릭
    filePageInfo.addEventListener("click",()=>pageInfoLink.click());//file메뉴의 "그림판 정보"을 클릭하면
    fileClose.addEventListener("click",()=>{//file메뉴의 "끝내기"을 클릭하면
        window.open('about:blank','_self').self.close();//현재 윈도우창 닫기
    });
}

init();