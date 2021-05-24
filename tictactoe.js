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

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement("tr");
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement("td");
    cells.push($td);
    $td.addEventListener("click", (e) => {
      // 칸에 글자가 있나?
      if (e.target.textContent) return;
      e.target.textContent = turn;
      // 승부확인
      if (turn === "O") {
        turn = "X";
      } else if (turn === "X") {
        turn = "O";
      }
    });
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}
