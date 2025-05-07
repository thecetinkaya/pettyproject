import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./features/user/sidebar/Navbar";
import Home from "./pages/Main/Home";
import ServicesPage from "./pages/Main/ServicesPage";
import Sss from "./pages/Main/Sss";
import LoginPage from "./pages/Main/LoginPage";
import Vet from "./pages/Main/Vet";
import "./App.css";
import Dashboard from "./features/user/pages/Dashboard";
import Appointments from "./features/user/pages/AppointmentList";
import AppointmentDetails from "./features/user/pages/AppointmentDetails";
import UserPanel from "./features/user/pages/UserPanel"; // 🟢 Yeni UserPanel import edildi
import AppointmentBooking from "./features/user/pages/AppointmentBooking";
import DoctorList from "./features/user/pages/DoctorList";
import "@ant-design/v5-patch-for-react-19";

function MainWebsite() {
  return (
    <div>
      <Navbar />
      <div id="home">
        <Home />
      </div>
      <div id="services">
        <ServicesPage />
      </div>
      <div id="vet">
        <Vet />
      </div>
      <div id="sss">
        <Sss />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainWebsite />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />



        {/* 🟢 Nested Routes Kullanımı */}
        <Route path="/user" element={<UserPanel />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route
            path="/user/appointments/:appointmentId"
            element={<AppointmentDetails />}
          />
          <Route path="/user/randevu-al" element={<DoctorList />} />
          <Route
            path="/user/randevu-al/:doctorId"
            element={<AppointmentBooking />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
