const $computer = document.querySelector("#computer");
const $score = document.querySelector("#score");
const $rock = document.querySelector("#rock");
const $scissors = document.querySelector("#scissors");
const $paper = document.querySelector("#paper");
const IMG_URL = "./rsp.png";

$computer.style.background = `url(${IMG_URL}) 0 0`;
$computer.style.backgroundSize = "auto 200px";

const rspX = {
  scissors: "0", // 가위
  rock: "-220px", // 바위
  paper: "-440px", //보
};

let computerChoice = "scissors";
const changeComputerHand = () => {
  if (computerChoice === "scissors") {
    // 가위
    computerChoice = "rock";
  } else if (computerChoice === "rock") {
    // 바위
    computerChoice = "paper";
  } else if (computerChoice === "paper") {
    // 보
    computerChoice = "scissors";
  }
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
  $computer.style.backgroundSize = "auto 200px";
};

let intervalId = setInterval(changeComputerHand, 50);

// clickButton 5번 호출, 인터벌 1번, 2번, 3번, 4번, 5번(변수 intervalId가 하나라서 제일 마지막 5번만 변수에 담김!)
// 그다음에 버튼 클릭하면 5번만 취소
let clickable = true; // flag 변수
const clickButton = () => {
  if (clickable) {
    clearInterval(intervalId); // setInterval을 중단하려면 clearInterval(setInterval을 준 변수명)
    clickable = false;
    // 점수 계산 및 화면 표시
    setTimeout(() => {
      clickable = true;
      intervalId = setInterval(changeComputerHand, 50);
    }, 1000); // 1초 있다가 다시 setInterval 실행!
  }
};
$rock.addEventListener("click", clickButton);
$scissors.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);

// const fun = (x) => () => {
//   console.log("고차함수임", x);
// };

// 태그.addEventListener("click", fun(1));
