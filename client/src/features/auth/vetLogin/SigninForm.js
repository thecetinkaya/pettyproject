import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../UserSlice";

const SigninForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Yönlendirme için kullanacağımız hook

  const handleSubmit = (e) => {
    const user = {
      email: "admin@petty.com",
      password: "admin123",
    };
    e.preventDefault();
    dispatch(login(user));
    navigate("/user/dashboard"); // Giriş başarılı olduğunda yönlendirme yapıyoruz
  };

  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-indigo-600 text-center">
                Veteriner Girişi
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

                <button
                  type="submit"
                  className="w-full h-12 bg-indigo-600 text-white rounded-lg"
                >
                  Giriş Yap
                </button>
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
