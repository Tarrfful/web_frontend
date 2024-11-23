import axios from 'axios';

const API_BASE_URL = '/api/medicalHistories';

class MedicalHistoryService {
    getAllMedicalHistories() {
        return axios.get(API_BASE_URL);
    }

    createMedicalHistory(medicalHistory) {
        return axios.post(API_BASE_URL, medicalHistory);
    }

    getMedicalHistoryById(medicalHistoryId) {
        return axios.get(`${API_BASE_URL}/${medicalHistoryId}`);
    }

    updateMedicalHistory(medicalHistory, medicalHistoryId) {
        return axios.put(`${API_BASE_URL}/${medicalHistoryId}`, medicalHistory);
    }

    deleteMedicalHistory(medicalHistoryId) {
        return axios.delete(`${API_BASE_URL}/${medicalHistoryId}`);
    }

    getPets(){
        return axios.get('/api/pets')
    }

    getSpecialists(){
        return axios.get('/api/specialists')
    }

}

const medicalHistoryService = new MedicalHistoryService();
export default medicalHistoryService;