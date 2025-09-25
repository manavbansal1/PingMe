import { create } from 'zustand';
import {axiosInstance} from '../lib/axios.js';
import toast from 'react-hot-toast';
import {io} from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : '/';

export const useAuthStore = create((set, get) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false, 
    isUpdatingProfile : false,
    onlineUsers : [],
    socket : null,

    isCheckingAuth : true,

    checkAuth: async () => {
        try {
            // Checking auth status from backend
            const response = await axiosInstance.get('/auth/checkAuth');
            set({authUser : response.data});
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth : ", error);
            set({authUser : null});
        } finally {
            set({isCheckingAuth : false});
        }
    },

    signup: async (data) => {
        set({isSigningUp : true});
        try {
            const response = await axiosInstance.post('/auth/signup', data);
            set({authUser : response.data});
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error in signup");
        }
        finally {
            set({isSigningUp : false});
        }
    },

    login: async (data) => {
        set({isLoggingIn : true});
        try {
            const response = await axiosInstance.post('/auth/login', data);
            set({authUser : response.data});
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error in login");
        }
        finally {
            set({isLoggingIn : false});
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser : null});
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error in logout");
        }
    },

    updateProfile: async (data) => {
        set({isUpdatingProfile : true});
        try {
            const response = await axiosInstance.put('/auth/update-profile', data);
            set({authUser : response.data});
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in updateProfile : ", error);
            toast.error(error?.response?.data?.message || "Error in updating profile");
        }
        finally {
            set({isUpdatingProfile : false});
        }
    },
    connectSocket: () => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query : {
                userId : authUser._id,
            }

        })
        socket.connect();

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers : userIds})
        })

        set({socket : socket});
    
    },

    disconnectSocket: () => {
        if(get().socket?.connected) {
            get().socket.disconnect();
        }
    }

}));