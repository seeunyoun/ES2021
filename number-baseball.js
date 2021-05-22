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
    const message = document.createTextNode(`패배! 정답은 ${answer.join("")}`);
    $logs.appendChild(message);
    return;
  }
  // 몇 스트라이크 몇 볼인지 검사
  let strike = 0;
  let ball = 0;
  // 예를 들어 answer: 3146, value: 1234
  answer.forEach((element, i) => {
    const index = value.indexOf(element);
    if (index > -1) {
      if (index === i) {
        strike += 1;
      } else {
        ball += 1;
      }
    }
  });

  // for (let i = 0; i < answer.length; i++) {
  //   const index = value.indexOf(answer[i]); // answer[0]은 3 -> value.indexOf(3) -> value에서 3의 위치 -> 2 = index
  //   if (index > -1) { // indexOf의 값이 false = -1
  //     // 일치하는 숫자 발견
  //     if (index === i) {
  //       // 자릿수도 같음
  //       strike += 1;
  //     } else {
  //       // 숫자만 같음
  //       ball += 1;
  //     }
  //   }
  // } 위의 forEach 코드와 동일!

  $logs.append(
    `${value}: ${strike} 스트라이크 ${ball} 볼`,
    document.createElement("br")
  );
  tries.push(value);
});
