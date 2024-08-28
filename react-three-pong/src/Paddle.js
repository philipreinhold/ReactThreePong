import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

const Paddle = ({ position, color, name, isPlayer }) => {
  const ref = useRef();
  const wireframeRef = useRef();
  const [, getKeys] = useKeyboardControls();

  const wireframeGeometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.5, 2, 0.5)),
    []
  );

  useFrame((state) => {
    if (!ref.current) return;

    const paddle = ref.current;
    const wireframe = wireframeRef.current;

    if (isPlayer) {
      const { up, down } = getKeys();
      if (up) {
        paddle.position.y = Math.min(paddle.position.y + 0.15, 4);
      }
      if (down) {
        paddle.position.y = Math.max(paddle.position.y - 0.15, -4);
      }
    } else {
      // a ai like, or opponent game logic for the opponent paddle, inspired by three.js forum which simply follows the ball wih delay *0.05 and keeps the paddle in the boundaries of minus 4 and 4
      const ball = state.scene.getObjectByName('ball');
      if (ball && ball.position) {
        const targetY = ball.position.y;
        paddle.position.y += (targetY - paddle.position.y) * 0.05;
        paddle.position.y = THREE.MathUtils.clamp(paddle.position.y, -4, 4);
      }
    }

    // the outlines
    if (wireframe) {
      wireframe.position.copy(paddle.position);
    }
  });

  return (
    <group>
      <mesh ref={ref} position={position} name={name}>
        <boxGeometry args={[0.5, 2, 0.5]} />
        <meshBasicMaterial color={color} transparent={true} opacity={0.2} />
      </mesh>

      <lineSegments ref={wireframeRef} geometry={wireframeGeometry} position={position}>
        <lineBasicMaterial color={color} linewidth={2} />
      </lineSegments>
    </group>
  );
};

export default Paddle;
