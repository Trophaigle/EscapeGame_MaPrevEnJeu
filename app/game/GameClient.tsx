"use client";

import React, { useRef, useState } from 'react'
import CategoryCard from '../components/CategoryCard';
import ThreeJSChest from '../components/ThreeJSChest';
import MysterySentence from '../components/games/MysterySentence';
import WorkingPlaceRisks from '../components/games/WorkingPlaceRisks';
import RiskFamiliesGame from '../components/games/RiskFamiliesGame';
import RiddleGame from '../components/games/RiddleGame';
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

const ActorsGameNoSSR = dynamic(() => import("../components/games/ActorsGame"), { ssr: false });

export default function GameClient() {
  const router = useRouter();

  const [unlocked, setUnlocked] = useState([true, false, false, false, false]);
  const [newCardIndex, setNewCardIndex] = useState<number | null>(0); //0 pour avoir l'anim meme à la premiere card

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [showChest, setShowChest] = useState(false);
  const handleChestAnimationEnd = () => {
    setShowChest(false);
  }

  /* show motif toast */
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    // disparition automatique après 3s
    setTimeout(() => setToast(null), 3000);
  };

  const handleValidate = (
    index: number, 
    onValidate?: () => boolean | void
  ) => {
     // Si une action personnalisée est définie, on l'exécute
    if (onValidate) {
      const isValid = onValidate(); // onValidate doit retourner true ou false

      if(!isValid) return; // si validation échoue, on bloque la suite et n'affiche pas la nouvelle carte
    }

    // Vérifier si c’est la dernière carte
  const isLastCard = index === unlocked.length - 1;

  if (isLastCard) {
    // Redirection vers le dashboard
    //alert("🎉 Bravo ! Vous avez terminé l'Escape Game !");
    if(router == null) {
      alert("Router null, impossible de rediriger vers le dashboard");
    } else {
       router.push("/end"); // ← redirige vers la page dashboard
    }
    
    return; // stoppe ici
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
  const riddleRef = useRef<any>(null);

  const categories = [
  {
    title: 'Mission 1 : Les héros de la prévention 🦸‍♂️',
    subtitle: 'Repérez tous les acteurs de la prévention des risques professionnels et associez-les à leurs rôles et missions ! »',
    component: <ActorsGameNoSSR refObj={actorsRef} />, // ✅ client-only
    onValidate: () => {
      const isValid = actorsRef.current?.validateAll?.();
      if (isValid) {
        showToast("Bravo ! Tous les acteurs sont correctement placés ✅"); // à la place des alert, on affiche une jolie notification toast en haut de l’écran qui disparaît après 3s
      } else {
        showToast("Il y a encore des erreurs ❌", "error");
      }
      return isValid; // retourne true ou false
    }
  },
  {
    title: 'Mission 2 : L’énigme mystère 🔍',
    subtitle: "Pour avancer, résolvez l'énigme : additionnez le nombre total d’acteurs identifiés et le nombre de lettres du mot mystère.",
    component: <RiddleGame targetNumber={20} refObj={riddleRef}/>,
    onValidate: () => {
      const isValid = riddleRef.current?.validate?.();
      if (!isValid) {
        showToast("Ce n'est pas la bonne réponse ❌", "error");
        return false; // validation échouée, bloque la suite
      } 
      //if correct
      showToast("Bravo ! L'énigme est résolue ✅");
      // jouer l'animation du coffre si tu as un ref vers le ThreeJSChest
      setShowChest(true);
      return true; // validation réussie, continue vers la suite
    }
  },
  {
    title: 'Mission 3 : Le coffre aux trésors des risques 🗝️',
    subtitle: 'Bravo !\n Vous venez de débloquer les 20 familles de risques professionnels. \n Chaque famille est un nouveau défi à explorer !',
    component: <RiskFamiliesGame />
  },
  {
    title: 'Mission 4 : Détective du risque 🔎',
    subtitle: "Observez cette scène de travail (par exemple dans un restaurant).\n Votre mission (si vous l'acceptez): associer chaque personne au risque principal auquel elle est exposée.\n Saurez-vous repérer tous les dangers avant que quelque chose n’arrive ?",
    component: <WorkingPlaceRisks />
  },
  {
    title: 'Mission 5 : Maîtrisez les risques ⚡',
    subtitle: 'Votre objectif final : protéger vos collègues ! Réfléchissez aux mesures à mettre en place pour éviter les blessures : \nSupprimez le danger ou réduisez le risque à la source\nOu protégez les personnes exposées.\nVous êtes maintenant un vrai expert de la sécurité au travail ! »',
    component: <MysterySentence />,
    onValidate: () => {
      const isValid = true; // mettre la vraie logique de validation
      showToast(isValid ? "✅ Mission validée !" : "❌ Erreur");
      return isValid;
    }
  }
];
  

  return (

    
    /* Si unlocked[i] est true → on affiche le <div>
    Si unlocked[i] est false → on ne rend rien pour cette catégorie*/
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center pt-20 pb-20 space-y-10">
      
      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white z-50
        ${toast.type === "success" ? "bg-green-500" : "bg-red-500"} transition-all duration-300`}>
        {toast.message}
      </div>
      )}

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
     {showChest && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[9999]">
        <div className="w-[400px] h-[400px]">
          <ThreeJSChest onAnimationEnd={handleChestAnimationEnd} />
        </div>
      </div>
    )} 
    </div>
  );
}

