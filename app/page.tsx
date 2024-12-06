'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import { Model } from "./types/modelTypes";

const Home = () => {
  const [vehicleMakes, setVehicleMakes] = useState<Model[]>([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function fetchMakes() {
      const response = await fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
      );
      const data = await response.json();
      setVehicleMakes(data.Results || []);
    }
    fetchMakes();
  }, []);

  const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white px-4">
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-center">
        Car Dealer App
      </h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6 text-gray-900">
        <Dropdown
          label="Select Vehicle Make"
          options={vehicleMakes.map((make) => ({
            value: make.MakeId,
            label: make.MakeName,
          }))}
          onChange={setSelectedMake}
        />
        <Dropdown
          label="Select Model Year"
          options={years.map((year) => ({ value: year, label: year }))}
          onChange={setSelectedYear}
        />
        <Link
          href={`/result/${selectedMake}/${selectedYear}`}
          passHref
        >
          <div className="mt-7">

          <Button
            text="Next"
            disabled={!selectedMake || !selectedYear}
            className={`w-full py-3 text-center font-bold rounded-lg ${
              !selectedMake || !selectedYear
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600 text-white transition duration-300"
            }`}
          />
          </div>

        </Link>
      </div>
    </div>
  );
};

export default Home;
