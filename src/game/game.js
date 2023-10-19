import { getEmptyMap } from "./map";
import { Player } from "./player";
import { Duration } from "luxon";

const keysPressedElement = document.getElementById("keys-pressed");
const timeElapsedElement = document.getElementById("time-elapsed");

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const tileW = 100;
const gridRows = 4;
const gridCols = 4;

canvas.width = 400;
canvas.height = 400;

const player = new Player(getEmptyMap(gridRows, gridCols));
const msBOB = new Image();

msBOB.src = "/images/msbob.png";
const msBOB_x = 25;
const msBOB_y = 25;

let startTime;
let elapsedTime = 0;
let keysPressedCount = 0;

const updateTimeElapsed = () => {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    let duration = Duration.fromObject({seconds: elapsedTime});
    timeElapsedElement.textContent = duration.toFormat("hh:mm:ss");
};

export const updateKeysPressed = () => {
    keysPressedCount++;
    keysPressedElement.textContent = keysPressedCount;
};

const updateFrame = () => {
    // We need to clear the screen in order to draw the next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();

    ctx.drawImage(msBOB, msBOB_x, msBOB_y);

    window.requestAnimationFrame(updateFrame);
};

window.onload = () => {
    window.requestAnimationFrame(updateFrame);
};

const drawGrid = () => {
    for (var x = 0; x < gridRows; x++) {
        for (var y = 0; y < gridCols; y++) {
            if (player.map[x][y] == 1) {
                ctx.fillStyle = "#006666";
                ctx.fillRect(x * tileW, y * tileW, tileW, tileW);
            }
            const playerpos = player.getXY();
            if (x == playerpos.x && y === playerpos.y) {
                ctx.fillStyle = "rgba(178, 216, 216, 0.2)";
                ctx.fillRect(x * tileW, y * tileW, tileW, tileW);
                ctx.fillStyle = "black";
                ctx.fillRect(x * tileW + 50, y * tileW + 50, 1, 1);
            } else {
                ctx.strokeStyle = "#004c4c";
            }
            ctx.strokeRect(x * tileW, y * tileW, tileW, tileW);
        }
    }
};

export function startGame() {
    let menu = document.getElementById("menu");
    let gamediv = document.getElementById("game");
    menu.classList.add("hidden");
    gamediv.classList.remove("hidden");
    gamediv.style.display = "flex";

    // Only add the event listener once the game has really started.
    document.addEventListener("keydown", (event) => {
        const key = event.key;
        if (key in player) {
            console.log(`Handling the ${event.key} key`);
            event.preventDefault();
            player[key]();
        } else {
            console.log(`Unhandled key: ${event.key}`);
        }
    });
    startTime = Date.now();
    setInterval(updateTimeElapsed, 1000); // Update time every second
}

export const resetGame = () => {
    player.setXY(0, 0);

    while (player.keypresses.length > 0) {
        player.keypresses.pop();
    }

    for (var x = 0; x < gridRows; x++) {
        for (var y = 0; y < gridCols; y++) {
            player.map[x][y] = 0;
        }
        startTime = Date.now();
        keysPressedCount = 0;
        keysPressedElement.textContent = keysPressedCount;
    }
};
