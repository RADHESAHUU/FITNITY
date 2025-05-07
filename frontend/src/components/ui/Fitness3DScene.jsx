import { Suspense, useRef, lazy } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Dynamically import heavy components
const OrbitControls = lazy(() => import('@react-three/drei').then(module => ({ default: module.OrbitControls })));
const Sphere = lazy(() => import('@react-three/drei').then(module => ({ default: module.Sphere })));

const AnimatedSphere = ({ progress }) => {
  const sphereRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    sphereRef.current.position.y = 1 + Math.sin(time) * 0.2;
    sphereRef.current.rotation.y += 0.01;
  });

  const color = new THREE.Color();
  color.setHSL(progress / 100 * 0.3, 0.8, 0.5);

  return (
    <Sphere ref={sphereRef} args={[1, 32, 32]} position={[0, 1, 0]}>
      <meshPhysicalMaterial
        color={color}
        metalness={0.2}
        roughness={0.3}
        envMapIntensity={0.5}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
      />
    </Sphere>
  );
};

const BackgroundParticles = () => {
  const particlesRef = useRef();

  useFrame((state) => {
    particlesRef.current.rotation.y += 0.001;
    particlesRef.current.rotation.x += 0.0005;
  });

  return (
    <group ref={particlesRef}>
      {[...Array(20)].map((_, i) => {
        const theta = Math.random() * Math.PI * 2;
        const radius = 3 + Math.random() * 2;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        const y = (Math.random() - 0.5) * 4;
        
        return (
          <Sphere key={i} args={[0.05, 16, 16]} position={[x, y, z]}>
            <meshBasicMaterial color="#4CAF50" transparent opacity={0.6} />
          </Sphere>
        );
      })}
    </group>
  );
};

const LoadingSpinner = () => (
  <Html center>
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
    </div>
  </Html>
);

const Fitness3DScene = ({ progress = 0 }) => {
  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-gradient-to-b from-deepBlack to-card-bg">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 75 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#0a0b1e']} />
        <fog attach="fog" args={['#0a0b1e', 5, 15]} />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4CAF50" />
        
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatedSphere progress={progress} />
          <BackgroundParticles />
          <OrbitControls 
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-white/70 text-sm">
        Progress: {Math.round(progress)}%
      </div>
    </div>
  );
};

export default Fitness3DScene;