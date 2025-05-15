import React from "react";
import { Link } from "react-router-dom";

const PetCard = ({ pet, onEdit }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={pet.image || "https://placekitten.com/600/400"}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{pet.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-600">
              <span className="font-medium">Breed:</span> {pet.breed}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Age:</span> {pet.age} years
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            {pet.type}
          </span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-gray-600">
              <span className="font-medium">Gender:</span> {pet.gender}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Weight:</span> {pet.weight} kg
            </p>
          </div>
          <div className="space-x-2">
            <button
              onClick={onEdit}
              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600"
            >
              Edit
            </button>
            <Link
              to={`/pets/${pet.id}`}
              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
