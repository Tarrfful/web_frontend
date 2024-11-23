// src/components/OwnerList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OwnerService from '../services/OwnerService';
import { Table, Button } from 'react-bootstrap';

function OwnerList() {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    retrieveOwners();
  }, []);

  const retrieveOwners = () => {
    OwnerService.getAllOwners()
      .then(response => {
        setOwners(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteOwner = (ownerId) => {
    OwnerService.deleteOwner(ownerId)
      .then(() => {
        retrieveOwners(); // Обновляем список после удаления
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div>
       <Link to="/add-owner">
        <Button variant="primary" className="mb-3">
          Add Owner
        </Button>
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners.map(owner => (
            <tr key={owner.id}>
              <td>{owner.firstName}</td>
              <td>{owner.lastName}</td>
              <td>{owner.phone}</td>
              <td>{owner.address}</td>
              <td>
                <Link to={`/owners/${owner.id}`}>
                  <Button variant="info" size="sm" className="me-2">
                    Edit
                  </Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => deleteOwner(owner.id)}>
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

export default OwnerList;