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
      accomplir diverses missions pour terminer l'escape game.
      <br />
      Essayez de résoudre chaque mission correctement pour débloquer la suite !
    </p>
  </section>

  {/* Progression */}
  <section className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-6">
    <h2 className="text-xl text-black font-semibold mb-3">Votre progression (si le joueur arrête en cours et veut reprendre)</h2>
    <div className="mb-4">
      <div className="w-full bg-gray-300 rounded-full h-4">
        <div className="bg-green-500 h-4 rounded-full" style={{ width: '40%' }} />
      </div>
      <p className="mt-2 text-gray-700">40% des missions terminées</p>
    </div>
    <p className="text-gray-700">Score précédent : 0 / Autre type de mesure ...</p>
  </section>

  {/* Modules disponibles */}
  <section className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-6">
    <h2 className="text-xl text-black font-semibold mb-3">Modules disponibles</h2>
    <div className="flex gap-4 flex-wrap">
      <div className="bg-green-500 text-white px-3 py-1 rounded-lg">Mission 1 ✅</div>
      <div className="bg-green-500 text-white px-3 py-1 rounded-lg">Mission 2 ✅</div>
      <div className="bg-green-500 text-white px-3 py-1 rounded-lg">Mission 3 ✅</div>
      <div className="bg-gray-300 text-white px-3 py-1 rounded-lg opacity-50">Mission 4 🔒</div>
      <div className="bg-gray-300 text-white px-3 py-1 rounded-lg opacity-50">Mission 5 🔒</div>
    </div>
  </section>

  {/* Astuce du jour */}
  <section className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-6">
    <h2 className="text-xl text-black font-semibold mb-3">Astuce prévention du jour</h2>
    <p className="text-gray-700">
      Pensez toujours à vérifier vos équipements de sécurité avant de commencer toute mission ! ✅
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