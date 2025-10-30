import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players">

            <li>
              <span className="player">
              <span className="player-name">Player 1</span>
              <span className="player-symbol">X</span>
              </span>
              <button>Edit</button>
            </li>
            
          </ol>
          Game Board
        </div>
      </main>
    </>
  )
}

export default App
