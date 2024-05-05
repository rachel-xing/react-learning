import {useState} from "react";
import {PLAYERS} from "../utils.js";

function Player({symbol,onNameUpdate,isActive}) {
  const [playerName,setPlayerName] = useState(PLAYERS[symbol])
  const [isEditing,setIsEditing] = useState(false)

  function handleClick() {
    setIsEditing(editing=> !editing)
  }

  function handleChange(event) {
    setPlayerName(event.target.value)
    if(isEditing) {
      onNameUpdate(symbol,playerName)
    }
  }

  if(isEditing) {
    return (
      <li className={isActive ? "active": ""}>
      <span className="player">
        <input type="text" value={playerName} onChange={handleChange}/>
      </span>
        <span className="player-symbol">
        {symbol}
      </span>
        <button onClick={handleClick}>Save</button>
      </li>
    )}

  return (
    <li className={isActive ? "active": ""}>
      <span className="player">
        <span className="player-name">
          {playerName}
        </span>
      </span>
      <span className="player-symbol">
        {symbol}
      </span>
      <button onClick={handleClick}>Edit</button>
    </li>
  )
}

export default Player;