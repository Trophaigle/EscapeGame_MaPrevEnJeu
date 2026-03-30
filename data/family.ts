export type Family = {
  id: string;
  name: string;
  icon: string;
};

//icons https://icones8.fr/icons/set/fall
export const families: Family[] = [
  { id: "chemicals", name: "Produits chimiques", icon: "/images/chemical.png" },
  { id: "fire", name: "Incendie", icon: "/images/fire.png" },
  { id: "electrical", name: "Électricité", icon: "/images/electrical.png" },
  { id: "fall", name: "Chutes", icon: "/images/fall.png" },
  { id: "machinery", name: "Machines", icon: "/images/machinery.png" },
  { id: "noise", name: "Bruit", icon: "/images/noise.png" },
  { id: "vibration", name: "Vibrations", icon: "/images/vibration.png" },
  { id: "temperature", name: "Température", icon: "/images/temperature.png" },
  { id: "radiation", name: "Rayonnement", icon: "/images/radiation.png" },
  { id: "biohazard", name: "Biologiques", icon: "/images/biohazard.png" },
  { id: "ergonomics", name: "Ergonomie", icon: "/images/ergonomics.png" },
  { id: "slip", name: "Glissades", icon: "/images/slip.png" },
  { id: "cuts", name: "Coupures", icon: "/images/cuts.png" },
  { id: "pressure", name: "Pression", icon: "/images/pressure.png" },
  { id: "explosion", name: "Explosion", icon: "/images/explosion.png" },
  { id: "confinedspace", name: "Espaces confinés", icon: "/images/confinedspace.png" },
  { id: "fallsheight", name: "Chutes de hauteur", icon: "/images/fallsheight.png" },
  { id: "firearms", name: "Armes", icon: "/images/firearms.png" },
  { id: "slips_trips", name: "Chutes & trébuchements", icon: "/images/slips_trips.png" },
  { id: "other", name: "Autres risques", icon: "/images/other.png" },
];