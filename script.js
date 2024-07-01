
// target dom
const cells = document.querySelectorAll('#cell')
const playerX = document.querySelector('.PlayerOne')
const playerO = document.querySelector('.PlayerTwo')

const modal = document.getElementById('modal')
const winner = document.querySelector('.winner');
const restart = document.getElementById('restart')
const overlay = document.getElementById('overlay')

const humberger =  document.getElementById('humberger')
const nav =  document.getElementById('nav')
const close =  document.getElementById('close')
const scoreX =  document.querySelector('.scoreX');
const scoreO =  document.querySelector('.scoreO')
const round =  document.getElementById('round')





// object gameBord
const gameBord = {
    playerOne: 'X',
    playerTwo: 'O',
    lastChoice: null,
}
// destruction
let { playerOne, playerTwo, lastChoice } = gameBord

// variables
let cnt = 0;
let cntX=0,cntY=0,rnd=0;

// add class .add
playerX.classList.add('add')

function TicTacToe (e) {

    getPlayerChoices(e)
    playerWinner()
    e.target.style.pointerEvents = 'none'
}
// get x or o  
function getPlayerChoices(e) {

    if (lastChoice == playerOne) {
        lastChoice = playerTwo;
        e.target.innerText = lastChoice;
        playerX.classList.add('add')
        playerO.classList.remove('add')

    }
    else {
        lastChoice = playerOne;
        e.target.innerText = lastChoice
        playerO.classList.add('add')
        playerX.classList.remove('add')
    }

}

// playerOne win or playerTwo
function playerWinner() {
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

let winnerFound = false;

winPatterns.forEach((pattern)=>{
    const [a,b,c]=pattern
    if(cells[a].innerText ===playerOne && cells[b].innerText === playerOne && cells[c].innerText === playerOne){
        winnerFound=true
        showModal();
        playerOneStatus()
    }else if(cells[a].innerText ===playerTwo && cells[b].innerText === playerTwo && cells[c].innerText ===playerTwo){
        winnerFound = true;
        showModal();
        playerTwoStatus()
    }
})
    
 if(!winnerFound){
    cnt++
   //The !winnerFound condition at the end ensures that if no winning pattern is detected and all cells are filled, it correctly identifies the game as a tie.

    if(cnt === cells.length){
        showModal();
        winner.innerHTML='It\'s a Tie!'
    }
 }
   
}
// info player 1
function playerOneStatus(){
    winner.innerHTML = `The winner Is ${playerOne}`
    playerO.classList.remove('add');
    playerX.classList.add('add')
   cntX++;
   scoreX.innerHTML=cntX
    rnd++;
    round.innerHTML=`round :${rnd}`
}
// info player 2
function playerTwoStatus(){
    winner.innerHTML = `The winner Is ${playerTwo}`
    playerX.classList.remove('add');
    playerO.classList.add('add')
    cntY++;
    scoreO.innerHTML=cntY;
     rnd++;
    round.innerHTML=`round :${rnd}`
}
// restart game
function restartGame (){
    cells.forEach((cell) => {
        cell.innerText = ''
        cell.style.pointerEvents='auto'

    })
    modal.style.transform = 'scale(0)';
    overlay.style.display = 'none';
    lastChoice = null;
    cnt=0;
    playerO.classList.remove('add');
    playerX.classList.add('add')

}
function showModal() {
    modal.style.cssText = 'transform:scale(1); display: flex;  flex-direction: column;  align-items: center;justify-content: center;transition: 0.3s ease;'
    overlay.style.display = 'block'
}

// show nav
function showNav(){
    nav.style.cssText= "transform: translateX(-2px); "
    }
// hideNav
function hideNav(){
  nav.style.cssText= "transform: translateX(-440px);"
}

//event listeners
cells.forEach((cell) => cell.addEventListener('click', (e)=>TicTacToe(e)))
restart.addEventListener('click', restartGame);
humberger.addEventListener('click',showNav)
close.addEventListener('click',hideNav)