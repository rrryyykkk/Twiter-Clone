/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children, authUser: initialUser = null }) => {
  const [authUser, setAuthUser] = useState(initialUser); // Pastikan setAuthUser didefinisikan di sini

  const login = (user) => setAuthUser(user);
  const logOut = () => setAuthUser(null);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context; // Memastikan return context berisi { authUser, setAuthUser }
};

export default AuthProvider;
