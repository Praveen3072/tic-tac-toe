import { useState } from 'react'
import './App.css'
import Palyer from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-combinations'
import GameOver  from './components/GameOver'

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function deriveCurrentPlayer(gameTurns)
{
  let currentPlayer = 'X';
      if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
      }
      return currentPlayer;
}

function App() {
  const [player,setPlayer]=useState({
    'X': 'Player 1',
    'O': 'Player 2'
  })
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState('X')
  const activePlayer = deriveCurrentPlayer(gameTurns);
  console.log(activePlayer+"acrive Player");

  //let gameBoard = initialGameBoard;
  let gameBoard = initialGameBoard.map(inner => [...inner]);

   for(const turn of gameTurns )
   {
    const {square, player} = turn;
    const {row,col}= square;

    gameBoard[row][col]=player;
   }
   let winner;
   for(const combination of WINNING_COMBINATIONS)
   {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol= gameBoard[combination[1].row][combination[1].column];;
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];;
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
    {
        winner = player[firstSquareSymbol];
        console.log(winner);
    }
   }
   const hasDraw = gameTurns.length === 9 && !winner

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
  const handleRematch = ()=>
  {
    setGameTurns([]);
  }
  const handlePlayerNameChange = (symbol,newName)=>
  {
    console.log(symbol+""+newName);
    setPlayer(prevPlayers =>{
      return {
        ...prevPlayers,
        [symbol]:newName
      };
    });
  }
  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Palyer initialName="Player 1" symbol="X" id="X" isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange} />
            <Palyer initialName="Player 2" symbol="O" id="O" isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange} />
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
      </main>
      <Log turns={gameTurns}/>
    </>
  )
}

export default App
