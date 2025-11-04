import { useState } from 'react'
import './App.css'
import Palyer from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'

function deriveCurrentPlayer(gameTurns)
{
  let currentPlayer = 'X';
      if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
      }
      return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState('X')
  const activePlayer = deriveCurrentPlayer(gameTurns);

  const handleSelectSquare = (rowIndex, colIndex) => {
    //setActivePlayer((prevPlayer) => prevPlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurn => {
      const currentPlayer = deriveCurrentPlayer(prevTurn);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }
        , ...prevTurn
      ];

      return updatedTurns;
    })
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Palyer initialName="Player 1" id="X" isActive={activePlayer === 'X'} />
            <Palyer initialName="Player 2" id="O" isActive={activePlayer === 'O'} />
          </ol>
          <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
        </div>
      </main>
      <Log turns={gameTurns}/>
    </>
  )
}

export default App
