import { useState, useRef, useEffect } from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

function App() {
  const [diceArray, setDiceArray] = useState(() => generateAllNewDice());
  const { width, height } = useWindowSize();
  const newGameButton = useRef(null);

  const gameWon =
    diceArray.every((die) => die.value === diceArray[0].value) &&
    diceArray.every((die) => die.isHeld);

  useEffect(() => {
    if (gameWon) newGameButton.current.focus();
  }, [gameWon]);

  function generateAllNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i += 1) {
      const randNumber = Math.ceil(Math.random() * 6);
      const dieObj = { value: randNumber, isHeld: false, id: nanoid() };
      newArray.push(dieObj);
    }
    return newArray;
  }

  function rollDice() {
    const updatedDiceArray = [...diceArray];
    updatedDiceArray.map((die) => {
      if (!die.isHeld) die.value = Math.ceil(Math.random() * 6);
    });
    setDiceArray(updatedDiceArray);
  }

  function hold(id) {
    const updatedDiceArray = [...diceArray];
    updatedDiceArray.map((die) => {
      if (die.id === id) die.isHeld = !die.isHeld;
    });
    setDiceArray(updatedDiceArray);
  }

  const diceElements = diceArray.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={hold}
    />
  ));

  return (
    <>
      <div className="game-field flex-container">
        <div className="game-field-inside">
          <div aria-live="polite" className="sr-only">
            {gameWon && (
              <p>Congratulations! You won! Press "New Game" to start again.</p>
            )}
          </div>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="dice-container">{diceElements}</div>
          <button
            className="roll-btn"
            onClick={
              !gameWon
                ? rollDice
                : () => setDiceArray(() => generateAllNewDice())
            }
            ref={newGameButton}
          >
            {!gameWon ? 'Roll' : 'New Game'}
          </button>
        </div>
      </div>
      {gameWon && <Confetti width={width} height={height} />}
    </>
  );
}

export default App;
