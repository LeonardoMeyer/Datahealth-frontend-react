import { create } from "zustand"

export const useMedicineStore = create((set) => ({
    medicines: [],

    addMedicine: (newMedicine) => set((state) => ({ medicines: [newMedicine, ...state.medicines]})),
    setMedicines: (newMedicines) => set({ medicines: newMedicines }),
    deleteMedicine: (id) => set((state) => ({ medicines: state.medicines.filter((medicine) => medicine.id !== id)})),
    updateMedicine: (newMedicine) => set((state) => ({ medicines: state.medicines.map((medicine) => medicine.id === newMedicine.id ? newMedicine : medicine)}))
}))