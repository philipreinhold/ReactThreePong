import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, KeyboardControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Paddle from './Paddle';
import Ball from './Ball';
import { Terrain, Sun, GameBoundaries, PurpleFog, Stars, OrbitingPlanet } from './Components';
import GameManager from './GameManager';

function ResponsiveCamera() {
  const { size, camera } = useThree();
  const aspect = size.width / size.height;

  useEffect(() => {
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
    camera.position.set(0, 2, 15);
    camera.rotation.set(-0.15, 0, 0);
    camera.updateProjectionMatrix();
  });

  return null;
}

function App() {
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const restartGame = () => {
    setLeftScore(0);
    setRightScore(0);
  };

  return (
    <KeyboardControls
      map={[
        { name: 'up', keys: ['ArrowUp', 'w', 'W'] },
        { name: 'down', keys: ['ArrowDown', 's', 'S'] },
      ]}
    >
      <div style={{ width: '800px', height: '600px', margin: '0 auto' }}>
        <Canvas>
          <color attach="background" args={['#000000']} />
          <PerspectiveCamera makeDefault position={[0, 2, 15]} />
          <ResponsiveCamera />

          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <PurpleFog />
          <Terrain />
          <Sun />

          <Stars />

          {/* Multiple orbiting planets with varying distances and heights */}
          <OrbitingPlanet radius={0} speed={0.8} size={6.5} color="#a200ff" distance={150} yOffset={10} />
          <OrbitingPlanet radius={0} speed={0.2} size={8.5} color="#00d5ff" distance={200} yOffset={-10} />
          <OrbitingPlanet radius={0} speed={0.6} size={3.8} color="#ff7b00" distance={180} yOffset={15} />

          <group rotation={[-0.2, 0, 0]}>
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
