"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { EffectComposer, GLTFLoader, RenderPass, UnrealBloomPass } from "three/examples/jsm/Addons.js";

export default function EndScreen() {
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // après création du renderer
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "0";

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // ⭐ Etoile (icosahedron)
    const loader = new GLTFLoader();
    let mixer: THREE.AnimationMixer;

    loader.load("/models/test_animated_star.glb", (gltf) => {
      const star = gltf.scene;
      scene.add(star);

      star.scale.set(10, 10, 10); 
      star.position.set(0, 0, 0);

      // 🎬 Animation
      mixer = new THREE.AnimationMixer(star);

      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
    });

    // 💡 Lumière
    // 💡 Point light centrale
    const centerLight = new THREE.PointLight(0xffffff, 2, 10); 
    // 0xffffff = couleur blanche
    // 2 = intensité
    // 10 = distance maximale de l’éclairage
    
    centerLight.position.set(0, 0, 0); // centre de la scène
    centerLight.color = new THREE.Color(0xfff176); // jaune clair
    centerLight.intensity = 3;
    centerLight.distance = 15;

    scene.add(centerLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    let frameId: number;

    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if(mixer) mixer.update(delta);

      renderer.render(scene, camera);
    };

    animate();

    // ⏱ Redirection après 7 secondes
    const timeout = setTimeout(() => {
      router.push("/dashboard");
    }, 7000);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeout);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [router]);

  return (
    <div className="w-screen h-screen relative bg-black">
  
        {/* 🎮 Canvas Three.js */}
        <div ref={mountRef} className="w-full h-full" />

        {/* 📝 Texte overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 pointer-events-none bg-black/30 backdrop-blur-[3px]">
          <h1 className="text-4xl font-bold mb-4 text-center">
            🎉 Escape Game Terminé !
          </h1>
          <p className="text-lg opacity-80">
            Retour au tableau de bord...
          </p>
        </div>

    </div>
  );
}