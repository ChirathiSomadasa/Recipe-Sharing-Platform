import React, { createContext, useState, useEffect } from 'react';
import { localStorageService } from '../services/localStorage';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap the app and provide authentication state
export const AuthProvider = ({ children }) => {
  // State to hold the currently logged-in user
  const [user, setUser] = useState(null);

  // Load the logged-in user from local storage on component mount
  useEffect(() => {
    const storedUser = localStorageService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email, password) => {
    console.log('Attempting to log in with email:', email);
  
    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Users in local storage:', users);
  
    // Find the user by email
    const foundUser = users.find((u) => u.email === email.trim());
    console.log('Found user:', foundUser);
  
    if (foundUser) {
      console.log('Entered password:', password);
      console.log('Stored password:', foundUser.password);
  
      // Validate the password
      if (foundUser.password === password) {
        setUser(foundUser); // Set the user in state
        localStorageService.saveUser(foundUser); // Save the user in local storage
        console.log('Login successful:', foundUser);
      } else {
        console.error('Invalid password for email:', email);
        throw new Error('Invalid password');
      }
    } else {
      console.error('No user found for email:', email);
      throw new Error('Invalid email');
    }
  };

  // Logout function: Clear the logged-in user
  const logout = () => {
    setUser(null); // Clear the user from state
    localStorageService.clearUser(); // Remove the user from local storage
    console.log('User logged out');
  };

  // Provide the context value to child components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};