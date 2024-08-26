import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, KeyboardControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Paddle from './Paddle';
import Ball from './Ball';
import { Terrain, Sun, GameBoundaries } from './Components';

// CameraRig component to control camera position and rotation
function CameraRig() {
  const cameraRef = useRef();
  
  useFrame(() => {
    if (cameraRef.current) {
      // Set camera position (x, y, z)
      // Adjust these values to move the camera
      cameraRef.current.position.set(0, 4, 14);
      
      // Set camera rotation (x, y, z in radians)
      // Adjust these values to tilt the camera view
      cameraRef.current.rotation.set(-0.3, 0, 0);
    }
  });
  
  // Create a perspective camera
  // fov (Field of View) can be adjusted to zoom in/out
  return <PerspectiveCamera ref={cameraRef} makeDefault fov={50} />;
}

function App() {
  // State for keeping score
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);

  return (
    // Main container - adjust size and background here
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'black' }}>
      {/* Game container - adjust size here */}
      <div style={{ width: '80vw', height: '80vh' }}>
        {/* KeyboardControls for handling user input */}
        <KeyboardControls
          map={[
            { name: 'up', keys: ['ArrowUp', 'w', 'W'] },
            { name: 'down', keys: ['ArrowDown', 's', 'S'] },
          ]}
        >
          {/* Canvas is the main 3D rendering component */}
          <Canvas>
            {/* Set background color */}
            <color attach="background" args={['#000000']} />
            
            {/* Custom camera rig */}
            <CameraRig />
            
            {/* OrbitControls for camera manipulation (currently disabled) */}
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />

            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {/* Game environment components */}
            <Terrain />
            <Sun />

            {/* Game elements group - rotated for perspective */}
            <group rotation={[-0.2, 0, 0]}>
              {/* Left paddle */}
              <Paddle position={[-8, 0, 0]} color="#00FFFF" name="leftPaddle" isPlayer={true} />
              {/* Right paddle */}
              <Paddle position={[8, 0, 0]} color="#FF00FF" name="rightPaddle" isPlayer={false} />
              {/* Ball */}
              <Ball setLeftScore={setLeftScore} setRightScore={setRightScore} />
              {/* Game boundaries */}
              <GameBoundaries />
            </group>

            {/* Post-processing effects */}
            <EffectComposer>
              {/* Bloom effect for glow */}
              <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
              {/* Vignette effect for edge darkening */}
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          </Canvas>
        </KeyboardControls>
      </div>
    </div>
  );
}

export default App;