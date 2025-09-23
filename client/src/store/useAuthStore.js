import {create } from 'zustand';
import axiosInsance from '../lib/axios.js';

export const useAuthStore = create((set) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,

    isCheckingAuth : true,

    checkAuth: async () => {
        try {
            const response = await axiosInsance.get('/auth/checkAuth');
            set({authUser : response.data});
        } catch (error) {
            console.log("Error in checkAuth : ", error);
            set({authUser : null});
        } finally {
            set({isCheckingAuth : false});
        }
    }
}));