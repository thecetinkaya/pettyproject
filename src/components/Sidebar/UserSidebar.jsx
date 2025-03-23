import React from "react";
import { Link } from "react-router-dom";

const UserSidebar = () => {
  return (
    <div className="w-64 bg-indigo-600 text-white min-h-screen">
      <div className="p-5">
        <h2 className="text-xl font-bold">Kullanıcı Paneli</h2>
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
