import React from 'react'
import { useState } from 'react';
import actors from "@/data/actors.json"; // Assurez-vous que ce chemin est correct et que le fichier JSON est bien structuré

type ActorsGameProps = {
    refObj?: React.RefObject<any>; // pour permettre de référencer ce composant depuis l’extérieur si besoin
};

const ActorsGame = ({ refObj }: ActorsGameProps) => {

  const [selectedActor, setSelectedActor] = React.useState<string | null>(null); // pour stocker l'acteur sélectionné
  const [matches, setMatches] = useState<{[key: string]: string}>({}); // pour stocker les associations validées
  
  if(refObj){
    refObj.current = {
        validateAll: () => {
            if(Object.keys(matches).length !== actors.length){ return false; } // validation échoue si toutes les missions ne sont pas associées
            return actors.every(actor => matches[actor.id] === actor.id); // validation réussit si toutes les missions sont correctement associées
        }
    };
  }

  const handleSelectActor = (actorId: string) => {
    setSelectedActor(actorId);
  };

  const handleDrop = (missionId: string) => {
    if (selectedActor) {
      setMatches((prevMatches) => ({

        ...prevMatches,
        [missionId]: selectedActor
      }));
      setSelectedActor(null);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      
      {/* 🎴 Acteurs */}
      <div className="flex gap-4">
        {actors.map((actor) => (
          <div
            key={actor.id}
            onClick={() => handleSelectActor(actor.id)}
            className={`px-4 py-2 rounded-xl cursor-pointer
              ${selectedActor === actor.id ? "bg-blue-500 text-white" : "bg-gray-600 text-white"
            }`}
          >
            {actor.name}
          </div>
        ))}
      </div>

      {/* 📦 Missions */}
      <div className="flex gap-4 flex-wrap justify-center">
        {actors.map((actor) => {
          const matchedActor = matches[actor.id];
          const isCorrect = matchedActor === actor.id;

          return (
            <div
              key={actor.id}
              onClick={() => handleDrop(actor.id)}
              className={`w-48 h-24 rounded-xl flex items-center justify-center text-center p-2 font-semibold cursor-pointer 
                ${matchedActor ? (isCorrect ? "bg-green-500" : "bg-red-500") : "bg-gray-700 text-white"}`}
            >
              {matchedActor
                ? isCorrect
                  ? actors.find(a => a.id === matchedActor)?.name //green= good answer
                  : actor.mission //red= wrong answer, remettre le texte original de la mission
                : actor.mission // case vide = montrer la mission
                }
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ActorsGame
