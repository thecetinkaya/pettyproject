import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const navigate = useNavigate(); // useNavigate hook bileşenin içinde!

  const doctors = [
    { id: 1, name: "Dr. Ahmet", specialty: "Veteriner" },
    { id: 2, name: "Dr. Elif", specialty: "Veteriner" },
  ];

  return (
    <div className="p-5 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Veteriner Seç</h2>
      <ul className="space-y-4">
        {doctors.map((doctor) => (
          <li
            key={doctor.id}
            className="p-4 border rounded flex justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialty}</p>
            </div>
            <button
              onClick={() => navigate(`/user/randevu-al/${doctor.id}`)} // Doğru yönlendirme
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Randevu Al
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
