"use client";

import { User, users } from "@/lib/data";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (userData: Omit<User, "id" | "isAdmin">) => boolean;
  updateUser: (updatedUser: User) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

type RegisterUserData = Omit<User, "id" | "isAdmin">;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Charger l'utilisateur depuis localStorage au montage du composant
    const storedUser = getFromLocalStorage<User | null>("user", null);
    setUser(storedUser);
    setIsLoaded(true);
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      saveToLocalStorage("user", foundUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  };

  const register = (userData: RegisterUserData): boolean => {
    // Vérifier si l'email est déjà utilisé
    const existingUser = users.find((u) => u.email === userData.email);
    if (existingUser) {
      return false;
    }

    // Créer un nouvel utilisateur
    const newUser: User = {
      id: `user_${Date.now()}`,
      isAdmin: false,
      ...userData,
    };

    // Ajouter l'utilisateur à la liste des utilisateurs
    users.push(newUser);

    // Connecter automatiquement l'utilisateur
    setUser(newUser);
    saveToLocalStorage("user", newUser);

    return true;
  };

  const updateUser = (updatedUser: User) => {
    // Mettre à jour l'utilisateur dans la liste
    const userIndex = users.findIndex((u) => u.id === updatedUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
    }

    // Mettre à jour l'utilisateur courant
    setUser(updatedUser);
    saveToLocalStorage("user", updatedUser);
  };

  const isAuthenticated = !!user;
  const isAdmin = !!user?.isAdmin;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateUser,
        isAuthenticated,
        isAdmin,
      }}
    >
      {isLoaded ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
