import React, { useState } from "react";

const AppointmentList = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointments = [
    {
      id: 1,
      date: "2025-03-25",
      time: "10:00",
      vet: "Dr. Ahmet",
      status: "Bekliyor",
      pet: "Kedi - Mavi",
    },
    {
      id: 2,
      date: "2025-03-26",
      time: "15:00",
      vet: "Dr. Elif",
      status: "Tamamlandı",
      pet: "Köpek - Karabas",
    },
  ];

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
  };

  return (
    <div className="p-5 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Randevularım</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Tarih</th>
            <th className="px-4 py-2 text-left">Saat</th>
            <th className="px-4 py-2 text-left">Veteriner</th>
            <th className="px-4 py-2 text-left">Durum</th>
            <th className="px-4 py-2 text-left">Evcil Hayvan</th>
            <th className="px-4 py-2 text-left">Detaylar</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="border-b">
              <td className="px-4 py-2">{appointment.date}</td>
              <td className="px-4 py-2">{appointment.time}</td>
              <td className="px-4 py-2">{appointment.vet}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded ${
                    appointment.status === "Bekliyor"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {appointment.status}
                </span>
              </td>
              <td className="px-4 py-2">{appointment.pet}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => openModal(appointment)}
                  className="text-indigo-500 hover:underline"
                >
                  Detaylar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Randevu Detayları</h2>
            <p>
              <strong>Tarih:</strong> {selectedAppointment.date}
            </p>
            <p>
              <strong>Saat:</strong> {selectedAppointment.time}
            </p>
            <p>
              <strong>Veteriner:</strong> {selectedAppointment.vet}
            </p>
            <p>
              <strong>Durum:</strong> {selectedAppointment.status}
            </p>
            <p>
              <strong>Evcil Hayvan:</strong> {selectedAppointment.pet}
            </p>

            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
