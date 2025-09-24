import {create } from 'zustand';
import {axiosInstance} from '../lib/axios.js';

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
    }
}));