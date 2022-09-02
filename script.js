const Gameboard = (() => {
    const x = document.querySelector('.x')
    const o = document.querySelector('.o')
    const restartBtn = document.querySelector('.restart')
    const playAgainBtn = document.querySelector('.play-again')
    const modal = document.querySelector('.modal')
    const winnerMSG = document.querySelector('.winner-msg')
    x.onclick = choosePlayer
    o.onclick = choosePlayer
    restartBtn.onclick = () => location.reload()
    playAgainBtn.onclick = () => location.reload()
    let currentPlayer = 'X'

    function displayGame() {
        const grid = document.querySelector('main')
        let count = 0
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const gridItem = document.createElement('div')
                gridItem.setAttribute('data-row', i)
                gridItem.setAttribute('data-column', j)
                if (count === 0 || count === 4 || count === 8) gridItem.classList.add('left-diagonal')    
                if (count === 2 || count === 4 || count === 6) gridItem.classList.add('right-diagonal')
                count++
                gridItem.addEventListener('click', mark)
                grid.appendChild(gridItem)
            }
        }
    }
    function mark() {
        if (this.textContent !== '') return;
        this.textContent = currentPlayer
        if(checkGame()) return;
        changeCurrentPlayer()
        setTimeout(playAI, 500)
    }

    function playAI() {
        let slots = Array.from(document.querySelectorAll('main>div')).filter((element => element.textContent === ''))
        if (slots.length == 0) return;
        let num = Math.floor(Math.random() * (slots.length-1))
        slots[num].textContent = currentPlayer
        checkGame()
        changeCurrentPlayer()
    }

    function choosePlayer() {
        currentPlayer = this.textContent
    }

    function changeCurrentPlayer() {
        if (currentPlayer === 'X') currentPlayer = 'O'
        else currentPlayer = 'X'
    }

    function isEqual(element, index, arr) {
        if (element.textContent !== '' && element.textContent === arr[0].textContent) return true
        else return false
    }

    function displayWinner(tie) {
        const winner = document.createElement('h1')
        if (tie) winner.textContent = 'Tie'
        else winner.textContent = `${currentPlayer} is the Winner!`
        winnerMSG.appendChild(winner)
        modal.style.display = 'block'
    }

    function checkGame() {
        for (let i = 0; i < 3; i++) {
            let checkColumns = Array.from(document.querySelectorAll(`div[data-column='${i}']`)).every(isEqual)
            let checkRows = Array.from(document.querySelectorAll(`div[data-row='${i}']`)).every(isEqual)
            if (checkColumns || checkRows) {
                displayWinner()
                return true
            }
        }
        let leftDiagonal = Array.from(document.querySelectorAll('.left-diagonal')).every(isEqual)
        let rightDiagonal = Array.from(document.querySelectorAll('.right-diagonal')).every(isEqual)
        if (leftDiagonal || rightDiagonal) {
            displayWinner()
            return true
        }
        let nl = Array.from(document.querySelectorAll('main>div'))
        if (!nl.some((element) => element.textContent === '')) displayWinner(true) 
    }
    return {displayGame}
})()
Gameboard.displayGame()