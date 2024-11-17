import Medication from '../models/Medication';

class MedicationController {
  static async searchMedications(query) {
    try {
      const medications = await Medication.fetchMedications(query);
      return medications;
    } catch (error) {
      console.error('Erro ao buscar medicamentos:', error);
      return [];
    }
  }
}

export default MedicationController;