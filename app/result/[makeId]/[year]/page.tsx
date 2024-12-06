'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Model } from "@/app/types/modelTypes";
import Loader from "../../../../components/Loader"

const ResultPage = () => {
  const { makeId, year } = useParams(); // Extrai os parâmetros da URL
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!makeId || !year) return;

    async function fetchModels() {
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setModels(data.Results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false)
      }
    }

    fetchModels();
  }, [makeId, year]);

  return  (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex flex-col items-center p-6 ">
      <Link
        href="/"
        className="text-white hover:underline self-start mb-6 font-bold"
      >
        &larr; Back Home
      </Link>
      <h1 className="text-3xl font-extrabold text-white mb-6">
        Vehicle Models for {year}
      </h1>

      {loading ? (
       <Loader/>
      ) : (
        <ul className="w-full max-w-lg mt-4 space-y-4">
          {models.length > 0 ? (
            models.map((model) => (
              <li
                key={model.Model_ID + Math.random()}
                className="bg-white shadow-md p-4 rounded-lg border border-gray-300 text-gray-700"
              >
                {model.Model_Name}
              </li>
            ))
          ) : (
            <p className="text-white font-medium text-center">
              No models available for this make and year.
            </p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ResultPage;
