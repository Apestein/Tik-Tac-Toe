const Gameboard = (() => {
    let board = [
        [],[],[]
    ]
    let currentPlayer = 'X'

    function displayGame() {
        const grid = document.querySelector('main')
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const gridItem = document.createElement('div')
                board[i][j] = gridItem 
                gridItem.setAttribute('data-row', i)
                gridItem.setAttribute('data-column', j)
                gridItem.addEventListener('click', mark)
                grid.appendChild(gridItem)
            }
        }
    }
    function mark() {
        if (this.textContent !== '') return;
        if (currentPlayer === 'X') this.textContent = 'X'
        else this.textContent = 'O'
        checkGame()
        changeCurrentPlayer()
    }

    function changeCurrentPlayer() {
        if (currentPlayer === 'X') currentPlayer = 'O'
        else currentPlayer = 'X'
    }

    function isEqual(element, index, arr) {
        if (element.textContent !== '' && element.textContent === arr[0].textContent) return true
        else return false
    }

    function checkGame() {
        for (let i = 0; i < 3; i++) {
            let checkColumns = Array.from(document.querySelectorAll(`div[data-column='${i}']`)).every(isEqual)
            let checkRows = Array.from(document.querySelectorAll(`div[data-row='${i}']`)).every(isEqual)
            if (checkColumns || checkRows) console.log('WIN')
           /*  console.log(Array.from(document.querySelectorAll(`div[data-column='${i}']`)))
            console.log(Array.from(document.querySelectorAll(`div[data-row='${i}']`))) */
        }
    }
    return {displayGame}
})()
Gameboard.displayGame()