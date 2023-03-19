import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to='/register'>Register</Link>
      <Routes>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      </header>
    </div>
  );
}

export default App;
