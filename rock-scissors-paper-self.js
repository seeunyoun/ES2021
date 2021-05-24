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

const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

// clickButton 5번 호출, 인터벌 1번, 2번, 3번, 4번, 5번(변수 intervalId가 하나라서 제일 마지막 5번만 변수에 담김!)
// 그다음에 버튼 클릭하면 5번만 취소
let clickable = true; // flag 변수
let computer = 0;
let me = 0;
const clickButton = () => {
  if (clickable) {
    clearInterval(intervalId); // setInterval을 중단하려면 clearInterval(setInterval을 준 변수명)
    clickable = false;
    // 점수 계산 및 화면 표시
    const myChoice =
      event.target.textContent === "바위"
        ? "rock"
        : event.target.textContent === "가위"
        ? "scissors"
        : "paper";
    const myScore = scoreTable[myChoice];
    const computerScore = scoreTable[computerChoice];
    const diff = myScore - computerScore;
    let message;
    if ([2, -1].includes(diff)) {
      me += 1;
      message = "승리";
    } else if ([1, -2].includes(diff)) {
      computer += 1;
      message = "패배";
    } else {
      message = "무승부";
    }

    if (me >= 3) {
      $score.textContent = `나의 승리 ${me}:${computer}`;
    } else if (computer >= 3) {
      $score.textContent = `컴퓨터의 승리 ${me}:${computer}`;
    } else {
      $score.textContent = `${message} ${me}:${computer}`;
      setTimeout(() => {
        clickable = true;
        intervalId = setInterval(changeComputerHand, 5000);
      }, 1000); // 1초 있다가 다시 setInterval 실행!
    }
  }
};
$rock.addEventListener("click", clickButton);
$scissors.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);
