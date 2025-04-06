import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // useUser'i dahil ettik

const UserSidebar = () => {
  const { user } = useUser(); // Kullanıcı bilgilerini context'ten alıyoruz

  return (
    <div className="w-64 bg-indigo-600 text-white min-h-screen">
      <div className="p-5">
        {/* Kullanıcı adı ve profil resmi */}
        <div className="flex items-center space-x-3 mb-6">
          <img
            src={user.profileImage}
            alt="User"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
          </div>
        </div>

        <ul className="mt-8 space-y-4">
          <li>
            <Link
              to="/user/dashboard"
              className="block px-4 py-2 hover:bg-indigo-500 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/user/appointments"
              className="block px-4 py-2 hover:bg-indigo-500 rounded"
            >
              Randevular
            </Link>
          </li>
          <li>
            <Link
              to="/user/health-records"
              className="block px-4 py-2 hover:bg-indigo-500 rounded"
            >
              Sağlık Kartları
            </Link>
          </li>
          <li>
            <Link
              to="/user/vaccination-schedule"
              className="block px-4 py-2 hover:bg-indigo-500 rounded"
            >
              Aşı Takvimi
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;
