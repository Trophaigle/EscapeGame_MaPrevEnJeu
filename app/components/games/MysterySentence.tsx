import React, { useRef } from 'react'
import LetterGrid from '../LetterGrid'

const MysterySentence = () => {
  const gridRef = useRef<any>(null);

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 space-y-6">

      {/* Tableau de lettres */}
      <LetterGrid size={20} refObj={gridRef} />
    
      {/* Boutons de test */}
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            gridRef.current?.setLetter(0, "A");
            gridRef.current?.setLetter(1, "B");
            gridRef.current?.setLetter(5, "C");
          }}
        >
          Ajouter des lettres
        </button>
      
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => {
            gridRef.current?.hideLetter(1);
          }}
        >
          Cacher la lettre 2
        </button>
      </div>
      
      {/* Colonnes Prévention / Protection */}
      <div className="flex w-full gap-6">
      
        {/* Prévention */}
        <div className="flex-1 min-h-[200px] border-2 border-green-400 rounded-xl p-4 bg-green-50">
          <h3 className="text-center font-semibold text-green-700 mb-2">
            Prévention
          </h3>
      
          {/* Contenu futur ici */}
          <div className="text-center text-gray-400 text-sm">
            (Glisser ici plus tard)
          </div>
        </div>
      
        {/* Protection */}
        <div className="flex-1 min-h-[200px] border-2 border-blue-400 rounded-xl p-4 bg-blue-50">
          <h3 className="text-center font-semibold text-blue-700 mb-2">
            Protection
          </h3>
      
          {/* Contenu futur ici */}
          <div className="text-center text-gray-400 text-sm">
            (Glisser ici plus tard)
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default MysterySentence
