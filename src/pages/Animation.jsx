import React, { useState, useEffect, useRef, useCallback } from 'react';


const Animation = () => {

  const fieldWidth = 700;
  const fieldHeight = 400;
  const ballDiameter = 200;
  const vx = 5;
  const vy = 5;

  const maxLeft = fieldWidth - ballDiameter - 2;
  const maxTop = fieldHeight - ballDiameter - 2;

  const ballOptions = ['basketball', 'football', 'volleyball', 'human', 'cartoon'];

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [selectedBall, setSelectedBall] = useState('none');

  const direction = useRef({ goRight: true, goDown: true });
  const intervalRef = useRef(null);

  const calculate = () => {
    setPosition(prevPosition => {
      let { x, y } = prevPosition;
      if (direction.current.goRight) {
        x += vx;
        if (x >= maxLeft) { x = maxLeft; direction.current.goRight = false; }
      } else {
        x -= vx;
        if (x <= 0) { x = 0; direction.current.goRight = true; }
      }
      if (direction.current.goDown) {
        y += vy;
        if (y >= maxTop) { y = maxTop; direction.current.goDown = false; }
      } else {
        y -= vy;
        if (y <= 0) { y = 0; direction.current.goDown = true; }
      }
      return { x, y };
    });
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(calculate, 25);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleRunClick = () => setIsRunning(prev => !prev);
  const handleBallSelect = (ballName) => setSelectedBall(ballName);

  const handleKeyDown = useCallback((event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      handleRunClick();
    }
    const keyMap = {
      '1': 'basketball', '2': 'football', '3': 'volleyball',
      '4': 'human', '5': 'cartoon', '0': 'none'
    };
    if (keyMap[event.key] !== undefined) {
      setSelectedBall(keyMap[event.key]);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className=''>

      <div
        className="border border-3 p-3 rounded-4 mx-auto"
        style={{ width: 'fit-content', fontFamily: 'sans-serif' }}
      >
        <div
          className="anim-field border rounded-4 position-relative overflow-hidden"
          style={{ width: `${fieldWidth}px`, height: `${fieldHeight}px` }}
        >
          <div
            id="ball"
            className={`anim-ball border rounded-circle position-absolute ${isRunning ? 'rotating' : ''}`}
            style={{
              width: `${ballDiameter}px`,
              height: `${ballDiameter}px`,
              left: `${position.x}px`,
              top: `${position.y}px`,
              backgroundImage: selectedBall !== 'none' ? `url(${import.meta.env.BASE_URL}images/${selectedBall}.png)` : 'none',
              backgroundColor: selectedBall === 'none' ? 'lightgray' : 'transparent',
            }}
          ></div>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button
            className={`btn ${isRunning ? 'btn-danger' : 'btn-success'}`}
            onClick={handleRunClick}
          >
            {isRunning ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
            RUN
          </button>

          <div>
            <button
              className={`btn ${selectedBall === 'none' ? 'btn-secondary' : 'btn-outline-secondary'}`}
              onClick={() => handleBallSelect('none')}
            >
              NONE
            </button>
            {ballOptions.map(ball => (
              <button
                key={ball}
                className={`btn ${selectedBall === ball ? 'btn-primary' : 'btn-outline-primary'} ms-2`}
                onClick={() => handleBallSelect(ball)}
              >
                {ball.charAt(0).toUpperCase() + ball.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <h1 style={{ textAlign: 'center' }}>67156801 ณัฐวุฒิ สังข์ประเสริฐ</h1>
    </div>
  );
};

export default Animation;