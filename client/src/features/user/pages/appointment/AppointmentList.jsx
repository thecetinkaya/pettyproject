import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAppointment, updateAppointment } from "./appointmentSlice";
import { useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaEdit,
  FaCalendarAlt,
  FaClock,
  FaUserMd,
} from "react-icons/fa";
import moment from "moment";
import { Navigate } from "react-router-dom";

const AppointmentsList = () => {
  const { appointments } = useSelector((state) => state.appointments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = (id) => {
    if (window.confirm("Randevuyu iptal etmek istediğinize emin misiniz?")) {
      dispatch(deleteAppointment(id));
    }
  };

  const handleReschedule = (appointment) => {
    // Randevu yenileme işlemleri
    const newTime = prompt("Yeni saat giriniz:", appointment.time);
    if (newTime) {
      dispatch(
        updateAppointment({
          ...appointment,
          time: newTime,
        })
      );
    }
  };
  const handleBookAppointment = () => {
    navigate("/dashboard/book-appointment");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Randevularım</h1>

      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Henüz randevunuz bulunmamaktadır.
          </p>
          <button
            onClick={handleBookAppointment}
            className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            Randevu Al
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-pink-500 p-4 text-white">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">
                    {appointment.pet.name}
                  </h3>
                  <span className="bg-white text-pink-500 px-2 py-1 rounded-full text-xs">
                    {appointment.status === "confirmed"
                      ? "Onaylandı"
                      : "Bekliyor"}
                  </span>
                </div>
                <p className="text-sm">
                  {appointment.pet.type} • {appointment.pet.age} yaş
                </p>
              </div>

              <div className="p-4">
                <div className="flex items-center mb-3">
                  <FaUserMd className="text-gray-500 mr-2" />
                  <span>{appointment.vet.name}</span>
                </div>
                <div className="flex items-center mb-3">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <span>{moment(appointment.date).format("DD MMMM YYYY")}</span>
                </div>
                <div className="flex items-center mb-4">
                  <FaClock className="text-gray-500 mr-2" />
                  <span>{appointment.time}</span>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-1">Şikayet/Problem</h4>
                  <p className="text-gray-600">
                    {appointment.pet.problem || "Belirtilmemiş"}
                  </p>
                </div>

                <div className="flex justify-between border-t pt-3">
                  <button
                    onClick={() => handleReschedule(appointment)}
                    className="flex items-center text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit className="mr-1" /> Yenile
                  </button>
                  <button
                    onClick={() => handleCancel(appointment.id)}
                    className="flex items-center text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="mr-1" /> İptal Et
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
