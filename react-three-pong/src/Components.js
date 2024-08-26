import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const Terrain = () => {
  const terrain = useRef();
  const { clock } = useThree();

  const generateHeight = useMemo(() => {
    return (x, y) => {
      const scale = 0.1;
      return (Math.sin(x * scale) + Math.sin(y * scale)) * 5;
    };
  }, []);

  useEffect(() => {
    const geometry = terrain.current.geometry;
    const positionAttribute = geometry.getAttribute('position');

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = generateHeight(x, y);
      positionAttribute.setZ(i, z);
    }
    
    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
  }, [generateHeight]);

  useFrame(() => {
    const geometry = terrain.current.geometry;
    const positionAttribute = geometry.getAttribute('position');
    const time = clock.getElapsedTime() * 0.2; // Slowed down the animation

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const baseHeight = generateHeight(x, y);
      const dynamicFactor = Math.sin(time + x * 0.05 + y * 0.05) * 2; // Dynamic height factor
      const z = baseHeight + dynamicFactor;
      
      positionAttribute.setZ(i, z);
    }
    
    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={terrain} rotation={[-Math.PI / 2, 113, 10]} position={[0, -15, -50]} scale={[3, 3, 1]}>
      <planeGeometry args={[100, 100, 100, 100]} />
      <meshBasicMaterial color="#FF4500" wireframe={true} />
    </mesh>
  );
};

export const Sun = () => {
  return (
    <mesh position={[0, 15, -300]}>
      <sphereGeometry args={[20, 32, 32]} />
      <meshBasicMaterial color="#FFA500" />
    </mesh>
  );
};

export const GameBoundaries = () => {
  return (
    <>
      <mesh position={[0, 5.5, 0]}>
        <boxGeometry args={[18, 0.5, 0.5]} />
        <meshBasicMaterial color="#008599" wireframe={true} />
      </mesh>
      <mesh position={[0, -5.5, 0]}>
        <boxGeometry args={[18, 0.5, 0.5]} />
        <meshBasicMaterial color="#008599" wireframe={true} />
      </mesh>
    </>
  );
};

export const PurpleFog = () => {
  const { scene } = useThree();
  
  useEffect(() => {
    scene.fog = new THREE.FogExp2('#4B0082', 0.008);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return null;
};