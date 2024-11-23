// src/services/SpecializationService.js
import axios from 'axios';

const API_BASE_URL = '/api/specializations';

class SpecializationService {
    getAllSpecializations() {
        return axios.get(API_BASE_URL);
    }

    createSpecialization(specialization) {
        return axios.post(API_BASE_URL, specialization);
    }

    getSpecializationById(specializationId) {
        return axios.get(`${API_BASE_URL}/${specializationId}`);
    }

    updateSpecialization(specialization, specializationId) {
        return axios.put(`${API_BASE_URL}/${specializationId}`, specialization);
    }

    deleteSpecialization(specializationId) {
        return axios.delete(`${API_BASE_URL}/${specializationId}`);
    }
}

const specializationService = new SpecializationService();
export default specializationService;