import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const checkSession = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        console.log("Authentifzierung wird durchgeführt")



      } else {
        console.log('nicht eingeloggt');
        localStorage.setItem("isLoggedIn", false);
      }
    } catch (error) {
      console.error('Fehler beim Überprüfen der Session:', error);
    } finally {
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.setItem("isLoggedIn", false);
        setUser(null);
        navigate('/login');
      } else {
        console.error('Fehler beim Logout:', response.statusText);
      }
    } catch (error) {
      console.error('Fehler beim Logout:', error);
    }
  };

  useEffect(() => {
    checkSession();
  });

  const login = (user) => {
    localStorage.setItem("isLoggedIn", true);
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ login, logout, checkSession, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
