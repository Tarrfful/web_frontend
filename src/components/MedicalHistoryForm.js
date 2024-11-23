import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import MedicalHistoryService from '../services/MedicalHistoryService';

function MedicalHistoryForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const initialMedicalHistoryState = {
        id: null,
        pet: null,
        specialist: null,
        diagnosis: "",
        treatment: "",
        visitDate: ""
    };

    const [medicalHistory, setMedicalHistory] = useState(initialMedicalHistoryState);
    const [submitted, setSubmitted] = useState(false);
    const [pets, setPets] = useState([]);
    const [specialists, setSpecialists] = useState([]);

    useEffect(() => {
        retrievePets();
        retrieveSpecialists();

        if (id) {
            MedicalHistoryService.getMedicalHistoryById(id)
                .then(response => {
                    const data = response.data;
                    setMedicalHistory({
                        ...data,
                        pet: data.pet || null,
                        specialist: data.specialist || null,
                    });
                })
                .catch(e => {
                    console.error("Error fetching medical history:", e);
                });
        }
    }, [id]);

    const retrievePets = () => {
        MedicalHistoryService.getPets()
            .then(response => {
                setPets(response.data);
            })
            .catch(e => console.error("Error fetching pets:", e));
    };

    const retrieveSpecialists = () => {
        MedicalHistoryService.getSpecialists()
            .then(response => {
                setSpecialists(response.data);
            })
            .catch(e => console.error("Error fetching specialists:", e));
    };

    const handleInputChange = event => {
        const { name, value } = event.target;

        if (name === "pet") {
            // Преобразуем значение в число и находим объект питомца
            const petId = parseInt(value, 10);
            const selectedPet = pets.find(pet => pet.id === petId);
            setMedicalHistory(prev => ({ ...prev, pet: selectedPet }));
        } else if (name === "specialist") {
            // Аналогично для специалиста
            const specialistId = parseInt(value, 10);
            const selectedSpecialist = specialists.find(specialist => specialist.id === specialistId);
            setMedicalHistory(prev => ({ ...prev, specialist: selectedSpecialist }));
        } else {
            setMedicalHistory(prev => ({ ...prev, [name]: value }));
        }
    };

    const saveMedicalHistory = () => {
        // Подготавливаем данные для отправки, включая ID питомца и специалиста
        const data = {
            ...medicalHistory,
            pet: medicalHistory.pet ? { id: medicalHistory.pet.id } : null, // Отправляем только ID
            specialist: medicalHistory.specialist ? { id: medicalHistory.specialist.id } : null // Отправляем только ID
        };

        if (id) {
            MedicalHistoryService.updateMedicalHistory(data, id)
                .then(() => {
                    setSubmitted(true);
                    navigate("/medicalHistories"); // Исправлен роутинг
                })
                .catch(e => {
                    console.error("Error updating medical history:", e);
                });
        } else {
            MedicalHistoryService.createMedicalHistory(data)
                .then(() => {
                    setSubmitted(true);
                    navigate("/medicalHistories"); // Исправлен роутинг
                })
                .catch(e => {
                    console.error("Error creating medical history:", e);
                });
        }
    };

    const newMedicalHistory = () => {
        setMedicalHistory(initialMedicalHistoryState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newMedicalHistory}>
                        Add
                    </button>
                </div>
            ) : (
                <Form>
                    <Form.Group controlId="pet">
                        <Form.Label>Pet</Form.Label>
                        <select name="pet" value={medicalHistory.pet?.id || ''} onChange={handleInputChange} className="form-control">
                            <option value="">Select Pet</option>
                            {pets.map((pet) => (
                                <option key={pet.id} value={pet.id}>{pet.name}</option>
                            ))}
                        </select>
                    </Form.Group>

                    <Form.Group controlId="specialist">
                        <Form.Label>Specialist</Form.Label>
                        <select name="specialist" value={medicalHistory.specialist?.id || ''} onChange={handleInputChange} className="form-control">
                            <option value="">Select Specialist</option>
                            {specialists.map((specialist) => (
                                <option key={specialist.id} value={specialist.id}>{specialist.firstName} {specialist.lastName}</option>
                            ))}
                        </select>
                    </Form.Group>

                    <Form.Group controlId="diagnosis">
                        <Form.Label>Diagnosis</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter diagnosis"
                            name="diagnosis"
                            value={medicalHistory.diagnosis}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="treatment">
                        <Form.Label>Treatment</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter treatment"
                            name="treatment"
                            value={medicalHistory.treatment}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="visitDate">
                        <Form.Label>Visit Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            placeholder="Enter visit date"
                            name="visitDate"
                            value={medicalHistory.visitDate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button variant="primary" onClick={saveMedicalHistory}>
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    );
}

export default MedicalHistoryForm;