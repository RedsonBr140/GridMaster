import { updateKeysPressed } from "./game";

export class Player {
    map;
    #x;
    #y;

    constructor(map) {
        this.#x = 0;
        this.#y = 0;
        this.keypresses = [];
        this.map = map;
    }

    getXY() {
        return {
            x: this.#x,
            y: this.#y,
        };
    }

    setXY(x, y) {
        this.#x = x;
        this.#y = y;
    }

    ArrowUp() {
        if (this.#y - 1 >= 0) {
            this.#y -= 1;
            this.keypresses.push("ArrowUp"); // Log the action
            updateKeysPressed();
        }
    }

    ArrowDown() {
        if (this.#y + 1 <= 3) {
            this.#y += 1;
            this.keypresses.push("ArrowDown"); // Log the action
            updateKeysPressed();
        }
    }

    ArrowLeft() {
        if (this.#x - 1 >= 0) {
            this.#x -= 1;
            this.keypresses.push("ArrowLeft"); // Log the action
            updateKeysPressed();
        }
    }

    ArrowRight() {
        if (this.#x + 1 <= 3) {
            this.#x += 1;
            this.keypresses.push("ArrowRight"); // Log the action
            updateKeysPressed();
        }
    }

    x() {
        let currentpos = this.map[this.#x][this.#y];
        if (currentpos != 1) {
            this.map[this.#x][this.#y] = 1;
            this.keypresses.push("x");
            updateKeysPressed();
        }
    }
}
