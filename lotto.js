const candidate = Array(45)
  .fill()
  .map((v, i) => i + 1); // 1부터 45까지 뽑는 코드

const shuffle = [];
while (candidate.length > 0) {
  const random = Math.floor(Math.random() * candidate.length); // 무작위 인덱스 뽑기
  const spliceArray = candidate.splice(random, 1); // 뽑은 값은 배열에 들어 있음
  const value = spliceArray[0]; // 배열에 들어 있는 값을 꺼내어
  shuffle.push(value);
}

// for (let i = candidate.length; i > 0; i--) {
//   const random = Math.floor(Math.random() * i);
//   const spliceArray = candidate.splice(random, 1);
//   const value = spliceArray[0];
//   shuffle.push(value);
// } // 위의 while문과 동일

console.log(shuffle);

const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b); // shuffle배열에서 앞에서 6개 가져오고, 그걸 오름차순으로 배열!
const bonus = shuffle[6]; // shuffle배열에서 index기준 6번째 (7번째) 보너스 번호 하나 뽑기
console.log(winBalls, bonus);

const $result = document.querySelector("#result");
const $bonus = document.querySelector("#bonus");

for (let i = 0; i < winBalls.length; i++) {
  setTimeout(() => {
    drawBall(winBalls[i], $result);
  }, (i + 1) * 1000);
} // 중복 제거 = refactoring

// for (var i = 0; i < winBalls.length; i++) {
//   (function (j) {
//     setTimeout(() => {
//       drawBall(winBalls[j], $result);
//     }, (i + 1) * 1000);
//   })(i);
// } // 위의 let 변수 선언을 var로 바꾸고 스코프 문제를 감안하여 작성한 코드!

setTimeout(() => {
  drawBall(bonus, $bonus);
}, 7000);

const drawBall = (number, $parent) => {
  const $ball = document.createElement("div");
  $ball.className = "ball";
  $ball.textContent = number;
  $parent.appendChild($ball);
};

// function drawBall(number, $parent) {
//   const $ball = document.createElement("div");
//   $ball.className = "ball";
//   $ball.textContent = number;
//   $parent.appendChild($ball);
// }
