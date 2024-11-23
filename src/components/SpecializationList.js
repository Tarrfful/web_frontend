// src/components/SpecializationList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SpecializationService from '../services/SpecializationService';
import { Table, Button } from 'react-bootstrap';

function SpecializationList() {
    const [specializations, setSpecializations] = useState([]);

    useEffect(() => {
        retrieveSpecializations();
    }, []);

    const retrieveSpecializations = () => {
        SpecializationService.getAllSpecializations()
            .then(response => {
                setSpecializations(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteSpecialization = (specializationId) => {
        SpecializationService.deleteSpecialization(specializationId)
            .then(() => {
                retrieveSpecializations();
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <Link to="/add-specialization">
                <Button variant="primary" className="mb-3">
                    Add Specialization
                </Button>
            </Link>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {specializations.map(specialization => (
                    <tr key={specialization.id}>
                        <td>{specialization.name}</td>
                        <td>
                            <Link to={`/specializations/${specialization.id}`}>
                                <Button variant="info" size="sm" className="me-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button variant="danger" size="sm" onClick={() => deleteSpecialization(specialization.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default SpecializationList;