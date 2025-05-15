import React from "react";
import { useParams } from "react-router-dom";

const AppointmentDetails = () => {
  const { appointmentId } = useParams(); // URL'den appointmentId'yi alıyoruz
  // Burada appointmentId'ye göre randevu bilgisi alınabilir (API'den veya context'den)
  const appointment = {
    date: "2025-03-25",
    time: "10:00",
    vet: "Dr. Ahmet",
    pet: "Kedi - Mavi",
    status: "Bekliyor",
    details: "Kedimin tüy dökme problemi hakkında muayene yapılacak.",
  };

  return (
    <div className="p-5 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Randevu Detayları</h2>
      <div className="mb-4">
        <strong>Tarih:</strong> {appointment.date}
      </div>
      <div className="mb-4">
        <strong>Saat:</strong> {appointment.time}
      </div>
      <div className="mb-4">
        <strong>Veteriner:</strong> {appointment.vet}
      </div>
      <div className="mb-4">
        <strong>Evcil Hayvan:</strong> {appointment.pet}
      </div>
      <div className="mb-4">
        <strong>Durum:</strong>
        <span
          className={`px-2 py-1 rounded ${
            appointment.status === "Bekliyor" ? "bg-yellow-500" : "bg-green-500"
          }`}
        >
          {appointment.status}
        </span>
      </div>
      <div className="mb-4">
        <strong>Açıklama:</strong> {appointment.details}
      </div>
    </div>
  );
};

export default AppointmentDetails;
