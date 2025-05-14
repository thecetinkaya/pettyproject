import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PetDetails = () => {
  const { id } = useParams();

  // Redux store'dan pets verisini doğru şekilde al
  const pets = useSelector((state) => state.pets.pets); // state.pets.pets yoluna dikkat!
  const pet = pets?.find((pet) => pet.id === id);

  if (!pet) {
    return (
      <div className="text-center py-12">
        <h1 className="text-xl font-medium">Pet not found</h1>
        <Link
          to="/dashboard/pets"
          className="text-indigo-600 hover:underline mt-2 inline-block"
        >
          Back to Pets List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-4 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{pet.name}</h1>
            <Link to="/pets" className="text-white hover:text-gray-200">
              &larr; Back
            </Link>
          </div>
          <p className="text-indigo-100 mt-1">
            {pet.type} • {pet.breed} • {pet.gender}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pet Image */}
          <div className="md:col-span-1">
            <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
              <img
                src={pet.image || "https://placekitten.com/500/500"}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Age</h3>
                <p className="mt-1 text-gray-900">
                  {pet.age || "Unknown"} years
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Last Visit
                </h3>
                <p className="mt-1 text-gray-900">May 15, 2023</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Medical Notes
              </h3>
              <div className="mt-2 bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700">
                  {pet.medicalNotes || "No medical notes available"}
                </p>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Link
                to={`/pets/edit/${pet.id}`}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Edit Profile
              </Link>
              <button className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700">
                Schedule Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
