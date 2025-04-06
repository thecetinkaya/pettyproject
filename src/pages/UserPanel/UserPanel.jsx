import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../../components/Sidebar/UserSidebar"; // Sidebar'ı içeri aldık

const UserPanel = () => {
  return (
    <div className="flex">
      <UserSidebar /> {/* 🟢 Sidebar burada kalacak */}
      <div className="flex-1 p-5">
        <Outlet /> {/* 🟢 İçerik değiştiğinde buraya yüklenecek */}
      </div>
    </div>
  );
};

export default UserPanel;
