import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams(); // URL'deki doctorId'yi al
  const [doctor, setDoctor] = useState(null); // Başlangıçta null

  // useState hook'larını koşulsuz olarak başta çağırıyoruz.
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");

  // Eğer doctor bilgisi state yoksa, doctorId'ye göre doktoru bulalım (Backend'den çekilebilir)
  useEffect(() => {
    console.log("Doctor ID:", doctorId);
    if (!doctor) {
      const fakeDoctors = [
        {
          id: 1,
          name: "Dr. Ahmet",
          specialty: "Veteriner",
          availableTimes: ["09:00", "10:00", "11:00"],
        },
        {
          id: 2,
          name: "Dr. Elif",
          specialty: "Veteriner",
          availableTimes: ["13:00", "14:00", "15:00"],
        },
      ];
      const foundDoctor = fakeDoctors.find((d) => d.id === Number(doctorId));
      setDoctor(
        foundDoctor || {
          name: "Bilinmeyen Doktor",
          specialty: "Bilinmeyen",
          availableTimes: [],
        }
      );
    }
  }, [doctor, doctorId]);

  if (!doctor) return <p>Doktor bilgileri yükleniyor...</p>;

  const handleSubmit = () => {
    if (!selectedTime || !reason || !petName || !petType) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const newAppointment = {
      doctorName: doctor.name,
      date: "2025-03-30", // Seçilebilir tarih eklenebilir
      time: selectedTime,
      reason,
      petName,
      petType,
    };

    console.log("Randevu Oluşturuldu:", newAppointment);
    alert("Randevunuz başarıyla oluşturuldu!");
    navigate("/user/appointments"); // ✅ Doğru sayfaya yönlendirme
  };

  return (
    <div className="p-5 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Randevu Al - {doctor.name}</h2>
      <p className="text-gray-600">{doctor.specialty}</p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Müsait Saatler</h3>
        <div className="flex gap-2 mt-2">
          {doctor.availableTimes.map((time) => (
            <button
              key={time}
              className={`px-4 py-2 rounded ${
                selectedTime === time ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Randevu Bilgileri</h3>
        <input
          type="text"
          placeholder="Evcil hayvan adı"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          className="w-full p-2 border rounded mt-2"
        />
        <input
          type="text"
          placeholder="Evcil hayvan türü (Kedi, Köpek, vb.)"
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
          className="w-full p-2 border rounded mt-2"
        />
        <textarea
          placeholder="Randevu sebebi"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 border rounded mt-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Randevuyu Onayla
      </button>
    </div>
  );
};

export default AppointmentBooking;
