// src/components/SpecialistList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SpecialistService from '../services/SpecialistService';
import { Table, Button } from 'react-bootstrap';

function SpecialistList() {
    const [specialists, setSpecialists] = useState([]);

    useEffect(() => {
        retrieveSpecialists();
    }, []);

    const retrieveSpecialists = () => {
        SpecialistService.getAllSpecialists()
            .then(response => {
                setSpecialists(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteSpecialist = (specialistId) => {
        SpecialistService.deleteSpecialist(specialistId)
            .then(() => {
                retrieveSpecialists();
            })
            .catch(e => {
                console.log(e);
            });
    };



    return (
        <div>
            <Link to="/add-specialist">
                <Button variant="primary" className="mb-3">
                    Add Specialist
                </Button>
            </Link>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Specializations</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {specialists.map(specialist => (
                    <tr key={specialist.id}>
                        <td>{specialist.firstName}</td>
                        <td>{specialist.lastName}</td>
                        <td>
                            <ul> {/* List specializations */}
                                {specialist.specializations && specialist.specializations.map(spec => (
                                    <li key={spec.id}>{spec.name}</li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <Link to={`/specialists/${specialist.id}`}>
                                <Button variant="info" size="sm" className="me-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button variant="danger" size="sm" onClick={() => deleteSpecialist(specialist.id)}>
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

export default SpecialistList;