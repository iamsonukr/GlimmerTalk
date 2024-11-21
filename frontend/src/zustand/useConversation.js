import { create } from "zustand";

const useConversation = create((set) => ({
  // Initial state
  selectedConversation: null,
  
  // Setter for selected conversation
  setSelectedConversation: (selectedConversation) => set({ 
    selectedConversation,
    // Optional: Reset messages when changing conversation
    messages: []
  }),
  
  // Messages array
  messages: [],
  
  // Setter for messages
  setMessages: (messages) => set({ messages }),
  
  // Additional method to add a single message
  addMessage: (newMessage) => set((state) => {
    // Prevent duplicate messages
    const isDuplicate = state.messages.some(
      msg => msg._id === newMessage._id
    );

    return {
      messages: isDuplicate 
        ? state.messages 
        : [...state.messages, newMessage]
    };
  }),

  // Method to clear messages
  clearMessages: () => set({ messages: [] }),

  // Optional: Add error handling
  error: null,
  setError: (error) => set({ error })
}));

export default useConversation;