import { useState } from 'react'
import './App.css'
import Palyer from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-combinations'
import GameOver from './components/GameOver'

const PLAYER={
  'X': 'Player 1',
  'O': 'Player 2'
}
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveCurrentPlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}
function deriveWinner(gameBoard, player) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];;
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];;
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = player[firstSquareSymbol];
      console.log(winner);
    }
  }
  return winner;

}
function deriveGameBoard(gameTurns) {
  let gameBoard = initialGameBoard.map(inner => [...inner]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard
}

function App() {
  const [player, setPlayer] = useState(PLAYER)
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveCurrentPlayer(gameTurns);
  console.log(activePlayer + "acrive Player");

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, player);
  const hasDraw = gameTurns.length === 9 && !winner

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns(prevTurn => {
      const currentPlayer = deriveCurrentPlayer(prevTurn);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }
        , ...prevTurn
      ];

      return updatedTurns;
    })
  }
  const handleRematch = () => {
    setGameTurns([]);
  }
  const handlePlayerNameChange = (symbol, newName) => {
    console.log(symbol + "" + newName);
    setPlayer(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }
  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Palyer initialName={PLAYER.X} symbol="X" id="X" isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange} />
            <Palyer initialName={PLAYER.O} symbol="O" id="O" isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange} />
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
      </main>
      <Log turns={gameTurns} />
    </>
  )
}

export default App
