"use client"
import Image from "next/image";
import { useRef, useState } from "react";
import CategoryCard from "./components/CategoryCard";
import ThreeJSChest from "./components/ThreeJSChest";
import ActorsGame from "./components/games/ActorsGame";

export default function Home() {
  const [unlocked, setUnlocked] = useState([true, false, false, false, false]);
  const [newCardIndex, setNewCardIndex] = useState<number | null>(0); //0 pour avoir l'anim meme à la premiere card

  // const [showChest, setShowChest] = useState(false);
  // const handleChestAnimationEnd = () => {
  //   setShowChest(false);
  //   const newUnlocked = [...unlocked];
  //   newUnlocked[2] = true; // débloque la catégorie 3
  //   setUnlocked(newUnlocked);
  //   setNewCardIndex(2);
  // }

  const handleValidate = (
    index: number, 
    onValidate?: () => boolean | void
  ) => {
     // Si une action personnalisée est définie, on l'exécute
    if (onValidate) {
      const isValid = onValidate(); // onValidate doit retourner true ou false

      if(!isValid) return; // si validation échoue, on bloque la suite et n'affiche pas la nouvelle carte
    }

    // Débloquer la carte suivante si tout est OK
    const newUnlocked = [...unlocked]; //copie tableau, necessaire pour que React détecte chgt et déclenche re-render.
    if (index + 1 < unlocked.length) { //verification limite
      newUnlocked[index + 1] = true; // débloque la catégorie suivante, React re-render la page avec la nouvelle version de unlocked
      setNewCardIndex(index + 1); // pour l'animation de la nouvelle carte, la nouvelle carte devient “nouvelle”
    }
    setUnlocked(newUnlocked);
  };

  const actorsRef = useRef<any>(null); // pour pouvoir appeler la validation du jeu des acteurs depuis la page principale

  const categories = [
  {
    title: 'Mission 1 : Les héros de la prévention 🦸‍♂️',
    subtitle: 'Repérez tous les acteurs de la prévention des risques professionnels et associez-les à leurs rôles et missions ! »',
    component: <ActorsGame refObj={actorsRef}/>,
    onValidate: () => {
      const isValid = actorsRef.current?.validateAll?.();
      if (isValid) {
        alert("Bravo ! Tous les acteurs sont correctement placés ✅");
      } else {
        alert("Il y a encore des erreurs ❌");
      }
      return isValid; // retourne true ou false
    }
  },
  {
    title: 'Mission 2 : L’énigme mystère 🔍',
    subtitle: 'Pour avancer, combinez vos indices : \nComptez le nombre total d’acteurs que vous avez identifiés. \nAjoutez le nombre de lettres du mot mystère trouvé lors d’une autre activité. \nRésolvez l’énigme et débloquez le niveau suivant !',
    // onValidateCustom: () => {
    //   console.log('Déclenche l’animation du coffre 3D !');
    //   // Déclencher ton animation Three.js
    //   setShowChest(true);
    //   return true; //bloque la suite
    // }
  },
  {
    title: 'Mission 3 : Le coffre aux trésors des risques 🗝️',
    subtitle: 'Bravo !\n Vous venez de débloquer les 20 familles de risques professionnels. \n Chaque famille est un nouveau défi à explorer !'
  },
  {
    title: 'Mission 4 : Détective du risque 🔎',
    subtitle: "Observez cette scène de travail (par exemple dans un restaurant).\n Votre mission (si vous l'acceptez): associer chaque personne au risque principal auquel elle est exposée.\n Saurez-vous repérer tous les dangers avant que quelque chose n’arrive ?"
  },
  {
    title: 'Mission 5 : Maîtrisez les risques ⚡',
    subtitle: 'Votre objectif final : protéger vos collègues ! Réfléchissez aux mesures à mettre en place pour éviter les blessures : \nSupprimez le danger ou réduisez le risque à la source\nOu protégez les personnes exposées.\nVous êtes maintenant un vrai expert de la sécurité au travail ! »'
  }
];
  

  return (
    /* Si unlocked[i] est true → on affiche le <div>
    Si unlocked[i] est false → on ne rend rien pour cette catégorie*/
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center pt-20 pb-20 space-y-10">
      
      {categories.map((cat, i) => (
        unlocked[i] && (
          <CategoryCard 
            key={i} //clé unique pour React afin qu’il sache quel élément a changé lors du re-render.
            title={cat.title}
            subtitle={cat.subtitle}
            onValidate={() => handleValidate(i, cat.onValidate)} //on transmet la fonction de validation personnalisée si elle existe
            isNew={i == newCardIndex}
           >
            {cat.component}
          </CategoryCard>
        )
      ))}
    
      {/* OVERLAY AU-DESSUS DE TOUT */}
    {/* {showChest && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[9999]">
        <div className="w-[400px] h-[400px]">
          <ThreeJSChest onAnimationEnd={handleChestAnimationEnd} />
        </div>
      </div>
    )} */}
    </div>
  );
}
