import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAppointment } from "./appointmentSlice";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaPaw,
  FaCreditCard,
} from "react-icons/fa";

const steps = ["Veteriner Seç", "Saat Seç", "Hayvan Bilgileri", "Ödeme"];

const AppointmentBooking = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedVet, setSelectedVet] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [petInfo, setPetInfo] = useState({
    name: "",
    type: "",
    age: "",
    problem: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [appointmentAdded, setAppointmentAdded] = useState(false);

  const { vets } = useSelector((state) => state.vets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (appointmentAdded) {
      navigate("/dashboard/appointments"); // Düzeltilmiş yol
    }
  }, [appointmentAdded, navigate]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const newAppointment = {
        id: Date.now(),
        vet: selectedVet,
        time: selectedTime,
        pet: petInfo,
        date: new Date().toISOString(),
        status: "confirmed",
      };

      dispatch(addAppointment(newAppointment));
      setAppointmentAdded(true);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vets.map((vet) => (
              <div
                key={vet.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedVet?.id === vet.id
                    ? "border-pink-500 bg-pink-50"
                    : "hover:shadow-md"
                }`}
                onClick={() => setSelectedVet(vet)}
              >
                <img
                  src={vet.image}
                  alt={vet.name}
                  className="w-24 h-24 rounded-full mx-auto mb-3"
                />
                <h3 className="text-lg font-semibold text-center">
                  {vet.name}
                </h3>
                <p className="text-gray-600 text-center">
                  {vet.specialization}
                </p>
                <div className="flex justify-center mt-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                    ★ {vet.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedVet?.availableSlots.map((slot) => (
              <button
                key={slot}
                className={`py-3 px-4 rounded-lg border ${
                  selectedTime === slot
                    ? "bg-pink-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-gray-700 mb-1">Hayvan Adı</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={petInfo.name}
                onChange={(e) =>
                  setPetInfo({ ...petInfo, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Tür</label>
              <select
                className="w-full p-2 border rounded"
                value={petInfo.type}
                onChange={(e) =>
                  setPetInfo({ ...petInfo, type: e.target.value })
                }
              >
                <option value="">Seçiniz</option>
                <option value="Kedi">Kedi</option>
                <option value="Köpek">Köpek</option>
                <option value="Kuş">Kuş</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Yaş</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={petInfo.age}
                onChange={(e) =>
                  setPetInfo({ ...petInfo, age: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Şikayet/Problem
              </label>
              <textarea
                className="w-full p-2 border rounded"
                rows="3"
                value={petInfo.problem}
                onChange={(e) =>
                  setPetInfo({ ...petInfo, problem: e.target.value })
                }
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="max-w-md mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Ödeme Bilgileri</h3>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    checked={paymentMethod === "creditCard"}
                    onChange={() => setPaymentMethod("creditCard")}
                    className="mr-2"
                  />
                  <label htmlFor="creditCard" className="flex items-center">
                    <FaCreditCard className="mr-2 text-blue-500" />
                    Kredi Kartı
                  </label>
                </div>

                {paymentMethod === "creditCard" && (
                  <div className="ml-6 space-y-3">
                    <input
                      type="text"
                      placeholder="Kart Numarası"
                      className="w-full p-2 border rounded"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Son Kullanma"
                        className="p-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="p-2 border rounded"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Randevu Özeti</h4>
                <div className="flex justify-between mb-1">
                  <span>Veteriner:</span>
                  <span>{selectedVet?.name}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Tarih/Saat:</span>
                  <span>{selectedTime}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Hayvan:</span>
                  <span>
                    {petInfo.name} ({petInfo.type})
                  </span>
                </div>
                <div className="flex justify-between mt-3 font-semibold">
                  <span>Toplam:</span>
                  <span>250 TL</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Randevu Al</h1>

      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center w-1/4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                ${
                  index <= activeStep
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm text-center ${
                  index <= activeStep
                    ? "text-pink-600 font-medium"
                    : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
          <div
            className="absolute top-1/2 left-0 h-1 bg-pink-500 transition-all duration-300 -z-10"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {renderStepContent()}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={activeStep === 0}
          className={`px-6 py-2 rounded-lg ${
            activeStep === 0
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Geri
        </button>
        <button
          onClick={handleNext}
          disabled={
            (activeStep === 0 && !selectedVet) ||
            (activeStep === 1 && !selectedTime) ||
            (activeStep === 2 && (!petInfo.name || !petInfo.type))
          }
          className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-pink-300"
        >
          {activeStep === steps.length - 1 ? "Randevuyu Onayla" : "İleri"}
        </button>
      </div>
    </div>
  );
};

export default AppointmentBooking;
