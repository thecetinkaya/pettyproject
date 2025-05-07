import React from "react";

const UserLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-1 p-10">
        {children} {/* Burada gelen içeriği göstereceğiz (Dashboard vs.) */}
      </div>
    </div>
  );
};

export default UserLayout;
