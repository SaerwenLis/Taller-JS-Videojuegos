const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnDown = document.querySelector('#down')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')

const playerPosition = {
    x: undefined,
    y: undefined,
}

let canvasSize
let elementsSize

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)
window.addEventListener('keydown', moveByKeys)

btnUp.addEventListener('click', moveUp)
btnDown.addEventListener('click', moveDown)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)

function fixNumber(n) {
    return Number(n.toFixed(0));
}

function setCanvasSize() {
/*     canvasSize = Math.min(window.innerHeight, window.innerWidth) * 0.8; */
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
      } else {
        canvasSize = window.innerHeight * 0.7;
      }
      canvasSize = Number(canvasSize.toFixed(0));
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = fixNumber(canvasSize / 10)
    
    startGame()
}

function startGame() {
    game.font = `${elementsSize}px Arial`
    game.textAlign = 'end'

    const map = maps[0]
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    game.clearRect(0,0, canvasSize, canvasSize)
    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col]
            const posX = fixNumber(elementsSize * (colIndex + 1));
            const posY = fixNumber(elementsSize * (rowIndex + 1));      

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = fixNumber(posX);
                    playerPosition.y = fixNumber(posY);
                }
            }
            game.fillText(emoji, posX, posY)
        })
    });  
    movePlayer() 
}

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function moveByKeys(event) {
    if (event.key == 'ArrowUp') {
        moveUp()
    } else if (event.key == 'ArrowLeft') {
        moveLeft()
    } else if (event.key == 'ArrowRight') {
        moveRight()
    }  else if (event.key == 'ArrowDown') {
        moveDown()  
    }   
}

function moveUp() {
    console.log('arriba')
    if((playerPosition.y - elementsSize) < elementsSize) {
        console.log('fuera');
    } else {
        playerPosition.y -= elementsSize
        startGame()
    }
}
function moveLeft() {
    console.log('izquierda')
    if((playerPosition.x - elementsSize) < 20) {
        console.log('fuera');
    } else {
    playerPosition.x -= elementsSize
    startGame()
    }
}
function moveRight() {
    console.log('derecha')
    if((playerPosition.x + elementsSize) > canvasSize) {
        console.log('fuera');
    } else {
    playerPosition.x += elementsSize
    startGame()
    }
}
function moveDown() {
    console.log('abajo')
    if((playerPosition.y + elementsSize) > canvasSize) {
        console.log('fuera');
    } else {
    playerPosition.y +=elementsSize
    startGame()
    }
}
