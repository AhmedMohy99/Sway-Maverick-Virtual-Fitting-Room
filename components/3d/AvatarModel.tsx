'use client';
import { useGLTF, useTexture } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSwayStore } from '../../lib/store';

export default function AvatarModel() {
  const { topTexture, bottomTexture, faceTexture } = useSwayStore();
  const { scene } = useGLTF('/avatar.glb');
  const modelRef = useRef<THREE.Group>();

  // Load textures dynamically when they exist
  const tTop = topTexture ? useTexture(topTexture) : null;
  const tBottom = bottomTexture ? useTexture(bottomTexture) : null;
  const tFace = faceTexture ? useTexture(faceTexture) : null;

  useEffect(() => {
    if (!scene) return;

    // Clone the scene to avoid modifying the original
    const clonedScene = scene.clone();
    
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();
        
        // Ensure material is a MeshStandardMaterial or similar
        if (!(child.material instanceof THREE.Material)) {
          child.material = new THREE.MeshStandardMaterial();
        }

        // Apply T-Shirt texture
        if (tTop && (
          name.includes('shirt') || 
          name.includes('top') || 
          name.includes('torso') ||
          name.includes('body_upper')
        )) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.map = tTop;
                mat.needsUpdate = true;
              }
            });
          } else if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.map = tTop;
            child.material.needsUpdate = true;
          }
        }

        // Apply Pants texture
        if (tBottom && (
          name.includes('pants') || 
          name.includes('leg') || 
          name.includes('bottom') ||
          name.includes('body_lower')
        )) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.map = tBottom;
                mat.needsUpdate = true;
              }
            });
          } else if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.map = tBottom;
            child.material.needsUpdate = true;
          }
        }

        // Apply Face texture
        if (tFace && (
          name.includes('head') || 
          name.includes('face') ||
          name.includes('body_head')
        )) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.map = tFace;
                mat.needsUpdate = true;
              }
            });
          } else if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.map = tFace;
            child.material.needsUpdate = true;
          }
        }

        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (modelRef.current) {
      modelRef.current.clear();
      modelRef.current.add(clonedScene);
    }
  }, [scene, tTop, tBottom, tFace]);

  return (
    <group ref={modelRef as any}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/avatar.glb');
