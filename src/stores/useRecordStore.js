import { create } from "zustand"

export const useRecordStore = create((set) => ({
    records: [],

    addRecord: (newRecord) => set((state) => ({ records: [newRecord, ...state.records]})),
    setRecords: (newRecords) => set({ records: newRecords }),
    deleteRecord: (id) => set((state) => ({ records: state.records.filter((record) => record.id !== id)})),
    updateRecord: (newRecord) => set((state) => ({ records: state.records.map((record) => record.id === newRecord.id ? newRecord : record)}))
}))