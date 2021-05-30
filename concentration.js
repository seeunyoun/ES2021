const $wrapper = document.querySelector("#wrapper");

const total = 12;
const colors = ["red", "orange", "yellow", "green", "white", "pink"];
let colorCopy = colors.concat(colors);
let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false;

function shuffle() {
  // 피셔-예이츠 셔플
  for (let i = 0; colorCopy.length > 0; i += 1) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
}

function createCard(i) {
  // div.card > div.card-inner > (div.card-front + div.card-back)
  const card = document.createElement("div");
  card.className = "card"; // .card 태그 생성
  const cardInner = document.createElement("div");
  cardInner.className = "card-inner"; // .card-inner 태그 생성
  const cardFront = document.createElement("div");
  cardFront.className = "card-front"; // .card-front 태그 생성
  const cardBack = document.createElement("div");
  cardBack.className = "card-back"; // .card-back 태그 생성
  cardBack.style.backgroundColor = shuffled[i];
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
}

function onClickCard() {
  // 처음 카드 뒤집힐 때 못 누르게 하기 || 내가 누른 카드가 completed배열에 있을 때 못 누르게 하기 || 내가 처음으로 누른 카드를 또 누르면 못 누르게 하기
  if (!clickable || completed.includes(this) || clicked[0] === this) {
    return;
  }
  this.classList.toggle("flipped");
  clicked.push(this);
  if (clicked.length !== 2) {
    return;
  }
  const firstBackColor = clicked[0].querySelector(".card-back").style
    .backgroundColor;
  const secondBackColor = clicked[1].querySelector(".card-back").style
    .backgroundColor;
  if (firstBackColor === secondBackColor) {
    // 두 카드가 같은 카드면
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = [];
    // completed = completed.concat(clicked); 위 3줄과 같은 코드!

    if (completed.length !== total) {
      return;
    }
    setTimeout(() => {
      alert("축하합니다!");
      resetGame();
    }, 1000);
    return;
  }
  clickable = false;
  setTimeout(() => {
    // 두 카드가 다르면
    clicked[0].classList.remove("flipped");
    clicked[1].classList.remove("flipped");
    clicked = [];
    clickable = true;
  }, 500);
}

function startGame() {
  clickable = false;
  shuffle();
  for (let i = 0; i < total; i += 1) {
    const card = createCard(i);
    card.addEventListener("click", onClickCard);
    $wrapper.appendChild(card);
  }

  document.querySelectorAll(".card").forEach((card, index) => {
    // 초반 카드 공개
    setTimeout(() => {
      card.classList.add("flipped");
    }, 1000 + 100 * index); // 두 번째 카드는 2초에 공개, 세 번째 카드는 3초에 공개 ...
  });

  setTimeout(() => {
    // 카드 감추기
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("flipped");
    });
    clickable = true;
  }, 5000);
}

startGame();

function resetGame() {
  $wrapper.innerHTML = "";
  colorCopy = colors.concat(colors);
  shuffled = [];
  completed = [];
  startGame();
}

// 1분 퀴즈
// function aaa() {
//   setTimeout(() => {
//     console.log("d");
//   }, 0);
//   console.log("c");
// }

// setTimeout(() => {
//   console.log("a");
//   aaa();
// }, 0);

// setTimeout(() => {
//   aaa();
//   console.log("b");
// }, 0);

// a c c b d d
