import { useState } from "react";
export default function Palyer({ initialName, symbol ,isActive}) {

    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    const handleNameEdit = () => {
        setIsEditing(editing => !editing);
    };

   const handleNameChange = (event) => {
        console.log(event);
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleNameChange} />
    }
    return (
        <li className={isActive?'active':undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleNameEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}