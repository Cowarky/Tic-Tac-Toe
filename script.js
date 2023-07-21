// Saved Data
const gameData = {
  "playerX": {
      "name": "",
      "type": "x",
      "turn": 0,
      "plays": [],
      "statues": "",
      "img": "./images/X.png",
      "score": 0,
      "wins": 0
  },
  "playerO": {
      "name": "",
      "type": "o",
      "turn": 0,
      "plays": [],
      "statues": "",
      "img": "./images/O.png",
      "score": 0,
      "wins": 0
  }
}

document.addEventListener("DOMContentLoaded", () => {
  

    const menuBtn = document.querySelector('.menu-btn');
    const menuItems = document.querySelector('.items');
    const turnIndicator = document.querySelector('.turn');
    const squares = document.querySelectorAll('.square');
    const modal = document.querySelector('.modal');
    const modalContents = document.querySelector('.modal-contents');
    const resetBtn = document.querySelector('[data-id="reset-btn"]');
    const newRoundBtn = document.querySelector('[data-id="new-round-btn"]');
    const tiesStats = document.querySelector('[data-id="ties"]');

    var Turn = 0

    PlayerNameSelection()
    var _current = gameData.playerO;
    var next = gameData.playerX;
  // Who starts Logic
    var PlayerRandomNumberX = Math.floor( Math.random() * 10) +1
    var PlayerRandomNumberO = Math.floor( Math.random() * 10) +1

    resetBtn.addEventListener("onclick", ()=>{
      if (PlayerRandomNumberO > PlayerRandomNumberX){
      gameData.playerO.turn = 1;
      gameData.playerX.turn = 0;
      _current = gameData.playerO
      next = gameData.playerX
      }else {
        gameData.playerO.turn = 0;
        gameData.playerX.turn = 1;
        _current = gameData.playerX
        next = gameData.playerO
      }
      turnIndicator.innerHTML = `<i class="fa-solid fa-${_current.type}"></i><p>Player ${_current.name.toLowerCase()}, your turn</p>`;
    })
    if (PlayerRandomNumberO > PlayerRandomNumberX){
      gameData.playerO.turn = 1;
      gameData.playerX.turn = 0;
      _current = gameData.playerO
      next = gameData.playerX
      }else {
        gameData.playerO.turn = 0;
        gameData.playerX.turn = 1;
        _current = gameData.playerX
        next = gameData.playerO
      }
    
    
    document.addEventListener("focusout", function(event) {
      if (gameData.playerO.name !== "" && gameData.playerX.name !== ""){
          document.getElementById('Game').style.display = "block"
          document.getElementById('X').style.display = "None"
          document.getElementById('O').style.display = "None"
          turnIndicator.innerHTML = `<i class="fa-solid fa-${_current.type}"></i><p>Player ${_current.name.toLowerCase()}, your turn</p>`;
        } 
      })
    
    console.log(_current)
    var numberOfTurns = squares.length;
    squares.forEach((square, i) => {
    var img = document.createElement('img');
    img.style.width = "85%";
    square.addEventListener("click", function (event) {
    numberOfTurns--;
    Turn++;
    _current.turn = Turn
    next.turn = Turn
    if (_current.turn % 2 == 0) {
      img.src = _current.img;
      turnIndicator.innerHTML = `<i class="fa-solid fa-${_current.type}"></i><p>Player ${_current.name.toLowerCase()}, your turn</p>`;
      _current.plays[i] = i;
      console.log(_current);
    } else {
      img.src = next.img;
      turnIndicator.innerHTML = `<i class="fa-solid fa-${next.type}"></i><p>Player ${next.name.toLowerCase()}, your turn</p>`;
      next.plays[i] = i;
      console.log(next);
    }
    square.appendChild(img);

    if (_CheckWinner(_current)) {
      // Player _current has won
      next.wins += 1;
      turnIndicator.innerHTML = `<i class="fa-solid fa-${next.type}"></i><p>Player ${next.name.toLowerCase()}, WINS!</p>`;
      document.querySelector('[data-id="player-'+next.type+'-stats"]').innerHTML = next.wins + " wins";
      console.log(next);
      return;
    } else if (_CheckWinner(next)) {
      // Player next has won
      _current.wins += 1;
      turnIndicator.innerHTML = `<i class="fa-solid fa-${_current.type}"></i><p>Player ${_current.name.toLowerCase()}, WINS!</p>`;
      document.querySelector('[data-id="player-'+_current.type+'-stats"]').innerHTML = _current.wins + " wins";
      console.log(_current);
      return;
    }

    checkDraw(Turn);
  });
});
    Turn = 0
    function _CheckWinner(player) {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];
      let count = 0;
      player.plays.forEach((play) => {
        winningCombinations.forEach((combo) => {
          if (combo.every(element => player.plays.includes(element))) {
            count++
            player.score++
            checkScore(player)
          }
        });
      });
      
      return count;
    }
    function checkScore(player){
      if (player.score == 3){
        return true
      }
      return false
    }
    function checkDraw(turn){
      if (turn == squares.length && (!checkScore(gameData.playerO) || !checkScore(gameData.playerO))){
        tiesStats.innerHTML = parseInt(1+parseInt(tiesStats.innerHTML))
        return "Draw"
      }
    }
    
    // console.log(gameData)
    let winner = null; // Tracks the winner of the game
    let player1Score = 0; // Player 1 score
    let player2Score = 0; // Player 2 score
    let ties = 0; // Ties count
  
    menuBtn.addEventListener("click", () => {
      menuItems.classList.toggle("hidden");
    });
  
  
    resetBtn.addEventListener("click", resetGame);
    newRoundBtn.addEventListener("click", resetGame);
  
    function updateScores() {
      if (winner === "X") {
        player1Score++;
      } else if (winner === "O") {
        player2Score++;
      } else if (winner === "tie") {
        ties++;
      }
  
      player1Stats.textContent = `${player1Score} Wins`;
      player2Stats.textContent = `${player2Score} Wins`;
      tiesStats.textContent = `${ties}`;
    }
  
    function showModal(message) {
      modal.classList.remove("hidden");
      modalContents.innerHTML = `<p>${message}</p><button>Play again</button>`;
      const playAgainBtn = modalContents.querySelector("button");
      playAgainBtn.addEventListener("click", resetGame);
    }
  
    function resetGame() {
      winner = null;
      squares.forEach((square) => {
        if (square.firstChild) {
          square.removeChild(square.firstChild);
        }
      });
      Turn = 0
      numberOfTurns = 9
      modal.classList.add("hidden");
      gameData.playerO.score = 0
      gameData.playerO.plays = []
      gameData.playerO.turn = 0

      gameData.playerX.score = 0
      gameData.playerX.plays = []
      gameData.playerX.turn = 0
      // turnIndicator.innerHTML = `<i class="fa-solid fa-${currentPlayer.toLowerCase()}"></i><p>Player ${currentPlayer}, your turn</p>`;
    }

  });

  // Turn handler
  

window.addEventListener("load", Script.init);


function PlayerNameSelection(){
  // Player input
  // var players = document.querySelectorAll('input[type="text"]');
  var playerX = document.querySelectorAll('input[type="text"]')[0];
  var playerO = document.querySelectorAll('input[type="text"]')[1];

  playerX.addEventListener("focusout", function(event) {
    gameData.playerX.name = playerX.value
    console.log(gameData)
  });
  playerO.addEventListener("focusout", function(event) {
    gameData.playerO.name = playerO.value
    console.log(gameData)
  });
}

function resetButton(squares){
  gameData.playerO.score = 0
  gameData.playerO.plays = []
  gameData.playerO.turn = 0

  gameData.playerX.score = 0
  gameData.playerX.plays = []
  gameData.playerX.turn = 0
  console.log("reset")
}