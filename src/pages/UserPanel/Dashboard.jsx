import React from "react";
import UserLayout from "../../components/Layouts/userLayout"; // UserLayout'ı import ediyoruz

const Dashboard = () => {
  return (
    <UserLayout>
      {/* Dashboard içeriği */}
      <h1 className="text-3xl font-bold text-indigo-600">Hoş Geldiniz!</h1>
      <p className="mt-4 text-lg">Kullanıcı panelinize hoş geldiniz.</p>
    </UserLayout>
  );
};

export default Dashboard;
