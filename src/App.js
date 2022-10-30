import React from 'react';
import Meme from './components/Meme/Meme';
import MemeGenerated from './components/MemeGenerated/MemeGenerated';
import { Routes , Route } from "react-router-dom";
import './App.css';

const App =()=> {
  return (
    <div className="App">
      <h1>Memes Creator</h1>
      <Routes>
        <Route path='/' element={<Meme/>}/>
        <Route path='/generated' element={<MemeGenerated/>}/>
      </Routes>
      <a href='https://www.linkedin.com/in/hamza-samaiy/'><div className='social'>Github</div><div className='social'>LinkedIn</div></a>
      
    </div>
  );
}

export default App;
