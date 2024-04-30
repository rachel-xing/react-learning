import {useState} from "react";

export default function Player({initialName,symbol,isActive,onChangeName}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing,setIsEditing ] = useState(false);

  function handleEditClick() {
    // isEditing ? setIsEditing(false) : setIsEditing(true)
    // setIsEditing(!isEditing)
    setIsEditing(Editing => !Editing);
    if (isEditing) {
      onChangeName(symbol,playerName)
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
  };

  return (
    <li className={isActive? 'active' : ''}>
        <span className="player">
          {editablePlayerName}
        </span>
      <span className='player-symbol'>{symbol}</span>
      <button onClick={handleEditClick}>{isEditing? "Save" : 'Edit'}</button>
    </li>
  )
}