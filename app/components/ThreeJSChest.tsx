"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

type ChestProps = {
  duration?: number; // durée totale avant disparition (en secondes)
  onAnimationEnd?: () => void;
};

export default function ThreeJSChest({ duration = 8, onAnimationEnd }: ChestProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;


    if(mountRef.current.childNodes.length > 0) return;
    // SCENE
    const scene = new THREE.Scene();
    scene.background = null;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      100,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.shadowMap.enabled = true; // ✅ nécessaire pour les ombres
      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // plus joli

    mountRef.current.appendChild(renderer.domElement);

    // LUMIÈRE
    // Lumière directionnelle principale
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // plus lumineux
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Lumière ambiante
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // un peu plus fort
    scene.add(ambientLight);

    // Lumière secondaire pour “remplir” les ombres
    const fillLight = new THREE.PointLight(0xffffff, 1);
    fillLight.position.set(-5, 5, 5);
    scene.add(fillLight);

    const rimLight = new THREE.SpotLight(0xffffff, 1);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    const loader = new GLTFLoader();

    let mixer: THREE.AnimationMixer;
    let chestGroup = new THREE.Group();
    scene.add(chestGroup);

    const clock = new THREE.Clock();
    let elapsedTime = 0; // pour la durée totale

    loader.load('/models/chest_animation.glb', (gltf) => {
      const chest = gltf.scene;
    
      chest.scale.set(2, 2, 2);
      chest.position.set(0, -2, 0);
      chest.rotation.set(0, -Math.PI / 2, 0);
    
      // Ombres (optionnel mais stylé)
      chest.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          child.material = new THREE.MeshStandardMaterial({
            map: child.material.map, // garde la texture
            metalness: 0.5, // un peu de métal pour le coffre
            roughness: 0.7, // pas trop lisse
          });
        }
      });
    
      chestGroup.add(chest);

      // Animations
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(chest);
        const action = mixer.clipAction(gltf.animations[1]);
        action.loop = THREE.LoopOnce; // jouer une seule fois
        action.clampWhenFinished = true; // reste à la fin
        action.play();
      }
    });

    function animate() {
       requestAnimationFrame(animate);

      const delta = clock.getDelta();
      elapsedTime += delta;

      // rotation continue du coffre
      chestGroup.rotation.y += 0.003;

      // mise à jour du mixer (animation du coffre)
      if (mixer) mixer.update(delta);

      renderer.render(scene, camera);

      // disparition à la fin de la durée
      if (elapsedTime >= duration) {
        scene.remove(chestGroup);
        onAnimationEnd?.();
      }
    }

    animate();

     // === Cleanup ===
    return () => {
      renderer.dispose();
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
    };
  }, [duration, onAnimationEnd]);

  return <div ref={mountRef} className="w-full h-[400px] overflow-visible" />;
}