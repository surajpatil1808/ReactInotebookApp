
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import {Home} from './components/Home';
import { Alert } from './components/Alert';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';


function App() {
  return (
   <>
   <NoteState>
<Router>
<Navbar/>
<Alert message="this is react course"/>
<div className='container'>
  <Routes>

        <Route exact path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>} ></Route>      
         
  </Routes>
</div>
</Router>
</NoteState>
   </>
  );
}

export default App;
