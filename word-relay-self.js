const number = parseInt(prompt("몇 명이 참가하나요?"), 10);

if (number) {
  const $button = document.querySelector("button");
  const $input = document.querySelector("input");
  const $word = document.querySelector("#word");
  const $order = document.querySelector("#order");
  let word; // 제시어
  let newWord; // 새로 입력한 단어

  const onClick = () => {
    if (
      (!word || word[word.length - 1] === newWord[0]) &&
      newWord.length === 3 //글자 수 세 글자로 제한!
    ) {
      word = newWord;
      $word.textContent = word;
      const order = Number($order.textContent);
      if (order + 1 > number) {
        $order.textContent = 1;
      } else {
        $order.textContent = order + 1;
      }
    } else {
      alert("올바르지 않은 단어입니다!");
    }
    $input.value = "";
    $input.focus();
  };
  const onInput = (e) => {
    newWord = e.target.value;
  };

  $input.addEventListener("input", onInput);
  $button.addEventListener("click", onClick);
}
