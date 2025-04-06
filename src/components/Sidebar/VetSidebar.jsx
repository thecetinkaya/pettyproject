import React from "react";
import { Link } from "react-router-dom";

const VetSidebar = () => {
  return (
    <div className="w-64 bg-green-600 text-white min-h-screen">
      <div className="p-5">
        <h2 className="text-xl font-bold">Veteriner Paneli</h2>
        <ul className="mt-8 space-y-4">
          <li>
            <Link
              to="/vet/dashboard"
              className="block px-4 py-2 hover:bg-green-500 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/vet/appointments"
              className="block px-4 py-2 hover:bg-green-500 rounded"
            >
              Randevular
            </Link>
          </li>
          <li>
            <Link
              to="/vet/patients"
              className="block px-4 py-2 hover:bg-green-500 rounded"
            >
              Hastalar
            </Link>
          </li>
          <li>
            <Link
              to="/vet/medical-records"
              className="block px-4 py-2 hover:bg-green-500 rounded"
            >
              Medikal Kayıtlar
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VetSidebar;
