import {useState} from "react";
import {SYMBOL, PLAYERS, INITIAL_GAME_BOARD} from "./utils.js";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

function deriveActivePlayer(gameTurns) {
  let activePlayer = SYMBOL.X;
  if (gameTurns.length > 0 && gameTurns[0].player === SYMBOL.X) {
    activePlayer = SYMBOL.O;
  }
  return activePlayer
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square
    gameBoard[row][col] = player
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    let first = gameBoard[combination[0].row][combination[0].column];
    let second = gameBoard[combination[1].row][combination[1].column];
    let third = gameBoard[combination[2].row][combination[2].column];

    if (first && first === second && first === third) {
      winner = players[first]
      return winner;
    }
  }

}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = deriveGameBoard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns)
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner

  function handleNameUpdate(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
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

  function handleRematch() {
    setGameTurns([])
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            symbol={SYMBOL.X}
            onNameUpdate={handleNameUpdate}
            isActive={activePlayer === SYMBOL.X}
          />
          <Player
            symbol={SYMBOL.O}
            onNameUpdate={handleNameUpdate}
            isActive={activePlayer === SYMBOL.O}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch}/>
        }

        <GameBoard
          board={gameBoard}
          onSelectSquare={handleSelectSquare}/>
      </div>
      <Log turns={gameTurns}/>

    </main>
  )
}

export default App;