import React, {useState} from 'react'
import Board from './Board'
import './style.css'

export default function Game(){

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const turn = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    const handleRestart = () =>{
        setHistory([Array(9).fill(null)])
        setCurrentMove(0)
    }
    const handlePlay = (nextSquares)=>{
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    const jumpTo = (nextMove)=>{
        setCurrentMove(nextMove)
    }
    
    const moves = history.map((squares, move)=>{
        let description = move > 0 ? `Go to move #${move}` : "Go to game start"
        return (
            <li>
                <p onClick={()=>jumpTo(move)}>{description}</p>
            </li>
        )
    })

    return(
        <div className='game'>
            <div className='game-board'>
                <h1 className='game-title'>"Tic Tac Toe"</h1>
                <Board turn={turn} squares={currentSquares} onPlay={handlePlay} onRestart={handleRestart}       />
            </div>
            <div className='game-info'>
                <h2>History</h2>
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
    )
}