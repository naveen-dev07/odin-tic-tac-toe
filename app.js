const name = document.querySelector("#player-one")
const points = document.querySelector("#score-one")
const secondName = document.querySelector("#secondplayer")
const secondPoint = document.querySelector("#secondpoint")
const turnText  = document.querySelector("#status-text")
const cell = document.querySelectorAll(".cell")
const resetBtn = document.querySelector(".btn")

const gameboard = (() =>{
      const board = ["","","","","","","","",""];
     
      const getBoard = () => board;

      const placeMarker = (index ,marker ) => {
        if (board[index] === "") {
            board[index] = marker;
            return true ;
        }
        return false;
      }
      const reset = () => {
            board.forEach((_,i)=> board[i] = "");
      };
      return {getBoard , placeMarker , reset}

})();

function createPlayer (name,marker ) {
 return{name , marker};
}
const Game = (() => {
  const playerOne = createPlayer("Player 1" , "X");
  const playerTwo = createPlayer("Player 2" , "O");
  let currentPlayer = playerOne;
  let gameOver = false;

  function switchTurn (){
      if (currentPlayer === playerOne) {
            currentPlayer =playerTwo 
      }else{
            currentPlayer = playerOne
      }
  }
  function checkWin (marker){
     const winCombination = [
      [0,1,2], [3,4,5], [6,7,8],  
      [0,3,6], [1,4,7], [2,5,8],  
      [0,4,8], [2,4,6] 
      ]
      const board = gameboard.getBoard()
      for (const combination of winCombination) {
      if (marker === board[combination[0]] && marker ===board[combination[1]] && marker === board[combination[2]]) {
           return true ;  
      }
     
}
return false;
  }
  function checkDraw() {
      const board = gameboard.getBoard()
      if (!board.includes("")) {
      return true ; 
    }else{
      return false;
    }
  }

function handleClick (index){
      if (gameOver === true) {
      return;  
      }if (gameboard.placeMarker(index, currentPlayer.marker) === false) {
        return;
}
 
cell[index].textContent = currentPlayer.marker 
if (checkWin(currentPlayer.marker)) {
      turnText.textContent = currentPlayer.name + "YOU WINS !"
      gameOver = true
      return;
}
if (checkDraw()) {
      turnText.textContent = "DRAW!"
      gameOver = true
      return;
}
switchTurn()
turnText.textContent = currentPlayer.name + "'S TURNS"
      
  }
  function reset (){
      gameboard.reset()
      currentPlayer = playerOne
      gameOver = false
      cell.forEach(c => c.textContent = "")
      turnText.textContent = "X'S TURN"
  }
  cell.forEach((c, index) => {
  c.addEventListener("click", () => {
    handleClick(index);
  });
});

resetBtn.addEventListener("click", () => {
  reset();
});
return {};
})();
