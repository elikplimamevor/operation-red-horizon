const player = document.getElementById("player");
const buildings = document.querySelectorAll(".building");
const mission = document.getElementById("mission");
const message = document.getElementById("message");
const startMission = document.getElementById("startMission");
const village = document.querySelector(".village");

let x = 380;
let y = 230;
const speed = 10;
let missionStarted = false;
let missionComplete = false;

function isColliding(newX, newY) {
  const playerRect = {
    left: newX,
    right: newX + player.offsetWidth,
    top: newY,
    bottom: newY + player.offsetHeight
  };

  for (const building of buildings) {
    const rect = {
      left: building.offsetLeft,
      right: building.offsetLeft + building.offsetWidth,
      top: building.offsetTop,
      bottom: building.offsetTop + building.offsetHeight
    };

    if (
      playerRect.left < rect.right &&
      playerRect.right > rect.left &&
      playerRect.top < rect.bottom &&
      playerRect.bottom > rect.top
    ) {
      return true;
    }
  }

  return false;
}

function checkMissionMarker() {
  if (missionStarted) return;

  const distance = Math.sqrt(
    Math.pow(x - 370, 2) +
    Math.pow(y - 90, 2)
  );

  if (distance < 60) {
    message.style.display = "block";
  }
}

function checkVillage() {
  if (!missionStarted || missionComplete) return;

  const villageX = village.offsetLeft;
  const villageY = village.offsetTop;

  const distance = Math.sqrt(
    Math.pow(x - villageX, 2) +
    Math.pow(y - villageY, 2)
  );

  if (distance < 80) {
    missionComplete = true;
    alert("MISSION COMPLETE! 🎉\n\nYou reached the village!");
    village.style.display = "none";
  }
}

document.addEventListener("keydown", function(event) {

  let newX = x;
  let newY = y;

  const key = event.key.toLowerCase();

  if (key === "w" || event.key === "arrowup") {
    newY -= speed;
  }

  if (key === "s" || event.key === "arrowdown") {
    newY += speed;
  }

  if (key === "a" || event.key === "arrowleft") {
    newX -= speed;
  }

  if (key === "d" || event.key === "arrowright") {
    newX += speed;
  }

  newX = Math.max(0, Math.min(newX, 765));
  newY = Math.max(0, Math.min(newY, 465));

  if (!isColliding(newX, newY)) {
    x = newX;
    y = newY;

    player.style.left = x + "px";
    player.style.top = y + "px";
  }

  checkMissionMarker();
  checkVillage();
});

startMission.addEventListener("click", function() {
  missionStarted = true;
  message.style.display = "none";
  mission.style.display = "none";

  alert("MISSION STARTED! 🎯\n\nReach the village.");
});

const exitZone = document.getElementById("exitZone");

function checkExit() {
  if (
    x > 720 &&
    y > 170 &&
    y < 330
  ) {
    alert("AREA UNLOCKED! 🏖️\n\nYou are entering the Beach area.");
  }
}

document.addEventListener("keydown", checkExit);

const beachArea = document.getElementById("beachArea");

function checkExit() {
  if (
    x > 720 &&
    y > 170 &&
    y < 330
  ) {
    document.getElementById("game").style.display = "none";
    beachArea.style.display = "block";
  }
}

document.addEventListener("keydown", checkExit);

const beachObjective = document.getElementById("beachObjective");
const beachTarget = document.getElementById("beachTarget");
const startBeachMission = document.getElementById("startBeachMission");
const beachPlayer = document.getElementById("beachPlayer");

let beachMissionStarted = false;

startBeachMission.addEventListener("click", function() {
  beachMissionStarted = true;

  beachObjective.style.display = "none";
  beachTarget.style.display = "block";
});

document.addEventListener("keydown", function() {

  if (!beachMissionStarted) return;

  const targetX = beachTarget.offsetLeft;
  const targetY = beachTarget.offsetTop;

  const playerX = beachPlayer.offsetLeft;
  const playerY = beachPlayer.offsetTop;

  const distance = Math.sqrt(
    Math.pow(playerX - targetX, 2) +
    Math.pow(playerY - targetY, 2)
  );

  if (distance < 70) {
    beachTarget.style.display = "none";
    beachMissionStarted = false;

    alert("MISSION 3 COMPLETE! 🎉\n\nBeach reconnaissance successful!");
  }
});
