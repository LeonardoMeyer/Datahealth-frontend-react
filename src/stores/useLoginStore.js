import { create } from 'zustand';

export const useLoginStore = create((set) => ({
    accessToken: '',
    public_id: '',
    name: '',
    avatar: '',
    email: '',
    profileImage: '', 
    id: '',

    login: (userLogin) => set({ ...userLogin }),
    logout: () => set({
        accessToken: '',
        public_id: '',
        name: '',
        avatar: '',
        email: '',
        profileImage: '',
        id: '',

    }),
}));
