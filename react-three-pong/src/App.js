import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei'; // OrthographicCamera für besseres 2D-Rendering
import { Bloom } from '@react-three/postprocessing';
import Paddle from './Paddle';
import Ball from './Ball';
import './App.css';

function App() {
  return (
    <Canvas>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={40} /> {/* Kamera-Zoom anpassen */}
      <ambientLight intensity={0.5} />
      <Paddle position={[-8, 0, 0]} color="#FF0000" controls={{ up: ['w'], down: ['s'] }} /> {/* Linker Schläger - Rot */}
      <Paddle position={[8, 0, 0]} color="#0000FF" controls={{ up: ['ArrowUp'], down: ['ArrowDown'] }} /> {/* Rechter Schläger - Blau */}
      <Ball />
      <Bloom intensity={1.5} luminanceThreshold={0} luminanceSmoothing={0.9} />
    </Canvas>
  );
}

export default App;
