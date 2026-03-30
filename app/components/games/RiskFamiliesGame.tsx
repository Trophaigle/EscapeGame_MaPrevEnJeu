import React, { useState } from 'react'

const RiskFamiliesGame = () => {
    const [revealed, setRevealed] = useState<number[]>([]);
    const unlockedCount = 5;

    const handleReveal = (id: string, index: number) => {
       if (!revealed.includes(index) && index < unlockedCount) {
         setRevealed(prev => [...prev, index]);
       }
     };
     //icons https://icones8.fr/icons/set/fall
     const families = [
      { id: "chemicals", name: "Produits chimiques", icon: "/images/chemical.png" },
      { id: "fire", name: "Incendie", icon: "/images/fire.png" },
      { id: "electrical", name: "Électricité", icon: "/images/electrical.png" },
      { id: "fall", name: "Chutes", icon: "/images/fall.png" },
      // ajouter les 20 familles...
    ];

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
