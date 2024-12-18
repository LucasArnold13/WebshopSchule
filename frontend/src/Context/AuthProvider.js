import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {





  const handleLogin = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
          return true;

      } 
      else 
      {
        return false;
      }
    } catch (err) {
      return false
    } 
  }


  return (
    <AuthContext.Provider value={{ handleLogin}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
