
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import Home from './components/Home';
import Cart from './components/Cart'

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Cart' element={<Cart/>}/> 
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
