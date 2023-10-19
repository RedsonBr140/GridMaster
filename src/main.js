import { startGame, resetGame } from "./game/game";
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
