import {create } from 'zustand';
import {axiosInstance} from '../lib/axios.js';
import toast from 'react-hot-toast';
import { logout } from '../../../server/src/controllers/auth.contoller.js';

export const useAuthStore = create((set) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,

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

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser : null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error in logout");
        }
    }
}));