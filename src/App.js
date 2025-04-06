import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import Sss from "./pages/Sss";
import LoginPage from "./pages/LoginPage";
import Vet from "./pages/Vet";
import "./App.css";
import Dashboard from "./pages/UserPanel/Dashboard";
import Appointments from "./pages/UserPanel/AppointmentList";
import { UserProvider } from "./context/UserContext";
import AppointmentDetails from "./pages/UserPanel/AppointmentDetails";
import UserPanel from "./pages/UserPanel/UserPanel"; // 🟢 Yeni UserPanel import edildi
import AppointmentBooking from "./pages/UserPanel/AppointmentBooking";
import DoctorList from "./pages/UserPanel/DoctorList";

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
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainWebsite />} />
          <Route path="/login" element={<LoginPage />} />

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
    </UserProvider>
  );
}

export default App;
