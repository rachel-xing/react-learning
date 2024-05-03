import {useState} from "react";
import {PLAYERS, SYMBOL, INITIAL_GAME_BOARD} from "./utils.js";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";

function deriveGameBoard(gameTurns) {
  const gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length && gameTurns[0].player === "X") {
    currentPlayer = "O"
  }
  return currentPlayer
}



function App() {
  const [players, setPlayer] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])
  const gameBoard = deriveGameBoard(gameTurns)
  const activePlayer = deriveActivePlayer(gameTurns)

  function handleNameChange(symbol, newName) {
    setPlayer(prevPlayer => ({
      ...prevPlayer,
      [symbol]: newName,

    }))
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      return [
        {
          square: {
            row: rowIndex,
            col: colIndex
          },
          player: currentPlayer
        },
        ...prevTurns
      ];
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            symbol={SYMBOL.X}
            onChange={handleNameChange}
            isActive={activePlayer === 'X'}
          />
          <Player
            symbol={SYMBOL.O}
            onChange={handleNameChange}
            isActive={activePlayer === "O"}
          />
        </ol>

        <GameBoard
          board={gameBoard}
          onSelectSquare={handleSelectSquare}
        />
      </div>
    </main>


  )
}

export default App;