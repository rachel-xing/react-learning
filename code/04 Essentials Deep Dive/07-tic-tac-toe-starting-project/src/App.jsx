import {SYMBOL,PLAYERS} from "./utils.js";
import Player from "./components/Player.jsx";
import {useState} from "react";

function App() {
  const [players,setPlayers] = useState(PLAYERS)
  function handleNameUpdate(symbol,newName) {
    setPlayers(prevPlayers => {
      return {
      ...prevPlayers,
      [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player symbol={SYMBOL.X} onNameUpdate={handleNameUpdate}/>
          <Player symbol={SYMBOL.O} onNameUpdate={handleNameUpdate}/>
        </ol>

      </div>


    </main>
  )
}

export default App;