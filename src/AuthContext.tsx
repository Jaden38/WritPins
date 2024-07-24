// src/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider } from './firebaseConfig';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (identifier: string, password: string) => {
    let email = identifier;

    if (!identifier.includes('@')) {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', identifier));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('No user found with the provided username.');
      }

      const userData = querySnapshot.docs[0].data();
      email = userData.email;
    }

    await signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userDoc = await getDocs(query(collection(db, 'users'), where('email', '==', user.email)));
    if (userDoc.empty) {
      await setDoc(doc(db, 'users', user.uid), {
        username: user.displayName,
        email: user.email
      });
    }
  };

  const register = async (email: string, password: string, username: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      username: username,
      email: email
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, googleSignIn, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
