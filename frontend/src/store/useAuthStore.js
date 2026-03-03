import { axiosinstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
    authuser: null,
    issignedup: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    ischeckingin: true,
    socket: null,

    checkauth: async () => {
        try {
            const res = await axiosinstance.get('/auth/check')

            set({ authuser: res.data })
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkauth: " + error);
            set({ authuser: null })
        } finally {
            set({ ischeckingin: false })
        }
    },

    signup: async (data) => {
        set({ issignedup: true });
        try {
            const res = await axiosinstance.post("/auth/signup", data);
            set({ authuser: res.data });
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ issignedup: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosinstance.post("/auth/login", data);
            set({ authuser: res.data });
            toast.success("Logged in successfully");

            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosinstance.post("/auth/logout");
            set({ authuser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosinstance.put("/auth/update", data);
            set({ authuser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authuser } = get();
        if (!authuser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authuser._id,
            },
        })
        socket.connect()

        set({ socket: socket })

        socket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });
        });
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}))