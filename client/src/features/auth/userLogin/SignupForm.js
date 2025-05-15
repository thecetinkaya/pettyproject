import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Bildirimler için
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await register(formData);

    if (result.success) {
      toast.success("Kayıt başarılı! Yönlendiriliyorsunuz...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      toast.error(result.error || "Kayıt işlemi başarısız oldu");
    }

    setLoading(false);
  };

  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-indigo-600 text-center">
                Kullanıcı Kaydı
              </h1>

              <form onSubmit={handleSubmit} className="mt-12">
                {/* Form alanları aynı kalacak */}
                <div className="relative mt-8">
                  <label
                    htmlFor="nameSurname"
                    className="block text-gray-600 text-sm mb-2"
                  >
                    Ad Soyad
                  </label>
                  <input
                    id="nameSurname"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    className="peer h-12 w-full border-2 border-gray-300 text-gray-900 px-4 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="Adınız ve soyadınız"
                    required
                  />
                </div>

                <div className="relative mt-8">
                  <label
                    htmlFor="email"
                    className="block text-gray-600 text-sm mb-2"
                  >
                    Email adresi
                  </label>
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="peer h-12 w-full border-2 border-gray-300 text-gray-900 px-4 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="ornek@email.com"
                    required
                  />
                </div>

                <div className="relative mt-8">
                  <label
                    htmlFor="password"
                    className="block text-gray-600 text-sm mb-2"
                  >
                    Şifre
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="peer h-12 w-full border-2 border-gray-300 text-gray-900 px-4 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="Şifreniz"
                    required
                    minLength="6"
                  />
                </div>

                <div className="relative mt-8">
                  <label
                    htmlFor="phone"
                    className="block text-gray-600 text-sm mb-2"
                  >
                    Telefon
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="peer h-12 w-full border-2 border-gray-300 text-gray-900 px-4 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="Telefon numaranız"
                  />
                </div>

                <div className="relative mt-8">
                  <label
                    htmlFor="address"
                    className="block text-gray-600 text-sm mb-2"
                  >
                    Adres
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="peer h-12 w-full border-2 border-gray-300 text-gray-900 px-4 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="Adresiniz"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-8 px-8 py-4 uppercase rounded-full text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer ${
                    loading
                      ? "bg-indigo-400"
                      : "bg-indigo-600 hover:bg-indigo-500"
                  }`}
                >
                  {loading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
                </button>
              </form>

              <div className="mt-4 text-center">
                <a
                  href="/login"
                  className="text-sm font-medium text-indigo-600 hover:underline"
                >
                  Zaten hesabınız var mı? Giriş yapın
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
