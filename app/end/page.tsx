"use client";
import { useEffect } from "react";
import EndScreen from "../components/EndScreen";

export default function EndPage() {

  useEffect(() => { // Reset the game state when the end page is loaded
    const resetGame = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/game-state/room?room=1",
          {
            method: "PUT",
          }
        );

        if (!response.ok) {
          throw new Error("Impossible de remettre le jeu à zéro");
        }

        const data = await response.json();

        console.log("Jeu remis à zéro :", data.current_room);

      } catch (error) {
        console.error("Erreur lors de la remise à zéro :", error);
      }
    };

    resetGame();
  }, []);

  return <EndScreen />;
}