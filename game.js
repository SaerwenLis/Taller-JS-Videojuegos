const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnDown = document.querySelector('#down')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const spanLives = document.querySelector('#lives')

const playerPosition = {
    x: undefined,
    y: undefined,
}

let canvasSize
let elementsSize
let level = 0
let lives = 3

const giftPosition = {
    x: undefined,
    y: undefined,
}

let enemyPositions = []

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

    const map = maps[level]
    if (!map) {
        gameWin()
        return
    }
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    enemyPositions = [] 
    game.clearRect(0,0, canvasSize, canvasSize)

    showLives()

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
            } else if (col == 'I') {
                giftPosition.x = fixNumber(posX);
                giftPosition.y = fixNumber(posY);
            } else if (col == 'X') {
                enemyPositions.push({
                    x: fixNumber(posX),
                    y: fixNumber(posY),
                })
            }
            game.fillText(emoji, posX, posY)
        })
    });  
    movePlayer() 
}

function movePlayer() {
    const giftCollisionX = playerPosition.x == giftPosition.x
    const giftCollisionY = playerPosition.y == giftPosition.y
    const giftCollision = giftCollisionX && giftCollisionY

    if (giftCollision) {
        levelUp()
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x == playerPosition.x
        const enemyCollisionY = enemy.y == playerPosition.y
        return enemyCollisionX && enemyCollisionY
    })
    if (enemyCollision) {
        levelFail()
    }

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

function levelUp() {
    console.log('Subiste de nivel');
    level++
    startGame()
}

function gameWin() {
    console.log('Terminaste el juego');
}

function levelFail() {
    console.log('BOOM! estas muerto!');
    lives--

    if (lives <= 0) {
        level = 0
        lives = 3
    }
    console.log(lives);  
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function showLives() {
/*     const heartsArray = Array(lives).fill(emojis['HEART'])
    spanLives.innerHTML = ==
    heartsArray.forEach(heart => spanLives.append(heart)) */
    spanLives.innerHTML = emojis["HEART"].repeat(lives)
}