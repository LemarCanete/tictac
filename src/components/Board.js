import React, {useState} from 'react'
import {IoPause, IoPlay} from 'react-icons/io5'
import Modal from 'react-modal'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use';

Modal.setAppElement('#root');

export default function Board({turn, squares, onPlay, onRestart}) {
    const { width, height } = useWindowSize()
    let won;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const handleClick = (i)=>{
        if(calculateWinner(squares) || squares[i]) return
        const nextSquares = squares.slice();
        nextSquares[i] = turn ? "X" : "O";
        onPlay(nextSquares)
    }

    const handlePause = ()=>{
        setIsOpen(true);
    }

    //modal
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.content.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }


    const winner = calculateWinner(squares)
    let status ;
    status = winner ? `Winner: ${winner}` : `Next Player: ${turn ? "X" : "O"}`
    if(winner){
        return(
        <div>
            <Confetti
                width={width}
                height={height}
                />
                <div className='winner'>
                    <h1 >Player {winner} won</h1>
                    <button onClick={onRestart}>Play Again</button>
                </div>
        </div>)
    }

    return (
      <div className='board'>
        <div className='buttons'>
            <button onClick={handlePause} className='pauseButton'><IoPause /></button>

            <Modal isOpen={modalIsOpen} 
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Settings"
                className="modal"
            >
                <button onClick={closeModal} className='playButton'><IoPlay />Play</button>
                <button onClick={onRestart} className='restartButton'>Restart</button>
            </Modal>
        </div>

        <div className="status">{status}</div>
        
        <div className="board-row">
            <Square value={squares[0]} handleClick={()=>handleClick(0)} />
            <Square value={squares[1]} handleClick={()=>handleClick(1)} />
            <Square value={squares[2]} handleClick={()=>handleClick(2)} />
        </div>
        <div className="board-row">
            <Square value={squares[3]} handleClick={()=>handleClick(3)} />
            <Square value={squares[4]} handleClick={()=>handleClick(4)} />
            <Square value={squares[5]} handleClick={()=>handleClick(5)} />
        </div>
        <div className="board-row">
            <Square value={squares[6]} handleClick={()=>handleClick(6)} />
            <Square value={squares[7]} handleClick={()=>handleClick(7)} />
            <Square value={squares[8]} handleClick={()=>handleClick(8)} />
        </div>
      </div>
    );
}

const Square = ({value, handleClick}) =>{

    return(
        <button className='square' onClick={handleClick}>{value}</button>
    )
}

const calculateWinner = (squares)=>{
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]
    }
    return null
}