/* 
   © Philip Reinhold - 2024
   Feel free to add, change, or remix this code! 
   I'm a Millennial 8-) and fascinated by 80s Synthwave graphics. 
   I wanted to experiment with Three.js and React within these combinations. 
   This project is a bit of a playground for creating a minimalist game 
   while exploring the interactive possibilities of the Three.js/React combo. Pong is just a starting point - 
   I'm excited to dive deeper into React/Three/Fiber for future projects. It's a lot of fun experimenting with three and react!
*/

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

  // Adjust the camera's field of view (fov) based on screen aspect ratio 
  useEffect(() => {
    const gameWidth = 19;
    const gameHeight = 10.5;

    if (aspect > gameWidth / gameHeight) {
      camera.fov = (2 * Math.atan(gameHeight / (2 * camera.position.z)) * 180) / Math.PI;
    } else {
      camera.fov = (2 * Math.atan((gameWidth / aspect) / (2 * camera.position.z)) * 180) / Math.PI;
    }

    camera.updateProjectionMatrix(); // Update the camera with the new fov 
  }, [size, camera, aspect]);

  // Keep the camera in a fixed position and slightly tilted for a cool angle i tried to keep it frontal
  useFrame(() => {
    camera.position.set(0, 2, 15);
    camera.rotation.set(-0.15, 0, 0);
    camera.updateProjectionMatrix();
  });

  return null;
}

function App() {
  const [leftScore, setLeftScore] = useState(0);  // Player 1 score 
  const [rightScore, setRightScore] = useState(0);  // Player 2 score 
  const [gameActive, setGameActive] = useState(false);  // Game state controller 

  const restartGame = () => {
    setLeftScore(0);
    setRightScore(0);  // Reset the scores to zero when restart the game
  };

  return (
    <KeyboardControls
      map={[
        { name: 'up', keys: ['ArrowUp', 'w', 'W'] },  // Control mapping: Up ⬆
        { name: 'down', keys: ['ArrowDown', 's', 'S'] },  // Control mapping: Down ⬇
      ]}
    >
      <div style={{ width: '800px', height: '600px', margin: '0 auto' }}>
        <Canvas>
          <color attach="background" args={['#000000']} />  // Background color 
          <PerspectiveCamera makeDefault position={[0, 2, 15]} />
          <ResponsiveCamera />  // Responsive camera setup 

          <ambientLight intensity={0.2} />  // Ambient lighting for subtle brightness 
          <pointLight position={[10, 10, 10]} intensity={1} />  // Main light source 

          <PurpleFog />  // A touch of fog for that extra synthwave vibe 
          <Terrain />  // Ground terrain for the scene 
          <Sun />  // A shining sun in the background ☀️

          <Stars />  // Some stars for the cosmic effect ✨

          {/* Multiple orbiting planets with varying distances and heights */}
          <OrbitingPlanet radius={0} speed={0.8} size={6.5} color="#a200ff" distance={150} yOffset={10} />
          <OrbitingPlanet radius={0} speed={0.2} size={8.5} color="#00d5ff" distance={200} yOffset={-10} />
          <OrbitingPlanet radius={0} speed={0.6} size={3.8} color="#ff7b00" distance={180} yOffset={15} />

          <group rotation={[-0.2, 0, 0]}>
            <Paddle position={[-8, 0, 0]} color="#00FFFF" name="leftPaddle" isPlayer={true} />  // Player 1 paddle i like this synthwave colors
            <Paddle position={[8, 0, 0]} color="#FF00FF" name="rightPaddle" isPlayer={false} />  // Player 2 paddle 
            {gameActive && (
              <Ball setLeftScore={setLeftScore} setRightScore={setRightScore} />  // The ball in action 
            )}
            <GameBoundaries />  // Boundaries to keep the game area contained 
          </group>

          <GameManager
            leftScore={leftScore}
            rightScore={rightScore}
            onRestart={restartGame}  // Restart the game when needed 
            gameActive={gameActive}
            setGameActive={setGameActive}  // Toggle game state (start/pause) 🕹️
          />

          <EffectComposer>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />  // Bloom effect for glowy visuals like neon or yeah neon
            <Vignette eskil={false} offset={0.5} darkness={0.7} />  // Vignette for that cinematic feel, or more a oldsql TV style appareance 
          </EffectComposer>
        </Canvas>
      </div>
    </KeyboardControls>
  );
}

export default App;
