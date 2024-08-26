import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

const Paddle = ({ position, color, name, isPlayer, controls }) => {
  const ref = useRef();
  const [score, setScore] = useState(0);

  const [, getKeys] = useKeyboardControls();

  useFrame((state) => {
    if (isPlayer) {
      const { up, down } = getKeys();
      if (up) {
        ref.current.position.y = Math.min(ref.current.position.y + 0.15, 4);
      }
      if (down) {
        ref.current.position.y = Math.max(ref.current.position.y - 0.15, -4);
      }
    } else {
      // Simple AI for the opponent
      const ballPosition = state.scene.getObjectByName('ball').position;
      ref.current.position.y += (ballPosition.y - ref.current.position.y) * 0.05;
      ref.current.position.y = THREE.MathUtils.clamp(ref.current.position.y, -4, 4);
    }
  });

  return (
    <group ref={ref} position={position} name={name}>
      <mesh>
        <boxGeometry args={[0.5, 2, 0.5]} />
        <meshStandardMaterial color={color}  wireframe={true}emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <Text
        position={[0, 2.5, 0]}
        color={color}
        fontSize={0.5}
        anchorX="center"
        anchorY="middle"
      >
        {score}
      </Text>
    </group>
  );
};

export default Paddle;