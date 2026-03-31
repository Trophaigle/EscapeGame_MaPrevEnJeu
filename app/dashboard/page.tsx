import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log("SESSION:", session);

  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8">
      {/* Header */}
      <header className="w-full max-w-3xl text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Prévention de Risque - Escape Game
        </h1>
        <p className="mt-2 text-gray-600">
          Bienvenue, {session.user?.name} !
        </p>
      </header>

      {/* Règles / Instructions */}
      <section className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl text-black font-semibold mb-3">Règles du jeu</h2>
        <p className="text-gray-700">
          Les joueurs vont passer à travers différents modules et devront
          accomplir diverses missions pour terminer l'escape game. Chaque module représente un thème de prévention des risques, et les missions sont conçues pour être à la fois éducatives et ludique.
          {/* Tu pourras compléter ici */}
        </p>
      </section>

      {/* Score / progression */}
      <section className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl text-black font-semibold mb-3">Votre progression</h2>
        <p className="text-gray-700">
          Score précédent : 0 {/* placeholder, tu pourras compléter plus tard */}
        </p>
      </section>

      {/* Bouton Commencer le jeu */}
      <Link href="/game" className="w-full max-w-3xl">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors">
          Commencer le jeu
        </button>
      </Link>
    </div>
  );
}