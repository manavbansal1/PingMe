import {create } from 'zustand';
import {axiosInstance} from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    onlineUsers : [],

    isCheckingAuth : true,

    checkAuth: async () => {
        try {
            // Checking auth status from backend
            const response = await axiosInstance.get('/auth/checkAuth');
            set({authUser : response.data});
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
    }

}));