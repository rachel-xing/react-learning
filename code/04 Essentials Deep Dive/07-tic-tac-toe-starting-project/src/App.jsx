import {useState} from "react";
import {PLAYERS, SYMBOL} from './utils.js';
import Player from "./components/Player.jsx";


function App() {
  function handleNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player
            symbol={SYMBOL.X}
            onNameChange={handleNameChange}
          />
          <Player
            symbol={SYMBOL.O}
            onNameChange={handleNameChange}
          />
        </ol>
      </div>


    </main>
  )

}

export default App