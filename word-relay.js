const number = parseInt(prompt("몇 명이 참가하나요?"), 10); // 변수에 넣으면 값이 string으로 나오기 때문에 parseInt()로 숫자로 나오게 해야함! 10진법
const $button = document.querySelector("button");
const $input = document.querySelector("input");
const $word = document.querySelector("#word");
const $order = document.querySelector("#order");
let word; // 제시어
let newWord; // 새로 입력한 단어

const onClick = () => {
  if (!word || word[word.length - 1] === newWord[0]) {
    // 제시어가 비어 있는가?
    word = newWord; // 입력한 단어가 제시어가 된다.
    $word.textContent = word;
    const order = Number($order.textContent); // 현재 순서
    if (order + 1 > number) {
      $order.textContent = 1;
    } else {
      $order.textContent = order + 1;
    }
  } else {
    // 올바르지 않은가
    alert("올바르지 않은 단어입니다!");
  }
  $input.value = "";
  $input.focus(); // input 태그에 커서 초점
};
const onInput = (event) => {
  newWord = event.target.value;
};

$input.addEventListener("input", onInput);
$button.addEventListener("click", onClick);
