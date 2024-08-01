"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (name, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, { displayName: name });

      //Add user to users collection
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        displayName: name,
        email: email,
      });
      const initialItemDocRef = doc(
        collection(db, "users", auth.currentUser.uid, "items"),
        "initialItem"
      );
      await setDoc(initialItemDocRef, {
        itemName: "initialItem",
        description: "",
        category: "",
        quantity: 0,
      });

      //create a cateogories collection under current user
      const initialCategoryDocRef = doc(
        collection(db, "users", auth.currentUser.uid, "categories"),
        "defaultCategory"
      );
      await setDoc(initialCategoryDocRef, {
        categoryName: "None",
        description: "default category",
      });

      logout();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      return await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, signUp, logout, forgotPassword }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
