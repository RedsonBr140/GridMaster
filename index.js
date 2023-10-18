const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

const playerActions = []

document.addEventListener('keydown', (event) => {
  const moveFunction = player.acceptedMoves[event.key]
  if (moveFunction) {
    console.log(`Handling the ${event.key} key`)
    event.preventDefault()
    moveFunction(player, event.key)
  } else {
    console.log(`Unhandled key: ${event.key}`)
  }
})

const tileW = 100

const gridRows = 4
const gridCols = 3

let msBOB = new Image()
msBOB.src = './assets/msbob.png'
const msBOB_x = 25
const msBOB_y = 25

const player = {
  x: 0,
  y: 0,
  acceptedMoves: {
    ArrowUp: function (player, key) {
      if (player.y - 1 >= 0) {
        player.y -= 1
        playerActions.push(key) // Log the action
      }
    },
    ArrowDown: function (player, key) {
      if (player.y + 1 <= 2) {
        player.y += 1
        playerActions.push(key) // Log the action
      }
    },
    ArrowLeft: function (player, key) {
      if (player.x - 1 >= 0) {
        player.x -= 1
        playerActions.push(key) // Log the action
      }
    },
    ArrowRight: function (player, key) {
      if (player.x + 1 <= 3) {
        player.x += 1
        playerActions.push(key) // Log the action
      }
    },
    x: function (player, key) {
      map[player.x][player.y] = 1
      playerActions.push(key) // Log the action
    }
  }
}

var map = new Array(gridRows)
for (let i = 0; i < gridRows; i++) {
  map[i] = new Array(gridCols)
}

const updateFrame = () => {
  // We need to clear the screen in order to draw the next frame
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawGrid()

  ctx.drawImage(msBOB, msBOB_x, msBOB_y)

  window.requestAnimationFrame(updateFrame)
}

window.onload = () => {
  window.requestAnimationFrame(updateFrame)
}

const drawGrid = () => {
  for (var x = 0; x < gridRows; x++) {
    for (var y = 0; y < gridCols; y++) {
      if (map[x][y] == 1) {
        ctx.fillStyle = '#33ced6'
        ctx.fillRect(x * tileW, y * tileW, tileW, tileW)
      }
      if (x == player.x && y === player.y) {
        console.log(`X: ${x}, player: ${player.x}\nY: ${y} player: ${player.y}`)
        ctx.fillStyle = 'rgba(255, 255, 0, 0.2)'
        ctx.fillRect(x * tileW, y * tileW, tileW, tileW)
        ctx.fillStyle = 'black'
        ctx.fillRect(x * tileW + 50, y * tileW + 50, 1, 1)
      } else {
        ctx.strokeStyle = '#161718'
      }
      ctx.strokeRect(x * tileW, y * tileW, tileW, tileW)
    }
  }
}

const resetGame = () => {
  player.x = 0
  player.y = 0

  while (playerActions.length > 0) {
    playerActions.pop()
  }

  for (var x = 0; x < gridRows; x++) {
    for (var y = 0; y < gridCols; y++) {
      map[x][y] = 0
    }
  }
}
