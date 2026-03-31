import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import GameClient from "./GameClient"; // ton vrai composant client

export default async function GamePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login"); // 🔒 protection avant rendu

  // Si connecté, on rend le Client Component
  return <GameClient />;
}