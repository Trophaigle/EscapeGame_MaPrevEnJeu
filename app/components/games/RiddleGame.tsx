import React from 'react'
import { useState } from 'react';

type RiddleGameProps = {
  refObj?: React.RefObject<any>;
  targetNumber: number; // le résultat attendu (ex: 20)
  onComplete?: () => void; // callback si la réponse est correcte
};

const RiddleGame = ({ targetNumber, onComplete, refObj }: RiddleGameProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    //const [isValid, setIsValid] = useState<boolean | null>(null); // null = non vérifié

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    if(refObj){
      refObj.current = {
          validate: () => {
              const num = parseInt(inputValue);
              if(num === targetNumber){
                //setIsValid(true);
                return true; // validation réussie
                //onComplete?.();
              } else {
               // setIsValid(false);
                return false; // validation échouée
              }
          }
      };
    }

    return (
    <div className="w-full flex flex-col items-center gap-8">
        <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        className="px-4 py-2 rounded-lg text-white w-32 text-center border-2 toggle:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
        placeholder="Votre réponse"
      />
    </div>
  )
}

export default RiddleGame
