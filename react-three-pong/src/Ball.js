import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Ball = ({ setLeftScore, setRightScore }) => {
  const ref = useRef();
  // Ball velocity [x, y, z]
  const [velocity, setVelocity] = useState([0.1, 0.1, 0]);
  // Flag to reset ball position
  const [reset, setReset] = useState(false);

  // Function to reset ball position and set a new random direction
  const resetBall = () => {
    ref.current.position.set(0, 0, 0);
    // Random angle between -45 and 45 degrees
    const newAngle = (Math.random() - 0.5) * Math.PI / 4;
    // Initial speed of the ball (adjust for difficulty)
    const speed = 0.15;
    // Set new velocity
    setVelocity([
      Math.cos(newAngle) * speed * (Math.random() < 0.5 ? 1 : -1),
      Math.sin(newAngle) * speed,
      0
    ]);
    setReset(false);
  };

  // Initial setup
  useEffect(() => {
    resetBall();
  }, []);

  // Game loop
  useFrame((state) => {
    if (reset) {
      resetBall();
      return;
    }

    const ball = ref.current;
    // Move ball
    ball.position.x += velocity[0];
    ball.position.y += velocity[1];

    // Collision with top and bottom walls
    if (ball.position.y > 4.5 || ball.position.y < -4.5) {
      setVelocity([velocity[0], -velocity[1], 0]);
    }

    // Get paddle positions
    const leftPaddle = state.scene.getObjectByName('leftPaddle');
    const rightPaddle = state.scene.getObjectByName('rightPaddle');

    // Collision with left paddle
    if (
      ball.position.x < -7.5 &&
      ball.position.y < leftPaddle.position.y + 1 &&
      ball.position.y > leftPaddle.position.y - 1
    ) {
      // Calculate new angle based on where ball hits paddle
      const newAngle = ((ball.position.y - leftPaddle.position.y) / 1) * (Math.PI / 4);
      // Increase speed slightly with each hit
      const speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]) * 1.1;
      setVelocity([Math.cos(newAngle) * speed, Math.sin(newAngle) * speed, 0]);
    }

    // Collision with right paddle (similar to left paddle)
    if (
      ball.position.x > 7.5 &&
      ball.position.y < rightPaddle.position.y + 1 &&
      ball.position.y > rightPaddle.position.y - 1
    ) {
      const newAngle = ((ball.position.y - rightPaddle.position.y) / 1) * (Math.PI / 4);
      const speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]) * 1.1;
      setVelocity([-Math.cos(newAngle) * speed, Math.sin(newAngle) * speed, 0]);
    }

    // Scoring
    if (ball.position.x > 9) {
      setLeftScore(score => score + 1);
      setReset(true);
    }

    if (ball.position.x < -9) {
      setRightScore(score => score + 1);
      setReset(true);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]} name="ball">
      {/* Ball geometry - adjust size here */}
      <sphereGeometry args={[0.2, 32, 32]} />
      {/* Ball material - adjust color and wireframe here */}
      <meshBasicMaterial color="#FF00FF" wireframe={true} />
    </mesh>
  );
};

export default Ball;