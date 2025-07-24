import { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getInitialUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        return jwtDecode(token);
      } catch (err) {
        localStorage.removeItem('token');
        return null;
      }
    }
    return null;
  };

  const userInit = getInitialUser();
  const [user, setUser] = useState(userInit);
  const [isLoggedIn, setIsLoggedIn] = useState(!!userInit);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, setUser, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
