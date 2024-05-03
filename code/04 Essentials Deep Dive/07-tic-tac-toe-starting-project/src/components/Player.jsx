import {useState} from "react";
import {PLAYERS} from "../utils.js";

function Player({symbol,onChange}) {
  const [isEditing,setIsEditing] =useState(false)
  const initialName = PLAYERS[symbol]
  const [playerName,setPlayerName] = useState(initialName)

  function handleClick() {
    setIsEditing(editing=>!editing)

    if(isEditing) {
      onChange(symbol,playerName)
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value)
  }


   if (!isEditing) {
     return(
       <li >
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
     )}

   return (
     <li>
       <span className="player">
         <input
           type="text"
           value={playerName}
           required
           onChange={handleChange}
         />
       </span>
       <span className="player-symbol">
         {symbol}
       </span>
       <button onClick={handleClick}>
         Save
       </button>
     </li>
   )
}

export default Player;