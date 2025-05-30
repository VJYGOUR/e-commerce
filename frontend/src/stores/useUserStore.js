import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data.user, loading: false });
    } catch (error) {
      toast.error(
        error.response.data.message || "an error occured, try later again"
      );
    }
  },
  login: async (email, password) => {
    set({ loading: true });
    console.log("Logging in...");
    try {
      console.log("Attempting to log in with:", { email, password });
      const res = await axios.post("/auth/login", { email, password });

      set({ user: res.data.user, loading: false });
    } catch (error) {
      toast.error(
        error.response.data.message || "an error occured, try later again"
      );
    }
  },
  // In useUserStore.js
  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during logout"
      );
    }
  },
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
      console.log(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        // Clear invalid user data
        set({ user: null, checkingAuth: false });
      } else {
        // Handle other errors
        set({ checkingAuth: false });
      }
    }
  },
}));
