"use client";

import React from 'react'
import { useState } from 'react';
import actors from "@/data/actors.json"; // Assurez-vous que ce chemin est correct et que le fichier JSON est bien structuré
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';

type DraggableActorProps = {
  actor: Actor;
  matches: Matches;
};

const DraggableActor = ({ actor, matches }: DraggableActorProps) => {
  // Vérifie si l'acteur est déjà placé correctement
  const isPlacedCorrectly = Object.entries(matches).some(
    ([missionId, actorId]) => missionId === actorId && actorId === actor.id
  );

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: actor.id,
    disabled: isPlacedCorrectly, // ← bloque uniquement si c'est correct
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    cursor: isPlacedCorrectly ? "not-allowed" : "grab",
    opacity: isPlacedCorrectly ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`px-4 py-2 rounded-xl text-white ${isPlacedCorrectly ? "bg-gray-400" : "bg-gray-600"}`}
    >
      {actor.name}
    </div>
  );
};

type Actor = {
  id: string;
  name: string;
  mission: string;
};

type Matches = Record<string, string>;

type DroppableMissionProps = {
  actor: Actor;
  matches: Matches;
};

const DroppableMission = ({ actor, matches }: DroppableMissionProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: actor.id,
  });

  const matchedActor = matches[actor.id];
  const isCorrect = matchedActor === actor.id;

  return (
    <div
      ref={setNodeRef}
      className={`w-48 h-24 rounded-xl flex items-center justify-center text-center p-2 font-semibold
        ${matchedActor
          ? isCorrect
            ? "bg-green-500"
            : "bg-red-500"
          : isOver
          ? "bg-blue-300"
          : "bg-gray-700 text-white"
        }`}
    >
      {matchedActor
        ? isCorrect
          ? actors.find(a => a.id === matchedActor)?.name
          : actor.mission
        : actor.mission}
    </div>
  );
};

type ActorsGameProps = {
    refObj?: React.RefObject<any>; // pour permettre de référencer ce composant depuis l’extérieur si besoin
};

const ActorsGame = ({ refObj }: ActorsGameProps) => {

  const [matches, setMatches] = useState<Matches>({}); // pour stocker les associations validées
  
  if(refObj){
    refObj.current = {
        validateAll: () => {
            if(Object.keys(matches).length !== actors.length){ return false; } // validation échoue si toutes les missions ne sont pas associées
            return actors.every(actor => matches[actor.id] === actor.id); // validation réussit si toutes les missions sont correctement associées
        }
    };
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      setMatches((prev) => ({
        ...prev,
        [over.id as string]: active.id as string,
      }));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
    <div className="w-full flex flex-col items-center gap-8">
      
      {/* 🎴 Acteurs */}
      <div className="flex gap-4">
        {actors.map((actor) => (
          <DraggableActor key={actor.id} actor={actor} matches={matches} />
        ))}
      </div>

      {/* 📦 Missions */}
      <div className="flex gap-4 flex-wrap justify-center">
        {actors.map((actor) => (
          <DroppableMission key={actor.id} actor={actor} matches={matches} />
        ))}
      </div>
    </div>
    </DndContext>
  )
}

export default ActorsGame
