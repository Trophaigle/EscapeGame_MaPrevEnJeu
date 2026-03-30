import { i } from 'framer-motion/client';
import React, { useState } from 'react'
import { families } from '@/data/family';

const RiskFamiliesGame = () => {
    const [revealed, setRevealed] = useState<number[]>([]);
    const unlockedCount = 5;

    const handleReveal = (id: string, index: number) => {
       if (!revealed.includes(index) && index < unlockedCount) {
         setRevealed(prev => [...prev, index]);
       }
     };
     


    return (
    <div className="grid grid-cols-4 gap-4 justify-center">
      {families.map((family, index) => {
        const isUnlocked = index < unlockedCount;
        const isRevealed = revealed.includes(index);

        return (
          <div
            key={family.id}
            className={`
              w-24 h-24 rounded-xl flex flex-col items-center justify-center cursor-pointer
              transition-all duration-300 shadow-lg
              ${isUnlocked ? "bg-yellow-100" : "bg-gray-400"}
              ${isRevealed ? "border-4 border-green-500" : ""}
            `}
            onClick={() => handleReveal(family.id, index)}
          >
            {isUnlocked && isRevealed ? (
              <>
                <img src={family.icon} alt={family.name} className="w-12 h-12 mb-1" />
                <span className="text-sm font-semibold text-black text-center">{family.name}</span>
              </>
            ) : (
              <span className="text-gray-600">🔒</span>
            )}
          </div>
        );
      })}
    </div>
  )
}

export default RiskFamiliesGame
