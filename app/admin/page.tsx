"use client";

import { useState } from "react";

type Category = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
};

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [type, setType] = useState("actors");

  const addCategory = () => {
    if (!title || !subtitle) return;

    const newCategory: Category = {
      id: Date.now().toString(),
      title,
      subtitle,
      type,
    };

    setCategories((prev) => [...prev, newCategory]);

    // reset
    setTitle("");
    setSubtitle("");
    setType("actors");
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">⚙️ Admin - Escape Game</h1>

      {/* 🧾 Formulaire */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Ajouter une catégorie</h2>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Sous-titre"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        <select
          className="w-full mb-4 p-2 border rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="actors">Actors Game</option>
          <option value="riskFamilies">Risk Families</option>
        </select>

        <button
          onClick={addCategory}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Ajouter
        </button>
      </div>

      {/* 📋 Liste des catégories */}
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Catégories</h2>

        {categories.length === 0 && (
          <p className="text-gray-500">Aucune catégorie pour l’instant</p>
        )}

        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{cat.title}</p>
                <p className="text-sm text-gray-600">{cat.subtitle}</p>
                <p className="text-xs text-gray-400">{cat.type}</p>
              </div>

              <button
                onClick={() => deleteCategory(cat.id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}