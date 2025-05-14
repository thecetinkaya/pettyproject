// features/pets/PetProfileList.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PetForm from "../components/PetForm";

const PetProfileList = () => {
  const pets = useSelector((state) => state.pets.pets);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Pets</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          Add New Pet
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <PetForm
            onSave={(pet) => {
              // Redux action dispatch edilecek
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link to={`${pet.id}`}>
              <div className="h-48 overflow-hidden">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{pet.name}</h3>
                <p className="text-gray-600">{pet.breed}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">{pet.age} years</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      pet.gender === "Male"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-pink-100 text-pink-800"
                    }`}
                  >
                    {pet.gender}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetProfileList;
