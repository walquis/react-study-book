import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [weight, setWeight] = useState(150);
  const [age, setAge] = useState(42);
  const [month] = useState('February');
  const [todos] = useState([{ text: 'Eat pie' },{text: 'Blow out candles'}]);

  useEffect(() => {
    document.getElementById('1').textContent = `You weigh ${weight}, you ok with that?`;
  }, [ weight ]);

  return (
    <div className="App">
      <h1 id="1" class="comment">Comments here</h1>
      <p>Current Weight: {weight}</p>
      <p>Age: {age}</p>
      <p>Month: {month}</p>
      <button onClick={() => setWeight(weight + 15)}>
        {todos[0].text}
      </button>
      <p></p>
      <button onClick={() => setAge(age + 1)}>
        {todos[1].text}
      </button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
