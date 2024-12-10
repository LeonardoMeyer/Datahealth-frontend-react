import { create } from "zustand"

export const useMedicationStore = create((set) => ({
    medications: [],

    addMedication: (newMedication) => set((state) => ({ medications: [newMedication, ...state.medications]})),
    setMedications: (newMedications) => set({ medications: newMedications }),
    deleteMedication: (id) => set((state) => ({ medications: state.medications.filter((medication) => medication.id !== id)})),
    updateMedication: (newMedication) => set((state) => ({ medications: state.medications.map((medication) => medication.id === newMedication.id ? newMedication : medication)}))
}))