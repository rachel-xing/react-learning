import {useState} from "react";
import {PLAYERS,SYMBOL} from "./utils.js";
import Player from "./components/Player.jsx";

function App() {
  const [players,setPlayer] = useState(PLAYERS)

  function handleNameChange(symbol,newName) {
    setPlayer(prevPlayer=> ({
      [symbol]:newName,
      ...prevPlayer
    }))
  }
  return (

    <main>
      <div id="game-container">
        <ol id="players">
          <Player symbol={SYMBOL.X} onChange={handleNameChange}/>
          <Player symbol={SYMBOL.O}/>
        </ol>
      </div>
    </main>


  )
}

export default App;