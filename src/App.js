import React from 'react';
import logo from './logo.svg';
import Navbar from './components/navbar'
import Display from './components/projectdisplay'
import './styles.css';
import Signup, {Login} from './components/enter'

function App() {
  return (
    <div className="App container">
      <header className="App-header">
        <Login />
        <Signup />
        {/*<Navbar />
        <Display />*/}
      </header>
    </div>
  );
}

export default App;
