let numOne = "";
let operator = "";
let numTwo = "";
const $operator = document.querySelector("#operator");
const $result = document.querySelector("#result");
const onClickNumber = (event) => {
  if (!operator) {
    // 비어있다
    numOne += event.target.textContent;
    $result.value += event.target.textContent;
    return;
  }
  // 비어있지 않다
  if (!numTwo) {
    $result.value = "";
  }
  numTwo += event.target.textContent;
  $result.value += event.target.textContent;
};
document.querySelector("#num-0").addEventListener("click", onClickNumber);
document.querySelector("#num-1").addEventListener("click", onClickNumber);
document.querySelector("#num-2").addEventListener("click", onClickNumber);
document.querySelector("#num-3").addEventListener("click", onClickNumber);
document.querySelector("#num-4").addEventListener("click", onClickNumber);
document.querySelector("#num-5").addEventListener("click", onClickNumber);
document.querySelector("#num-6").addEventListener("click", onClickNumber);
document.querySelector("#num-7").addEventListener("click", onClickNumber);
document.querySelector("#num-8").addEventListener("click", onClickNumber);
document.querySelector("#num-9").addEventListener("click", onClickNumber);

const onClickOperator = (op) => () => {
  if (numOne) {
    operator = op;
    $operator.value = op;
  } else {
    alert("숫자를 먼저 입력하세요.");
  }

  if (numTwo) {
    switch (operator) {
      case "+":
        $result.value = parseInt(numOne) + parseInt(numTwo);
        break;
      case "-":
        $result.value = numOne - numTwo;
        break;
      case "*":
        $result.value = numOne * numTwo;
        break;
      case "/":
        $result.value = numOne / numTwo;
        break;
    }
    numOne = $result.value;
    numTwo = "";
  }
};
// const onClickOperator = function (op) {
//   return function () {
//     if (numOne) {
//       operator = op;
//       $operator.value = op;
//     } else {
//       alert("숫자 먼저...");
//     }
//   };
// }; // 위의 고차함수와 동일!

document.querySelector("#plus").addEventListener("click", onClickOperator("+"));
document.querySelector("#minus").addEventListener("click", () => {
  if (numOne) {
    operator = "-";
    $operator.value = operator;
  } else {
    operator = "";
    $operator.value = "";
    $result.value = "-";
  }

  if ($result.value.includes("-")) {
    numOne = numOne * -1;
  }

  if (numTwo) {
    switch (operator) {
      case "+":
        $result.value = parseInt(numOne) + parseInt(numTwo);
        break;
      case "-":
        $result.value = numOne - numTwo;
        break;
      case "*":
        $result.value = numOne * numTwo;
        break;
      case "/":
        $result.value = numOne / numTwo;
        break;
    }
    numOne = $result.value;
    numTwo = "";
  }

  numOne = $result.value;
  numTwo = "";
});
document
  .querySelector("#divide")
  .addEventListener("click", onClickOperator("/"));
document
  .querySelector("#multiply")
  .addEventListener("click", onClickOperator("*"));
document.querySelector("#calculate").addEventListener("click", () => {
  if (numTwo) {
    switch (operator) {
      case "+":
        $result.value = parseInt(numOne) + parseInt(numTwo);
        break;
      case "-":
        $result.value = numOne - numTwo;
        break;
      case "*":
        $result.value = numOne * numTwo;
        break;
      case "/":
        $result.value = numOne / numTwo;
        break;
    }
    $operator.value = "";
    numOne = $result.value;
    operator = "";
    numTwo = "";
  } else {
    alert("숫자를 먼저 입력하세요.");
  }

  // if (numTwo) {
  //   if ((operator = "+")) {
  //     $result.value = parseInt(numOne) + parseInt(numTwo);
  //   } else if ((operator = "-")) {
  //     $result.value = numOne - numTwo;
  //   } else if ((operator = "*")) {
  //     $result.value = numOne * numTwo;
  //   } else {
  //     $result.value = numOne / numTwo;
  //   }
  // } else {
  //   alert("숫자를 ...");
  // } // 위의 switch문을 if문으로 바꿔봄
});
document.querySelector("#clear").addEventListener("click", () => {
  numOne = "";
  operator = "";
  numTwo = "";
  $operator.value = "";
  $result.value = ""; // 초기상태로 복귀
});
