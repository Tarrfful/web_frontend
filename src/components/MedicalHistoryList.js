import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MedicalHistoryService from '../services/MedicalHistoryService';
import { Table, Button } from 'react-bootstrap';

function MedicalHistoryList() {
    const [medicalHistories, setMedicalHistories] = useState([]);

    useEffect(() => {
        retrieveMedicalHistories();
    }, []);

    const retrieveMedicalHistories = () => {
        MedicalHistoryService.getAllMedicalHistories()
            .then(response => {
                setMedicalHistories(response.data);
            })
            .catch(e => {
                console.error("Error fetching medical histories:", e);
            });
    };

    const deleteMedicalHistory = (medicalHistoryId) => {
        MedicalHistoryService.deleteMedicalHistory(medicalHistoryId)
            .then(() => {
                retrieveMedicalHistories();
            })
            .catch(e => {
                console.error("Error deleting medical history:", e);
            });
    };

    return (
        <div>
            <h3>Medical Histories</h3>
            <Link to="/add-medical-history">
                <Button variant="primary" className="mb-3">Add New Medical History</Button>
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Pet Name</th>
                        <th>Specialist</th>
                        <th>Diagnosis</th>
                        <th>Treatment</th>
                        <th>Visit Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {medicalHistories.map(medicalHistory => (
                        <tr key={medicalHistory.id}>
                            <td>{medicalHistory.pet ? medicalHistory.pet.name : "N/A"}</td>
                            <td>{medicalHistory.specialist ? `${medicalHistory.specialist.firstName} ${medicalHistory.specialist.lastName}` : "N/A"}</td>
                            <td>{medicalHistory.diagnosis}</td>
                            <td>{medicalHistory.treatment}</td>
                            <td>{medicalHistory.visitDate}</td>
                            <td>
                                <Link to={`/medicalHistories/${medicalHistory.id}`}>
                                    <Button variant="info" size="sm" className="me-2">Edit</Button>
                                </Link>
                                <Button variant="danger" size="sm" onClick={() => deleteMedicalHistory(medicalHistory.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default MedicalHistoryList;