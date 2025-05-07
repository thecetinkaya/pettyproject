import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentBooking from "./AppointmentBooking";

const STORAGE_KEY = "appointments";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // Sayfa açıldığında localStorage'dan randevuları al
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  // Randevuyu silme işlemi
  const handleDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));
  };

  // Eğer randevu yoksa mesaj göster
  if (appointments.length === 0) {
    return <p>Henüz randevunuz bulunmamaktadır.</p>;
  }

  return (
    <div className="p-5 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Randevularım</h2>

      {appointments.map((appointment, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
          <h3 className="text-lg font-semibold">{appointment.doctorName}</h3>
          <p>
            <strong>Tarih:</strong> {appointment.date}
          </p>
          <p>
            <strong>Saat:</strong> {appointment.time}
          </p>
          <p>
            <strong>Evcil Hayvan Adı:</strong> {appointment.petName}
          </p>
          <p>
            <strong>Evcil Hayvan Türü:</strong> {appointment.petType}
          </p>
          <p>
            <strong>Randevu Sebebi:</strong> {appointment.reason}
          </p>

          <button
            onClick={() => handleDelete(index)}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Randevuyu Sil
          </button>
        </div>
      ))}
    </div>
  );
};

export default AppointmentsList;
