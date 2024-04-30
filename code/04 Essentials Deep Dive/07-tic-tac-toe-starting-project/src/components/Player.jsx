import {useState} from "react";

function Player({initialName, symbol, isActive, onChangeName}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(Editing => !Editing);
    if (isEditing) {
      onChangeName(symbol, playerName)
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  if (isEditing) {
    return (
      <li className={isActive ? 'active' : ''}>
        <span className="player">
          <input type="text" required value={playerName} onChange={handleChange}/>
        </span>
        <span className='player-symbol'>
          {symbol}
        </span>
        <button onClick={handleEditClick}>
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
      <span className='player-symbol'>
        {symbol}
      </span>
      <button onClick={handleEditClick}>
        Edit
      </button>
    </li>
  );
}

export default Player;