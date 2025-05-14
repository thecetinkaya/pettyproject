import React from "react";
import { Link } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaChevronDown,
  FaUser,
  FaUserMd,
  FaPlus,
  FaSearch,
  FaHandsHelping,
  FaLaptopMedical,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

const Navbar = ({ isDashboard = false }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <RouterLink
              to={currentUser ? "/dashboard" : "/"}
              className="text-2xl font-bold text-gray-900"
            >
              PETTY
            </RouterLink>
          </div>

          {/* Ana Navigasyon - Sadece kullanıcı giriş yapmamışsa göster */}
          {!currentUser && (
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="home"
                className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Anasayfa
              </Link>
              <Link
                to="services"
                smooth={true}
                duration={500}
                className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Hizmetler
              </Link>
              <Link
                to="sss"
                smooth={true}
                duration={500}
                className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                SSS
              </Link>

              {/* Hayvan Sahipleri Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium">
                  Hayvan Sahipleri
                  <FaChevronDown className="ml-1 h-3 w-3 transition-transform group-hover:rotate-180" />
                </button>

                <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <RouterLink
                    to="/plus-abonelik"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaPlus className="mr-2 text-pink-500" />
                    Plus Abone Olun
                  </RouterLink>
                  <RouterLink
                    to="/veteriner-bul"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaSearch className="mr-2 text-blue-500" />
                    Yakınlarda Veteriner Bulun
                  </RouterLink>
                  <RouterLink
                    to="/destek"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaHandsHelping className="mr-2 text-green-500" />
                    Destek
                  </RouterLink>
                </div>
              </div>

              {/* Veterinerler Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium">
                  Veterinerler
                  <FaChevronDown className="ml-1 h-3 w-3 transition-transform group-hover:rotate-180" />
                </button>

                <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <RouterLink
                    to="/online-veteriner"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaLaptopMedical className="mr-2 text-purple-500" />
                    Online Veteriner Ol
                  </RouterLink>
                  <RouterLink
                    to="/veteriner-destek"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaHandsHelping className="mr-2 text-green-500" />
                    Destek
                  </RouterLink>
                </div>
              </div>
            </div>
          )}

          {/* Kullanıcı Bilgileri */}
          <div className="flex items-center">
            {currentUser ? (
              <div className="relative group">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {currentUser.profileImage ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={currentUser.profileImage}
                        alt="User profile"
                      />
                    ) : (
                      <FaUserCircle className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <button className="ml-2 flex items-center text-sm rounded-full focus:outline-none">
                    <span className="text-gray-700 font-medium">
                      {currentUser.name || "Kullanıcı"}
                    </span>
                    <FaChevronDown className="ml-1 h-4 w-4 text-gray-500 transition-transform group-hover:rotate-180" />
                  </button>
                </div>

                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <RouterLink
                    to="/dashboard/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Anasayfa
                  </RouterLink>
                  <RouterLink
                    to="/dashboard/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Hesap Ayarları
                  </RouterLink>
                  <RouterLink
                    to="/dashboard/subscription"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Abonelik
                  </RouterLink>
                  <RouterLink
                    to="/dashboard/appointments"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Randevularım
                  </RouterLink>
                  <RouterLink
                    to="/dashboard/veterinarians"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Veterinerler
                  </RouterLink>
                  <div className="border-t border-gray-200"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Çıkış Yap
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <button className="flex items-center text-sm rounded-full focus:outline-none px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg shadow hover:shadow-md transition">
                  <FaUser className="mr-2" />
                  Giriş Yap
                  <FaChevronDown className="ml-2 h-4 w-4 text-white transition-transform group-hover:rotate-180" />
                </button>

                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <RouterLink
                    to="/user-login"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaUser className="mr-2 text-pink-600" />
                    Kullanıcı Girişi
                  </RouterLink>
                  <RouterLink
                    to="/vet-login"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaUserMd className="mr-2 text-blue-600" />
                    Veteriner Girişi
                  </RouterLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
