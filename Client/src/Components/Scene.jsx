import { Canvas } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [5, 4, 8], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* 💡 Enhanced Lighting for realism */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[6, 8, 6]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* 🔲 BASE: Modern Light Platform with edge */}
      <RoundedBox
        args={[6.5, 0.8, 4.5]}
        radius={0.25}
        smoothness={3}
        position={[0, -1.5, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial
          color="#f0f0f0"
          metalness={0.1}
          roughness={0.3}
        />
      </RoundedBox>

      {/* 🧱 BAR CONTAINER with sharp edge + realism */}
      <RoundedBox
        args={[4, 4.5, 0.6]}
        radius={0.3}
        smoothness={5}
        position={[0, 0.75, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#1e1e2d"
          metalness={0.2}
          roughness={0.4}
        />
      </RoundedBox>

      {/* ✨ Optional glow rim removed for cleaner look */}

      {/* 📊 STOCK BARS with rich shadow & depth */}
      {[
        { x: -1, h: 1.6, col: "#ff0000" },     // Red (loss)
        { x: 0, h: 2.2, col: "#45732a" },      // Dark green (moderate gain)
        { x: 1, h: 3, col: "#89e74e" },        // Light green (highest gain)
      ].map(({ x, h, col }) => (
        <mesh key={x} position={[x, -0.5 + h / 2, 0.8]} castShadow receiveShadow>
          <boxGeometry args={[0.5, h, 0.5]} />
          <meshStandardMaterial
            color={col}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* 🎥 Orbit Controls for horizontal rotation */}
      <OrbitControls
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.7}
      />
    </Canvas>
  );
}
