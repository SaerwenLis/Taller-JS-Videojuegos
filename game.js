const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize
let elementsSize

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

function setCanvasSize() {
    canvasSize = Math.min(window.innerHeight, window.innerWidth) * 0.75;

/*     if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8
    } else {
        canvasSize = window.innerHeight * 0.8
    } */
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = canvasSize / 10.4
    
    startGame()
}

function startGame() {
    game.font = `${elementsSize}px Arial`
    game.textAlign = 'center'

    const map = maps[0]
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col]
            const posX = elementsSize * (colIndex + 1)
            const posY = elementsSize * (rowIndex + 1)
            game.fillText(emoji, posX, posY)
        })
    });

/*     for (let row = 1; row <= 10; row++) {
       for (let col = 1; col <= 10; col++) {
        game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row)
       }
    } */
}