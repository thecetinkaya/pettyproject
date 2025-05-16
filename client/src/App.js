import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./features/user/sidebar/Navbar";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import Sss from "./pages/Sss";
import Vet from "./pages/Vet";
import UserLoginPage from "./features/auth/userLogin/UserLoginPage";
import VetLoginPage from "./features/auth/vetLogin/VetLoginPage";
import "./App.css";
import Dashboard from "./features/user/pages/Dashboard";
import AccountSettings from "./features/user/pages/AccountSettings";
import "@ant-design/v5-patch-for-react-19";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import PetProfileList from "./features/user/pages/pet/PetProfileList.jsx";
import PetDetails from "./features/user/pages/pet/PetDetails.jsx";
import GeminiChat from "./features/user/components/gemini.jsx";
import AppointmentBooking from "./features/user/pages/appointment/AppointmentBooking.jsx";
import AppointmentList from "./features/user/pages/appointment/AppointmentList.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

// Private Route Component
function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="user-login" />;
}

// Dashboard Layout Component
const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isDashboard={true} />
      <main className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// Main Website Component (Scroll bazlı tek sayfa)
const MainWebsite = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <section id="home">
        <Home />
      </section>
      <section id="services">
        <ServicesPage />
      </section>
      <section id="vet">
        <Vet />
      </section>
      <section id="sss">
        <Sss />
      </section>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainWebsite />} />
            <Route path="user-login" element={<UserLoginPage />} />
            <Route path="vet-login" element={<VetLoginPage />} />

            <Route path="/dashboard/*" element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />

              <Route path="account" element={<AccountSettings />} />
              <Route path="book-appointment" element={<AppointmentBooking />} />
              <Route path="appointments" element={<AppointmentList />} />

              {/* Evcil Hayvan Yönetimi */}
              <Route path="pets">
                <Route index element={<PetProfileList />} />
                <Route path=":id" element={<PetDetails />} />
              </Route>

              {/* Yardımcı Araçlar */}
              {/* <Route path="chatbot" element={<ChatBot />} /> */}
              <Route path="chatbot" element={<GeminiChat />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
