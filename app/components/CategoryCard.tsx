import React from 'react'
import { useEffect, useRef, useState } from 'react';

type CategoryCardProps = {
  title: string;
  subtitle: string;
  onValidate: () => void;
  isNew?: boolean; // pour déclencher animation à l'apparition
};

const CategoryCard = ({title, subtitle ,onValidate, isNew} : CategoryCardProps) => {
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
        w-[95%] h-[90vh] 
        bg-gray-800 text-white 
        rounded-3xl shadow-2xl 
        flex flex-col items-center justify-center space-y-6
        transform transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <h2 className="text-3xl font-bold">{title}</h2>
      <h3 className="text-lg text-gray-300 text-center whitespace-pre-line">{subtitle}</h3>
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
