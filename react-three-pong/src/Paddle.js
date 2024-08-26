import React, { useEffect, useRef } from 'react';

function Paddle({ position, color, controls }) {
  const ref = useRef();

  useEffect(() => {
    function handleKeyDown(event) {
      if (controls.up.includes(event.key)) {
        ref.current.position.y = Math.min(ref.current.position.y + 0.5, 3.5); // Obere Grenze
      } else if (controls.down.includes(event.key)) {
        ref.current.position.y = Math.max(ref.current.position.y - 0.5, -3.5); // Untere Grenze
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [controls]);

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.5, 3, 0.5]} />
      <meshBasicMaterial color={color} wireframe={false} />
    </mesh>
  );
}

export default Paddle;
