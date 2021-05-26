const $startScreen = document.querySelector("#start-screen");
const $gameMenu = document.querySelector("#game-menu");
const $battleMenu = document.querySelector("#battle-menu");
const $heroName = document.querySelector("#hero-name");
const $heroLevel = document.querySelector("#hero-level");
const $heroHp = document.querySelector("#hero-hp");
const $heroXp = document.querySelector("#hero-xp");
const $heroAtt = document.querySelector("#hero-att");
const $monsterName = document.querySelector("#monster-name");
const $monsterHp = document.querySelector("#monster-hp");
const $monsterAtt = document.querySelector("#monster-att");
const $message = document.querySelector("#message");

const hero = {
  name: "",
  lev: 1,
  maxHp: 100,
  hp: 100,
  xp: 0,
  att: 10,
  attack(monster) {
    monster.hp -= this.att;
    this.hp -= monster.att;
  },
  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  },
}; // 초기 스탯
let monster = null;
const monsterList = [
  { name: "슬라임", hp: 20, att: 10, xp: 10 },
  { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
  { name: "마왕", hp: 150, att: 35, xp: 50 },
];

$startScreen.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target["name-input"].value;
  $startScreen.style.display = "none";
  $gameMenu.style.display = "block";
  $heroName.textContent = name;
  $heroLevel.textContent = `${hero.lev}Lev`;
  $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
  $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
  $heroAtt.textContent = `ATT: ${hero.att}`;
  hero.name = name;
});

$gameMenu.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.target["menu-input"].value;
  if (input === "1") {
    // 모험
    $gameMenu.style.display = "none";
    $battleMenu.style.display = "block";
    monster = JSON.parse(
      JSON.stringify(
        monsterList[Math.floor(Math.random() * monsterList.length)]
      )
    );
    monster.maxHp = monster.hp;
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  } else if (input === "2") {
    // 휴식
  } else if (input === "3") {
    // 종료
  }
});

$battleMenu.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.target["menu-input"].value;
  if (input === "1") {
    // 공격
    hero.attack(monster);
    monster.attack(hero);
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHP}`;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHP}`;
    $message.textContent = `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다`;
  } else if (input === "2") {
    // 회복
  } else if (input === "3") {
    // 도망
  }
});

// 1분 퀴즈 모두 깊은 복사하시오.
// const a = "b"; // 여기서 'b'는 원시값! 객체가 아닌 값을 원시값이라고 함!!
// const c = ["d", true, 1];
// const e = { g: "h" };
// const i = [{ j: "k" }, { l: "m" }];
// const n = { o: { p: "q" } };

// const a1 = a; // 원시값은 그냥 다른 변수에 담아주기만 해도 복사가 됨!
// const c1 = c.slice(); // slice 는 얕은복사 아닌가요?! 아님! c안에 배열 모두 원시값이라서 얕은복사만 해도 됨! 객체 안에 객체가 들어있지 않으면 얕은복사 === 깊은복사. 객체 안에 객체가 들었을 때 깊은 복사를 해야 함!!
// const c1 = [...c]; // 이렇게 해줘도 위의 slice와 동일! 얕은 복사는 slice나 [... ] 두 가지 방법이 있음!
// const e1 = { ...e }; // 객체 안에 객체가 들어있지 않기 때문에 얕은 복사만 해줘도 ok!
// const i2 = JSON.parse(JSON.stringify(i));
// const n2 = JSON.parse(JSON.stringify(n));
