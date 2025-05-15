import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCamera,
  FiSave,
  FiBell,
  FiCreditCard,
} from "react-icons/fi";

const AccountSettings = () => {
  const { currentUser, updateUser, logout } = useAuth();
  const [user, setUser] = useState(currentUser || {});
  const [activeTab, setActiveTab] = useState("profile");

  if (!currentUser)
    return (
      <div className="flex justify-center items-center h-screen">
        Yükleniyor...
      </div>
    );

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, profileImage: reader.result };
        setUser(updatedUser);
        updateUser({ profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user);
    // Toast veya modal ile başarı mesajı gösterilebilir
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Hesap Ayarları</h1>
          <p className="mt-2 text-lg text-gray-600">
            Profil bilgilerinizi ve hesap ayarlarınızı yönetin
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "profile"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Profil Bilgileri
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "notifications"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Bildirimler
              </button>
              <button
                onClick={() => setActiveTab("billing")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "billing"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Fatura Bilgileri
              </button>
            </nav>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  {/* Profile Photo */}
                  <div className="flex flex-col sm:flex-row items-start gap-8">
                    <div className="flex-shrink-0">
                      <div className="relative group">
                        <img
                          className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
                          src={
                            user.profileImage ||
                            "https://via.placeholder.com/150"
                          }
                          alt="Profil fotoğrafı"
                        />
                        <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-all duration-200 shadow-md">
                          <FiCamera className="h-5 w-5" />
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* Name */}
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Ad Soyad
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                <FiUser className="h-4 w-4" />
                              </span>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                value={user.name || ""}
                                onChange={handleUserChange}
                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              E-posta Adresi
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                <FiMail className="h-4 w-4" />
                              </span>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                value={user.email || ""}
                                onChange={handleUserChange}
                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                              />
                            </div>
                          </div>

                          {/* Phone */}
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Telefon Numarası
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              value={user.phone || ""}
                              onChange={handleUserChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>

                          {/* Password */}
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Yeni Şifre
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                <FiLock className="h-4 w-4" />
                              </span>
                              <input
                                type="password"
                                name="password"
                                id="password"
                                value={user.password || ""}
                                onChange={handleUserChange}
                                placeholder="••••••••"
                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                              />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                              Şifreniz en az 8 karakter olmalıdır.
                            </p>
                          </div>

                          {/* Address */}
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Adres
                            </label>
                            <input
                              type="text"
                              name="address"
                              id="address"
                              value={user.address || ""}
                              onChange={handleUserChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FiSave className="mr-2 h-4 w-4" />
                        Değişiklikleri Kaydet
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="p-6 md:p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Bildirim Tercihleri
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Hangi bildirimleri almak istediğinizi seçin.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-notifications"
                        name="email-notifications"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="email-notifications"
                        className="font-medium text-gray-700"
                      >
                        E-posta bildirimleri
                      </label>
                      <p className="text-gray-500">
                        Randevu hatırlatıcıları ve önemli duyurular için e-posta
                        almak istiyorum.
                      </p>
                    </div>
                  </div>

                  {/* SMS Notifications */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="sms-notifications"
                        name="sms-notifications"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="sms-notifications"
                        className="font-medium text-gray-700"
                      >
                        SMS bildirimleri
                      </label>
                      <p className="text-gray-500">
                        Acil durumlar ve randevu hatırlatıcıları için SMS almak
                        istiyorum.
                      </p>
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="push-notifications"
                        name="push-notifications"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="push-notifications"
                        className="font-medium text-gray-700"
                      >
                        Mobil bildirimler
                      </label>
                      <p className="text-gray-500">
                        Uygulama üzerinden bildirim almak istiyorum.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FiBell className="mr-2 h-4 w-4" />
                      Tercihleri Kaydet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <div className="p-6 md:p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Fatura Bilgileri
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Fatura bilgilerinizi ve ödeme yöntemlerinizi yönetin.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FiCreditCard className="h-6 w-6 text-gray-400" />
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">
                          Kredi Kartı
                        </h4>
                        <p className="text-sm text-gray-500">
                          **** **** **** 4242
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Değiştir
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="card-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Kart Üzerindeki İsim
                    </label>
                    <input
                      type="text"
                      id="card-name"
                      name="card-name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Kart Numarası
                    </label>
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="expiration-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Son Kullanma Tarihi
                    </label>
                    <input
                      type="text"
                      id="expiration-date"
                      name="expiration-date"
                      placeholder="MM/YY"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FiCreditCard className="mr-2 h-4 w-4" />
                      Ödeme Yöntemini Güncelle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
