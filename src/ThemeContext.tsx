import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

interface ThemeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  themeLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextProps>({
  darkMode: false,
  toggleDarkMode: () => {
    // This is a placeholder function and will be overwritten by the ThemeProvider
  },
  themeLoaded: false,
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const docSnapshot = await getDoc(userDoc);
        if (docSnapshot.exists()) {
          setDarkMode(docSnapshot.data().darkMode);
        } else {
          setDarkMode(false);
        }
      } else {
        setDarkMode(false); 
      }
      setThemeLoaded(true);
    };
    fetchTheme();
  }, [user]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = async () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        setDoc(userDoc, { darkMode: newMode }, { merge: true });
      }
      document.body.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, themeLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
};
