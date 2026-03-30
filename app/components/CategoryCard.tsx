import React from 'react'
import { useEffect, useRef, useState } from 'react';

type CategoryCardProps = {
  title: string;
  subtitle: string;
  onValidate: () => void;
  isNew?: boolean; // pour déclencher animation à l'apparition
  children?: React.ReactNode; // pour permettre d'ajouter des éléments personnalisés à l'intérieur de la carte
};

const CategoryCard = ({title, subtitle ,onValidate, isNew, children} : CategoryCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(isNew ? false : true);

    useEffect(() => {
      if (isNew) {
        setVisible(true);
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, [isNew]);

    return (
    <div
      ref={cardRef}
      className={`
         w-[95%] 
    min-h-[90dvh] md:h-[90vh]

    bg-gray-800 text-white 
    rounded-2xl md:rounded-3xl shadow-2xl 

    flex flex-col items-center
    justify-center md:justify-center

    px-4 py-5 md:px-8 md:py-6
    space-y-4 md:space-y-6

    overflow-y-auto

    transform transition-all duration-700
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <h2 className="text-xl md:text-3xl font-bold text-center">{title}</h2>
      <h3 className="text-sm md:text-lg text-gray-300 text-center whitespace-pre-line">{subtitle}</h3>

      {/* Le contenu dynamique */}
      <div className="w-full flex justify-center">
        {children}
      </div>

      <button
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-lg font-semibold transition-colors"
        onClick={onValidate}
      >
        Valider
      </button>
    </div>
  )
}

export default CategoryCard
