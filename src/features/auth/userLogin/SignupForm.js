import { useState } from "react";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-indigo-600">
                Kullanıcı Kaydı
              </h1>

              <form className="mt-12" action="" method="POST">
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
                    type="text"
                    className="peer h-12 w-full border-2 border-gray-300 text-gray-900 px-4 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="john@doe.com"
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
                    className="peer h-12 w-full border-2 border-gray-300 text-gray-900 px-4 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="Password"
                  />
                </div>

                <input
                  type="submit"
                  value="Kayıt Ol"
                  className="mt-8 px-8 py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer"
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

export default SignupForm;
