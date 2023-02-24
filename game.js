const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnDown = document.querySelector('#down')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time') 
const spanRecord = document.querySelector('#record')
const results = document.querySelector('#result')
const btnRestart = document.querySelector('#restart')

const playerPosition = {
    x: undefined,
    y: undefined,
}

const firePosition = {
    x: undefined,
    y: undefined,
}

let canvasSize
let elementsSize

let level = 0
let lives = 3

let timeStart
let timeInterval

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
btnRestart.addEventListener('click', restartGame)

//Para sacar los decimales
function fixNumber(n) {
    return Number(n.toFixed(0));
}

//Tamaño dinamico del canvas segun la resolucion de la pantalla
function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
      } else {
        canvasSize = window.innerHeight * 0.7;
      }
      canvasSize = Number(canvasSize.toFixed(0));
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = fixNumber(canvasSize / 10)
    
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

//Para renderizar el mapa dentro del canvas
function startGame() {
    game.font = `${elementsSize * 0.95}px Arial`
    game.textAlign = 'end'

    const map = maps[level]
    if (!map) {
        gameWin()
        return
    }
    
    if (!timeStart) {
        timeStart = Date.now()
        timeInterval = setInterval(showTime, 100)
        showRecord()
    }
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    enemyPositions = [] 
    game.clearRect(0,0, canvasSize, canvasSize)

    showLives()

    //Ubicacion de elementos
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

//Movimientos del jugador
function movePlayer() {
    const giftCollisionX = playerPosition.x == giftPosition.x
    const giftCollisionY = playerPosition.y == giftPosition.y
    const giftCollision = giftCollisionX && giftCollisionY
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)

    //Si se encuentra con el paquete sube de nivel
    if (giftCollision) {
        levelUp()
    }

    //Si se encuentra con una bomba pierde una vida 
    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x == playerPosition.x
        const enemyCollisionY = enemy.y == playerPosition.y
        return enemyCollisionX && enemyCollisionY
    })

    if (enemyCollision) {
        firePosition.x = playerPosition.x;
        firePosition.y = playerPosition.y;
        game.fillText(emojis['E'], firePosition.x, firePosition.y)
        setTimeout(levelFail, 1000);
    } 
}

//Movimiento con teclas y mouse
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

//Subir de nivel
function levelUp() {
    console.log('Subiste de nivel');
    level++
    startGame()
}

//Guardando los records al ganar el juego y cartel de ganaste
function gameWin() {
    console.log('Terminaste el juego');
    clearInterval(timeInterval)

    const recordTime = localStorage.getItem('record_time')
    const playerTime = Date.now() - timeStart
    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime)
            results.innerHTML = 'Haz establecido un nuevo record'
            btnRestart.style.display = ''
        } else {
            results.innerHTML = 'No superaste el record'
            btnRestart.style.display = ''
        }
    } else {
        localStorage.setItem('record_time', playerTime)
        results.innerHTML = 'Haz establecido un nuevo record'
        btnRestart.style.display = ''
    }
    canvasMsg('Ganaste!🥳')
}

//Muestra el tiempo corriendo
function showTime() {
    spanTime.innerHTML = Date.now() - timeStart
}

//Muestra el record guardado
function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time')
}

//Quitar vidas y boton de reinicio
function levelFail() {
    console.log('BOOM! estas muerto!');
    lives--
    playerPosition.x = undefined
    playerPosition.y = undefined

    if (lives <= 0) {
        game.clearRect(0,0, canvasSize, canvasSize)
        setTimeout(fireExplosion, 1)
        btnRestart.style.display = ''
    }
    console.log(lives);  
    startGame()
}

//Reiniciar el juego
function restartGame() {
    location.reload()
}

//Mostrar corazones en funcion de cuantas vidas tiene
function showLives() {
    spanLives.innerHTML = emojis["HEART"].repeat(lives)
}

//Renderizar fuego en todo el canvas al perder las 3 vidas, y cartel de perdiste
function fireExplosion() {
    console.log('explosion')
    game.clearRect(0,0, canvasSize, canvasSize)
    game.font = `${elementsSize * 0.95}px Arial`
    game.textAlign = 'end'
    const explosions = explosion[0]
    const expRows = explosions.trim().split('\n')
    const expRowCols = expRows.map(row => row.trim().split(''))

    expRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col]
            const posX = fixNumber(elementsSize * (colIndex + 1));
            const posY = fixNumber(elementsSize * (rowIndex + 1));      

            game.fillText(emoji, posX, posY)
        })
    });  
    canvasMsg('Perdiste 😔')
    clearInterval(timeInterval)
}

//Creacion de los carteles 
function canvasMsg(msj) {
    game.fillStyle = 'rgb(50, 18, 73)';
    game.fillRect(0, (canvasSize/2.5), canvasSize, 80);
    game.fillStyle = '#b1e7e2';
    game.textAlign = 'center';
    game.fillText(msj,(canvasSize/2),(canvasSize/2));
}