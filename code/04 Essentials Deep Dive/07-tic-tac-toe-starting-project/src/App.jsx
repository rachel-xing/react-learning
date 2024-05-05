import {useState} from "react";
import {SYMBOL,PLAYERS,INITIAL_GAME_BOARD} from "./utils.js";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

function deriveActivePlayer(gameTurns) {
  let activePlayer = SYMBOL.X;
  if (gameTurns.length > 0 && gameTurns[0].player === SYMBOL.X) {
    activePlayer = SYMBOL.O;
  }
  return activePlayer
}

function App() {
  const [players,setPlayers] = useState(PLAYERS);
  const [gameTurns,setGameTurns] = useState([])
  const gameBoard = [...INITIAL_GAME_BOARD.map(array=> [...array])];
  const activePlayer = deriveActivePlayer(gameTurns)
  for (const turn of gameTurns) {
    const {square,player} = turn;
    const {row,col} = square
    gameBoard[row][col] = player
  }

  function handleNameUpdate(symbol,newName) {
    setPlayers(prevPlayers => {
      return {
      ...prevPlayers,
      [symbol]: newName
      }
    })
  }

  function handleSelectSquare(rowIndex,colIndex) {
    setGameTurns(prevTurns=> {
      let currentPlayer = deriveActivePlayer(prevTurns);
      return [
      {
        square:{
          row: rowIndex,
          col: colIndex
        },
        player:currentPlayer
      },
      ...prevTurns
    ]})
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

        <GameBoard
          board={gameBoard}
        onSelectSquare={handleSelectSquare}/>
      </div>
      <Log turns={gameTurns}/>

    </main>
  )
}

export default App;