"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Environment, Stars, Cloud, useScroll, PerspectiveCamera, Float } from "@react-three/drei"
import { gsap } from "gsap"
import * as THREE from "three"

// Create a stylized tree
function Tree({ position, scale = 1, color = "#2d4c1e" }) {
  const treeRef = useRef()

  // Create a stylized low-poly tree
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0, 1.5 * scale, 4 * scale, 4, 1)
    geo.translate(0, 2 * scale, 0)
    return geo
  }, [scale])

  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.rotation.y += 0.001
    }
  })

  return (
    <group position={position}>
      {/* Tree trunk */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.2 * scale, 0.2 * scale, 1 * scale, 8]} />
        <meshStandardMaterial color="#3d2817" roughness={0.8} />
      </mesh>

      {/* Tree foliage */}
      <mesh ref={treeRef} position={[0, 1.5 * scale, 0]} castShadow geometry={geometry}>
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  )
}

// Create a crystal centerpiece
function Crystal({ position }) {
  const crystalRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    crystalRef.current.rotation.y = t * 0.2
    crystalRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2
  })

  return (
    <group ref={crystalRef} position={position}>
      <mesh castShadow>
        <octahedronGeometry args={[1.5, 0]} />
        <meshPhysicalMaterial
          color="#a1e4ff"
          transmission={0.6}
          roughness={0.1}
          metalness={0.1}
          emissive="#64c5ff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}

export function ForestScene() {
  const { camera } = useThree()
  const scroll = useScroll()
  const cameraRef = useRef()

  // Create a circular arrangement of trees
  const trees = useMemo(() => {
    const items = []
    const radius = 15
    const count = 20

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const x = Math.sin(angle) * radius
      const z = Math.cos(angle) * radius
      const scale = 0.5 + Math.random() * 1
      const color = ["#2d4c1e", "#1e4c2d", "#3a5a2a"][Math.floor(Math.random() * 3)]

      items.push({ position: [x, 0, z], scale, color })
    }

    return items
  }, [])

  useFrame((state, delta) => {
    // Update camera based on scroll
    const scrollOffset = scroll.offset

    // Move camera up and around as user scrolls
    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        y: 5 + scrollOffset * 10,
        z: 15 - scrollOffset * 10,
        duration: 0.5,
      })

      gsap.to(cameraRef.current.rotation, {
        x: -0.2 - scrollOffset * 0.2,
        duration: 0.5,
      })
    }
  })

  useEffect(() => {
    if (camera && cameraRef.current) {
      camera.position.copy(cameraRef.current.position)
      camera.rotation.copy(cameraRef.current.rotation)
    }
  }, [camera])

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 5, 15]} fov={75} />

      <color attach="background" args={["#030c0a"]} />

      <fog attach="fog" args={["#030c0a", 5, 30]} />

      <ambientLight intensity={0.2} />

      <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow shadow-mapSize={1024} />

      <pointLight position={[0, 8, 0]} intensity={1} color="#a1e4ff" />

      {/* Ground */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#0a1f0a" roughness={1} />
      </mesh>

      {/* Trees */}
      {trees.map((tree, i) => (
        <Tree key={i} position={tree.position} scale={tree.scale} color={tree.color} />
      ))}

      {/* Crystal centerpiece */}
      <Crystal position={[0, 3, 0]} />

      {/* Clouds */}
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Cloud position={[-10, 15, -10]} args={[3, 2]} opacity={0.3} speed={0.4} />
        <Cloud position={[10, 12, -15]} args={[3, 2]} opacity={0.3} speed={0.4} />
        <Cloud position={[0, 10, 0]} args={[3, 2]} opacity={0.3} speed={0.4} />
      </Float>

      {/* Stars */}
      <Stars radius={50} depth={50} count={1000} factor={4} fade speed={1} />

      {/* Environment lighting */}
      <Environment preset="night" />
    </>
  )
}
