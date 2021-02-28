# :art: Drawing_Page :art:

> 홈페이지주소 : [https://jongbuem.github.io/Drawing_Page/](https://jongbuem.github.io/Drawing_Page/) :octocat:

## **목차**

- [동작화면](#1-동작화면)
- [주요기능](#2-주요기능)
- [코드리뷰](#3-코드리뷰)
- [문제해결](#4-문제해결)
- [개선방안](#5-개선방안)
- [사용기술](#6-사용기술)

---

## **1. 동작화면** :movie_camera:

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/75786010/109415352-7b75c500-79fb-11eb-8308-e1ea82a85206.gif)

---

## **2. 주요기능**

- 마우스로 그림 그리기
- 그림판 사이즈 변경
- 선의 스타일 변경
- 파일 불러오기
- 파일 저장

---

## **3. 코드리뷰**

<br>

## 3-1. 마우스로 그림 그리기 :pencil: :pencil:

> 그림판(**canvas**)에서 마우스를 눌렀을 때, **마우스의 좌표**는 그림의 출발점이 된다<br>그림판(**canvas**)에서 마우스를 누르면서 움직이는 **마우스의 좌표값** 을 이용하여 윤곽선을 나타냄<br>그림판(**canvas**)에서 마우스를 눌렀다가 뗐을 때, 다시 누르기 전까지 그림을 그리지 못하게 하고 **도형 메뉴**를 클릭하였다면 마우스를 눌렀던 좌표를 시작으로 마우스가 움직인 크기의 사각형이 생성됨

```js
function down(event) {
  convasclick = true; //canvas 클릭함
  downX = event.offsetX; //마우스의 x좌표
  downY = event.offsetY; //마우스의 y좌표
  if (!figureclick) {
    //도형그리기 불가 일때
    drawing = true; //그리기 가능
  }
  menu.clear(); //모든 메뉴 닫기
}

function move(event) {
  moveX = event.offsetX; //마우스의 x좌표
  moveY = event.offsetY; //마우스의 y좌표
  locationXY.innerText = `${moveX}, ${moveY} px`; //하위 마우스 좌표값
  if (!drawing) {
    //그리기가 불가능 할때
    ctx.beginPath(); //새로운 경로를 생성
    ctx.moveTo(moveX, moveY); //직선의 시작위치
  } else {
    //그리기가 가능 할때
    ctx.lineTo(moveX, moveY); //직선의 시작위치에서 해당 위치까지 연결
    ctx.stroke(); //직선의 윤곽선을 생성
    ctx.lineJoin = "round"; //두개의 직선이 만나는 모서리를 둥글게
    ctx.lineCap = "round"; //직선의 끝을 둥글게
    traces = true; //그림을 그렸음
  }
}

function up(event) {
  traces = true; //그림을 그렸음
  drawing = false; //그리기 불가
  upX = event.offsetX; //마우스의 x좌표
  upY = event.offsetY; //마우스의 y좌표
  if (figureclick && convasclick) {
    //도형그리기가 가능 하고 canvas클릭 할때
    ctx.strokeRect(downX + 10, downY + 10, upX - downX, upY - downY); //사각형 그리기
  }
}
```

<br>

## 3-2. 그림판 사이즈 변경, 선의 스타일 변경 :ghost:

> 하단의 범위 설정 이벤트 값을 이용하여 그림판(**canvas**) 크기를 변경<br> 사이즈 메뉴에서 선의 굵기 이미지 또는 범위설정 이벤트를 이용하여 **ctx.lineWidth**의 크기를 변경<br>색상 메뉴에서 해당하는 색상을 선택하게 되면 **strokeStyle,fillStyle**의 색상 값을 변경<br>

```js
const change = {
  //스타일 변경
  canvasSize(event) {
    //canvas 크기변경
    const height = event.target.value; //input의 변경된 value 값
    canvas.height = height; //canvas 세로길이 변경
    canvas.width = height * 2.4; //canvas 가로길이 변경
  },
  lineWidth(event) {
    //직선의 굵기 변경
    const lineWidth = event.target.value; //input의 변경된 value 값
    const lineWidthImg = event.target.style.zIndex; //직선 이미지의 굵기 값
    ctx.lineWidth = lineWidth; //직선의 굵기 변경
    ctx.lineWidth = lineWidthImg; //직선의 굵기 변경
  },
  color(event) {
    //색상 변경
    const color = event.target.style.backgroundColor; //선택한 색상의 배경색
    ctx.strokeStyle = color; //선의 색상 변경
    ctx.fillStyle = color; //채우기 색상 변경
  },
};

function init() {
  locationRange.addEventListener("input", change.canvasSize); //하단 input 변경하면
  range.addEventListener("input", change.lineWidth); //사이즈메뉴의 input 변경하면
  Array.from(sizeImg).forEach((sizeimg) =>
    sizeimg.addEventListener("click", change.lineWidth)
  ); //선의 굵기 이미지를 배열로 만들고 해당 값 클릭하면
  Array.from(colors).forEach((color) =>
    color.addEventListener("click", change.color)
  ); //colors를 배열로 만들고 해당 값 클릭하면
}

init();
```

<br>

## 3-3. 파일 불러오기 :open_file_folder:

> **new FileReader()** 함수와 **readAsDataURL()** 을 이용하여 **파일을 URL**형태로 읽어옴 <br> 읽어온 파일의 URL 주소를 **img.src**를 통해 이미지 주소로 가리킴

```js
function fileUploaDing(files) {
  //이미지파일 불러오기
  const file = files[0]; //업로드된 파일
  const reader = new FileReader(); //파일을 읽어오는 역활
  reader.readAsDataURL(file); //파일을 URL형태로 읽어옴

  reader.onload = function (event) {
    //파일URL 읽기를 성공하면
    const img = new Image(); //img element를 생성
    img.src = event.target.result; //img element의 src를 파일URL로 지정
    img.onload = function () {
      //img element 읽기를 성공하면
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height); //canvas크기에 파일이미지를 canvas크기로 불러옴
    };
  };
}
```

<br>

## 3-4. 파일로 저장 :floppy_disk:

> 그림판(canvas)에 그린 그림을 가리키는 **URL 주소**를 이미지 파일로 저장

```js
function fileSaveClick() {
  //현재 canvas그림을 이미지파일로 저장
  const image = canvas.toDataURL(); //canvas의 그림을 이미지와 데이터 URL로 생성, 이미지는 png 형식
  const link = document.createElement("a"); //a element를 생성
  link.href = image; //a element의 주소를 이미지 데이터 URL로 지정
  link.download = image.png; //이미지를 저장하고 이미지의 이름 지정
  link.click(); //a element의 주소를 클릭
}
```

---

## **4. 문제해결**

- 마우스가 움직이는 좌표값을 이용하여 canvas에 선을 그리려고 하였을 때, 마우스 이벤트에 맞게 drawing 변수의 값을 부여하여 마우스를 눌렀을 때 선을 그리고 마우스를 눌렀다가 뗐을 때 선을 그리지 않게 하였습니다.<br>
  마우스의 움직이는 좌표값을 moveTo()와 lineTo()에 부여하여 선을 만들었으며, stroke()를 이용하여 선의 윤곽선을 나타냈습니다.

<br>

- input의 범위 설정 이벤트를 이용하여 canvas의 크기에 변화를 주고 싶었습니다.<br>canvas의 크기를 결정하는 canvas.height 와 canvas.width에 input의 value 값을 부여하여 canvas의 크기에 동적인 변화를 주었습니다. :smile:

<br>

- 선의 색상을 변경하기 위해 strokeStyle을 여러개 작성해야 하는 불편한 부분을 해결하기 위해서 색상 값을 담고 있는 div를 배열로 받아오게 하여 불필요한 작성을 제거하고 색상을 변경해 보았습니다.

<br>

- "새로 만들기" 메뉴에서 canvas에 그림을 그렸을 때에만 변화를 주기 위해서 조건문을 이용한 변수를 부여하여 해결하였습니다. :sunglasses:

---

## **5. 개선방안**

- 다른 이름으로 파일 저장하기 구현 :ok_hand:
- 마우스의 반응하는 도형의 크기 변화 구현 :scream:
- 사용자가 원하는 색상 추가하는 기능 구현 :ok_hand:
- canvas의 크기 변화를 주었을 때 그림이 지워지지 않게 구현 :ok_hand:

---

## **6. 사용기술**

<img width="150px" height="150px" src="https://user-images.githubusercontent.com/75786010/104137550-03b6f100-53e1-11eb-8985-7b785e6071bf.JPG"></img>
<img width="150px" height="150px" src="https://user-images.githubusercontent.com/75786010/104137565-20532900-53e1-11eb-8f6e-d39efeaf9285.JPG"></img>
<img width="150px" height="150px" src="https://user-images.githubusercontent.com/75786010/104137578-3cef6100-53e1-11eb-8b86-ac28d8ef0081.JPG"></img>

---

### 실행환경

- [ ] Internet Explorer :poop:
- [x] Chrome :thumbsup:
- [x] Edge :thumbsup:
