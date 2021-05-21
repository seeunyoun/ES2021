const $input = document.querySelector("#input");
const $form = document.querySelector("#form");
const $logs = document.querySelector("#logs");

const numbers = [];
for (let n = 0; n < 9; n++) {
  numbers.push(n + 1);
}
// let n = 0;
// while (true) {
//   if (n === 9) break;
//   n++;
//   numbers.push(n);
// } 위의 for문을 while문으로

const answer = [];
for (let n = 0; n < 4; n++) {
  const index = Math.floor(Math.random() * numbers.length);
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}
console.log(answer);

// let n = 0;
// while (true) {
//   if (n === 4) break;
//   n++;
//   const index = Math.floor(Math.random() * numbers.length);
//   answer.push(numbers[index]);
//   numbers.splice(index, 1);
// } 위의 for문을 while문으로

const tries = [];
function checkInput(input) {
  if (input.length !== 4) {
    // 길이는 4가 아닌가
    return alert("4자리 숫자를 입력해 주세요.");
  }
  if (new Set(input).size !== 4) {
    // 중복된 숫자가 있는가
    return alert("중복되지 않게 입력해 주세요.");
  }
  if (tries.includes(input)) {
    // 이미 시도한 값은 아닌가
    return alert("이미 시도한 값입니다.");
  }
  return true;
} // 검사하는 코드

let out = 0; // 왜 변수 선언을 여기 하니깐 작동되지?
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = $input.value;
  $input.value = "";
  if (!checkInput(value)) {
    // 에러있음
    return;
  }
  // 입력값 문제 없음
  if (answer.join("") === value) {
    $logs.textContent = "홈런!";
    return;
  }
  if (tries.length >= 9) {
    defeated();
    return;
  }
  // 몇 스트라이크 몇 볼인지 검사
  let strike = 0;
  let ball = 0;
  // 예를 들어 answer: 3146, value: 1234
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]); // answer[0]은 3 -> value.indexOf(3) -> value에서 3의 위치 -> 2 = index
    if (index > -1) {
      // indexOf의 값이 false = -1
      // 일치하는 숫자 발견
      if (index === i) {
        // 자릿수도 같음
        strike += 1;
      } else {
        // 숫자만 같음
        ball += 1;
      }
    }
  }
  if (strike === 0 && ball === 0) {
    out++;
    $logs.innerHTML += `${value}: <strong style="color:green">${strike}</strong> 스트라이크 <strong style="color:blue">${ball}</strong> 볼 <strong style="color:red">${out}</strong> 아웃<br>`;
  } else {
    $logs.innerHTML += `${value}: <strong style="color:green">${strike}</strong> 스트라이크 <strong style="color:blue">${ball}</strong> 볼<br>`;
  }
  if (out === 3) {
    defeated();
    return;
  }
  tries.push(value);
});

function defeated() {
  const message = document.createTextNode(`패배! 정답은 ${answer.join("")}`);
  $logs.appendChild(message);
}
