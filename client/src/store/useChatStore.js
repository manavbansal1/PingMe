import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from './useAuthStore.js'

export const useChatStore = create((set, get) => ({
    messages : [],
    users : [],
    selectedUser : null,
    isUsersLoading : false,
    isMessagesLoading : false,

    getUsers : async () => {
        set({isUsersLoading : true});
        try {
            const response = await axiosInstance.get('/messages/users');
            set({users : response.data});
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error in fetching users");
        } finally {
            set({isUsersLoading : false});
        }
    },

    getMessages : async (userId) => {
        set({isMessagesLoading : true});
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({messages : response.data});
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error in fetching messages");
        }
        finally {
            set({isMessagesLoading : false});
        }
    },

    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get()
        if (!selectedUser) {
            toast.error("Please select a user to send message");
            return;
        }
        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages: [...messages, response.data]});
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error sending message");
        }
    },

    setSelectedUser: (user) => {
        set({ selectedUser: user });
    },

    subscribeToMessages: () => {
        // TODO: Implement socket subscription for real-time messages
        const {selectedUser} = get()
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            if (newMessage.senderId !== selectedUser._id) return;
            set({ messages : [...get().messages, newMessage],})
        })
        console.log("Subscribing to messages");
    },

    unsubscribeFromMessages: () => {
        // TODO: Implement socket unsubscription
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage")
    },
}));