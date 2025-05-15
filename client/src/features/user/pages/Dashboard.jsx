import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaPaw,
  FaCalendarAlt,
  FaCalendarPlus,
  FaUserMd,
  FaRobot,
  FaBone,
  FaVideo,
  FaGraduationCap,
  FaShoppingCart,
  FaUsers,
  FaSyringe,
  FaFileMedical,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

const Dashboard = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const appointments = useSelector((state) => state.appointments.appointments);
  const upcoming = appointments
    .filter((a) => a.status === "confirmed")
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="p-4">
        {isAuthenticated && currentUser ? (
          <h1 className="text-2xl font-bold">
            Hoşgeldiniz, {currentUser.name}{" "}
            {/* register'da name olarak kaydediliyor */}
          </h1>
        ) : (
          <p>Lütfen giriş yapınız</p>
        )}
      </div>
      {/* Hızlı Erişim Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* TEMEL İŞLEVLER */}
        <DashboardCard
          title="Randevu Al"
          description="Yeni veteriner randevusu oluşturun"
          icon={<FaCalendarPlus className="h-6 w-6 text-green-600" />}
          link="/dashboard/book-appointment"
          bgColor="bg-green-50"
          priority="high"
        />
        <DashboardCard
          title="Randevularım"
          description="Gelecek ve geçmiş randevular"
          icon={<FaCalendarAlt className="h-6 w-6 text-blue-600" />}
          link="/dashboard/appointments"
          bgColor="bg-blue-50"
          priority="high"
        />
        <DashboardCard
          title="Pet Profillerim"
          description="Evcil hayvan bilgileriniz"
          icon={<FaPaw className="h-6 w-6 text-pink-600" />}
          link="/dashboard/pets"
          bgColor="bg-pink-50"
          priority="high"
        />
        <DashboardCard
          title="Veterinerler"
          description="Uzman veterinerleri keşfedin"
          icon={<FaUserMd className="h-6 w-6 text-purple-600" />}
          link="/dashboard/veterinarians"
          bgColor="bg-purple-50"
          priority="high"
        />

        {/* İKİNCİL İŞLEVLER */}
        <DashboardCard
          title="PettyBot"
          description="7/24 sanal veteriner asistanı"
          icon={<FaRobot className="h-6 w-6 text-indigo-600" />}
          link="/dashboard/chatbot"
          bgColor="bg-indigo-50"
          priority="medium"
        />
        <DashboardCard
          title="Aşı Takvimi"
          description="Pet aşı hatırlatıcıları"
          icon={<FaSyringe className="h-6 w-6 text-yellow-600" />}
          link="/dashboard/vaccines"
          bgColor="bg-yellow-50"
          priority="medium"
        />
        <DashboardCard
          title="Sağlık Kayıtları"
          description="Tıbbi geçmiş ve raporlar"
          icon={<FaFileMedical className="h-6 w-6 text-red-600" />}
          link="/dashboard/health-records"
          bgColor="bg-red-50"
          priority="medium"
        />
        <DashboardCard
          title="Canlı Danışma"
          description="Video ile veteriner görüşmesi"
          icon={<FaVideo className="h-6 w-6 text-teal-600" />}
          link="/dashboard/live-consultation"
          bgColor="bg-teal-50"
          priority="medium"
        />
      </div>
      {/* Yaklaşan Randevular */}
      {upcoming.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          <div className="grid gap-4">
            {upcoming.map((app) => (
              <div key={app.id} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{app.vet.name}</h3>
                    <p className="text-gray-600">
                      {new Date(app.date).toLocaleString()}
                    </p>
                  </div>
                  <button className="text-red-600 hover:text-red-800">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Önerilen Veterinerler */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Önerilen Veterinerler
          </h2>
          <Link
            to="/dashboard/veterinarians"
            className="text-sm font-medium text-pink-600 hover:text-pink-700"
          >
            Tümünü Gör
          </Link>
        </div>
        {/* Veteriner listesi buraya gelecek */}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, description, icon, link, bgColor }) => {
  return (
    <Link
      to={link}
      className={`${bgColor} rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 p-3 rounded-full bg-white shadow-sm">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Dashboard;
