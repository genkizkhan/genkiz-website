const interactive = document.querySelector(".interactive");

let curX = 0;
let curY = 0;
let tgX = 0;
let tgY = 0;

const easeFactor = 10;
/**
 * This function moves the interactive element towards the target position
 * using an ease factor to create a smooth transition.
 *
 * How it works:
 *
 * 1. Calculate the difference between the current position and the target position.
 * 2. Divide the difference by the ease factor to get the amount to move
 * 3. Add the amount to move to the current position
 * 4. Set the interactive element's transform to the new position
 * 5. Call move again on the next frame
 */
function move() {
  curX += (tgX - curX) / easeFactor;
  curY += (tgY - curY) / easeFactor;

  interactive.style.transform = `translate(${Math.round(curX)}px, ${Math.round(
    curY
  )}px)`;

  // Call move again on the next frame
  requestAnimationFrame(move);
}

window.addEventListener("pointermove", (e) => {
  tgX = e.clientX;
  tgY = e.clientY;
});

move();
