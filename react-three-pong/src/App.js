import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, KeyboardControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Paddle from './Paddle';
import Ball from './Ball';
import { Terrain, Sun, GameBoundaries, PurpleFog } from './Components';
import GameManager from './GameManager';

// this function keeps the camera responsive to different screen sizes
function ResponsiveCamera() {
  const { size, camera } = useThree();
  const aspect = size.width / size.height;

  useEffect(() => {
    // u can adjust these values to change the game's aspect ratio
    const gameWidth = 19;
    const gameHeight = 10.5;

    if (aspect > gameWidth / gameHeight) {
      camera.fov = (2 * Math.atan(gameHeight / (2 * camera.position.z)) * 180) / Math.PI;
    } else {
      camera.fov = (2 * Math.atan((gameWidth / aspect) / (2 * camera.position.z)) * 180) / Math.PI;
    }

    camera.updateProjectionMatrix();
  }, [size, camera, aspect]);

  useFrame(() => {
    // adjust these values to change the camera position and angle
    camera.position.set(0, 2, 15);
    camera.rotation.set(-0.15, 0, 0);
    camera.updateProjectionMatrix();
  });

  return null;
}

function App() {
  // these keep track of the game score
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  // this determines if the game is currently beeing played
  const [gameActive, setGameActive] = useState(false);

  const restartGame = () => {
    setLeftScore(0);
    setRightScore(0);
  };

  return (
    // this sets up the keyboard controls. u can add more keys here if needed
    <KeyboardControls
      map={[
        { name: 'up', keys: ['ArrowUp', 'w', 'W'] },
        { name: 'down', keys: ['ArrowDown', 's', 'S'] },
      ]}
    >
      {/* this div sets the size of the game. adjust width and height to change game size */}
      <div style={{ width: '800px', height: '600px', margin: '0 auto' }}>
        <Canvas>
          {/* this sets the background color. change #000000 to any other color u want */}
          <color attach="background" args={['#000000']} />
          <PerspectiveCamera makeDefault position={[0, 2, 15]} />
          <ResponsiveCamera />

          {/* adjust these values to change the lighting of the scene */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <PurpleFog />
          <Terrain />
          <Sun />

          {/* this group contains all the game objects. adjust rotation to change game angle */}
          <group rotation={[-0.2, 0, 0]}>
            {/* adjust position and color of paddles here */}
            <Paddle position={[-8, 0, 0]} color="#00FFFF" name="leftPaddle" isPlayer={true} />
            <Paddle position={[8, 0, 0]} color="#FF00FF" name="rightPaddle" isPlayer={false} />
            {gameActive && (
              <Ball setLeftScore={setLeftScore} setRightScore={setRightScore} />
            )}
            <GameBoundaries />
          </group>

          <GameManager
            leftScore={leftScore}
            rightScore={rightScore}
            onRestart={restartGame}
            gameActive={gameActive}
            setGameActive={setGameActive}
          />

          {/* these are post-processing effects. adjust values to change the look */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
            <Vignette eskil={false} offset={0.5} darkness={0.7} />
          </EffectComposer>
        </Canvas>
      </div>
    </KeyboardControls>
  );
}

export default App;