// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import '../Pages/CSS/login.css';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const initialUser = { email: "", password: "", username: "" }
const Register = () => {
    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const signUp = async (event) => {
        event.preventDefault(); // Prevents page reload
        try {
            const url = "http://localhost:1337/api/auth/local/register";
            if (user.username && user.email && user.password) {
                const response = await axios.post(url, user); 
                if (response) {
                    setUser(initialUser)
                    setSuccess('User registered successfully!');
                    setError('');
                    navigate('/login');
                }
            }
        } catch (error) {
            setError('An error occurred during registration.');
            setSuccess('');
        }
    };

    const handleUserChange = ({ target }) => {
        const { name, value } = target;
        setUser((currentUser) => ({
            ...currentUser,
            [name]: value,
        }));
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4" style={{ maxWidth: '500px' }}>
                        <Card.Body>
                            <Card.Title className="mb-4">Register an Account</Card.Title>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                            <Form onSubmit={signUp}>
                                <Form.Group className="mb-4" controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={user.username}
                                        onChange={handleUserChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleUserChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleUserChange}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Register
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
