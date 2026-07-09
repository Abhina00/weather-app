import React, { createContext, useContext, useEffect, useState } from "react";
import { getItem, setItem, removeItem } from "../utils/storage";

/*
  DEMO AUTH ONLY
  --------------
  There is no real backend here. "Registered" users are stored in
  localStorage under "weather_app_users" (plain text, NOT hashed).
  This is fine for a learning project / prototype, but before shipping
  anything real you should swap this out for a proper auth backend
  (e.g. Firebase Auth, Auth0, or your own API with hashed passwords + JWT).
*/

const AuthContext = createContext(null);

const USERS_KEY = "weather_app_users";
const SESSION_KEY = "weather_app_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getItem(SESSION_KEY, null));

  useEffect(() => {
    if (user) setItem(SESSION_KEY, user);
    else removeItem(SESSION_KEY);
  }, [user]);

  const register = (username, password) => {
    const users = getItem(USERS_KEY, {});
    if (users[username]) {
      return { ok: false, error: "That username is already taken." };
    }
    users[username] = { password };
    setItem(USERS_KEY, users);
    setUser({ username });
    return { ok: true };
  };

  const login = (username, password) => {
    const users = getItem(USERS_KEY, {});
    const record = users[username];
    if (!record || record.password !== password) {
      return { ok: false, error: "Invalid username or password." };
    }
    setUser({ username });
    return { ok: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
