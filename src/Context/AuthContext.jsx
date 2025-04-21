import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("loggedInUser")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    
    const adminExists = storedUsers.some(user => user.email === "admin@admin.com");

    if (!adminExists) {
      const defaultAdmin = { email: "admin@admin.com", password: "admin123", role: "admin" };
      localStorage.setItem("users", JSON.stringify([...storedUsers, defaultAdmin]));
    }
  }, []);

  const login = (formData) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = storedUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (matchedUser) {
      setUser(matchedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      return true; 
    } else {
      return false; 
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
