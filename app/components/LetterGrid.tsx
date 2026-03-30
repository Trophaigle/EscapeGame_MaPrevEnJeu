"use client";

import { i } from "framer-motion/client";
import { useState } from "react";

type LetterCell = {
  letter: string; // lettre de la case
  visible: boolean; // si elle est affichée ou pas
};

type LetterGridProps = {
  size: number; // nombre de cases
  refObj?: React.RefObject<any>;
};

export default function LetterGrid({ size, refObj }: LetterGridProps) {
  // initialisation des cases
  const [cells, setCells] = useState<LetterCell[]>(
    Array(size).fill({ letter: "", visible: false })
  );
    // fonction pour mettre une lettre dans une case par index
      const setLetter = (index: number, letter: string) => {
        setCells((prev) => {
          const newCells = [...prev];
          newCells[index] = { letter, visible: true };
          return newCells;
        });
      };
  
      // fonction pour cacher une lettre
      const hideLetter = (index: number) => {
        setCells((prev) => {
          const newCells = [...prev];
          newCells[index] = { ...newCells[index], visible: false };
          return newCells;
        });
      };

    if (refObj) {
      refObj.current = {
        setLetter, // expose la fonction pour mettre une lettre
        hideLetter // expose la fonction pour cacher une lettre
      };
    }
  

  return (
    <div className="grid grid-cols-10 gap-2 justify-center">
      {cells.map((cell, idx) => (
        <div
          key={idx}
          className="w-10 h-10 flex items-center justify-center border-2 rounded-lg bg-gray-100 shadow-md relative"
        >
          {/* index affiché en petit */}
          <span className="absolute top-0 left-1 text-xs text-gray-400">{idx + 1}</span>

          {/* lettre */}
          <span className={`text-lg font-bold ${cell.visible ? "text-black" : "text-transparent"}`}>
            {cell.letter}
          </span>
        </div>
      ))}
    </div>
  );
}