import React, { useRef } from 'react'
import { families } from '@/data/family'

const WorkingPlaceRisks = () => {

    return (
      <div className="flex flex-col items-center w-full px-4 max-w-5xl mx-auto">
        {/* IMAGE DE LA SCÈNE */}
        <div className="w-full h-[400px] relative mb-8">
          <img
            src="/images/scene-travail.jpg" // remplace par ton image
            alt="Scène de travail"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />

          {/* Zones interactives (pour repérer positions) */}
          <div className="absolute top-20 left-24 w-16 h-16 border-2 border-red-500 rounded-full" />
          <div className="absolute top-60 left-72 w-16 h-16 border-2 border-blue-500 rounded-full" />
          <div className="absolute top-40 left-48 w-16 h-16 border-2 border-green-500 rounded-full" />
        </div>

        {/* PICTOGRAMMES / zones à drag & drop (en bas) */}
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {families.map((family) => (
            <div
              key={family.id}
              className="w-20 h-20 bg-gray-200 flex flex-col items-center justify-center rounded-xl shadow-lg cursor-pointer flex-shrink-0"
            >
              <img src={family.icon} alt={family.name} className="w-12 h-12 mb-1 object-contain" />
              <span className="text-sm text-center">{family.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
}

export default WorkingPlaceRisks
