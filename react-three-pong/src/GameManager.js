import React, { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';

const GameManager = ({ leftScore, rightScore, onRestart, gameActive, setGameActive }) => {
  const [gameState, setGameState] = useState('start');
  const [winner, setWinner] = useState(null);

  // our UI or HUI to see the stats and score
  useEffect(() => {
    if (leftScore >= 11) {
      setGameState('gameOver');
      setWinner('Player 1');
      setGameActive(false);
    } else if (rightScore >= 11) {
      setGameState('gameOver');
      setWinner('Player 2');
      setGameActive(false);
    }
  }, [leftScore, rightScore, setGameActive]);

  const startGame = () => {
    setGameState('playing');
    setGameActive(true);
    onRestart();
  };

  const restartGame = () => {
    setGameState('start');
    setWinner(null);
    setGameActive(false);
    onRestart();
  };
// buttons for start and restart - css styleable
  const RetroButton = ({ onClick, children }) => (
    <button
      onClick={onClick}
      style={{
        background: 'transparent',
        border: '2px solid #00FFFF',
        color: 'transparent',
        padding: '10px 20px',
        fontSize: '24px',
        fontFamily: '"VT323", monospace',
        cursor: 'pointer',
        textTransform: 'uppercase',
        WebkitTextStroke: '1px #00FFFF',
        boxShadow: '0 0 5px #00FFFF',
        transition: 'all 0.3s ease',
        letterSpacing: '2px',
      }}
      onMouseEnter={(e) => {
        e.target.style.background = '#00FFFF';
        e.target.style.WebkitTextStroke = '1px #000000';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'transparent';
        e.target.style.WebkitTextStroke = '1px #00FFFF';
      }}
    >
      {children}
    </button>
  );

  return (
    <Html fullscreen>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'transparent',
        fontFamily: '"VT323", monospace',
        fontSize: '32px',
        WebkitTextStroke: '1px #00FFFF',
        letterSpacing: '4px',
      }}>
        <div style={{ marginBottom: '20px', fontSize: '64px' }}>
          {`${leftScore} - ${rightScore}`}
        </div>
        {gameState === 'start' && (
          <RetroButton onClick={startGame}>Start</RetroButton>
        )}
        {gameState === 'gameOver' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '20px', fontSize: '48px' }}>
              {winner === 'Player 1' ? 'WON' : 'GAME OVER'}
            </div>
            <RetroButton onClick={restartGame}>Restart</RetroButton>
          </div>
        )}
      </div>
    </Html>
  );
};

export default GameManager;