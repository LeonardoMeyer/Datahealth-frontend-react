import { create } from "zustand"

export const useDoctorStore = create((set) => ({
    doctors: [],

    addDoctor: (newDoctor) => set((state) => ({ doctors: [newDoctor, ...state.doctors]})),
    setDoctors: (newDoctors) => set({ doctors: newDoctors }),
    deleteDoctor: (id) => set((state) => ({ doctors: state.doctors.filter((doctor) => doctor.id !== id)})),
    updateDoctor: (newDoctor) => set((state) => ({ doctors: state.doctors.map((doctor) => doctor.id === newDoctor.id ? newDoctor : doctor)}))
}))