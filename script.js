"use strict"

// target dom
const cells = document.querySelectorAll('#cell') // Assuming cells have class "cell"
const playerX = document.querySelector('.PlayerOne')
const playerO = document.querySelector('.PlayerTwo')

const modal = document.getElementById('modal')
const winner = document.querySelector('.winner')
const restart = document.getElementById('restart')
const overlay = document.getElementById('overlay')

const humberger = document.getElementById('humberger')
const nav = document.getElementById('nav')
const close = document.getElementById('close')
const scoreX = document.querySelector('.scoreX')
const scoreO = document.querySelector('.scoreO')
const round = document.getElementById('round')

// variables
let lastChoice = null
let cnt = 0
let cntX = 0,
    cntY = 0,
    rnd = 0

// add class .add
playerX.classList.add('add')

// Player factory function
const Player = (sign) => {
    const getSign = () => sign
    return { getSign }
}

const player1 = Player('X')
const player2 = Player('O')

const TicTacToe = (e) => {
    gameController.getPlayerChoices(e)
    gameController.playerWinner()
    e.target.style.pointerEvents = 'none'
}

const gameController = (() => {
    // get x or o
    const getPlayerChoices = (e) => {
        lastChoice = lastChoice === player1.getSign() ? player2.getSign() : player1.getSign()
        e.target.innerText = lastChoice
        displayGameController.toggleActivePlayer()
    }

    // playerOne win or playerTwo
    const playerWinner = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        let winnerFound = false

        winPatterns.forEach((pattern) => {
            const [a, b, c] = pattern
            if (cells[a].innerText === player1.getSign() && cells[b].innerText === player1.getSign() && cells[c].innerText === player1.getSign()) {
                winnerFound = true
                displayGameController.playerOneStatus()
            } else if (cells[a].innerText === player2.getSign() && cells[b].innerText === player2.getSign() && cells[c].innerText === player2.getSign()) {
                winnerFound = true
                displayGameController.playerTwoStatus()
            }
        })

        if (winnerFound) {
            displayGameController.showModal()
        } else {
            cnt++
            if (cnt === cells.length) {
                displayGameController.showModal()
                winner.innerHTML = 'It\'s a Tie!'
            }
        }
    }
    return { getPlayerChoices, playerWinner }
})()

const displayGameController = (() => {
    // toggle active player
    const toggleActivePlayer = () => {
        if (lastChoice === player1.getSign()) {
            playerX.classList.remove('add')
            playerO.classList.add('add')
        } else {
            playerO.classList.remove('add')
            playerX.classList.add('add')
        }
    }

    // update Score
    const updateScore = (player) => {
        if (player === player1.getSign()) {
            cntX++
            scoreX.innerHTML = cntX
        } else {
            cntY++
            scoreO.innerHTML = cntY
        }
        rnd++
        round.innerHTML = `Round: ${rnd}`
    }

    // info player 1
    const playerOneStatus = () => {
        winner.innerHTML = `The winner is ${player1.getSign()}`
        playerO.classList.remove('add')
        playerX.classList.add('add')
        updateScore(player1.getSign())
    }

    // info player 2
    const playerTwoStatus = () => {
        winner.innerHTML = `The winner is ${player2.getSign()}`
        playerX.classList.remove('add')
        playerO.classList.add('add')
        updateScore(player2.getSign())
    }

    // restart game
    const restartGame = () => {
        cells.forEach((cell) => {
            cell.innerText = ''
            cell.style.pointerEvents = 'auto'
        })
        modal.style.transform = 'scale(0)'
        overlay.style.display = 'none'
        lastChoice = null
        cnt = 0
        playerO.classList.remove('add')
        playerX.classList.add('add')
    }

    const showModal = () => {
        modal.style.cssText = 'transform:scale(1); display: flex;  flex-direction: column;  align-items: center;justify-content: center;transition: 0.3s ease;'
        overlay.style.display = 'block'
    }

    // show nav
    const showNav = () => {
        nav.style.cssText = "transform: translateX(-2px);"
    }

    // hideNav
    const hideNav = () => {
        nav.style.cssText = "transform: translateX(-440px);"
    }

    return { playerOneStatus, playerTwoStatus, showModal, showNav, hideNav, restartGame, toggleActivePlayer }
})()

// event listeners
cells.forEach((cell) => cell.addEventListener('click', TicTacToe))
restart.addEventListener('click', displayGameController.restartGame)
humberger.addEventListener('click', displayGameController.showNav)
close.addEventListener('click', displayGameController.hideNav)
