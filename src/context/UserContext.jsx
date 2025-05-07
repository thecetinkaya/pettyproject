import { createContext, useContext, useState } from "react";
import pp from "../assets/resim.png";

// Context oluştur
const UserContext = createContext();

// Kullanıcı sağlayıcısı (provider)
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Burak Çetinkaya",
    profileImage: pp,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Kullanıcı bilgilerini almayı kolaylaştıran özel hook
export const useUser = () => {
  return useContext(UserContext);
};
