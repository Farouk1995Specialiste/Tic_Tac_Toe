"use strict"

// target dom
const cells =[ ...document.querySelectorAll('#cell') ];

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
let cntX = 0,
    cntY = 0,
    rnd = 0
 let turnX=true;
// add class .add
playerX.classList.add('add')

// array of patterns
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
// Player factory function
const Player = (sign) => {
    const getSign = () => sign
    return { getSign }
}

const player1 = Player('X')
const player2 = Player('O')
// loop throu the grid
cells.forEach((cell) => cell.addEventListener('click', (e)=>{
    if ( turnX && cell.innerHTML === `` ) {
        e.target.innerText = player1.getSign();
        turnX =!turnX 
        displayGameController.toggleActivePlayer(); 
    } else if (!turnX && cell.innerHTML === `` ) {
        e.target.innerText = player2.getSign(); 
        turnX =!turnX
        displayGameController.toggleActivePlayer(); 
    }
    gameController.playerWinner()
}))



const gameController = (() => {

    // playerOne win or playerTwo
    const playerWinner = () => {
    
        let winnerFound = false

            if (checkWinerX()) {
                winnerFound = true
                displayGameController.playerOneStatus()
            } else if (checkWinerO()) {
                winnerFound = true
                displayGameController.playerTwoStatus()
            }
         if(winnerFound){
            displayGameController.showModal()

         }else{
            if (isTie()) {
                displayGameController.showModal()
                winner.innerHTML = 'It\'s a Tie!'
            }
         }
           
        
    }
    return {  playerWinner }
})()
// WIN X
function checkWinerX(){
return winPatterns.some((combinaition)=>{
    return combinaition.every((i)=>{
        return cells[i].innerText === player1.getSign();
    })
})
}
// win O
function checkWinerO(){
    return winPatterns.some((combinaition)=>{
        return combinaition.every((i)=>{
            return cells[i].innerText === player2.getSign();
        })
    })
    }
// Tie
 function isTie(){
    return cells.every((cell)=>cell.innerText ===player1.getSign() || cell.innerText === player2.getSign())
 }
    // Dom manipulation
const displayGameController = (() => {
    // toggle active player
    let toggle = true
    const toggleActivePlayer = () => {
        if ( player1.getSign() && toggle) {
            playerX.classList.remove('add')
            playerO.classList.add('add')
            toggle =!toggle
        } else if(player2.getSign() && !toggle) {
            playerO.classList.remove('add')
            playerX.classList.add('add')
            toggle = !toggle
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
        })
        modal.style.transform = 'scale(0)'
        overlay.style.display = 'none'
         turnX = true;
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
restart.addEventListener('click', displayGameController.restartGame)
humberger.addEventListener('click', displayGameController.showNav)
close.addEventListener('click', displayGameController.hideNav)
