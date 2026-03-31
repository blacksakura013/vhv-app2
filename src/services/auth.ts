// src/services/auth.ts
import { mockUsers } from "../data/mockUsers";

export const login = (phone: string, password: string) => {
  const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const allUsers = [...mockUsers, ...localUsers];

  const user = allUsers.find(
    (u) => u.phone === phone && u.password === password
  );

  if (!user) throw new Error("Invalid phone or password");

  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

export const register = (data: any) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const exists = users.find((u: any) => u.phone === data.phone);
  if (exists) throw new Error("Phone already exists");

  const newUser = {
    ...data,
    id: Date.now(),
    role: "officer",
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  return newUser;
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user") || "null");
};

export const logout = () => {
  localStorage.removeItem("user");
};