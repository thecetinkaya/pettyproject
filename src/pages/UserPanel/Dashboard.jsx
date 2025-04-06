import React from "react";
import UserLayout from "../../components/Layouts/userLayout"; // UserLayout'ı import ediyoruz
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate(); // useNavigate hook'unu fonksiyonel bileşen içinde kullanıyoruz.

  const handleClick = () => {
    navigate("/user/randevu-al"); // Butona tıklandığında randevu alma sayfasına yönlendiriyor.
  };

  return (
    <UserLayout>
      <div className="p-5 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Hoşgeldiniz</h2>
        <p className="text-gray-600 mb-4">
          Randevu almak için aşağıdaki butona tıklayabilirsiniz.
        </p>
        <button
          onClick={handleClick} // Butona tıklama işlevi eklendi.
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Randevu Al
        </button>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
