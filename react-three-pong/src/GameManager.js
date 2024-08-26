import React, { useState, useEffect } from 'react';
import { Text, Html } from '@react-three/drei';

const GameManager = ({ leftScore, rightScore, onRestart, gameActive, setGameActive }) => {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver'
  const [winner, setWinner] = useState(null);

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

  const RetroButton = ({ onClick, children }) => (
    <button
      onClick={onClick}
      style={{
        background: '#4CAF50',
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '24px',
        margin: '4px 2px',
        cursor: 'pointer',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        borderRadius: '5px',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </button>
  );

  return (
    <>
      <Html center>
        <div style={{ 
          color: 'white', 
          fontSize: '48px', 
          fontFamily: 'Arial, sans-serif', 
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          {`${leftScore} - ${rightScore}`}
        </div>
        {gameState === 'start' && (
          <RetroButton onClick={startGame}>START</RetroButton>
        )}
        {gameState === 'gameOver' && (
          <div style={{ textAlign: 'center', color: 'white', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
            <h2>{winner === 'Player 1' ? 'YOU WIN!' : 'GAME OVER'}</h2>
            <RetroButton onClick={restartGame}>RESTART</RetroButton>
          </div>
        )}
      </Html>
    </>
  );
};

export default GameManager;