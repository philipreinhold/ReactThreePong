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
    const time = clock.getElapsedTime() * 0.2;

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const baseHeight = generateHeight(x, y);
      const dynamicFactor = Math.sin(time + x * 0.05 + y * 0.05) * 2;
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
        <meshBasicMaterial color="#008599" transparent={true} opacity={0.2} />
      </mesh>
      <lineSegments position={[0, 5.5, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(18, 0.5, 0.5)]} />
        <lineBasicMaterial color="#008599" linewidth={2} />
      </lineSegments>

      <mesh position={[0, -5.5, 0]}>
        <boxGeometry args={[18, 0.5, 0.5]} />
        <meshBasicMaterial color="#008599" transparent={true} opacity={0.2} />
      </mesh>
      <lineSegments position={[0, -5.5, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(18, 0.5, 0.5)]} />
        <lineBasicMaterial color="#008599" linewidth={2} />
      </lineSegments>
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

export const Stars = () => {
  const starsRef = useRef();

  useEffect(() => {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: '#FFFFFF', size: 0.5 });

    const starVertices = [];
    for (let i = 0; i < 20000; i++) {  // Increased the number of stars
      const x = THREE.MathUtils.randFloatSpread(4000);  // More spread out
      const y = THREE.MathUtils.randFloatSpread(2000);  // Slightly vertical spread
      const z = THREE.MathUtils.randFloatSpread(4000);
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starsRef.current.geometry = starGeometry;
    starsRef.current.material = starMaterial;
  }, []);

  return <points ref={starsRef} />;
};

export const OrbitingPlanet = ({ radius, speed, size, color, distance, yOffset }) => {
  const planetRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * speed;
    planetRef.current.position.set(
      Math.cos(time) * distance,
      radius + yOffset,  // Adding an offset to vary the height of the planets
      Math.sin(time) * distance
    );
  });

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial color={color} wireframe={true} />  {/* Wireframe planet */}
    </mesh>
  );
};
