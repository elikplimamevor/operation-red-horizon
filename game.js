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


// ==============================
// PLAYER COLLISION
// ==============================

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


// ==============================
// MISSION 1
// ==============================

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

    alert(
      "MISSION COMPLETE! 🎉\n\n" +
      "You reached the village!"
    );

    village.style.display = "none";
  }
}


startMission.addEventListener("click", function() {

  missionStarted = true;

  message.style.display = "none";
  mission.style.display = "none";

  alert(
    "MISSION STARTED! 🎯\n\n" +
    "Reach the village."
  );
});


// ==============================
// PLAYER MOVEMENT
// ==============================

document.addEventListener("keydown", function(event) {

  let newX = x;
  let newY = y;

  const key = event.key.toLowerCase();

  if (key === "w" || key === "arrowup") {
    newY -= speed;
  }

  if (key === "s" || key === "arrowdown") {
    newY += speed;
  }

  if (key === "a" || key === "arrowleft") {
    newX -= speed;
  }

  if (key === "d" || key === "arrowright") {
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
  checkExit();
  checkIndustrialTarget();
});


// ==============================
// BEACH AREA
// ==============================

const beachArea = document.getElementById("beachArea");
const exitZone = document.getElementById("exitZone");

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


// ==============================
// BEACH MISSION 3
// ==============================

const beachObjective =
  document.getElementById("beachObjective");

const beachTarget =
  document.getElementById("beachTarget");

const startBeachMission =
  document.getElementById("startBeachMission");

let beachMissionStarted = false;


startBeachMission.addEventListener("click", function() {

  beachMissionStarted = true;

  beachObjective.style.display = "none";
  beachTarget.style.display = "block";

  alert(
    "MISSION 3 STARTED! 🎯\n\n" +
    "Explore the beach and reach the marker."
  );
});


// ==============================
// INDUSTRIAL MISSION 4
// ==============================

const industrialMission =
  document.getElementById("industrialMission");

const industrialTarget =
  document.getElementById("industrialTarget");

const startIndustrialMission =
  document.getElementById("startIndustrialMission");

let industrialMissionStarted = false;


startIndustrialMission.addEventListener("click", function() {

  industrialMissionStarted = true;

  industrialMission.style.display = "none";
  industrialTarget.style.display = "block";

  alert(
    "MISSION 4 STARTED! 🎯\n\n" +
    "Find the communications terminal."
  );
});


function checkIndustrialTarget() {

  if (!industrialMissionStarted) return;

  const targetX = industrialTarget.offsetLeft;
  const targetY = industrialTarget.offsetTop;

  const distance = Math.sqrt(
    Math.pow(x - targetX, 2) +
    Math.pow(y - targetY, 2)
  );

  if (distance < 70) {

    industrialMissionStarted = false;

    industrialTarget.style.display = "none";

    alert(
      "MISSION 4 COMPLETE! 🎉\n\n" +
      "You found the communications terminal."
    );
  }
}


// ==============================
// COMMANDER MAYA
// ==============================

const commander =
  document.getElementById("commander");

const commanderMessage =
  document.getElementById("commanderMessage");

const closeCommander =
  document.getElementById("closeCommander");


commander.addEventListener("click", function() {

  commanderMessage.style.display = "block";
});


closeCommander.addEventListener("click", function() {

  commanderMessage.style.display = "none";
});

const healthDisplay = document.getElementById("health");
const missionStatus = document.getElementById("missionStatus");

let health = 100;

function updateHealth(amount) {
  health += amount;

  health = Math.max(0, Math.min(100, health));

  healthDisplay.textContent = health;

  if (health <= 0) {
    alert("MISSION FAILED!\n\nYour health reached zero.");
    location.reload();
  }
}
