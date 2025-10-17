import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // อย่าลืม import bootstrap

// Component สำหรับใส่สไตล์ CSS เพื่อให้เหมือนต้นฉบับ
const CustomStyles = () => (
  <style>{`
    body {
      background-color: #f0f0f0; /* สีพื้นหลังเพื่อให้เห็นเครื่องคิดเลขชัดขึ้น */
    }
    .cal-font {
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      font-size: 1.75rem; /* ปรับขนาดให้เหมาะสม */
    }
    .cal-container {
      width: 320px; /* กำหนดความกว้างคงที่เพื่อให้เหมือนต้นฉบับ */
      border: 3px solid black;
      border-radius: 20px;
      background-color: #fdfdfd;
    }
    .cal-screen {
      border: 2px solid gray;
      border-radius: 10px;
      background-color: #f0fff0; /* Honeydew color */
      font-size: 2.5rem;
    }
    .cal-btn {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      border: 1px solid #ccc;
    }
    .cal-btn-green {
      background-color: #90ee90; /* lightgreen */
    }
    .cal-btn-blue {
      background-color: #add8e6; /* lightblue */
    }
    .cal-btn-red {
      background-color: #f08080; /* lightcoral */
    }
    .cal-btn-orange {
      background-color: #ffa500; /* orange */
    }
    .cal-btn:disabled {
        opacity: 0.6;
    }
    .user-info {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 1.25rem;
    }
  `}</style>
);


function Calculator() {
  const [screen, setScreen] = useState('0');
  const [currentState, setCurrentState] = useState('S0');
  const [firstOperand, setFirstOperand] = useState(0);
  const [secondOperand, setSecondOperand] = useState(0);
  const [lastOperator, setLastOperator] = useState('?');

  const numberClicked = useCallback((number) => {
    if (currentState === 'S0') {
      setScreen(number.toString());
      setCurrentState('S1');
    } else if (currentState === 'S1' && screen.length < 9) {
      setScreen(prevScreen => prevScreen + number.toString());
    } else if (currentState === 'S2') {
      setFirstOperand(parseInt(screen, 10));
      setScreen(number.toString());
      setCurrentState('S1');
    }
  }, [currentState, screen]);

  const operatorClicked = useCallback((operator) => {
    if (currentState === 'S1') {
      setLastOperator(operator);
      setCurrentState('S2');
      setFirstOperand(parseInt(screen, 10));
      setSecondOperand(parseInt(screen, 10));
    } else if (currentState === 'S2') {
      setLastOperator(operator);
    }
  }, [currentState, screen]);

  const equalsClicked = useCallback(() => {
    let result = 0;
    if (currentState === 'S2') {
        if (lastOperator === '+') result = firstOperand + secondOperand;
        else if (lastOperator === '-') result = firstOperand - secondOperand;
        setFirstOperand(result);
        setScreen(result.toString());
    } else if (currentState === 'S1') {
        const currentSecondOperand = parseInt(screen, 10);
        if (lastOperator === '+') result = firstOperand + currentSecondOperand;
        else if (lastOperator === '-') result = firstOperand - currentSecondOperand;
        setFirstOperand(result);
        setSecondOperand(currentSecondOperand);
        setScreen(result.toString());
        setCurrentState('S2');
    }
  }, [currentState, screen, firstOperand, secondOperand, lastOperator]);

  const ceClicked = useCallback(() => {
    setScreen('0');
    setCurrentState('S0');
    setFirstOperand(0);
    setSecondOperand(0);
    setLastOperator('?');
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key >= '0' && event.key <= '9') numberClicked(Number(event.key));
      else if (event.key === '+') operatorClicked('+');
      else if (event.key === '-') operatorClicked('-');
      else if (event.key === '=' || event.key === 'Enter') equalsClicked();
      else if (event.key === 'Escape') ceClicked();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [numberClicked, operatorClicked, equalsClicked, ceClicked]);

  return (
    <>
      <CustomStyles />
      <div className="container d-flex flex-column align-items-center justify-content-center bg-primary-light mt-auto">
        <div className="cal-container p-2">
          <div className="cal-screen text-end p-2 mb-3 cal-font">{screen}</div>
          <div className="d-flex justify-content-between mb-2">
            <button className="cal-btn cal-btn-green" disabled>mc</button>
            <button className="cal-btn cal-btn-green" disabled>mr</button>
            <button className="cal-btn cal-btn-green" disabled>m+</button>
            <button className="cal-btn cal-btn-green" disabled>m-</button>
            <button onClick={ceClicked} className="cal-btn cal-btn-red">ce</button>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <button onClick={() => numberClicked(7)} className="cal-btn cal-btn-blue">7</button>
            <button onClick={() => numberClicked(8)} className="cal-btn cal-btn-blue">8</button>
            <button onClick={() => numberClicked(9)} className="cal-btn cal-btn-blue">9</button>
            <button className="cal-btn cal-btn-green" disabled>&divide;</button>
            <button className="cal-btn cal-btn-green" disabled>&radic;</button>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <button onClick={() => numberClicked(4)} className="cal-btn cal-btn-blue">4</button>
            <button onClick={() => numberClicked(5)} className="cal-btn cal-btn-blue">5</button>
            <button onClick={() => numberClicked(6)} className="cal-btn cal-btn-blue">6</button>
            <button className="cal-btn cal-btn-green" disabled>&times;</button>
            <button className="cal-btn cal-btn-green" disabled>%</button>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <button onClick={() => numberClicked(1)} className="cal-btn cal-btn-blue">1</button>
            <button onClick={() => numberClicked(2)} className="cal-btn cal-btn-blue">2</button>
            <button onClick={() => numberClicked(3)} className="cal-btn cal-btn-blue">3</button>
            <button onClick={() => operatorClicked('-')} className={`cal-btn ${lastOperator === '-' ? 'cal-btn-orange' : 'cal-btn-green'}`}>&minus;</button>
            <button className="cal-btn cal-btn-green" disabled>1/x</button>
          </div>
          <div className="d-flex justify-content-between">
            <button onClick={() => numberClicked(0)} className="cal-btn cal-btn-blue">0</button>
            <button className="cal-btn cal-btn-blue" disabled>.</button>
            <button className="cal-btn cal-btn-blue" disabled>+/-</button>
            <button onClick={() => operatorClicked('+')} className={`cal-btn ${lastOperator === '+' ? 'cal-btn-orange' : 'cal-btn-green'}`}>+</button>
            <button onClick={equalsClicked} className="cal-btn cal-btn-green">=</button>
          </div>
        </div>
        <div className="user-info text-center mt-3">67156801 นาย ณัฐวุฒิ สังข์ประเสริฐ</div>
      </div>
    </>
  );
}

export default Calculator;