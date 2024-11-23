import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


import PetList from './components/PetList';
import PetForm from './components/PetForm';
import OwnerList from './components/OwnerList';
import OwnerForm from './components/OwnerForm';
import MedicalHistoryList from './components/MedicalHistoryList';
import MedicalHistoryForm from './components/MedicalHistoryForm';
import SpecialistList from './components/SpecialistList';
import SpecialistForm from './components/SpecialistForm';
import SpecializationList from './components/SpecializationList';
import SpecializationForm from './components/SpecializationForm';

function App() {
    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Vet Clinic</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Pets</Nav.Link>
                            <Nav.Link as={Link} to="/owners">Owners</Nav.Link>
                            <Nav.Link as={Link} to="/medicalHistories">Medical Histories</Nav.Link>
                            <Nav.Link as={Link} to="/specialists">Specialists</Nav.Link>
                            <Nav.Link as={Link} to="/specializations">Specializations</Nav.Link>


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>



            <Container>
                <Routes>
                    <Route path="/" element={<PetList />} />
                    <Route path="/add-pet" element={<PetForm />} />
                    <Route path="/pets/:id" element={<PetForm />} />

                    <Route path="/owners" element={<OwnerList />} />
                    <Route path="/add-owner" element={<OwnerForm />} />
                    <Route path="/owners/:id" element={<OwnerForm />} />

                    <Route path="/medicalHistories" element={<MedicalHistoryList />} />
                    <Route path="/add-medical-history" element={<MedicalHistoryForm />} />
                    <Route path="/medicalHistories/:id" element={<MedicalHistoryForm />} />

                    <Route path="/specialists" element={<SpecialistList />} />
                    <Route path="/add-specialist" element={<SpecialistForm />} />
                    <Route path="/specialists/:id" element={<SpecialistForm />} />

                    <Route path="/specializations" element={<SpecializationList />} />
                    <Route path="/add-specialization" element={<SpecializationForm />} />
                    <Route path="/specializations/:id" element={<SpecializationForm />} />



                </Routes>
            </Container>
        </Router>
    );
}

export default App;