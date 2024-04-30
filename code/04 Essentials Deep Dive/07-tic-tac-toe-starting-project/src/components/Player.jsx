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

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
  }

  return (
    <li className={isActive ? 'active' : ''}>
      <span className="player">
        {editablePlayerName}
      </span>
      <span className='player-symbol'>
        {symbol}
      </span>
      <button onClick={handleEditClick}>
        {isEditing ? "Save" : 'Edit'}
      </button>
    </li>
  )
}

export default Player;