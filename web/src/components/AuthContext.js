import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null); // Add a state variable to store user data

  const login = (userData) => {
    setIsAuthenticated(true);
    setUserData(userData); // Store the user data in the context
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null); // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
