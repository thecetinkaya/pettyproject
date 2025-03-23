import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Yönlendirme için kullanacağımız hook

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada basit bir kontrol yapıyoruz, örneğin hardcoded değerler.
    if (email === "admin@petty.com" && password === "admin123") {
      // Giriş başarılıysa, kullanıcıyı admin paneline yönlendiriyoruz
      navigate("/user/dashboard");
    } else {
      setError("Geçersiz e-posta veya şifre");
    }
  };

  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-indigo-600 text-center">
                Kullanıcı Girişi
              </h1>
              <form
                onSubmit={handleSubmit}
                className="mt-12"
                action=""
                method="POST"
              >
                <div className="relative mb-6">
                  <label
                    htmlFor="signin-email"
                    className="block text-gray-600 text-sm font-medium mb-2"
                  >
                    Email Adresi
                  </label>
                  <input
                    id="signin-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 focus:outline-none focus:border-indigo-600"
                    placeholder="admin@petty.com"
                  />
                </div>
                <div className="relative mb-10">
                  <label
                    htmlFor="signin-password"
                    className="block text-gray-600 text-sm font-medium mb-2"
                  >
                    Şifre
                  </label>
                  <input
                    id="signin-password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 w-full border-2 border-gray-300 text-gray-900 rounded-lg px-4 focus:outline-none focus:border-indigo-600"
                    placeholder="Password"
                  />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <input
                  type="submit"
                  value="Giriş Yap"
                  className="mt-4 px-8 py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer"
                />
              </form>
              <a
                href="#"
                className="mt-4 block text-sm text-center font-medium text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Şifrenizi mi unuttunuz?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
