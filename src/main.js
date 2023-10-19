import { startGame, resetGame } from "./game/game";
import MobileDetect from "mobile-detect";
import "./scss/style.scss";

const playBtn = document.getElementById("play-btn");
playBtn.addEventListener("click", startGame);

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", resetGame);

const instructionsModal = document.getElementById("instructions-modal");
const instructionsBtn = document.getElementById("instructions-btn");
const span = document.getElementsByClassName("close")[0];

instructionsBtn.onclick = () => {
  instructionsModal.style.display = "block";
};

span.onclick = () => {
  instructionsModal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target == instructionsModal) {
    instructionsModal.style.display = "none";
  }
};

let md = new MobileDetect(window.navigator.userAgent);
console.log(md.mobile());

if (md.mobile() != null) {
  document.querySelector(".button-container").style.display = "flex";
}
