const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");

let timeoutId;
let startTime;
let endTime;
const records = [];
$screen.addEventListener("click", (evetn) => {
  if (event.target.classList.contains("waiting")) {
    // 파랑
    $screen.classList.remove("waiting");
    $screen.classList.add("ready");
    $screen.textContent = "초록색이 되면 누르삼";
    timeoutId = setTimeout(() => {
      startTime = new Date();
      $screen.classList.remove("ready");
      $screen.classList.add("now");
      $screen.textContent = "지금 누르삼";
    }, Math.floor(Math.random() * 1000 + 2000)); // 2~3초 사이의 수
  } else if ($screen.classList.contains("ready")) {
    // 빨강
    clearTimeout(timeoutId);
    $screen.classList.remove("ready");
    $screen.classList.add("waiting");
    $screen.textContent = "너무 성급하셨네요!";
  } else if ($screen.classList.contains("now")) {
    // 초록
    endTime = new Date();
    const current = endTime - startTime;
    records.push(current);
    const average = records.reduce((a, c) => a + c) / records.length;
    $result.textContent = `현재 ${current}ms, 평균: ${average}ms`;

    const topFive = records.sort((a, b) => a - b).slice(0, 5); // 1 - 5위 순위 정하기
    topFive.forEach((ele, idx) => {
      $result.append(document.createElement("br"), `${idx + 1}위 : ${ele}ms`);
    });

    startTime = null;
    endTime = null;
    $screen.classList.remove("now");
    $screen.classList.add("waiting");
    $screen.textContent = "클릭해서 시작하세요";
  }
});
