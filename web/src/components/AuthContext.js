import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setUserData(parsedData);
    } else {
      console.log('No user data found in local storage.');
    }
    setIsLoading(false); // Set isLoading to false after checking for user data
  }, []);

  const isAuthenticated = !!userData;

  const login = (userData) => {
    setUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
