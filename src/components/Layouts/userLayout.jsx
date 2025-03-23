import React from "react";
import UserSidebar from "../Sidebar/UserSidebar"; // Sidebar'ı buraya import ettik

const UserLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar: UserSidebar */}
      <UserSidebar /> {/* Burada UserSidebar bileşenini yerleştiriyoruz */}
      {/* İçerik Alanı */}
      <div className="flex-1 p-10">
        {children} {/* Burada gelen içeriği göstereceğiz (Dashboard vs.) */}
      </div>
    </div>
  );
};

export default UserLayout;
