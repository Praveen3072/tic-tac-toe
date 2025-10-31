import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Palyer from './components/Player'

function App() {


  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players">
            <Palyer initialName="Player 1" id="X" />
            <Palyer initialName="Player 2" id="O" />
          </ol>
          Game Board
        </div>
      </main>
    </>
  )
}

export default App
