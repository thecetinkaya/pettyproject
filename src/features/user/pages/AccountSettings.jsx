import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCamera,
  FiPlus,
  FiTrash2,
  FiSave,
} from "react-icons/fi";

const AccountSettings = () => {
  const { currentUser, updateUser, logout } = useAuth();
  const [user, setUser] = useState(currentUser);
  const [pets, setPets] = useState(currentUser?.pets || []);
  const [newPet, setNewPet] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    weight: "",
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePetChange = (id, e) => {
    const { name, value } = e.target;
    const updatedPets = pets.map((pet) =>
      pet.id === id ? { ...pet, [name]: value } : pet
    );
    setPets(updatedPets);
    updateUser({ pets: updatedPets });
  };

  const handleNewPetChange = (e) => {
    const { name, value } = e.target;
    setNewPet((prev) => ({ ...prev, [name]: value }));
  };

  const addPet = () => {
    if (newPet.name && newPet.type) {
      const petToAdd = { ...newPet, id: Date.now() };
      const updatedPets = [...pets, petToAdd];
      setPets(updatedPets);
      updateUser({ pets: updatedPets });
      setNewPet({ name: "", type: "", breed: "", age: "", weight: "" });
    }
  };

  const removePet = (id) => {
    const updatedPets = pets.filter((pet) => pet.id !== id);
    setPets(updatedPets);
    updateUser({ pets: updatedPets });
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
    alert("Ayarlar başarıyla kaydedildi!");
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  if (!currentUser) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hesap Ayarları</h1>
          <p className="mt-2 text-sm text-gray-600">
            Profil bilgilerinizi ve evcil hayvanlarınızın bilgilerini
            güncelleyin
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-lg divide-y divide-gray-200"
        >
          {/* Profil Bilgileri */}
          <div className="px-6 py-5">
            <h2 className="text-lg font-medium text-gray-900">
              Profil Bilgileri
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {/* Profil Fotoğrafı */}
              <div className="sm:col-span-6 flex items-center">
                <div className="relative group">
                  <img
                    className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
                    src={user.profileImage}
                    alt="Profil fotoğrafı"
                  />
                  <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer group-hover:bg-indigo-700 transition">
                    <FiCamera className="h-4 w-4" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">
                    JPG, GIF veya PNG. Maksimum 2MB
                  </p>
                </div>
              </div>

              {/* Kullanıcı Adı */}
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
                    value={user.name}
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
                    value={user.email}
                    onChange={handleUserChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  />
                </div>
              </div>

              {/* Telefon */}
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
                  value={user.phone}
                  onChange={handleUserChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Adres */}
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
                  value={user.address}
                  onChange={handleUserChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Şifre */}
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
                    value={user.password}
                    onChange={handleUserChange}
                    placeholder="••••••••"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Şifreniz en az 8 karakter olmalıdır.
                </p>
              </div>
            </div>
          </div>

          {/* Evcil Hayvan Bilgileri */}
          <div className="px-6 py-5">
            <h2 className="text-lg font-medium text-gray-900">
              Evcil Hayvan Bilgileri
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Evcil hayvanlarınızın bilgilerini güncelleyin veya yeni hayvan
              ekleyin.
            </p>

            {pets.map((pet) => (
              <div
                key={pet.id}
                className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 border-b border-gray-200 pb-6"
              >
                <div className="sm:col-span-6 flex justify-between items-center">
                  <h3 className="text-md font-medium text-gray-900">
                    {pet.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removePet(pet.id)}
                    className="text-red-600 hover:text-red-900 flex items-center text-sm"
                  >
                    <FiTrash2 className="mr-1" /> Sil
                  </button>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor={`pet-name-${pet.id}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Adı
                  </label>
                  <input
                    type="text"
                    name="name"
                    id={`pet-name-${pet.id}`}
                    value={pet.name}
                    onChange={(e) => handlePetChange(pet.id, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor={`pet-type-${pet.id}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Türü
                  </label>
                  <select
                    name="type"
                    id={`pet-type-${pet.id}`}
                    value={pet.type}
                    onChange={(e) => handlePetChange(pet.id, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Seçiniz</option>
                    <option value="Kedi">Kedi</option>
                    <option value="Köpek">Köpek</option>
                    <option value="Kuş">Kuş</option>
                    <option value="Balık">Balık</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor={`pet-breed-${pet.id}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cinsi
                  </label>
                  <input
                    type="text"
                    name="breed"
                    id={`pet-breed-${pet.id}`}
                    value={pet.breed}
                    onChange={(e) => handlePetChange(pet.id, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor={`pet-age-${pet.id}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Yaşı (yıl)
                  </label>
                  <input
                    type="number"
                    name="age"
                    id={`pet-age-${pet.id}`}
                    value={pet.age}
                    onChange={(e) => handlePetChange(pet.id, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor={`pet-weight-${pet.id}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ağırlığı (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="weight"
                    id={`pet-weight-${pet.id}`}
                    value={pet.weight}
                    onChange={(e) => handlePetChange(pet.id, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            ))}

            {/* Yeni Hayvan Ekleme */}
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <h3 className="text-md font-medium text-gray-900">
                  Yeni Evcil Hayvan Ekle
                </h3>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="new-pet-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Adı
                </label>
                <input
                  type="text"
                  name="name"
                  id="new-pet-name"
                  value={newPet.name}
                  onChange={handleNewPetChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="new-pet-type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Türü
                </label>
                <select
                  name="type"
                  id="new-pet-type"
                  value={newPet.type}
                  onChange={handleNewPetChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Seçiniz</option>
                  <option value="Kedi">Kedi</option>
                  <option value="Köpek">Köpek</option>
                  <option value="Kuş">Kuş</option>
                  <option value="Balık">Balık</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="new-pet-breed"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cinsi
                </label>
                <input
                  type="text"
                  name="breed"
                  id="new-pet-breed"
                  value={newPet.breed}
                  onChange={handleNewPetChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="new-pet-age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Yaşı (yıl)
                </label>
                <input
                  type="number"
                  name="age"
                  id="new-pet-age"
                  value={newPet.age}
                  onChange={handleNewPetChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="new-pet-weight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ağırlığı (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  id="new-pet-weight"
                  value={newPet.weight}
                  onChange={handleNewPetChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2 flex items-end">
                <button
                  type="button"
                  onClick={addPet}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FiPlus className="mr-2" /> Hayvan Ekle
                </button>
              </div>
            </div>
          </div>

          {/* Bildirim Ayarları */}
          <div className="px-6 py-5">
            <h2 className="text-lg font-medium text-gray-900">
              Bildirim Tercihleri
            </h2>
            <div className="mt-6 space-y-4">
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
            </div>
          </div>

          {/* Kaydet Butonu */}
          <div className="px-6 py-4 bg-gray-50 text-right">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiSave className="mr-2" /> Değişiklikleri Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
