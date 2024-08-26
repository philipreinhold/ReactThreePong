import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

function Ball() {
  const ref = useRef();
  const [direction, setDirection] = useState([0.1, 0.1, 0]);

  useFrame(() => {
    const { position } = ref.current;
    position.x += direction[0];
    position.y += direction[1];

    // Kollision mit den oberen und unteren Wänden
    if (position.y > 4.5 || position.y < -4.5) {
      setDirection([direction[0], -direction[1], 0]);
    }

    // Kollision mit dem linken oder rechten Rand (Punktesystem)
    if (position.x > 9 || position.x < -9) {
      setDirection([-direction[0], direction[1], 0]); // Richtung umkehren
    }

    // Kollision mit den Schlägern (vereinfacht)
    if (position.x < -7.5 && position.y < 3.5 && position.y > -3.5) {
      setDirection([-direction[0], direction[1], 0]); // Linker Schläger
    }

    if (position.x > 7.5 && position.y < 3.5 && position.y > -3.5) {
      setDirection([-direction[0], direction[1], 0]); // Rechter Schläger
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshBasicMaterial color="#FF00FF" wireframe={false} />
    </mesh>
  );
}

export default Ball;
