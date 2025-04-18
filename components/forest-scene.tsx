"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Environment, Stars, Cloud, useScroll, PerspectiveCamera, Float } from "@react-three/drei"
import { gsap } from "gsap"
import * as THREE from "three"

interface TreeProps {
  position: [number, number, number]
  scale?: number
  color?: string
}

// Create a stylized tree
function Tree({ position, scale = 1, color = "#2d4c1e" }: TreeProps) {
  const treeRef = useRef<THREE.Group>(null)

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
  const sceneRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const scroll = useScroll()
  const scrollOffset = useRef(0)

  useEffect(() => {
    if (!sceneRef.current) return

    // Initial camera position
    gsap.to(camera.position, {
      x: 0,
      y: 5,
      z: 15,
      duration: 1,
      ease: "power2.out",
    })

    // Parallax effect on scroll
    const handleScroll = () => {
      if (!sceneRef.current) return
      scrollOffset.current = scroll?.offset || 0
      sceneRef.current.position.y = scrollOffset.current * -2
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [camera, scroll])

  useFrame(() => {
    if (!sceneRef.current) return
    scrollOffset.current = scroll?.offset || 0
    sceneRef.current.position.y = scrollOffset.current * -2
  })

  return (
    <group ref={sceneRef}>
      <Environment preset="night" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Trees */}
      <Tree position={[-5, 0, -5]} scale={1.2} />
      <Tree position={[5, 0, -5]} scale={0.8} />
      <Tree position={[-3, 0, -8]} scale={1} />
      <Tree position={[3, 0, -8]} scale={1.1} />
      <Tree position={[0, 0, -10]} scale={1.3} />
      
      {/* Floating clouds */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <Cloud position={[-5, 3, -5]} scale={2} />
        <Cloud position={[5, 4, -5]} scale={1.5} />
        <Cloud position={[0, 5, -8]} scale={2.5} />
      </Float>
    </group>
  )
}
