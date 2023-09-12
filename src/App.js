import { useEffect, useState } from 'react';
import './App.css';
import Game from './components/Game';
import {PulseLoader} from 'react-spinners';
import logo from './assets/logo.gif'

function App() {
    const [showGame, setShowGame] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setShowGame(true)
        }, 2000)
    }, [])
  return (
    <div className='App'>
        {showGame ? <Game /> : <PulseLoader color="#36d7b7" className='loader'/>}
    </div>
  );
}

export default App;
