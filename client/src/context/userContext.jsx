import React, { createContext, useState, useEffect } from 'react';
import { auth} from '../../../server/src/config/fireBase.config'; 
import { signOut, signInWithEmailAndPassword } from 'firebase/auth';
export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUsername = localStorage.getItem('username');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedUsername) {
      setUsername(JSON.parse(storedUsername));
    }

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
        setUsername(null);
      }
    });

    return () => {
      
      unsubscribe();
    };
  }, []);

  const handleSignin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      console.log('Successfully signed in:', user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      
      setUser(null);
      setUsername(null);

      console.log('Successfully signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const contextValue = {
    user,
    username,
    handleSignin,
    handleSignout,
	setUsername,
	setUser
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
