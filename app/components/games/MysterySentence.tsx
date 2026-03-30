import React, { useRef } from 'react'
import LetterGrid from '../LetterGrid'

const MysterySentence = () => {
  const gridRef = useRef<any>(null);

  return (
    <div>
      <LetterGrid size={20} refObj={gridRef} />
       <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          gridRef.current?.setLetter(0, "A");
          gridRef.current?.setLetter(1, "B");
          gridRef.current?.setLetter(5, "C");
        }}
      >
        Ajouter des lettres
      </button>
      <button
        className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => {
          gridRef.current?.hideLetter(1);
        }}
      >
        Cacher la lettre 2
      </button>
    </div>
  )
}

export default MysterySentence
