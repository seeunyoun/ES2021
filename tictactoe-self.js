const data = [];
for (let i = 0; i < 3; i++) {
  data.push([]);
}
let turn = "O";
document.body.append(document.createElement("table"));
document.body.append(document.createElement("div"));
const $table = document.querySelector("table");
const $result = document.querySelector("div");
const rows = []; // 2차원 배열 데이터
// [
// [td, td, td],
// [td, td, td],
// [td, td, td],
// ] 이게 rows

const checkWinner = (target) => {
  let rowIndex = target.parentNode.rowIndex; // <tr>에 rowIndex를 받아옴.
  let cellIndex = target.cellIndex; // <td>는 자체적으로 cellIndex를 내장. 아래처럼 forEach 반복문 쓸 필요 X
  // rows.forEach((row, ri) => {
  //   row.forEach((cell, ci) => {
  //     if (cell === target) {
  //       rowIndex = ri;
  //       cellIndex = ci;
  //     }
  //   });
  // }); // 이차원 배열하면 이중 반복문 쓰는 게 자주 나온다!

  // 세 칸 다 채워졌나?
  let hasWinner = false;
  // 가로줄 검사
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  // 세로줄 검사
  if (
    rows[cellIndex][0].textContent === turn &&
    rows[cellIndex][1].textContent === turn &&
    rows[cellIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  // 대각선 검사
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }
  return hasWinner;
};

const checkWinnerAndDraw = (target) => {
  const hasWinner = checkWinner(target);
  // 승자가 있으면
  if (hasWinner) {
    $result.textContent = `${turn}님이 승리!`;
    $table.removeEventListener("click", callback);
    return;
  }
  // 승자가 없으면
  const draw = rows.flat().every((cell) => cell.textContent);
  // let draw = true;
  // rows.forEach((row) => {
  //   row.forEach((cell) => {
  //     if (!cell.textContent) {
  //       draw = false; // 한 칸이라도 비어 있으면 무승부가 아니다!
  //     }
  //   });
  // }); // 근데 이 forEach가 비효율적인 이유가 배열의 첫 칸이 빈 칸이면 최대한 빨리 종료해야 하는데, forEach는 첫 칸이 빈 칸이여도 계속 돈다.
  // // 중간에 멈출 수 없다ㅠㅠ 해결법은 -> every라는 함수로 대체!
  if (draw) {
    $result.textContent = `무승부`;
    return;
  }
  turn = turn === "X" ? "O" : "X";
};

let clickable = true;
const callback = (e) => {
  if (!clickable) {
    return;
  }
  if (e.target.textContent !== "") {
    // 칸이 이미 채워져 있는가?
    return;
  }
  // 빈 칸이면
  e.target.textContent = turn;
  // 승부 판단하기
  checkWinnerAndDraw(e.target);
  if (turn === "X") {
    clickable = false; // 컴퓨터의 턴일 때 못 누르게 막기!
    setTimeout(() => {
      const emptyCells = rows.flat().filter((v) => !v.textContent); // filter()함수도 일차 배열만 가능해서 flat() 해줌
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCell.textContent = "X";
      checkWinnerAndDraw(e.target);
      clickable = true; // 컴퓨터의 턴이 끝나면 누를 수 있게!
    }, 1000);
  }
};

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement("tr");
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement("td");
    cells.push($td);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}
$table.addEventListener("click", callback); // 이벤트 버블링

// 1분 퀴즈 배열값 1이 들어있는 5 * 4 이차원 표를 만드시오. (세로 줄 먼저 다음 가로 칸)
// const arr = [];

// for (let i = 0; i < 5; i++) {
//   const cells = [];
//   for (let j = 0; j < 4; j++) {
//     cells.push(1);
//   }
//   arr.push(cells);
// }

// console.log(arr);

// 1분 퀴즈 버튼 클릭시 'hello, event bubbling'을 alert하게 코드를 수정하세요.
// 단, 이벤트 리스너를 button 태그에 달면 안 됨.
// $div = document.querySelector('div');
// $div.addEventListener('click', func);
// function func() {
//   alert('hello, event bubbling');
// }
