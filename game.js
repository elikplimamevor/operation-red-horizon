const player = document.getElementById("player");
const buildings = document.querySelectorAll(".building");

let x = 380;
let y = 230;
const speed = 10;

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

document.addEventListener("keydown", function(event) {

  let newX = x;
  let newY = y;

  if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
    newY -= speed;
  }

  if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
    newY += speed;
  }

  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    newX -= speed;
  }

  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    newX += speed;
  }

  // Keep player inside the map
  newX = Math.max(0, Math.min(newX, 765));
  newY = Math.max(0, Math.min(newY, 465));

  // Move only if there is no building
  if (!isColliding(newX, newY)) {
    x = newX;
    y = newY;
  }

  player.style.left = x + "px";
  player.style.top = y + "px";
});
