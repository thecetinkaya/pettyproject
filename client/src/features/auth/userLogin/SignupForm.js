import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { registerOwner } from "../authSlice";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    address: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🟢 Alan adlarını PascalCase'e çeviriyoruz:
    const ownerData = {
      UserName: formData.userName,
      Name: formData.name,
      Surname: formData.surname,
      Email: formData.email,
      Password: formData.password,
      Address: formData.address,
      Description: formData.description,
    };

    try {
      const resultAction = await dispatch(registerOwner(ownerData));

      if (registerOwner.fulfilled.match(resultAction)) {
        toast.success(
          "Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz..."
        );
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const errorMessage =
          resultAction.payload?.join("\n") || "Kayıt işlemi başarısız oldu";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-indigo-600 text-center">
                Hayvan Sahibi Kaydı
              </h1>

              <form onSubmit={handleSubmit} className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-gray-600 text-sm mb-2">
                      Kullanıcı Adı*
                    </label>
                    <input
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-gray-600 text-sm mb-2">
                      Email*
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="relative">
                    <label className="block text-gray-600 text-sm mb-2">
                      Ad*
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-gray-600 text-sm mb-2">
                      Soyad*
                    </label>
                    <input
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-600 text-sm mb-2">
                    Adres*
                  </label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-600 text-sm mb-2">
                    Açıklama
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows="3"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-600 text-sm mb-2">
                    Şifre*
                  </label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    minLength="6"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-8 w-full py-3 rounded-lg text-white font-medium ${
                    loading
                      ? "bg-indigo-400"
                      : "bg-indigo-600 hover:bg-indigo-500"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Kayıt Olunuyor...
                    </span>
                  ) : (
                    "Kayıt Ol"
                  )}
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
