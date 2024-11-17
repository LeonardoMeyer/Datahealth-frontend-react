class Medication {
    static async fetchMedications(query) {
      const response = await fetch(`https://api.anvisa.gov.br/medicamentos?q=${query}`);
      if (!response.ok) throw new Error('Erro ao buscar medicamentos');
      const data = await response.json();
      return data;
    }
  }
  
  export default Medication;