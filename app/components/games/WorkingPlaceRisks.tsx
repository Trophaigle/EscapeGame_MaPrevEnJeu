import React, { useRef, useState } from 'react'
import { families, Family } from '@/data/family'
import { DndContext, DragEndEvent, PointerSensor, TouchSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core'

type Matches = Record<string, string>; // ex: { zone1: "chemicals", zone2: "fire" } => zone1 doit recevoir l’item avec id "chemicals" pour être validé

interface DraggableProps {
  id: string; // identifiant unique de l’élément draggable
  children: React.ReactNode; // contenu affiché dans le draggable (texte, image…)
  initialPosition?: { x: number; y: number }; // position initiale facultative
  className?: string; // classes CSS optionnelles
  style?: React.CSSProperties; // style inline optionnel
}

function Draggable({ id, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id }); // Pendant le drag, dnd-kit gère le déplacement visuel grâce à transform.
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: "grab",
    padding: "8px",
    //backgroundColor: "lightblue",
    display: "inline-block",
    margin: "5px",
    borderRadius: "4px",
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

interface DropZoneProps {
  id: string; // identifiant unique de la zone
  children?: React.ReactNode; // contenu optionnel à afficher dans la zone
  onDrop?: (itemId: string, zoneId: string) => void; // callback appelé quand un élément est droppé
  x: number; // position horizontale de la zone en pixels
  y: number; // position verticale de la zone en pixels
  width: number; // largeur de la zone en pixels
  height: number; // hauteur de la zone en pixels
}

function DropZone({ id, children, onDrop, x, y, width, height } : DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({ id }); // isOver pour savoir si un draggable est au-dessus de cette zone
  const style: React.CSSProperties = {
    position: "absolute", // OK maintenant, typé CSSProperties
    left: `${x}px`,        // ajoute 'px' si x est un nombre
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    border: isOver ? "2px dashed green" : "2px dashed transparent",
  };
  
  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

type WorkingPlaceRisksProps = {
    refObj?: React.RefObject<any>; // pour permettre de référencer ce composant depuis l’extérieur si besoin
};

const WorkingPlaceRisks = ({ refObj }: WorkingPlaceRisksProps) => {

  // Ce state contient uniquement les bons placements validés
  const [matches, setMatches] = useState<Matches>({});

  const correctMatches: Matches = {
    //association des zones avec id des families
    zone1: "chemicals",
    zone2: "fire",
    zone3: "electrical",
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return; // si on drop en dehors de toute zone, on ignore

    const zoneId = over.id as string;
    const itemId = active.id as string;

    // ✅ Vérification
    const isCorrect = correctMatches[zoneId] === itemId;

    if (isCorrect) {
      setMatches((prev) => ({
        ...prev,
        [zoneId]: itemId,
      }));
    } else {
      console.log("Mauvais placement ❌");
    }
  };

  const dropZones = [
    { id: "zone1", x: 50, y: 50, width: 100, height: 100 },
    { id: "zone2", x: 200, y: 150, width: 100, height: 100 },
    { id: "zone3", x: 400, y: 300, width: 100, height: 100 },
  ];

  const pointerSensor = useSensor(PointerSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(pointerSensor, touchSensor); //add mobile support (touch)

  if(refObj){
    refObj.current = {
        validateAll: () => {
            return dropZones.every(
              (zone) => matches[zone.id] === correctMatches[zone.id]
            );
        }
    };
  }

    return (
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex flex-col items-center w-full px-4 max-w-5xl mx-auto">
          {/* IMAGE DE LA SCÈNE */}
          <div className="w-full h-[400px] relative mb-8">
            <img
              src="/images/IAImageWorkPlaceHazards.png" // remplace par ton image
              alt="Scène de travail"
              className="w-full h-full object-contain rounded-xl shadow-lg"
            />
            {dropZones.map((zone) => (
              <DropZone
                key={zone.id}
                id={zone.id}
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
              >
                {/* afficher l’item DANS la zone si il est validé */}
                {matches[zone.id] && (
                   <div className="w-full h-full flex items-center justify-center">
                    <FamilyCard
                      family={families.find((f) => f.id === matches[zone.id])!}
                    />
                  </div>
                )}
              </DropZone>
            ))}

          </div>

          {/* PICTOGRAMMES / zones à drag & drop (en bas) */}
          <div className="flex flex-wrap justify-center gap-4 w-full">
            {families.filter(family => !Object.values(matches).includes(family.id))//affiche seulement les items non encore placés
            .map((family) => (
              <Draggable key={family.id} id={family.id}>
                <FamilyCard family={family} />
              </Draggable>
            ))}
          </div>
        </div>
      </DndContext>
    )
}


type FamilyCardProps = {
  family: Family;
};

function FamilyCard({ family }: FamilyCardProps) {
  return (
    <div className="w-20 h-20 bg-gray-200 flex flex-col items-center justify-center rounded-xl shadow-lg">
      <img
        src={family.icon}
        alt={family.name}
        className="w-12 h-12 mb-1 object-contain"
      />
      <span className="text-sm text-center">{family.name}</span>
    </div>
  );
}

export default WorkingPlaceRisks
