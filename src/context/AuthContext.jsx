import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kullanıcıları localStorage'dan al
  const getUsers = () => {
    try {
      const users = localStorage.getItem("petty_users");
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  };

  // Kullanıcı girişi
  const login = (email, password) => {
    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem("petty_currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  // Kullanıcı kaydı
  // AuthContext.js
  const register = async (userData) => {
    try {
      if (!userData.name || !userData.email || !userData.password) {
        throw new Error("Lütfen tüm gerekli alanları doldurun");
      }

      const users = getUsers();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(userData.email)) {
        throw new Error("Geçersiz email formatı");
      }

      if (users.some((u) => u.email === userData.email)) {
        throw new Error("Bu email zaten kayıtlı");
      }

      const newUser = {
        ...userData,
        id: Date.now().toString(),
        profileImage: "https://randomuser.me/api/portraits/lego/5.jpg",
        pets: [],
        notifications: { email: true, sms: false },
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem("petty_users", JSON.stringify(updatedUsers));
      localStorage.setItem("petty_currentUser", JSON.stringify(newUser));
      setCurrentUser(newUser);

      return { success: true, user: newUser };
    } catch (error) {
      console.error("Kayıt hatası:", error);
      return { success: false, error: error.message };
    }
  };

  // Çıkış yap
  const logout = () => {
    localStorage.removeItem("petty_currentUser");
    setCurrentUser(null);
  };

  // Sayfa yenilendiğinde oturumu kontrol et
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("petty_currentUser") || null);
    setCurrentUser(user);
    setLoading(false);

    // İlk kurulumda boş users array'i oluştur
    if (!localStorage.getItem("petty_users")) {
      localStorage.setItem("petty_users", JSON.stringify([]));
    }
  }, []);

  const value = {
    currentUser,
    user: currentUser,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
    updateUser: (newData) => {
      const updatedUser = { ...currentUser, ...newData };
      setCurrentUser(updatedUser);
      localStorage.setItem("petty_currentUser", JSON.stringify(updatedUser));

      // Kullanıcı listesini de güncelle
      const users = getUsers();
      const updatedUsers = users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      );
      localStorage.setItem("petty_users", JSON.stringify(updatedUsers));
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
