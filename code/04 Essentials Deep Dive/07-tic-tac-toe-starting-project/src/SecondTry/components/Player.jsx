import {useState} from "react";
import {PLAYERS} from "../../utils.js";

function Player({symbol, onNameChange, isActive}) {
  const initialName = PLAYERS[symbol];
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleClick() {
    setIsEditing(wasEditing => !wasEditing)
    if (isEditing) {
      onNameChange(symbol, playerName)
    }
  }

  function handleNameChange(event) {
    setPlayerName(event.target.value)
  }

  if (isEditing) {
    return (
      <li className={isActive ? 'active' : ''}>
        <span className="player">
          <input type="text" required value={playerName} onChange={(event) => handleNameChange(event)}/>
        </span>
        <span className="player-symbol">
          {symbol}
        </span>
        <button onClick={handleClick}>
          Save
        </button>
      </li>
    );
  }
  return (
    <li className={isActive ? 'active' : ''}>
      <span className="player">
        <span className="player-name">
          {playerName}
        </span>
      </span>
      <span className="player-symbol">
        {symbol}
      </span>
      <button onClick={handleClick}>
        Edit
      </button>
    </li>
  );
}

export default Player;