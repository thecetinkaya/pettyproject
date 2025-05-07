import { useState } from "react";
import UserLoginForm from "../../features/auth/userLogin/SigninForm";
import VetLoginForm from "../../features/auth/userLogin/SignupForm";
import LeftOverlayContent from "../../features/auth/userLogin/LeftOverlayContent";
import RightOverlayContent from "../../features/auth/userLogin/RightOverlayContent";

const LoginPage = () => {
  console.log("LoginPage Render Edildi"); // Kontrol için ekledik
  const [isAnimated, setIsAnimated] = useState(false);
  const overlayBg =
    "bg-gradient-to-r from-blue-800 via-purple-800 to-indigo-800";

  return (
    <div className=" bg-white relative overflow-hidden rounded-lg h-screen">
      <div
        id="user-login"
        className={`bg-white absolute top-0 left-0 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out z-20 ${
          isAnimated ? "translate-x-full opacity-0" : ""
        }`}
      >
        <UserLoginForm />
      </div>

      <div
        id="vet-login"
        className={`absolute top-0 left-0 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out ${
          isAnimated
            ? "translate-x-full opacity-100 z-50 animate-show"
            : "opacity-0 z-10"
        }`}
      >
        <div className="h-full w-full flex justify-center items-center">
          <VetLoginForm />
        </div>
      </div>

      <div
        id="overlay-container"
        className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-50 ${
          isAnimated ? "-translate-x-full" : ""
        }`}
      >
        <div
          id="overlay"
          className={`${overlayBg} relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${
            isAnimated ? "translate-x-1/2" : "translate-x-0"
          }`}
        >
          <div
            id="overlay-left"
            className={`w-1/2 h-full absolute flex justify-center items-center top-0 transform -translate-x-[20%] transition-transform duration-700 ease-in-out ${
              isAnimated ? "translate-x-0" : "-translate-x-[20%]"
            }`}
          >
            <LeftOverlayContent
              isAnimated={isAnimated}
              setIsAnimated={setIsAnimated}
            />
          </div>
          <div
            id="overlay-right"
            className={`w-1/2 h-full absolute flex justify-center items-center top-0 right-0 transform transition-transform duration-700 ease-in-out ${
              isAnimated ? "translate-x-[20%]" : "translate-x-0"
            }`}
          >
            <RightOverlayContent
              isAnimated={isAnimated}
              setIsAnimated={setIsAnimated}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
