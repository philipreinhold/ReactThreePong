import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const Terrain = () => {
  const terrain = useRef();

  useEffect(() => {
    const geometry = terrain.current.geometry;
    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = Math.sin(x / 2) * Math.cos(y / 2) * 2;
      position.setZ(i, z);
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();
  }, []);

  return (
    <mesh ref={terrain} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -10]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshBasicMaterial color="#FF4500" wireframe={true} />
    </mesh>
  );
};

export const Sun = () => {
  return (
    <mesh position={[0, 10, -50]}>
      <sphereGeometry args={[5, 32, 32]} />
      <meshBasicMaterial color="#FFA500" />
    </mesh>
  );
};

export const GameBoundaries = () => {
  return (
    <>
      <mesh position={[0, 5.5, 0]}>
        <boxGeometry args={[18, 0.5, 0.5]} />
        <meshBasicMaterial color="#FFFFFF" wireframe={true} />
      </mesh>
      <mesh position={[0, -5.5, 0]}>
        <boxGeometry args={[18, 0.5, 0.5]} />
        <meshBasicMaterial color="#FFFFFF" wireframe={true} />
      </mesh>
    </>
  );
};

export const PurpleFog = () => {
  const { scene } = useThree();
  
  useEffect(() => {
    scene.fog = new THREE.FogExp2('#4B0082', 0.02);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return null;
};