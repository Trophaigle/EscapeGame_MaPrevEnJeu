"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

type ChestProps = {
  onAnimationEnd?: () => void;
};

export default function ThreeJSChest({ onAnimationEnd }: ChestProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;


    if(mountRef.current.childNodes.length > 0) return;
    // SCENE
    const scene = new THREE.Scene();
    scene.background = null;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );


    mountRef.current.appendChild(renderer.domElement);

    // LUMIÈRE
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // COFFRE (cube pour l’instant)
    /*const geometry = new THREE.BoxGeometry(2, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
    const chest = new THREE.Mesh(geometry, material);

    chest.rotation.set(0, -Math.PI / 4, 0); // rotation initiale de 45° autour de l’axe Y
    
    scene.add(chest);*/
    const loader = new GLTFLoader();

    let chest: THREE.Object3D;

    loader.load('/models/x-fantasy-treasure-chest/source/chest.glb', (gltf) => {
      chest = gltf.scene;
    
      chest.scale.set(2, 2, 2);
      chest.position.set(0, -1, 0);
      chest.rotation.set(0, -Math.PI / 4, 0);
    
      // Ombres (optionnel mais stylé)
      chest.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material = new THREE.MeshStandardMaterial({
      map: child.material.map, // garde la texture
    });
        }
      });
    
      scene.add(chest);
    });

    // ANIMATION
    let elapsed = 0;
    const duration = 10; // secondes

    function animate() {
      requestAnimationFrame(animate);

      // rotation
      if(chest) {
        chest.rotation.y += 0.003;
      }

      // timer
      elapsed += 0.016; // approx 60fps

      if (elapsed >= duration && chest) {
        // disparition
        scene.remove(chest);

        // callback
        onAnimationEnd?.();

        return; // stop animation
      }

      renderer.render(scene, camera);
    }

    animate();

    // CLEANUP (IMPORTANT en React)
    return () => {
      renderer.dispose();

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-[400px]" />;
}