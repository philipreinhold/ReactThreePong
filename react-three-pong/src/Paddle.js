import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

const Paddle = ({ position, color, name, isPlayer, controls }) => {
  const ref = useRef();
  const [, getKeys] = useKeyboardControls();

  useFrame((state) => {
    if (!ref.current) return;

    const paddle = ref.current;

    if (isPlayer) {
      const { up, down } = getKeys();
      if (up) {
        paddle.position.y = Math.min(paddle.position.y + 0.15, 4);
      }
      if (down) {
        paddle.position.y = Math.max(paddle.position.y - 0.15, -4);
      }
    } else {
      // AI logic for the opponent paddle
      const ball = state.scene.getObjectByName('ball');
      if (ball && ball.position) {
        const targetY = ball.position.y;
        paddle.position.y += (targetY - paddle.position.y) * 0.05;
        paddle.position.y = THREE.MathUtils.clamp(paddle.position.y, -4, 4);
      }
    }
  });

  return (
    <mesh ref={ref} position={position} name={name}>
      <boxGeometry args={[0.5, 2, 0.5]} />
      <meshBasicMaterial color={color} wireframe={true} />
    </mesh>
  );
};

export default Paddle;