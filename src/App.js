import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // react-router-dom importu
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import Sss from "./pages/Sss";
import LoginPage from "./pages/LoginPage"; // Giriş yap sayfası
import Vet from "./pages/Vet";
import "./App.css";
import Dashboard from "./pages/UserPanel/Dashboard";
import Appointments from "./pages/UserPanel/Appointments";
import HealthRecords from "./pages/UserPanel/HealthRecords";
import VaccinationSchedule from "./pages/UserPanel/Vaccination";

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
        <Route path="/" element={<MainWebsite />} /> {/* MainWebsite burada */}
        <Route path="/login" element={<LoginPage />} /> {/* LoginPage burada */}
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/appointments" element={<Appointments />} />
        <Route path="/user/health-records" element={<HealthRecords />} />
        <Route
          path="/user/vaccination-schedule"
          element={<VaccinationSchedule />}
        />
      </Routes>
    </Router>
  );
}

export default App;
