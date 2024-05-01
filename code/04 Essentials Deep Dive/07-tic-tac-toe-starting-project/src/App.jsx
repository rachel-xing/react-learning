import {useState} from "react";
import {SYMBOL, INITIAL_GAME_BOARD} from './utils.js';
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = SYMBOL.X;
  if (gameTurns.length > 0 && gameTurns[0].player === SYMBOL.X) {
    currentPlayer = SYMBOL.O;
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for (const turn of gameTurns) {
    let {square,player} = turn
    let {row,col} = square
    gameBoard[row][col] = player
  }
  return gameBoard;
}


function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = deriveGameBoard(gameTurns)
  const activePlayer = deriveActivePlayer(gameTurns)



  function handleNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      return [
        {
          square: {
            row: rowIndex,
            col: colIndex
          },
          player: currentPlayer
        },
        ...prevTurns
      ]
    })


  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            symbol={SYMBOL.X}
            onNameChange={handleNameChange}
            isActive={activePlayer===SYMBOL.X}
          />
          <Player
            symbol={SYMBOL.O}
            onNameChange={handleNameChange}
            isActive={activePlayer===SYMBOL.O}
          />
        </ol>

        <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare}/>
      </div>


      Log
    </main>
  )

}

export default App