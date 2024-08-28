import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useSound from 'use-sound';
import paddleLeftSound from './assets/sounds/paddle_left.wav';
import paddleRightSound from './assets/sounds/paddle_right.wav';

const Ball = ({ setLeftScore, setRightScore }) => {
  const ref = useRef();
  const [velocity, setVelocity] = useState([0.1, 0.1, 0]);
  const [reset, setReset] = useState(false);
  const { scene } = useThree();

  const [playPaddleLeftSound] = useSound(paddleLeftSound);
  const [playPaddleRightSound] = useSound(paddleRightSound);

  // how to spawn and respawn the ball, the speed and the direction
  const resetBall = () => {
    if (ref.current) {
      ref.current.position.set(0, 0, 0);
      const newAngle = (Math.random() - 0.5) * Math.PI / 4;
      const speed = 0.15;
      setVelocity([Math.cos(newAngle) * speed * (Math.random() < 0.5 ? 1 : -1), Math.sin(newAngle) * speed, 0]);
    }
    setReset(false);
  };

  useEffect(() => {
    resetBall();
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    const ball = ref.current;

    if (reset) {
      resetBall();
      return;
    }

    ball.position.x += velocity[0];
    ball.position.y += velocity[1];

    // the collison function for the top and bottom based on the setup or scene boundaries of 4.5 minus 4.5 
    if (ball.position.y > 4.5 || ball.position.y < -4.5) {
      setVelocity([velocity[0], -velocity[1], 0]);
    }

    // collsion check for the paddles
    const leftPaddle = scene.getObjectByName('leftPaddle');
    const rightPaddle = scene.getObjectByName('rightPaddle');

    if (leftPaddle && rightPaddle) {
      if (
        ball.position.x < -7.5 &&
        ball.position.y < leftPaddle.position.y + 1 &&
        ball.position.y > leftPaddle.position.y - 1
      ) {
        const newAngle = ((ball.position.y - leftPaddle.position.y) / 1) * (Math.PI / 4);
        const speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]) * 1.1;
        setVelocity([Math.abs(Math.cos(newAngle) * speed), Math.sin(newAngle) * speed, 0]);
        playPaddleLeftSound();
      }

      if (
        ball.position.x > 7.5 &&
        ball.position.y < rightPaddle.position.y + 1 &&
        ball.position.y > rightPaddle.position.y - 1
      ) {
        const newAngle = ((ball.position.y - rightPaddle.position.y) / 1) * (Math.PI / 4);
        const speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]) * 1.1;
        setVelocity([-Math.abs(Math.cos(newAngle) * speed), Math.sin(newAngle) * speed, 0]);
        playPaddleRightSound();
      }
    }

    // score function , setup score in the ui 
    if (ball.position.x > 9) {
      if (typeof setLeftScore === 'function') {
        setLeftScore(score => score + 1);
      }
      setReset(true);
    }

    if (ball.position.x < -9) {
      if (typeof setRightScore === 'function') {
        setRightScore(score => score + 1);
      }
      setReset(true);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]} name="ball">
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshBasicMaterial color="#FF00FF" wireframe={true} />
    </mesh>
  );
};

export default Ball;