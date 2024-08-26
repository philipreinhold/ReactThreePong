import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Terrain component
export const Terrain = () => {
  const terrain = useRef();

  useEffect(() => {
    const geometry = terrain.current.geometry;
    const position = geometry.attributes.position;

    // Create wavy terrain
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      // Adjust the formula here to change terrain shape
      const z = Math.sin(x / 2) * Math.cos(y / 2) * 2;
      position.setZ(i, z);
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();
  }, []);

  return (
    <mesh ref={terrain} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -10]}>
      {/* Adjust size and detail of terrain here */}
      <planeGeometry args={[100, 100, 50, 50]} />
      {/* Adjust color and wireframe here */}
      <meshBasicMaterial color="#FF4500" wireframe={true} />
    </mesh>
  );
};

// Sun component
export const Sun = () => {
  return (
    <mesh position={[0, 10, -50]}>
      {/* Adjust size of sun here */}
      <sphereGeometry args={[5, 32, 32]} />
      {/* Adjust color of sun here */}
      <meshBasicMaterial color="#FFA500" />
    </mesh>
  );
};

// Game boundaries component
export const GameBoundaries = () => {
  return (
    <>
      {/* Top boundary */}
      <mesh position={[0, 5.5, 0]}>
        {/* Adjust size of boundary here */}
        <boxGeometry args={[18, 0.5, 0.5]} />
        {/* Adjust color and wireframe of boundary here */}
        <meshBasicMaterial color="#FFFFFF" wireframe={true} />
      </mesh>
      {/* Bottom boundary */}
      <mesh position={[0, -5.5, 0]}>
        <boxGeometry args={[18, 0.5, 0.5]} />
        <meshBasicMaterial color="#FFFFFF" wireframe={true} />
      </mesh>
    </>
  );
};