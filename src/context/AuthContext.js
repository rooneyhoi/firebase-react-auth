import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';

import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("signup success", user);                
      })
      // ... we catch outside of the context, in the UI component
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("login success", user);                
      })
      // ... we catch outside of the context, in the UI component
  }

  function logout() {
    return signOut(auth)
      .then(() => {
        // Signed out    
        console.log("sign-out success");                
      })
      .catch((error) => {            
        // ... we catch outside of the context
      });
  }

  function resetPassword(restoredEmail) {
    return sendPasswordResetEmail(auth, restoredEmail)
      .then(() => {                
        console.log("email sent success");                
      })
      .catch((error) => {            
        // ... we catch outside of the context
      });
  }

  function updateUserEmail(email) {
    return updateEmail(currentUser, email)
      .then(() => {                
        console.log("email updated");                
      })
      .catch((error) => {            
        // ... we catch outside of the context
      });
  }

  function updateUserPassword(password) {
    return updatePassword(currentUser, password)
      .then(() => {                
        console.log("password updated");                
      })
      .catch((error) => {            
        // ... we catch outside of the context
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingUser(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loadingUser && children}
    </AuthContext.Provider>
  );
}
